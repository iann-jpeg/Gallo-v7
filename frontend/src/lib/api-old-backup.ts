import supabase from './supabaseClient'

// Supabase-backed API layer for the frontend.
// The app is open: anon key is used for reads/writes.

export const authService = {
  login: async () => ({ success: true }),
  register: async () => ({ success: true }),
  logout: async () => ({ success: true }),
  getProfile: async () => ({ success: true, data: null }),
}

export const claimsService = {
  createClaim: async (formData: FormData) => {
    try {
      const file = formData.get('file') as File | null
      const values: any = {}
      formData.forEach((v, k) => { if (k !== 'file') values[k] = v })

      if (file) {
        const path = `claims/${Date.now()}_${file.name}`
        const { error: uploadError } = await supabase.storage.from('public').upload(path, file)
        import supabase from './supabaseClient'

        // Clean Supabase-only API module used by the frontend.

        export const authService = {
          login: async () => ({ success: true }),
          register: async () => ({ success: true }),
          logout: async () => ({ success: true }),
        }

        const insertWithFile = async (table: string, formData: FormData, folder: string) => {
          const file = formData.get('file') as File | null
          const payload: any = {}
          formData.forEach((v, k) => { if (k !== 'file') payload[k] = v })
          if (file) {
            const path = `${folder}/${Date.now()}_${file.name}`
            const { error } = await supabase.storage.from('public').upload(path, file)
            if (error) throw error
            payload.file_url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/public/${path}`
          }
          const { data, error } = await supabase.from(table).insert(payload).select('id')
          if (error) throw error
          return data
        }

        export const claimsService = {
          createClaim: async (formData: FormData) => {
            try { const data = await insertWithFile('claims', formData, 'claims'); return { success: true, data } } catch (e: any) { return { success: false, message: e.message } }
          },
          getClaims: async () => { try { const { data, error } = await supabase.from('claims').select('id, title, status, created_at, file_url').order('created_at', { ascending: false }); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
          getClaim: async (id: string) => { try { const { data, error } = await supabase.from('claims').select('*').eq('id', id).single(); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
        }

        export const consultationsService = {
          createConsultation: async (payload: any) => { try { const { data, error } = await supabase.from('consultations').insert(payload).select('id'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
          getConsultations: async () => { try { const { data, error } = await supabase.from('consultations').select('id, client_name, status, scheduled_at'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
          getConsultation: async (id: string) => { try { const { data, error } = await supabase.from('consultations').select('*').eq('id', id).single(); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
          updateConsultationStatus: async (id: string, status: string) => { try { const { data, error } = await supabase.from('consultations').update({ status }).eq('id', id).select('id'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } }
        }

        export const diasporaService = {
          createDiasporaRequest: async (payload: any) => { try { const { data, error } = await supabase.from('diaspora_requests').insert(payload).select('id'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
          getDiasporaRequests: async () => { try { const { data, error } = await supabase.from('diaspora_requests').select('id, full_name, email, status, created_at'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } }
        }

        export const outsourcingService = {
          createOutsourcingRequest: async (payload: any) => { try { const { data, error } = await supabase.from('outsourcing_requests').insert(payload).select('id'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
          getOutsourcingRequests: async () => { try { const { data, error } = await supabase.from('outsourcing_requests').select('id, client_name, status, created_at'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } }
        }

        export const paymentsService = {
          createPayment: async (payload: any) => { try { const { data, error } = await supabase.from('payments').insert(payload).select('id'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
          getPaymentStatus: async (id: string) => { try { const { data, error } = await supabase.from('payments').select('status,metadata').eq('id', id).single(); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } }
        }

        export const quotesService = {
          createQuote: async (payload: FormData | Record<string, any>) => {
            try { if (payload instanceof FormData) { const data = await insertWithFile('quotes', payload, 'quotes'); return { success: true, data } } const { data, error } = await supabase.from('quotes').insert(payload).select('id'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } }
          },
          getQuotes: async () => { try { const { data, error } = await supabase.from('quotes').select('id, client_name, status, created_at'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
          getQuote: async (id: string) => { try { const { data, error } = await supabase.from('quotes').select('*').eq('id', id).single(); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
          updateQuoteStatus: async (id: string, status: string) => { try { const { data, error } = await supabase.from('quotes').update({ status }).eq('id', id).select('id'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } }
        }

        export const resourcesService = {
          getResources: async () => { try { const { data, error } = await supabase.from('resources').select('id, display_name, description, file_url'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
          downloadResource: async (id: string) => { try { const { data, error } = await supabase.from('resources').select('file_url, display_name').eq('id', id).single(); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
          uploadResource: async (formData: FormData) => { try { const data = await insertWithFile('resources', formData, 'resources'); return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } }
        }

        export const dashboardService = {
          getStats: async () => { try { const { data, error } = await supabase.from('dashboard_stats').select('*').limit(1).single(); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
          getActivities: async () => { try { const { data, error } = await supabase.from('activities').select('*').order('created_at', { ascending: false }).limit(50); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
          getTopStats: async () => dashboardService.getStats()
        }

        export const adminService = {
          getSystemHealth: async () => ({ success: true, data: { status: 'ok', platform: 'supabase' } }),
          getSystemMetrics: async () => { try { const { data, error } = await supabase.from('metrics').select('*'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
          getRecentActivities: async (limit = 50) => { try { const { data, error } = await supabase.from('activities').select('*').order('created_at', { ascending: false }).limit(limit); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
        }

        export default {
          authService,
          claimsService,
          consultationsService,
          diasporaService,
          outsourcingService,
          paymentsService,
          quotesService,
          resourcesService,
          dashboardService,
          adminService,
        }
  // user management
  getAllUsers: async (page = 1, limit = 50) => { try { const from = (page - 1) * limit; const to = from + limit - 1; const { data, error, count } = await supabase.from('users').select('id, full_name, email, role, status', { count: 'exact' }).range(from, to); if (error) throw error; return { success: true, data, count } } catch (e: any) { return { success: false, message: e.message } } },
  updateUserStatus: async (id: number, status: string) => { try { const { data, error } = await supabase.from('users').update({ status }).eq('id', id).select('id'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },

  // other admin helpers
  getAllPayments: async (page = 1, limit = 50) => { try { const from = (page - 1) * limit; const to = from + limit - 1; const { data, error, count } = await supabase.from('payments').select('id, amount, status, metadata, created_at', { count: 'exact' }).order('created_at', { ascending: false }).range(from, to); if (error) throw error; return { success: true, data, count } } catch (e: any) { return { success: false, message: e.message } } },
  getPaymentStats: async () => { try { const { count, error } = await supabase.from('payments').select('id', { count: 'exact' }); if (error) throw error; return { success: true, data: { total: count } } } catch (e: any) { return { success: false, message: e.message } } },

  getDashboardStats: async () => { try { const { data, error } = await supabase.from('dashboard_stats').select('*').limit(1).single(); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
  getDashboardActivities: async (limit = 50) => adminService.getRecentActivities(limit),
  getTopStats: async () => adminService.getDashboardStats(),
}

export default {
  authService,
  claimsService,
  consultationsService,
  diasporaService,
  outsourcingService,
  paymentsService,
  quotesService,
  resourcesService,
  dashboardService,
  adminService,
}

      }

      const { data, error } = await supabase.from('claims').insert(values).select('id')
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to create claim' }
    }
  },

  getClaims: async () => {
    // Admin-specific endpoints implemented with Supabase
    export const adminService = {
      getSystemHealth: async () => ({ success: true, data: { status: 'ok', platform: 'supabase' } }),
      getSystemMetrics: async () => {
        try {
          const { data, error } = await supabase.from('metrics').select('*')
          if (error) throw error
          return { success: true, data }
        } catch (error: any) {
          return { success: false, message: error.message || 'Failed to fetch metrics' }
        }
      },
      getRecentActivities: async (limit = 50) => {
        try {
          const { data, error } = await supabase.from('activities').select('*').order('created_at', { ascending: false }).limit(limit)
          if (error) throw error
          return { success: true, data }
        } catch (error: any) {
          return { success: false, message: error.message || 'Failed to fetch activities' }
        }
      },

      // Users
      getAllUsers: async (page = 1, limit = 50) => {
        try {
          const from = (page - 1) * limit
          const to = from + limit - 1
          const { data, error, count } = await supabase.from('users').select('id, full_name, email, role, status', { count: 'exact' }).range(from, to)
          if (error) throw error
          return { success: true, data, count }
        } catch (error: any) {
          return { success: false, message: error.message || 'Failed to fetch users' }
        }
      },
      updateUserStatus: async (id: number, status: string) => {
        try {
          const { data, error } = await supabase.from('users').update({ status }).eq('id', id).select('id')
          if (error) throw error
          return { success: true, data }
        } catch (error: any) {
          return { success: false, message: error.message || 'Failed to update user' }
        }
      },
import supabase from './supabaseClient'

// Compact, clean Supabase-only API module.

export const authService = {
  login: async () => ({ success: true }),
  register: async () => ({ success: true }),
  logout: async () => ({ success: true }),
}

const insertWithFile = async (table: string, formData: FormData, folder: string) => {
  const file = formData.get('file') as File | null
  const payload: any = {}
  formData.forEach((v, k) => { if (k !== 'file') payload[k] = v })
  if (file) {
    const path = `${folder}/${Date.now()}_${file.name}`
    const { error } = await supabase.storage.from('public').upload(path, file)
    if (error) throw error
    payload.file_url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/public/${path}`
  }
  const { data, error } = await supabase.from(table).insert(payload).select('id')
  if (error) throw error
  return data
}

export const claimsService = {
  createClaim: async (formData: FormData) => {
    try { const data = await insertWithFile('claims', formData, 'claims'); return { success: true, data } } catch (e: any) { return { success: false, message: e.message } }
  },
  getClaims: async () => { try { const { data, error } = await supabase.from('claims').select('id, title, status, created_at, file_url').order('created_at', { ascending: false }); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
  getClaim: async (id: string) => { try { const { data, error } = await supabase.from('claims').select('*').eq('id', id).single(); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
}

export const resourcesService = {
  uploadResource: async (formData: FormData) => { try { const data = await insertWithFile('resources', formData, 'resources'); return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
  getResources: async () => { try { const { data, error } = await supabase.from('resources').select('id, display_name, description, file_url'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } }
}

export const quotesService = {
  createQuote: async (payload: FormData | Record<string, any>) => {
    try { if (payload instanceof FormData) { const data = await insertWithFile('quotes', payload, 'quotes'); return { success: true, data } } const { data, error } = await supabase.from('quotes').insert(payload).select('id'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } }
  },
  getQuotes: async () => { try { const { data, error } = await supabase.from('quotes').select('id, client_name, status, created_at'); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } }
}

export const adminService = {
  getSystemHealth: async () => ({ success: true, data: { status: 'ok', platform: 'supabase' } }),
  getRecentActivities: async (limit = 50) => { try { const { data, error } = await supabase.from('activities').select('*').order('created_at', { ascending: false }).limit(limit); if (error) throw error; return { success: true, data } } catch (e: any) { return { success: false, message: e.message } } },
}

export default {
  authService,
  claimsService,
  resourcesService,
  quotesService,
  adminService,
}

          if (error) throw error
          return { success: true, data }
        } catch (error: any) {
          return { success: false, message: error.message || 'Failed to delete notification' }
        }
      },

      // Payments
      getAllPayments: async (page = 1, limit = 50) => {
        try {
          const from = (page - 1) * limit
          const to = from + limit - 1
          const { data, error, count } = await supabase.from('payments').select('id, amount, status, metadata, created_at', { count: 'exact' }).order('created_at', { ascending: false }).range(from, to)
          if (error) throw error
          return { success: true, data, count }
        } catch (error: any) {
          return { success: false, message: error.message || 'Failed to fetch payments' }
        }
      },
      getPaymentStats: async () => {
        try {
          const { count, error } = await supabase.from('payments').select('id', { count: 'exact' })
          if (error) throw error
          return { success: true, data: { total: count } }
        } catch (error: any) {
          return { success: false, message: error.message || 'Failed to fetch payment stats' }
        }
      },

      // Dashboard helpers
      getDashboardStats: async () => {
        try {
          const { data, error } = await supabase.from('dashboard_stats').select('*').limit(1).single()
          if (error) throw error
          return { success: true, data }
        } catch (error: any) {
          return { success: false, message: error.message || 'Failed to fetch dashboard stats' }
        }
      },
      getDashboardActivities: async () => adminService.getRecentActivities(),
      getTopStats: async () => adminService.getDashboardStats(),

    }
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to fetch quote' }
    }
  },
  updateQuoteStatus: async (id: string, status: string) => {
    try {
      const { data, error } = await supabase.from('quotes').update({ status }).eq('id', id).select('id')
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to update quote' }
    }
  }
}

export const resourcesService = {
  getResources: async () => {
    try {
      const { data, error } = await supabase.from('resources').select('id, display_name, description, file_url')
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to fetch resources' }
    }
  },
  downloadResource: async (id: string) => {
    try {
      const { data, error } = await supabase.from('resources').select('file_url, display_name').eq('id', id).single()
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to download resource' }
    }
  },
  uploadResource: async (formData: FormData) => {
    try {
      const file = formData.get('file') as File | null
      const values: any = {}
      formData.forEach((v, k) => { if (k !== 'file') values[k] = v })
      if (!file) throw new Error('No file provided')
      const path = `resources/${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage.from('public').upload(path, file)
      if (uploadError) throw uploadError
      values.file_url = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/public/${path}`
      const { data, error } = await supabase.from('resources').insert(values).select('id')
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to upload resource' }
    }
  }
}

export const dashboardService = {
  getStats: async () => {
    try {
      const { data, error } = await supabase.from('dashboard_stats').select('*').limit(1).single()
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to fetch stats' }
    }
  },
  getActivities: async () => {
    try {
      const { data, error } = await supabase.from('activities').select('*').order('created_at', { ascending: false }).limit(50)
      if (error) throw error
      return { success: true, data }
    } catch (error: any) {
      return { success: false, message: error.message || 'Failed to fetch activities' }
    }
  },
  getTopStats: async () => dashboardService.getStats()
}

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
        export const adminService = {
          getSystemHealth: async () => ({ success: true, data: { status: 'ok', platform: 'supabase' } }),
          getSystemMetrics: async () => {
            try {
              const { data, error } = await supabase.from('metrics').select('*')
              if (error) throw error
              return { success: true, data }
            } catch (error: any) {
              return { success: false, message: error.message || 'Failed to fetch metrics' }
            }
          },
          getRecentActivities: async (limit = 50) => {
            try {
              const { data, error } = await supabase.from('activities').select('*').order('created_at', { ascending: false }).limit(limit)
              if (error) throw error
              return { success: true, data }
            } catch (error: any) {
              return { success: false, message: error.message || 'Failed to fetch activities' }
            }
          },
          // User management - open site: users stored in `users` table if needed
          getAllUsers: async () => {
            try {
              const { data, error } = await supabase.from('users').select('id, full_name, email, role')
              if (error) throw error
              return { success: true, data }
            } catch (error: any) {
              return { success: false, message: error.message || 'Failed to fetch users' }
            }
          },
          updateUserStatus: async (id: number, status: string) => {
            try {
              const { data, error } = await supabase.from('users').update({ status }).eq('id', id).select('id')
              if (error) throw error
              return { success: true, data }
            } catch (error: any) {
              return { success: false, message: error.message || 'Failed to update user' }
            }
          }
        }
  getAllPayments: (page?: number, limit?: number) => 
