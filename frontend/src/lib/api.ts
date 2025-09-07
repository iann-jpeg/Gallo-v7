// API base URL for Laravel backend
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost/api';

// Helper for HTTP requests
async function request(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'API error');
  return data;
}

// Claims Service
export const claimsService = {
  createClaim: async (formData: any) => {
    const body = JSON.stringify(Object.fromEntries(formData.entries ? formData.entries() : Object.entries(formData)));
    return request('/claims', { method: 'POST', body });
  },
  getClaims: async () => request('/claims', { method: 'GET' }),
  getClaim: async (id: string) => request(`/claims/${id}`, { method: 'GET' }),
  updateClaimStatus: async (id: string, status: string) => request(`/claims/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

// Quotes Service
export const quotesService = {
  createQuote: async (formData: any) => {
    const body = JSON.stringify(Object.fromEntries(formData.entries ? formData.entries() : Object.entries(formData)));
    return request('/quotes', { method: 'POST', body });
  },
  getQuotes: async () => request('/quotes', { method: 'GET' }),
  getQuote: async (id: string) => request(`/quotes/${id}`, { method: 'GET' }),
};

// Payments Service
export const paymentsService = {
  createPayment: async (data: any) => request('/payments', { method: 'POST', body: JSON.stringify(data) }),
  verifyPayment: async (reference: string) => request(`/payments/verify/${reference}`, { method: 'GET' }),
  initiateSTKPush: async (data: any) => request('/payments/mpesa', { method: 'POST', body: JSON.stringify(data) }),
};

// Outsourcing Service
export const outsourcingService = {
  createOutsourcingRequest: async (data: any) => request('/outsourcing-requests', { method: 'POST', body: JSON.stringify(data) }),
  getOutsourcingRequests: async () => request('/outsourcing-requests', { method: 'GET' }),
};

// Diaspora Service
export const diasporaService = {
  createDiasporaRequest: async (data: any) => request('/diaspora-requests', { method: 'POST', body: JSON.stringify(data) }),
  getDiasporaRequests: async () => request('/diaspora-requests', { method: 'GET' }),
};

// Consultations Service
export const consultationsService = {
  createConsultation: async (data: any) => request('/consultations', { method: 'POST', body: JSON.stringify(data) }),
  getConsultations: async () => request('/consultations', { method: 'GET' }),
  getConsultation: async (id: string) => request(`/consultations/${id}`, { method: 'GET' }),
  updateConsultationStatus: async (id: string, status: string) => request(`/consultations/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

// Auth Service
export const authService = {
  login: async (data: { email: string; password: string }) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: async (data: { fullName: string; email: string; password: string }) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  logout: async () => request('/auth/logout', { method: 'POST' }),
  getProfile: async () => request('/auth/profile', { method: 'GET' }),
};

// Resources Service
export const resourcesService = {
  getResources: async () => request('/resources', { method: 'GET' }),
  downloadResource: async (id: string) => request(`/resources/${id}/download`, { method: 'GET' }),
  uploadResource: async (formData: FormData) => {
    const body = JSON.stringify(Object.fromEntries(formData.entries ? formData.entries() : Object.entries(formData)));
    return request('/resources', { method: 'POST', body });
  },
};

// Dashboard Service
export const dashboardService = {
  getStats: async () => request('/dashboard/stats', { method: 'GET' }),
  getActivities: async () => request('/dashboard/activities', { method: 'GET' }),
  getTopStats: async () => request('/dashboard/top-stats', { method: 'GET' }),
};

// Admin Service
export const adminService = {
  // System
  getSystemHealth: async () => request('/admin/health', { method: 'GET' }),
  getSystemMetrics: async () => request('/admin/metrics', { method: 'GET' }),
  getRecentActivities: async (limit = 50) => request(`/admin/activities?limit=${limit}`, { method: 'GET' }),
  
  // Users
  getAllUsers: async (page = 1, limit = 50) => request(`/admin/users?page=${page}&limit=${limit}`, { method: 'GET' }),
  getUserStats: async () => request('/admin/users/stats', { method: 'GET' }),
  updateUserStatus: async (id: number, status: string) => request(`/admin/users/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  
  // Claims
  getAllClaims: async (page = 1, limit = 50, status?: string, search?: string) => {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    return request(`/admin/claims?${params.toString()}`, { method: 'GET' });
  },
  getClaimById: async (id: number) => request(`/admin/claims/${id}`, { method: 'GET' }),
  getClaimsStats: async () => request('/admin/claims/stats', { method: 'GET' }),
  updateClaimStatus: async (id: number, status: string) => request(`/admin/claims/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  
  // Consultations
  getAllConsultations: async (page = 1, limit = 50, status?: string, search?: string) => {
    const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    if (status) params.append('status', status);
    if (search) params.append('search', search);
    return request(`/admin/consultations?${params.toString()}`, { method: 'GET' });
  },
  getConsultationById: async (id: number) => request(`/admin/consultations/${id}`, { method: 'GET' }),
  updateConsultationStatus: async (id: number, status: string) => request(`/admin/consultations/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  
  // Quotes
  getAllQuotes: async (page = 1, limit = 50) => request(`/admin/quotes?page=${page}&limit=${limit}`, { method: 'GET' }),
  getQuoteById: async (id: number) => request(`/admin/quotes/${id}`, { method: 'GET' }),
  updateQuoteStatus: async (id: number, status: string) => request(`/admin/quotes/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  
  // Diaspora
  getAllDiasporaRequests: async (page = 1, limit = 50) => request(`/admin/diaspora?page=${page}&limit=${limit}`, { method: 'GET' }),
  getDiasporaById: async (id: number) => request(`/admin/diaspora/${id}`, { method: 'GET' }),
  updateDiasporaStatus: async (id: number, status: string) => request(`/admin/diaspora/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  
  // Outsourcing
  getAllOutsourcingRequests: async (page = 1, limit = 50) => request(`/admin/outsourcing?page=${page}&limit=${limit}`, { method: 'GET' }),
  getOutsourcingById: async (id: number) => request(`/admin/outsourcing/${id}`, { method: 'GET' }),
  updateOutsourcingStatus: async (id: number, status: string) => request(`/admin/outsourcing/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  
  // Payments
  getAllPayments: async (page = 1, limit = 50) => request(`/admin/payments?page=${page}&limit=${limit}`, { method: 'GET' }),
  getPaymentStats: async () => request('/admin/payments/stats', { method: 'GET' }),
  
  // Documents
  downloadDocument: async (documentId: number, filename: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/documents/${documentId}/download`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to download document');
      }
      
      // Create blob from response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      return { success: true, message: 'Document downloaded successfully' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to download document' };
    }
  },
  
  // Export and Real-time
  exportData: async (type: string, options: any) => request('/admin/export', { method: 'POST', body: JSON.stringify({ type, ...options }) }),
  subscribeToRealTimeUpdates: (callback: (payload: any) => void) => {
    // Placeholder for real-time subscriptions
    console.log('Real-time subscriptions not implemented for Laravel backend');
    return [];
  },
  unsubscribeFromRealTimeUpdates: (channels: any[]) => {
    console.log('Unsubscribing from real-time updates');
  },
};

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    const response = await request('/health', { method: 'GET' });
    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Default API object
const api = {
  authService,
  claimsService,
  quotesService,
  paymentsService,
  outsourcingService,
  diasporaService,
  consultationsService,
  resourcesService,
  dashboardService,
  adminService,
  testSupabaseConnection,
};

export default api;


