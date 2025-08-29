import { DashboardStats } from '../../types/api.types';
export declare class DashboardService {
    getStats(): Promise<DashboardStats>;
    getActivities(): Promise<any[]>;
}
