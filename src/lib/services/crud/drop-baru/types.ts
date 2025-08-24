export interface DropBaru {
  id?: string;
  user_id?: string;
  nama: string;
  alamat: string;
  besar_pinjaman: number;
  angsuran: number;
  tabungan: number;
  premi: number;
  saldo_pinjaman: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DropBaruFormData {
  nama: string;
  alamat: string;
  besarPinjaman: string;
}

export interface PerhitunganData {
  angsuran: number;
  tabungan: number;
  premi: number;
  saldoPinjaman: number;
}

export interface ServiceResponse<T = any> {
  success: boolean;
  error?: string;
  data?: T;
}
