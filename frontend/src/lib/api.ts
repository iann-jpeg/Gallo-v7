// API base URL for Laravel backend
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


