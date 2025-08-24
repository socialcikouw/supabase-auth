export interface DropLama {
  id?: string;
  user_id?: string;
  nama: string;
  alamat: string;
  angsuran: number;
  tabungan: number;
  sisa_saldo: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DropLamaFormData {
  nama: string;
  alamat: string;
  sisaSaldo: string;
  angsuran: string;
  tabungan: string;
}

export interface ServiceResponse<T = any> {
  success: boolean;
  error?: string;
  data?: T;
}
