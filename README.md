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
| 📊 **Counter Animasi** | Anggal statistik dianimasi saat masuk viewport |
| 🌀 **Parallax Background** | Background shape bergerak mengikuti scroll |
| 🎉 **Easter Egg** | Tekan tombol `Space` untuk kejutan! |
| 📱 **Responsive** | Optimized untuk mobile, tablet, dan desktop |
| ✅ **Form Validasi** | Form kontak dengan validasi real-time |

---

## 🚀 Cara Menjalankan Lokal

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
├── .nojekyll       # Mencegah Jekyll processing (untuk GitHub Pages)
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

## 🚀 Deploy ke GitHub Pages (Rekomendasi)

### Langkah 1: Upload ke GitHub

Kalau repo ini baru (belum ada di GitHub), buat dulu repository baru:

```bash
# Inisialisasi repo lokal (skip jika sudah)
git init

# Tambahkan semua file
git add .

# Commit
git commit -m "initial: portfolio website"

# Hubungkan ke remote GitHub (ganti <username> dengan username kamu)
git remote add origin https://github.com/<username>/portofolio-web.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

### Langkah 2: Aktifkan GitHub Pages

1. Buka repo di GitHub → klik tab **Settings**
2. Di sidebar kiri, klik **Pages**
3. Di bagian **Source**, pilih **Deploy from a branch**
4. Pilih branch `main` dan folder `/(root)`, lalu klik **Save**
5. Tunggu 1–2 menit, lalu refresh halaman Settings → Pages
6. URL live akan muncul: `https://<username>.github.io/portofolio-web/`

### Langkah 3: (Opsional) Gunakan GitHub Actions

Kalau mau auto-deploy tiap push, buat file baru:

`.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Push file ini, lalu aktifkan **Actions** di tab Actions → set permission-nya.

### ⚠️ Perhatian: Routing Issue (SPA)

Karena ini single-page app, jika pengunjung langsung membuka deep link (misal `/#about`) lalu refresh, mungkin muncul **404**. Solusi:

**Solusi 1: Hash Routing (sudah terpasang)** — Navigasi menggunakan hash (`#about`, `#projects`), jadi semua route tetap satu halaman. ✓

**Solusi 2: Copy `index.html` ke `404.html`** (jika pakai GitHub Actions):

Tambahkan step di workflow sebelum upload:

```yaml
      - name: Setup 404 fallback
        run: cp index.html 404.html
```

---

## 🌍 Deploy ke Platform Lain

| Platform | Cara |
|----------|------|
| **Vercel** | Login → Import repo → Deploy (framework preset: **Other**) |
| **Netlify** | Login → Drag & drop folder / Import from Git |
| **Cloudflare Pages** | Upload via dashboard atau connect ke GitHub |

---

## 📝 Catatan Penting

- File **`.nojekyll`** penting untuk GitHub Pages — mencegah Jekyll processing sehingga file statis terkirim apa adanya. Tanpa ini, file/folder awalan underscore (`_`) atau tanpa front matter mungkin di-skip.
- Kursor kustom otomatis **disembunyikan** pada perangkat touch (mobile/tablet) untuk UX yang lebih baik.
- Data formulir kontak saat ini **simulasi frontend** saja. Untuk production, sambungkan ke backend/API seperti Formspree, Getform, atau serverless function.

---

## 📜 Lisensi

MIT — Silakan gunakan, modifikasi, dan distribusikan dengan bebas.
