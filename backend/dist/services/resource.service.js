"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceService = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let ResourceService = class ResourceService {
    async findAll(page = 1, limit = 10, category, adminOnly) {
        try {
            const skip = (page - 1) * limit;
            const where = {};
            if (category) {
                where.category = category;
            }
            if (adminOnly !== undefined) {
                where.adminOnly = adminOnly;
            }
            const [resources, total] = await Promise.all([
                prisma.resource.findMany({
                    skip,
                    take: limit,
                    where,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        creator: {
                            select: { id: true, name: true, email: true }
                        }
                    }
                }),
                prisma.resource.count({ where })
            ]);
            return {
                data: resources,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            };
        }
        catch (error) {
            console.error('Error fetching resources:', error);
            throw new common_1.BadRequestException('Failed to fetch resources');
        }
    }
    async findPublicResources(category) {
        try {
            const where = { adminOnly: false };
            if (category) {
                where.category = category;
            }
            const resources = await prisma.resource.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    category: true,
                    filePath: true,
                    fileSize: true,
                    createdAt: true
                }
            });
            return {
                success: true,
                data: resources
            };
        }
        catch (error) {
            console.error('Error fetching public resources:', error);
            throw new common_1.BadRequestException('Failed to fetch public resources');
        }
    }
    async findOne(id) {
        try {
            const resource = await prisma.resource.findUnique({
                where: { id },
                include: {
                    creator: {
                        select: { id: true, name: true, email: true }
                    }
                }
            });
            if (!resource) {
                throw new common_1.NotFoundException(`Resource with ID ${id} not found`);
            }
            return resource;
        }
        catch (error) {
            console.error('Error fetching resource:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch resource');
        }
    }
    async create(data, file, createdBy) {
        try {
            const resourceData = Object.assign({}, data);
            if (file) {
                resourceData.filePath = file.filename;
                resourceData.fileSize = file.size;
            }
            if (createdBy) {
                resourceData.createdBy = createdBy;
            }
            const resource = await prisma.resource.create({
                data: resourceData,
                include: {
                    creator: {
                        select: { id: true, name: true, email: true }
                    }
                }
            });
            return {
                success: true,
                message: 'Resource created successfully',
                data: resource
            };
        }
        catch (error) {
            console.error('Error creating resource:', error);
            throw new common_1.BadRequestException('Failed to create resource');
        }
    }
    async update(id, data) {
        try {
            const existingResource = await prisma.resource.findUnique({
                where: { id }
            });
            if (!existingResource) {
                throw new common_1.NotFoundException(`Resource with ID ${id} not found`);
            }
            const updatedResource = await prisma.resource.update({
                where: { id },
                data,
                include: {
                    creator: {
                        select: { id: true, name: true, email: true }
                    }
                }
            });
            return {
                success: true,
                message: 'Resource updated successfully',
                data: updatedResource
            };
        }
        catch (error) {
            console.error('Error updating resource:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to update resource');
        }
    }
    async remove(id) {
        try {
            const resource = await prisma.resource.findUnique({
                where: { id }
            });
            if (!resource) {
                throw new common_1.NotFoundException(`Resource with ID ${id} not found`);
            }
            if (resource.filePath) {
                const filePath = path.join('./uploads/resources', resource.filePath);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
            await prisma.resource.delete({
                where: { id }
            });
            return {
                success: true,
                message: 'Resource deleted successfully'
            };
        }
        catch (error) {
            console.error('Error deleting resource:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to delete resource');
        }
    }
    async downloadResource(id, res) {
        try {
            const resource = await prisma.resource.findUnique({
                where: { id }
            });
            if (!resource || !resource.filePath) {
                throw new common_1.NotFoundException('Resource file not found');
            }
            const filePath = path.join('./uploads/resources', resource.filePath);
            if (!fs.existsSync(filePath)) {
                throw new common_1.NotFoundException('Resource file not found on server');
            }
            const stat = fs.statSync(filePath);
            res.set({
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment; filename="${resource.title}"`,
                'Content-Length': stat.size,
            });
            const readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
            return readStream;
        }
        catch (error) {
            console.error('Error downloading resource:', error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to download resource');
        }
    }
    async serveFile(filename, res) {
        try {
            if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
                throw new common_1.BadRequestException('Invalid filename');
            }
            const filePath = path.join('./uploads/resources', filename);
            if (!fs.existsSync(filePath)) {
                throw new common_1.NotFoundException('File not found');
            }
            const stat = fs.statSync(filePath);
            const ext = path.extname(filename).toLowerCase();
            let contentType = 'application/octet-stream';
            if (ext === '.pdf')
                contentType = 'application/pdf';
            else if (['.jpg', '.jpeg'].includes(ext))
                contentType = 'image/jpeg';
            else if (ext === '.png')
                contentType = 'image/png';
            else if (ext === '.doc')
                contentType = 'application/msword';
            else if (ext === '.docx')
                contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            res.set({
                'Content-Type': contentType,
                'Content-Length': stat.size,
                'Cache-Control': 'public, max-age=31536000',
            });
            const readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
            return readStream;
        }
        catch (error) {
            console.error('Error serving file:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to serve file');
        }
    }
    async getCategories() {
        try {
            const categories = await prisma.resource.findMany({
                select: { category: true },
                distinct: ['category'],
                orderBy: { category: 'asc' }
            });
            return {
                success: true,
                data: categories.map((c) => c.category)
            };
        }
        catch (error) {
            console.error('Error fetching categories:', error);
            throw new common_1.BadRequestException('Failed to fetch categories');
        }
    }
};
exports.ResourceService = ResourceService;
exports.ResourceService = ResourceService = __decorate([
    (0, common_1.Injectable)()
], ResourceService);
//# sourceMappingURL=resource.service.js.map