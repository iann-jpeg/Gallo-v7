// API configuration and service for connecting to the backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : 'http://localhost:3001/api';

// Generic API client
class ApiClient {
  private baseURL: string;
  private token: string | null = null;
  private tokenKey: string;

  constructor(baseURL: string, tokenKey: string = 'auth_token') {
    this.baseURL = baseURL;
    this.tokenKey = tokenKey;
    // Get token from localStorage if available
    this.token = localStorage.getItem(tokenKey);
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem(this.tokenKey);
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  public getAuthHeaders() {
    const headers: Record<string, string> = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Access token required' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async get(endpoint: string) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async post(endpoint: string, data: any) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async put(endpoint: string, data: any) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async delete(endpoint: string) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async uploadFile(endpoint: string, formData: FormData) {
    const headers: Record<string, string> = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });
    return this.handleResponse(response);
  }
}

// Create API instance
export const api = new ApiClient(API_BASE_URL);

// Create Admin API instance with admin token
export const adminApi = new ApiClient(API_BASE_URL, 'admin_token');

// API service functions
export const authService = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (data: { email: string; password: string; fullName: string }) =>
    api.post('/auth/register', data),
  
  logout: () => api.post('/auth/logout', {}),
  
  getProfile: () => api.get('/auth/profile'),
};

export const claimsService = {
  createClaim: (formData: FormData) =>
    api.uploadFile('/claims', formData),
  
  getClaims: () => api.get('/claims'),
  
  getClaim: (id: string) => api.get(`/claims/${id}`),
  
  updateClaimStatus: (id: string, status: string) =>
    api.put(`/claims/${id}/status`, { status }),
};

export const consultationsService = {
  createConsultation: (data: any) =>
    api.post('/consultations', data),
  
  getConsultations: () => api.get('/consultations'),
  
  getConsultation: (id: string) => api.get(`/consultations/${id}`),
  
  updateConsultationStatus: (id: string, status: string) =>
    api.put(`/consultations/${id}/status`, { status }),
};

export const diasporaService = {
  createDiasporaRequest: (data: any) =>
    api.post('/diaspora', data),
  
  getDiasporaRequests: () => api.get('/diaspora'),
};

export const outsourcingService = {
  createOutsourcingRequest: (data: any) =>
    api.post('/outsourcing', data),
  
  getOutsourcingRequests: () => api.get('/outsourcing'),
};

export const paymentsService = {
  // M-PESA Integration
  initiateSTK: (data: { phone: string; amount: number; description: string }) =>
    api.post('/payments/mpesa/stk', data),
  
  checkPaymentStatus: (checkoutRequestId: string) =>
    api.get(`/payments/mpesa/status/${checkoutRequestId}`),
  
  // General payment functions
  createPayment: (data: any) =>
    api.post('/payments', data),
  
  processPayment: (id: string, data: any) =>
    api.post(`/payments/process/${id}`, data),
  
  getPaymentStatus: (id: string) => api.get(`/payments/${id}/status`),
  
  // Consultation payments
  payForConsultation: (data: { 
    name: string; 
    phone: string; 
    amount: number; 
    consultationType: string; 
    consultationDate: string; 
    consultationTime: string; 
  }) => api.post('/payments/consultation', data),
};

export const quotesService = {
  createQuote: (data: any) => {
    if (data instanceof FormData) {
      return api.uploadFile('/quotes', data);
    }
    return api.post('/quotes', data);
  },
  
  getQuotes: () => api.get('/quotes'),
  
  getQuote: (id: string) => api.get(`/quotes/${id}`),
  
  updateQuoteStatus: (id: string, status: string) =>
    api.put(`/quotes/${id}/status`, { status }),
};

export const resourcesService = {
  getResources: () => api.get('/resources/public'),
  
  downloadResource: (id: string) => api.get(`/resources/download/${id}`),
  
  uploadResource: (formData: FormData) => api.uploadFile('/resources', formData),
};

export const dashboardService = {
  getStats: () => adminApi.get('/admin/dashboard/comprehensive'),
  
  getActivities: () => adminApi.get('/admin/activities'),
  
  getTopStats: () => adminApi.get('/admin/dashboard/comprehensive'),
};

// Admin-specific endpoints
export const adminService = {
  // Dashboard & System
  getSystemHealth: () => adminApi.get('/admin/health'),
  getSystemMetrics: () => adminApi.get('/admin/metrics'),
  getRecentActivities: (limit?: number) => 
    adminApi.get(`/admin/activities${limit ? `?limit=${limit}` : ''}`),
  
  // User Management
  getAllUsers: (page?: number, limit?: number) => 
    adminApi.get(`/admin/users?${new URLSearchParams({ 
      page: page?.toString() || '1', 
      limit: limit?.toString() || '50' 
    }).toString()}`),
  getUserStats: () => adminApi.get('/admin/users/stats'),
  updateUserStatus: (id: number, status: string) => 
    adminApi.put(`/admin/users/${id}/status`, { status }),
  
  // Claims Management
  getAllClaims: (page?: number, limit?: number, status?: string, search?: string) => {
    const params = new URLSearchParams({
      page: page?.toString() || '1',
      limit: limit?.toString() || '50'
    });
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    return adminApi.get(`/admin/claims?${params.toString()}`);
  },
  getClaimById: (id: number) => adminApi.get(`/admin/claims/${id}`),
  getClaimsStats: () => adminApi.get('/admin/claims/stats'),
  updateClaimStatus: (id: number, status: string) => 
    adminApi.put(`/admin/claims/${id}/status`, { status }),
  
  // Consultations Management
  getAllConsultations: (page?: number, limit?: number, status?: string, search?: string) => {
    const params = new URLSearchParams({
      page: page?.toString() || '1',
      limit: limit?.toString() || '50'
    });
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    return adminApi.get(`/admin/consultations?${params.toString()}`);
  },
  getConsultationById: (id: number) => adminApi.get(`/admin/consultations/${id}`),
  updateConsultationStatus: (id: number, status: string) => 
    adminApi.put(`/admin/consultations/${id}/status`, { status }),
  scheduleMeeting: (id: number, meetingData: {
    meetingDate: string;
    meetingTime: string;
    meetingType: string;
    meetingLink?: string;
    duration: string;
    notes?: string;
  }) => adminApi.post(`/admin/consultations/${id}/schedule-meeting`, meetingData),
  
  // Documents Management
  downloadDocument: async (id: number, filename: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/documents/${id}/download`, {
        method: 'GET',
        headers: adminApi.getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      return { success: true, message: 'Download started' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Download failed' };
    }
  },
  
  // Quotes Management
  getAllQuotes: (page?: number, limit?: number, status?: string, search?: string) => {
    const params = new URLSearchParams({
      page: page?.toString() || '1',
      limit: limit?.toString() || '50'
    });
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    return adminApi.get(`/admin/quotes?${params.toString()}`);
  },
  getQuoteById: (id: number) => adminApi.get(`/admin/quotes/${id}`),
  updateQuoteStatus: (id: number, status: string) => 
    adminApi.put(`/admin/quotes/${id}/status`, { status }),
  deleteQuote: (id: number) => adminApi.delete(`/admin/quotes/${id}`),
  exportQuotes: (format: 'csv' | 'json') => adminApi.get(`/admin/quotes/export/${format}`),

  // Diaspora Management
  getAllDiasporaRequests: (page?: number, limit?: number, status?: string, search?: string) => {
    const params = new URLSearchParams({
      page: page?.toString() || '1',
      limit: limit?.toString() || '50'
    });
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    return adminApi.get(`/admin/diaspora?${params.toString()}`);
  },
  getDiasporaRequestById: (id: number) => adminApi.get(`/admin/diaspora/${id}`),
  updateDiasporaRequestStatus: (id: number, status: string) => 
    adminApi.put(`/admin/diaspora/${id}/status`, { status }),
  
  // Notifications
  getNotifications: () => adminApi.get('/admin/notifications'),
  createNotification: (data: any) => adminApi.post('/admin/notifications', data),
  markNotificationAsRead: (id: number) => adminApi.put(`/admin/notifications/${id}/read`, {}),
  deleteNotification: (id: number) => adminApi.delete(`/admin/notifications/${id}`),
  
  // Settings
  getSettings: () => api.get('/admin/settings'),
  updateSettings: (settings: any) => adminApi.put('/admin/settings', settings),
  
  // Content Stats
  getContentStats: () => adminApi.get('/admin/content/stats'),
  
  // Reports
  generateReport: (type: string, from?: string, to?: string) => {
    const params = new URLSearchParams({ type });
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    return adminApi.get(`/admin/reports?${params.toString()}`);
  },
  
  // Data Export
  exportData: (dataType: string, format?: string, limit?: number, offset?: number) => {
    const params = new URLSearchParams();
    if (format) params.append('format', format);
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    return adminApi.get(`/admin/export/${dataType}?${params.toString()}`);
  },
  
  // Dashboard Compatibility
  getDashboardStats: () => adminApi.get('/admin/dashboard/comprehensive'),
  getDashboardActivities: () => adminApi.get('/admin/dashboard/activities'),
  getTopStats: () => adminApi.get('/admin/dashboard/comprehensive'),
  getComprehensiveStats: () => adminApi.get('/admin/dashboard/comprehensive'),
  
  // Analytics & Payments (Added from enhanced service)
  getAnalytics: () => adminApi.get('/admin/analytics'),
  getAllPayments: (page?: number, limit?: number) => 
    adminApi.get(`/admin/payments?${new URLSearchParams({
      page: page?.toString() || '1',
      limit: limit?.toString() || '50'
    }).toString()}`),
  getPaymentStats: () => adminApi.get('/admin/payments/stats'),

  // Outsourcing Management
  getAllOutsourcingRequests: (page?: number, limit?: number, status?: string, search?: string) => {
    const params = new URLSearchParams({
      page: page?.toString() || '1',
      limit: limit?.toString() || '50'
    });
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    return adminApi.get(`/admin/outsourcing?${params.toString()}`);
  },
  getOutsourcingRequestById: (id: number) => adminApi.get(`/admin/outsourcing/${id}`),
  updateOutsourcingStatus: (id: number, status: string, notes?: string) => 
    adminApi.put(`/admin/outsourcing/${id}/status`, { status, notes }),
  updateOutsourcingRequestStatus: (id: number, status: string, notes?: string) => 
    adminApi.put(`/admin/outsourcing/${id}/status`, { status, notes }),
  deleteOutsourcingRequest: (id: number) => adminApi.delete(`/admin/outsourcing/${id}`),
  exportOutsourcingData: (format: 'csv' | 'json') => 
    adminApi.get(`/admin/outsourcing/export?format=${format}`),
  getOutsourcingStats: () => adminApi.get('/admin/outsourcing/stats'),

  // System Settings
  getSystemSettings: () => adminApi.get('/admin/settings'),
  updateSystemSettings: (settings: any) => adminApi.put('/admin/settings', settings),
  testEmailSettings: (email?: string) => adminApi.post('/admin/settings/test-email', { email }),
  testNotifications: () => adminApi.post('/admin/settings/test-notifications', {}),

  // Backup & Maintenance
  createSystemBackup: () => adminApi.post('/admin/backup/create', {}),
  restoreSystemBackup: (backupId: string) => adminApi.post('/admin/backup/restore', { backupId }),
  listSystemBackups: () => adminApi.get('/admin/backup/list'),
  clearSystemCache: () => adminApi.post('/admin/system/clear-cache', {}),
  restartServices: () => adminApi.post('/admin/system/restart-services', {}),
  getSystemStatus: () => adminApi.get('/admin/system/status'),
  setMaintenanceMode: (enabled: boolean) => adminApi.put('/admin/system/maintenance', { enabled }),

  // WhatsApp Integration
  sendWhatsAppMeetingDetails: (consultationId: number, data: { message?: string; includeLink?: boolean }) =>
    adminApi.post(`/admin/consultations/${consultationId}/send-whatsapp-details`, data),

  // Missing methods for admin components
  getUsers: () => adminApi.get('/admin/users'),
  updateUser: (id: string, data: any) => adminApi.put(`/admin/users/${id}`, data),
  deleteUser: (id: string) => adminApi.delete(`/admin/users/${id}`),
  exportUsers: (format: 'csv' | 'json') => adminApi.get(`/admin/users/export?format=${format}`),

  getPayments: () => adminApi.get('/admin/payments'),
  updatePaymentStatus: (id: string, status: string) => adminApi.put(`/admin/payments/${id}/status`, { status }),
  exportPayments: (format: 'csv' | 'json') => adminApi.get(`/admin/payments/export?format=${format}`),
  
  // For consistency with existing methods
  getOutsourcingRequests: () => adminApi.get('/admin/outsourcing'),
  updateOutsourcingRequest: (id: string, data: any) => adminApi.put(`/admin/outsourcing/${id}`, data),
};

export default api;
