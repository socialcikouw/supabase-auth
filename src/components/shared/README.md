# Shared Components

Koleksi komponen yang dapat digunakan kembali di seluruh aplikasi.

## EmptyState

Komponen untuk menampilkan state kosong dengan design yang konsisten.

### Props

| Prop            | Type         | Default                        | Description         |
| --------------- | ------------ | ------------------------------ | ------------------- |
| `title`         | `string`     | "Belum Ada Data"               | Judul utama         |
| `subtitle`      | `string`     | "Data belum tersedia saat ini" | Deskripsi           |
| `icon`          | `string`     | "📋"                           | Emoji icon          |
| `actionText`    | `string`     | `undefined`                    | Text tombol aksi    |
| `onActionPress` | `() => void` | `undefined`                    | Handler tombol aksi |

### Contoh Penggunaan

```tsx
<EmptyState
  title="Belum Ada Nasabah"
  subtitle="Tambahkan nasabah baru untuk memulai"
  icon="👥"
  actionText="Tambah Nasabah"
  onActionPress={() => navigate("AddNasabah")}
/>
```

## ErrorState

Komponen untuk menampilkan error state dengan opsi retry.

### Props

| Prop               | Type             | Default                                 | Description            |
| ------------------ | ---------------- | --------------------------------------- | ---------------------- |
| `title`            | `string`         | "Terjadi Kesalahan"                     | Judul error            |
| `subtitle`         | `string`         | "Gagal memuat data. Silakan coba lagi." | Deskripsi error        |
| `icon`             | `string`         | "❌"                                    | Emoji icon             |
| `error`            | `string \| null` | `undefined`                             | Detail error           |
| `retryText`        | `string`         | "Coba Lagi"                             | Text tombol retry      |
| `onRetry`          | `() => void`     | `undefined`                             | Handler tombol retry   |
| `showErrorDetails` | `boolean`        | `false`                                 | Tampilkan detail error |

### Contoh Penggunaan

```tsx
<ErrorState
  title="Gagal Memuat Data"
  subtitle="Koneksi terputus"
  error={errorMessage}
  onRetry={refetchData}
  showErrorDetails={__DEV__}
/>
```

## Features

- ✅ **Consistent Design**: Menggunakan theme system aplikasi
- ✅ **Reusable**: Dapat digunakan di berbagai screen
- ✅ **Customizable**: Props yang fleksibel
- ✅ **TypeScript**: Interface props yang jelas
- ✅ **Responsive**: Layout yang adaptif
- ✅ **Accessible**: Design yang user-friendly
