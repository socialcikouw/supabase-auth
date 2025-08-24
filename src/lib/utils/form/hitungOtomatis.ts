/**
 * Interface untuk hasil perhitungan otomatis
 */
export interface HasilPerhitungan {
  angsuran: number;
  tabungan: number;
  premi: number;
  saldo_pinjaman: number;
}

/**
 * Fungsi untuk menghitung otomatis berdasarkan besar pinjaman
 * @param pinjaman - Besar pinjaman dalam string (sudah diformat)
 * @param getNumericValue - Fungsi untuk mendapatkan nilai numerik dari string yang diformat
 * @returns Object berisi hasil perhitungan
 */
export const hitungOtomatis = (
  pinjaman: string,
  getNumericValue: (formattedText: string) => number
): HasilPerhitungan => {
  const pinjamanNumber = getNumericValue(pinjaman);

  return {
    angsuran: pinjamanNumber * 0.05, // 5% dari pinjaman
    tabungan: pinjamanNumber * 0.05, // 5% dari pinjaman
    premi: pinjamanNumber * 0.05, // 5% dari pinjaman
    saldo_pinjaman: pinjamanNumber * 1.2, // 120% dari pinjaman
  };
};

/**
 * Fungsi untuk menghitung otomatis dengan parameter kustom
 * @param pinjaman - Besar pinjaman dalam string (sudah diformat)
 * @param getNumericValue - Fungsi untuk mendapatkan nilai numerik dari string yang diformat
 * @param persentaseAngsuran - Persentase angsuran (default: 0.05 = 5%)
 * @param persentaseTabungan - Persentase tabungan (default: 0.05 = 5%)
 * @param persentasePremi - Persentase premi (default: 0.05 = 5%)
 * @param persentaseSaldo - Persentase saldo pinjaman (default: 1.2 = 120%)
 * @returns Object berisi hasil perhitungan
 */
export const hitungOtomatisKustom = (
  pinjaman: string,
  getNumericValue: (formattedText: string) => number,
  persentaseAngsuran: number = 0.05,
  persentaseTabungan: number = 0.05,
  persentasePremi: number = 0.05,
  persentaseSaldo: number = 1.2
): HasilPerhitungan => {
  const pinjamanNumber = getNumericValue(pinjaman);

  return {
    angsuran: pinjamanNumber * persentaseAngsuran,
    tabungan: pinjamanNumber * persentaseTabungan,
    premi: pinjamanNumber * persentasePremi,
    saldo_pinjaman: pinjamanNumber * persentaseSaldo,
  };
};
