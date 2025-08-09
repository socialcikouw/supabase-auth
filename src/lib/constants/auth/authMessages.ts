export const AUTH_MESSAGES = {
  // Error Messages
  ERROR: {
    FIELDS_REQUIRED: "Semua field harus diisi",
    EMAIL_PASSWORD_REQUIRED: "Email dan password harus diisi",
    PASSWORD_MISMATCH: "Password dan konfirmasi password tidak sama",
    PASSWORD_TOO_SHORT: "Password minimal 6 karakter",
    LOGIN_FAILED: "Login Gagal",
    REGISTER_FAILED: "Registrasi Gagal",
    GENERIC_ERROR: "Terjadi kesalahan, coba lagi",
    AUTHENTICATION_EXPIRED: "Sesi login telah berakhir. Silakan login kembali.",
  },

  // Success Messages
  SUCCESS: {
    REGISTER_SUCCESS: "Registrasi Berhasil",
    REGISTER_CHECK_EMAIL: "Silakan cek email Anda untuk verifikasi akun",
  },

  // UI Text
  UI: {
    LOGIN_TITLE: "Login",
    LOGIN_SUBTITLE: "Masuk ke akun Anda",
    REGISTER_TITLE: "Daftar",
    REGISTER_SUBTITLE: "Buat akun baru",
    EMAIL_LABEL: "Email",
    USERNAME_LABEL: "Nama Pengguna",
    USERNAME_PLACEHOLDER: "Huruf kecil semua tanpa spasi",
    PASSWORD_LABEL: "Password",
    CONFIRM_PASSWORD_LABEL: "Konfirmasi Password",
    EMAIL_PLACEHOLDER: "Contoh: naelsaruksuk@gmail.com",
    PASSWORD_PLACEHOLDER: "Masukkan password Anda",
    PASSWORD_HINT_PLACEHOLDER: "Password (min. 6 karakter)",
    CONFIRM_PASSWORD_PLACEHOLDER: "Ulangi password Anda",
    LOGIN_BUTTON: "Login",
    REGISTER_BUTTON: "Daftar",
    NO_ACCOUNT: "Belum punya akun? ",
    REGISTER_LINK: "Daftar disini",
    HAVE_ACCOUNT: "Sudah punya akun? ",
    LOGIN_LINK: "Login disini",
  },

  // Logout
  LOGOUT: {
    TITLE: "Keluar",
    MESSAGE: "Apakah Anda yakin ingin keluar?",
    CANCEL: "Batal",
    CONFIRM: "Keluar",
  },
} as const;
