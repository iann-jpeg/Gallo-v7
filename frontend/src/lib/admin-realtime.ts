import io from 'socket.io-client';

class AdminRealtimeService {
  private socket: ReturnType<typeof io> | null = null;
  private listeners: Map<string, Function[]> = new Map();

  connect() {
    if (this.socket?.connected) {
      return this.socket;
    }

    const serverUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:3001';
    
    this.socket = io(serverUrl, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to admin real-time service');
      this.socket?.emit('request-dashboard-data');
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from admin real-time service');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    // Set up data listeners
    this.setupDataListeners();

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  private setupDataListeners() {
    if (!this.socket) return;

    // Dashboard updates
    this.socket.on('dashboard-data', (data) => {
      this.notifyListeners('dashboard-data', data);
    });

    this.socket.on('dashboard-update', (data) => {
      this.notifyListeners('dashboard-update', data);
    });

    // Claims updates
    this.socket.on('claims-data', (data) => {
      this.notifyListeners('claims-data', data);
    });

    this.socket.on('claim-update', (data) => {
      this.notifyListeners('claim-update', data);
    });

    // Consultations updates
    this.socket.on('consultations-data', (data) => {
      this.notifyListeners('consultations-data', data);
    });

    this.socket.on('consultation-update', (data) => {
      this.notifyListeners('consultation-update', data);
    });

    // Users updates
    this.socket.on('users-data', (data) => {
      this.notifyListeners('users-data', data);
    });

    // Payments updates
    this.socket.on('payments-data', (data) => {
      this.notifyListeners('payments-data', data);
    });

    this.socket.on('payment-update', (data) => {
      this.notifyListeners('payment-update', data);
    });

    // Mock data warnings
    this.socket.on('mock-data-warning', (data) => {
      this.notifyListeners('mock-data-warning', data);
    });

    // Recent activity
    this.socket.on('recent-activity', (data) => {
      this.notifyListeners('recent-activity', data);
    });

    // General data changes
    this.socket.on('data-change', (data) => {
      this.notifyListeners('data-change', data);
    });
  }

  subscribe(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  unsubscribe(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(callback);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  private notifyListeners(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => callback(data));
    }
  }

  // Request specific data
  requestDashboardData() {
    this.socket?.emit('request-dashboard-data');
  }

  requestClaimsData() {
    this.socket?.emit('request-claims-data');
  }

  requestConsultationsData() {
    this.socket?.emit('request-consultations-data');
  }

  requestUsersData() {
    this.socket?.emit('request-users-data');
  }

  requestPaymentsData() {
    this.socket?.emit('request-payments-data');
  }
}

export const adminRealtimeService = new AdminRealtimeService();
