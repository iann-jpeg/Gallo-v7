# 🌐 Frontend Environment Configuration for Aplin Hosting

## Update Frontend for Production

Your frontend needs to connect to your live backend at `api.galloways.co.ke` instead of localhost.

### 1. Create Production Environment File

Create `.env.production` in your frontend folder:

```env
# Production API Configuration
VITE_API_BASE_URL=https://api.galloways.co.ke

# Other production settings
VITE_APP_ENV=production
VITE_APP_NAME=Galloway Insurance
```

### 2. Update API Configuration

Check `src/lib/utils.ts` or wherever your API base URL is defined:

```typescript
// Should automatically use VITE_API_BASE_URL from environment
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
```

### 3. Build for Production

```bash
cd /home/crash/Desktop/npm/frontend
npm run build
```

### 4. Upload to Aplin

Upload the entire `dist/` folder contents to your main domain's public_html folder:

```
/public_html/
├── index.html (from dist/)
├── assets/ (from dist/assets/)
├── .htaccess (already uploaded)
└── ... (all other dist/ files)
```

---

## Quick Commands for You:

```bash
# 1. Navigate to frontend
cd /home/crash/Desktop/npm/frontend

# 2. Create production environment
echo "VITE_API_BASE_URL=https://api.galloways.co.ke" > .env.production

# 3. Build with production settings
npm run build

# 4. Your dist/ folder is now ready for Aplin upload!
```
