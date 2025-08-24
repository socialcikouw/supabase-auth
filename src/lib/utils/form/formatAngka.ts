/**
 * Fungsi untuk memformat angka dengan pemisah ribuan
 * @param angka - Angka yang akan diformat
 * @param includeCurrency - Apakah akan menambahkan prefix "Rp "
 * @returns String angka yang sudah diformat dengan pemisah ribuan
 */
export const formatAngka = (
  angka: number | string,
  includeCurrency: boolean = false
): string => {
  // Konversi ke number jika input berupa string
  const num = typeof angka === "string" ? parseFloat(angka) : angka;

  // Cek apakah angka valid
  if (isNaN(num)) {
    return includeCurrency ? "Rp 0" : "0";
  }

  // Format angka dengan pemisah ribuan
  const formatted = num.toLocaleString("id-ID");

  // Tambahkan prefix mata uang jika diminta
  return includeCurrency ? `Rp ${formatted}` : formatted;
};

/**
 * Fungsi untuk memformat angka dengan pemisah ribuan dan desimal
 * @param angka - Angka yang akan diformat
 * @param decimalPlaces - Jumlah digit desimal (default: 0)
 * @param includeCurrency - Apakah akan menambahkan prefix "Rp "
 * @returns String angka yang sudah diformat dengan pemisah ribuan dan desimal
 */
export const formatAngkaDesimal = (
  angka: number | string,
  decimalPlaces: number = 0,
  includeCurrency: boolean = false
): string => {
  // Konversi ke number jika input berupa string
  const num = typeof angka === "string" ? parseFloat(angka) : angka;

  // Cek apakah angka valid
  if (isNaN(num)) {
    return includeCurrency ? "Rp 0" : "0";
  }

  // Format angka dengan pemisah ribuan dan desimal
  const formatted = num.toLocaleString("id-ID", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  // Tambahkan prefix mata uang jika diminta
  return includeCurrency ? `Rp ${formatted}` : formatted;
};

/**
 * Fungsi untuk memformat angka ke format mata uang Indonesia
 * @param angka - Angka yang akan diformat
 * @returns String angka dalam format mata uang Indonesia
 */
export const formatMataUang = (angka: number | string): string => {
  return formatAngka(angka, true);
};

/**
 * Fungsi untuk memformat angka ke format mata uang Indonesia dengan desimal
 * @param angka - Angka yang akan diformat
 * @param decimalPlaces - Jumlah digit desimal (default: 0)
 * @returns String angka dalam format mata uang Indonesia dengan desimal
 */
export const formatMataUangDesimal = (
  angka: number | string,
  decimalPlaces: number = 0
): string => {
  return formatAngkaDesimal(angka, decimalPlaces, true);
};

/**
 * Fungsi untuk memformat input angka dengan pemisah ribuan secara real-time
 * @param text - Text input dari user
 * @returns String angka yang sudah diformat dengan pemisah ribuan
 */
export const formatInputAngka = (text: string): string => {
  // Hapus semua karakter non-digit
  const cleaned = text.replace(/[^\d]/g, "");

  // Jika kosong, return string kosong
  if (cleaned === "") return "";

  // Konversi ke number dan format
  const number = parseInt(cleaned, 10);
  return number.toLocaleString("id-ID");
};

/**
 * Fungsi untuk mendapatkan nilai numerik dari input yang sudah diformat
 * @param formattedText - Text yang sudah diformat dengan pemisah ribuan
 * @returns Number dari text yang sudah dibersihkan
 */
export const getNumericValue = (formattedText: string): number => {
  const cleaned = formattedText.replace(/[^\d]/g, "");
  return parseInt(cleaned, 10) || 0;
};
