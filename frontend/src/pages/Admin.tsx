import { AdminQuotes } from "@/components/admin/AdminQuotes";
import { AdminDiaspora } from "@/components/admin/AdminDiaspora";
import { AdminOutsourcing } from "@/components/admin/AdminOutsourcing";
import { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminPayments } from "@/components/admin/AdminPayments";
import { AdminNotifications } from "@/components/admin/AdminNotifications";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { AdminClaims } from "@/components/admin/AdminClaims";
import { AdminConsultations } from "@/components/admin/AdminConsultations";
import { Toaster } from "sonner";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-access, no login required
  useEffect(() => {
    console.log("Admin dashboard loaded");
    
    // Set admin token for API calls
    localStorage.setItem('admin_token', 'admin-access-token');
    
    // Refresh the admin API client with the new token
    import('@/lib/api').then(({ adminApi }) => {
      adminApi.setToken('admin-access-token');
    });
  }, []);

  // Enhanced tab switching with smooth transitions
  const handleTabSwitch = (newTab: string) => {
    if (newTab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setIsTransitioning(false);
    }, 150);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "users":
        return <AdminUsers />;
      case "claims":
        return <AdminClaims />;
      case "consultations":
        return <AdminConsultations />;
      case "payments":
        return <AdminPayments />;
      case "notifications":
        return <AdminNotifications />;
      case "analytics":
        return <AdminAnalytics />;
      case "settings":
        return <AdminSettings />;
      case "quotes":
        return <AdminQuotes />;
      case "diaspora":
        return <AdminDiaspora />;
      case "outsourcing":
        return <AdminOutsourcing />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden">
      {/* Advanced Glass Morphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-indigo-600/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent pointer-events-none" />
      
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabSwitch}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <AdminTopbar 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {/* Main Content Area with Advanced Styling */}
        <main className={`
          flex-1 overflow-auto p-6 relative
          transition-all duration-300 ease-in-out
          ${isTransitioning ? 'opacity-60 scale-98' : 'opacity-100 scale-100'}
        `}>
          {/* Content Container with Glass Effect */}
          <div className="relative z-10 h-full">
            {renderContent()}
          </div>
          
          {/* Ambient Lighting Effects */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-indigo-400/10 rounded-full blur-2xl animate-pulse delay-500" />
        </main>
      </div>
      
      {/* Global Loading Overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Toast Notifications */}
      <Toaster 
        position="top-right" 
        richColors 
        closeButton 
        theme="light"
        className="z-[9999]"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
    </div>
  );
}
