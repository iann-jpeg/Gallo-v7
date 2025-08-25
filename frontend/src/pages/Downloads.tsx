import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Download,
  FileText,
  Search,
  Filter,
  CheckCircle
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface DownloadableFile {
  filename: string;
  displayName: string;
  description: string;
  category: string;
}

const Downloads = () => {
  const [files, setFiles] = useState<DownloadableFile[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<DownloadableFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [downloadingFiles, setDownloadingFiles] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadDownloadableFiles();
  }, []);

  useEffect(() => {
    filterFiles();
  }, [searchTerm, selectedCategory, files]);

  const loadDownloadableFiles = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'}/static/downloads`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to load downloadable files');
      }

      const data = await response.json();
      
      if (data.success) {
        setFiles(data.data);
        setFilteredFiles(data.data);
      } else {
        throw new Error(data.message || 'Failed to load files');
      }
    } catch (error) {
      console.error("Error loading downloadable files:", error);
      toast({
        title: "Error",
        description: "Failed to load downloadable files. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterFiles = () => {
    let filtered = files;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(file => 
        file.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(file => file.category === selectedCategory);
    }

    setFilteredFiles(filtered);
  };

  const handleDownload = async (filename: string, displayName: string) => {
    try {
      setDownloadingFiles(prev => [...prev, filename]);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'}/static/downloads/${filename}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      // Create a blob from the response
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Success",
        description: `${displayName} downloaded successfully!`,
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      toast({
        title: "Download Error",
        description: `Failed to download ${displayName}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setDownloadingFiles(prev => prev.filter(f => f !== filename));
    }
  };

  const getUniqueCategories = () => {
    const categories = [...new Set(files.map(file => file.category))];
    return ["All", ...categories.sort()];
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Motor Insurance': 'bg-blue-100 text-blue-800',
      'General Insurance': 'bg-green-100 text-green-800',
      'Commercial Insurance': 'bg-purple-100 text-purple-800',
      'Livestock Insurance': 'bg-yellow-100 text-yellow-800',
      'Medical Insurance': 'bg-red-100 text-red-800',
      'Personal Insurance': 'bg-pink-100 text-pink-800',
      'Liability Insurance': 'bg-orange-100 text-orange-800',
      'Workers Compensation': 'bg-indigo-100 text-indigo-800',
      'Documentation': 'bg-gray-100 text-gray-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading downloadable forms...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Insurance Forms & Documents</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Download the forms and documents you need for your insurance claims, applications, and policy management. 
              All forms are current and ready to use.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search forms by name, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Filter className="h-5 w-5 text-muted-foreground mt-2 mr-2" />
              {getUniqueCategories().map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                  {category !== "All" && (
                    <span className="ml-1 text-xs opacity-75">
                      ({files.filter(f => f.category === category).length})
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredFiles.length} of {files.length} forms
          </div>
        </div>

        {/* Files Grid */}
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No forms found</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedCategory !== "All" 
                ? "Try adjusting your search or filter criteria" 
                : "No forms available at the moment"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiles.map((file) => (
              <Card key={file.filename} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                    <Badge className={getCategoryColor(file.category)}>
                      {file.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {file.displayName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {file.description}
                  </p>
                  <Button
                    onClick={() => handleDownload(file.filename, file.displayName)}
                    disabled={downloadingFiles.includes(file.filename)}
                    className="w-full"
                    size="sm"
                  >
                    {downloadingFiles.includes(file.filename) ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Information Section */}
        <div className="mt-16 bg-muted rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Important Information</h2>
            <div className="text-left space-y-4">
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold mb-2">📋 Form Completion</h3>
                <p className="text-sm text-muted-foreground">
                  Please ensure all forms are completely filled out with accurate information. 
                  Incomplete forms may delay processing.
                </p>
              </div>
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold mb-2">📎 Required Documents</h3>
                <p className="text-sm text-muted-foreground">
                  Some forms may require additional supporting documents. Please refer to the 
                  documentation guide for complete requirements.
                </p>
              </div>
              <div className="bg-background p-4 rounded border">
                <h3 className="font-semibold mb-2">📧 Submission</h3>
                <p className="text-sm text-muted-foreground">
                  Completed forms can be submitted via email, our online portal, or delivered 
                  to any of our branch offices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Downloads;
