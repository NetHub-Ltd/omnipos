export interface Business {
  name: string;
  id: string;
  tenant_id: string;
  active: boolean;
  created_at: string;
}

export interface BusinessResponse {
  status: boolean;
  data: Business[];
}

export interface BusinessRequest {
  name: string;
}