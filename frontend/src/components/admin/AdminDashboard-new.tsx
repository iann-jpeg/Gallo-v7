import { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
// import { Input } from "@/components/ui/input";
// Update the import path to the correct relative location, for example:
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// If your Select component is elsewhere, adjust the path accordingly.
import { Switch } from "../ui/switch";
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Activity,
  Download,
  RefreshCw,
  FileText,
  Clock,
  AlertTriangle,
  BarChart3,
  PieChart,
  Target,
  Zap,
  Shield,
  Globe,
  Database,
  Server,
  Wifi,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Eye,
  Settings,
  Plus,
  Bell,
  Calendar,
  Filter
} from "lucide-react";
// Import services from the api module
import api from "../../lib/api";
import { useToast } from "../../hooks/use-toast";
import { toast } from "sonner";

interface DashboardStats {
  totalUsers: number;
  totalClaims: number;
  totalConsultations: number;
  totalPayments: number;
  totalQuotes: number;
  totalOutsourcingRequests: number;
  totalDiasporaRequests: number;
  totalRevenue: number;
  monthlyRevenue: number;
  conversionRate: number;
  userGrowthRate: number;
  claimsGrowthRate: number;
  quoteGrowthRate: number;
  revenueGrowthRate: number;
  lastUpdated: string;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  entity_type: string;
  created_at: string;
  metadata?: any;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalClaims: 0,
    totalConsultations: 0,
    totalPayments: 0,
    totalQuotes: 0,
    totalOutsourcingRequests: 0,
    totalDiasporaRequests: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    conversionRate: 0,
    userGrowthRate: 0,
    claimsGrowthRate: 0,
    quoteGrowthRate: 0,
    revenueGrowthRate: 0,
    lastUpdated: new Date().toISOString()
  });
  
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);
  
  const realtimeChannels = useRef<any[]>([]);
  const refreshTimer = useRef<NodeJS.Timeout>();
  const { toast: toastHook } = useToast();

  const fetchDashboardData = useCallback(async (showToast = true) => {
    setLoading(true);
    setConnectionStatus('connecting');
    
    try {
      const [metricsRes, activitiesRes] = await Promise.all([
        api.adminService.getSystemMetrics(),
        api.dashboardService.getActivities()
      ]);

      if (metricsRes.success) {
        setStats(metricsRes.data);
        setConnectionStatus('connected');
      } else {
        throw new Error(metricsRes.error || 'Failed to fetch metrics');
      }

      if (activitiesRes.success) {
        setRecentActivity(activitiesRes.data || []);
      }

      setLastUpdated(new Date());
      
      if (showToast) {
        toastHook({
          title: "Dashboard Updated",
          description: `Data refreshed at ${new Date().toLocaleTimeString()}`,
        });
      }
    } catch (error: any) {
      console.error('Dashboard fetch error:', error);
      setConnectionStatus('disconnected');
      toastHook({
        title: "Connection Error",
        description: error.message || "Failed to fetch dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toastHook]);

  const handleRealTimeUpdate = useCallback((payload: any) => {
    console.log('Real-time update received:', payload);
    
    // Show notification for real-time updates with setTimeout to avoid render issues
    setTimeout(() => {
      const updateType = payload.eventType || 'UPDATE';
      const table = payload.table || 'Unknown';
      
      toast.info(`Real-time update: ${updateType} in ${table}`, {
        duration: 3000,
      });
    }, 0);

    // Refresh data when real-time update occurs
    fetchDashboardData(false);
  }, [fetchDashboardData]);

  const setupRealTimeSubscriptions = useCallback(() => {
    if (!realtimeEnabled) return;

    try {
      realtimeChannels.current = api.adminService.subscribeToRealTimeUpdates(handleRealTimeUpdate);
      console.log('Real-time subscriptions established');
      
      toastHook({
        title: "Real-time Connected",
        description: "Dashboard will update automatically",
      });
    } catch (error) {
      console.error('Real-time setup error:', error);
      toastHook({
        title: "Real-time Error", 
        description: "Failed to setup real-time updates",
        variant: "destructive"
      });
    }
  }, [realtimeEnabled, handleRealTimeUpdate, toastHook]);

  const setupAutoRefresh = useCallback(() => {
    if (!autoRefresh) return;

    refreshTimer.current = setInterval(() => {
      fetchDashboardData(false);
    }, refreshInterval * 1000);
  }, [autoRefresh, refreshInterval, fetchDashboardData]);

  // Initialize dashboard
  useEffect(() => {
    fetchDashboardData(true);
    
    if (realtimeEnabled) {
      setupRealTimeSubscriptions();
    }
    
    if (autoRefresh) {
      setupAutoRefresh();
    }

    return () => {
      // Cleanup
      if (realtimeChannels.current.length > 0) {
        api.adminService.unsubscribeFromRealTimeUpdates(realtimeChannels.current);
      }
      if (refreshTimer.current) {
        clearInterval(refreshTimer.current);
      }
    };
  }, []);

  // Handle auto-refresh toggle
  useEffect(() => {
    if (refreshTimer.current) {
      clearInterval(refreshTimer.current);
    }
    
    if (autoRefresh) {
      setupAutoRefresh();
    }
  }, [autoRefresh, refreshInterval, setupAutoRefresh]);

  // Handle real-time toggle
  useEffect(() => {
    if (realtimeEnabled) {
      setupRealTimeSubscriptions();
    } else {
      if (realtimeChannels.current.length > 0) {
        api.adminService.unsubscribeFromRealTimeUpdates(realtimeChannels.current);
        realtimeChannels.current = [];
      }
    }
  }, [realtimeEnabled, setupRealTimeSubscriptions]);

  const exportDashboardData = async () => {
    try {
      const result = await api.adminService.exportData('activities', {
        dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      });

      if (result.success) {
        // Create CSV content
        const csvContent = [
          ['Type', 'Description', 'Entity Type', 'Created At'],
          ...(result.data || []).map((activity: any) => [
            activity.type,
            activity.description,
            activity.entity_type,
            new Date(activity.created_at).toLocaleString()
          ])
        ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        toastHook({
          title: "Export Complete",
          description: "Dashboard data exported successfully",
        });
      }
    } catch (error) {
      toastHook({
        title: "Export Failed",
        description: "Could not export dashboard data",
        variant: "destructive",
      });
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time overview of your platform • Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            {connectionStatus === 'connected' ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : connectionStatus === 'connecting' ? (
              <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span className="text-sm capitalize">{connectionStatus}</span>
          </div>

          {/* Real-time Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              checked={realtimeEnabled}
              onCheckedChange={setRealtimeEnabled}
            />
            <span className="text-sm">Real-time</span>
          </div>

          {/* Auto-refresh Toggle */}
          <div className="flex items-center space-x-2">
            <Switch
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <span className="text-sm">Auto-refresh</span>
          </div>

          {/* Refresh Interval */}
          <Select 
            value={refreshInterval.toString()} 
            onValueChange={(value) => setRefreshInterval(Number(value))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15s</SelectItem>
              <SelectItem value="30">30s</SelectItem>
              <SelectItem value="60">1m</SelectItem>
              <SelectItem value="300">5m</SelectItem>
            </SelectContent>
          </Select>

          {/* Action Buttons */}
          <Button onClick={() => fetchDashboardData(true)} size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button onClick={exportDashboardData} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats.totalUsers)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              +{stats.userGrowthRate.toFixed(1)}% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats.totalClaims)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              +{stats.claimsGrowthRate.toFixed(1)}% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              +{stats.revenueGrowthRate.toFixed(1)}% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              Quotes to Claims ratio
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Consultations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.totalConsultations}</div>
            <p className="text-sm text-muted-foreground">Active consultation bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Diaspora Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.totalDiasporaRequests}</div>
            <p className="text-sm text-muted-foreground">International service requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              Outsourcing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{stats.totalOutsourcingRequests}</div>
            <p className="text-sm text-muted-foreground">Outsourcing project requests</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.slice(0, 10).map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-sm">{activity.type}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xs">
                    {activity.entity_type}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(activity.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No recent activity found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
