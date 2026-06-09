# 🌐 Portofolio Interaktif — SaaSchet

Website portofolio pribadi yang interaktif, responsif, dan modern. Dibangun dengan **HTML5, CSS3, dan Vanilla JavaScript** tanpa framework agar ringan, cepat, dan mudah di-deploy ke hosting statis mana saja.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🖱️ **Kursor Kustom** | Kursor unik dengan efek hover interaktif (desktop only) |
| 🌗 **Dark / Light Mode** | Toggle tema dengan persistensi `localStorage` |
| 🎬 **Scroll Animation** | Elemen muncul dengan animasi smooth saat di-scroll |
| ⌨️ **Typing Effect** | Teks hero diketik otomatis (loop berbagai frasa) |
| 🔍 **Filter Proyek** | Filter karya berdasarkan kategori (Web / Mobile / Design) |
| 🎵 **Music Visualizer** | Canvas visualizer yang bereaksi saat klik di mana saja |
| 📊 **Counter Animasi** | Angka statistik dianimasi saat masuk viewport |
| 🌀 **Parallax Background** | Background shape bergerak mengikuti scroll |
| 🎉 **Easter Egg** | Tekan tombol `Space` untuk kejutan! |
| 📱 **Responsive** | Optimized untuk mobile, tablet, dan desktop |
| ✅ **Form Validasi** | Form kontak dengan validasi real-time |

---

## 🚀 Cara Menjalankan

Tidak perlu build tools atau install dependencies. Cukup clone dan buka file HTML:

```bash
git clone <repo-url>
cd <repo-folder>
# Buka index.html di browser
```

Atau jalankan server lokal sederhana (opsional):

```bash
# Python 3
python -m http.server 8080

# Node.js (jika punya npx serve)
npx serve .
```

Lalu buka `http://localhost:8080`

---

## 📁 Struktur File

```
.
├── index.html      # Markup utama & struktur halaman
├── styles.css      # Styling modern dengan CSS Variables
├── script.js       # Semua interaktivitas & animasi
├── .nojekyll       # Mencegah Jekyll processing di GitHub Pages
└── README.md       # Dokumentasi ini
```

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup, accessibility
- **CSS3** — Custom properties, Grid, Flexbox, animations, backdrop-filter
- **Vanilla JS** — IntersectionObserver, Canvas API, requestAnimationFrame, event handling

Tidak ada framework eksternal sehingga:
- ⚡ Load time sangat cepat
- 🔒 Zero dependency vulnerabilities
- 🌍 Bisa langsung deploy ke GitHub Pages / Vercel / Netlify

---

## 🎨 Kustomisasi

- **Warna**: Edit variabel CSS di `:root` pada `styles.css`
- **Konten**: Ganti teks, nama, dan link di `index.html`
- **Proyek**: Tambah/ubah kartu proyek di dalam `#projectsGrid`
- **Easter Egg**: Ubah pesan di overlay `#easterEgg`

---

## 📄 Deployment

### GitHub Pages (direkomendasikan)

1. **Merge** PR ini ke branch `main`
2. Buka repo di GitHub → **Settings** → **Pages**
3. Pada **Source**, pilih **Deploy from a branch**
4. Pilih **Branch**: `main`, **Folder**: `/ (root)`
5. Klik **Save**
6. Tunggu 1-2 menit, lalu akses `https://<username>.github.io/<repo-name>/`

> File `.nojekyll` sudah disertakan agar GitHub Pages tidak memproses Jekyll dan file `_` tetap terbaca.

### Vercel / Netlify

1. Login ke platform pilihan
2. Import repository ini
3. Deploy (default settings sudah cocok untuk static site)

---

## 📝 Catatan

- Kursor kustom otomatis **disembunyikan** pada perangkat touch (mobile/tablet) untuk UX yang lebih baik.
- Data formulir kontak saat ini **simulasi frontend** saja. Untuk production, sambungkan ke backend/API seperti Formspree, Getform, atau serverless function.

---

## 📜 Lisensi

MIT — Silakan gunakan, modifikasi, dan distribusikan dengan bebas.
