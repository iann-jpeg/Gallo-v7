/// <reference types="vite/client" />
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost/api';

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
};



import supabase from './supabaseClient';

// Supabase-backed API layer for the frontend.
export const authService = {
  login: async () => ({ success: true }),
  register: async () => ({ success: true }),
  logout: async () => ({ success: true }),
  getProfile: async () => ({ success: true, data: null }),
};

export const resourcesService = {
  getResources: async () => ({ success: true, data: [] }),
  downloadResource: async (id: string) => ({ success: true, data: null }),
  uploadResource: async (formData: FormData) => ({ success: true, data: null }),
};

export const dashboardService = {
  getStats: async () => ({ success: true, data: null }),
  getActivities: async () => ({ success: true, data: [] }),
  getTopStats: async () => ({ success: true, data: null }),
};

export const adminService = {
  getSystemHealth: async () => ({ success: true, data: { status: 'ok', platform: 'supabase' } }),
  getSystemMetrics: async () => ({ success: true, data: null }),
  getRecentActivities: async (limit = 50) => ({ success: true, data: [] }),
};

export function testSupabaseConnection() {
  // Dummy test function
  return Promise.resolve({ success: true });
}

export default {
  authService,
  claimsService,
  resourcesService,
  quotesService,
  dashboardService,
  adminService,
  testSupabaseConnection,
};


