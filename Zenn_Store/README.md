# ZEN STORE

Premium storefront demo dengan Admin Dashboard terpisah, dirancang mengikuti referensi visual yang diberikan: header dua baris, navigasi horizontal, hero carousel, kartu kategori, informasi layanan, panduan belanja, serta profil developer.

> **Status implementasi:** proyek ini adalah versi statis berbasis HTML, CSS, JavaScript Vanilla, dan LocalStorage. Fitur lokal berfungsi pada browser yang sama. Ini **bukan** sistem e-commerce produksi dan tidak menyediakan backend, pembayaran online, autentikasi server, maupun sinkronisasi data antarperangkat.

## Fitur

### Customer Storefront
- Beranda dengan lima ilustrasi banner berbeda: brand introduction, promo highlight, product showcase, shopping experience, dan special highlight.
- Continuous horizontal carousel berbasis satu flex track dan translateX; kelima slide saling bergeser dengan transisi 820 ms, autoplay 5 detik, Previous/Next, dot indicator, progress bar, swipe mobile, pause saat pointer/touch, serta dukungan reduced-motion.
- Header premium dengan logo geometris ZEN STORE, pencarian + filter kategori, kontrol tema, akun, wishlist, dan keranjang. Navigasi horizontal memakai ikon SVG yang konsisten dan label teks; pada mobile menu dapat dibuka lewat tombol hamburger.
- Kategori, katalog, pencarian, filter kategori, pengurutan, detail produk.
- Wishlist, keranjang, validasi stok, checkout via WhatsApp, dan riwayat pesanan lokal.
- Halaman Produk Terlaris khusus dengan peringkat yang dihitung dari pesanan berstatus Diproses, Dikirim, atau Selesai; pesanan menunggu konfirmasi dan dibatalkan tidak dihitung.
- Halaman Tentang Kami dengan hero split-screen, mockup storefront, feature showcase, timeline belanja, informasi layanan, visual brand, dan CTA.
- Halaman Kontak dengan Developer Profile yang hanya tampil pada halaman Kontak, bukan pada footer global atau halaman Tentang Kami.
- Light Mode / Dark Mode dengan preferensi yang disimpan di browser.
- Empty state katalog; tidak ada produk palsu yang dipasang sebagai produk asli.

### Admin Dashboard
- URL terpisah di `/admin/`, login/setup akun lokal, sidebar vertikal, dan halaman admin terpisah.
- CRUD produk, kategori, promo, banner, pesanan lokal, profil developer, dan pengaturan toko.
- Upload gambar dengan resize/compress sebelum disimpan.
- Backup/restore JSON serta ekspor CSV produk dan pesanan.
- Angka statistik berasal dari data yang benar-benar tersedia di browser.

## Struktur Folder

```text
Zenn_Store/
├── index.html
├── products.html
├── bestseller.html
├── product-detail.html
├── wishlist.html
├── cart.html
├── checkout.html
├── orders.html
├── about.html
├── contact.html
├── promo.html
├── admin/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── products.html
│   ├── categories.html
│   ├── orders.html
│   ├── promotions.html
│   ├── banners.html
│   ├── developer.html
│   ├── settings.html
│   └── backup.html
├── assets/
│   ├── logo/
│   ├── images/
│   │   ├── hero-main.svg
│   │   ├── hero-promo.svg
│   │   ├── hero-new.svg
│   │   └── hero-featured.svg
│   └── icons/
├── css/
│   ├── brand-header.css
│   └── brand-pages.css
├── js/
├── admin-assets/
│   ├── css/
│   └── js/
├── .nojekyll
└── README.md
```

## Menjalankan Secara Lokal

Karena beberapa fitur menggunakan `crypto.subtle`, sebaiknya jalankan melalui web server lokal, bukan membuka HTML langsung dengan `file://`.

### Opsi Python

Dari folder `Zenn_Store`:

```bash
python -m http.server 8000
```

Buka `http://localhost:8000/` di browser. Admin berada di `http://localhost:8000/admin/`.

### Opsi VS Code

1. Buka folder `Zenn_Store` di VS Code.
2. Jalankan ekstensi Live Server pada `index.html`.
3. Buka `/admin/` untuk pengaturan Admin lokal.

## Deploy ke GitHub Pages

1. Buat repository GitHub bernama **Zenn_Store**.
2. Unggah seluruh isi folder proyek ini ke root repository (pastikan `index.html` berada di root, bukan di dalam folder tambahan).
3. Buka **Settings → Pages** pada repository.
4. Pada bagian Build and deployment, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/ (root)`, lalu simpan.
6. Setelah GitHub Pages selesai menerbitkan situs, alamat yang dituju adalah:
   - Storefront: `https://lyuuzhnn.github.io/Zenn_Store/`
   - Admin: `https://lyuuzhnn.github.io/Zenn_Store/admin/`

Jika repository berada di akun/organisasi lain, sesuaikan username pada URL. Semua tautan internal proyek menggunakan path relatif agar dapat berjalan pada subfolder repository GitHub Pages.

## Setup Admin dan Penggunaan

1. Buka `/admin/` pada browser yang sama dengan yang akan digunakan mengelola toko.
2. Saat pertama kali, buat username dan password lokal. Password minimum 8 karakter.
3. Setelah masuk, tambahkan kategori/produk asli melalui menu **Kelola Produk**.
4. Atur banner dari **Kelola Banner**. Empat banner bawaan adalah konten informatif; edit isi sesuai informasi toko yang benar.
5. Atur nomor WhatsApp format internasional pada **Pengaturan Toko**, contoh format angka `62812...` (tanpa spasi atau tanda hubung).
6. Lengkapi profil developer melalui menu **Profil Developer**.
7. Buat backup berkala melalui **Backup & Restore**.

## Data Produk Asli

Katalog publik dimulai tanpa produk. Produk hanya muncul setelah Admin menambahkannya dan memilih status Publikasikan. Sistem tidak mengarang harga, stok, rating, ulasan, diskon, penjualan, atau foto produk. Produk yang ditandai demo tetap disembunyikan dari katalog publik.

Kategori awal hanya berupa struktur navigasi umum; Admin dapat mengedit dan menghapusnya. Jumlah produk kategori dihitung dari data yang tersimpan.

## Checkout WhatsApp

Checkout menyusun ringkasan pesanan dan membuka WhatsApp dengan teks yang telah disiapkan. Browser menyimpan salinan pesanan secara lokal sebelum membuka WhatsApp. Membuka WhatsApp **tidak berarti** pesanan sudah dibayar atau dikonfirmasi. Pihak toko tetap perlu meninjau dan mengonfirmasi pesanan.

## Batasan Penting GitHub Pages dan LocalStorage

GitHub Pages hanya menyajikan file statis. LocalStorage:
- Terpisah untuk tiap browser/perangkat/origin.
- Tidak menyinkronkan perubahan Admin ke browser pelanggan lain.
- Tidak menyediakan database pusat untuk pesanan.
- Dapat dibaca, dihapus, atau dimanipulasi oleh pengguna perangkat/browser tersebut.
- Memiliki kapasitas terbatas; unggah gambar yang ringan dan ekspor backup.

Artinya, produk yang ditambahkan Admin hanya akan tersedia pada browser yang menyimpan data tersebut. Pengunjung di perangkat lain tidak otomatis melihat produk atau banner yang sama. Riwayat pesanan yang dibuat pengunjung lain juga tidak akan muncul pada Admin.

## Catatan Keamanan — Wajib Dibaca Sebelum Produksi

Login pada versi ini merupakan **pengunci demo di sisi browser**, bukan autentikasi yang aman. Data akun dan sesi disimpan di penyimpanan browser dan dapat dimanipulasi. Pemisahan URL `/admin/` hanya memisahkan tampilan; itu bukan kontrol akses server. Jangan gunakan untuk menyimpan informasi rahasia atau data pelanggan nyata.

Untuk toko produksi diperlukan backend dan database, misalnya API server dengan autentikasi server-side, kontrol akses berbasis peran, validasi server, penyimpanan gambar terkelola, backup terpusat, proteksi data pribadi, dan sistem order terpusat. Kunci rahasia/API key tidak boleh ditempatkan di JavaScript publik.

## Teknologi

- HTML5
- CSS3 dengan CSS custom properties untuk tema
- JavaScript Vanilla
- LocalStorage untuk data demo lokal
- JSON dan CSV untuk backup/ekspor
- GitHub Pages untuk hosting statis

## Pengujian Ringkas

Sebelum dipublikasikan, uji minimal:
- Storefront dan seluruh halaman customer, termasuk `about.html` dan `bestseller.html`.
- Navigasi menu Kategori dan Produk Terlaris harus membuka halaman yang berbeda.
- Peringkat Produk Terlaris harus mengikuti unit pada pesanan yang sudah dikonfirmasi dan mengecualikan pesanan batal/menunggu konfirmasi.
- About Us: seluruh section, CTA, animasi reveal, Light/Dark Mode, serta tampilan mobile/tablet/desktop.
- Empat visual banner yang berbeda, transisi horizontal, pergantian otomatis 5 detik, dan tombol manual.
- Kartu Developer pada halaman Kontak saja, tautan WhatsApp/email, dan tampilan Light/Dark Mode.
- Light/Dark Mode pada halaman customer dan admin.
- Tambah/edit/hapus produk dan kategori.
- Wishlist, keranjang, batas stok, dan detail produk.
- Checkout dengan nomor WhatsApp yang benar.
- Perubahan status pesanan lokal.
- CRUD banner, promo, profil developer, dan pengaturan toko.
- Ekspor dan restore JSON.
- Tampilan layar mobile dan desktop.

Proyek ini dibuat untuk demonstrasi dan pengembangan awal. Lakukan pengujian lintas browser/perangkat dan integrasikan backend sebelum dipakai untuk transaksi nyata.

## Pembaruan halaman Kontak

- Halaman Kontak memiliki dua kartu utama: pengantar **Hubungi Kami** dan **Developer Profile**.
- Informasi developer hanya dirender pada halaman `contact.html`, bukan di footer global atau halaman pelanggan lainnya.
- Kontak developer: WhatsApp `0822 2110 1650` (`https://wa.me/6282221101650`), alamat `Indonesia, Jawa Tengah, Kabupaten Tegal`, dan Gmail `gzberhanif@gmail.com`.
- Nomor WhatsApp toko pada pengaturan Admin tetap merupakan nomor terpisah untuk proses checkout pesanan.

## Pembaruan About Us dan Produk Terlaris

- `about.html` menggunakan stylesheet khusus `css/brand-pages.css` agar gaya halaman profil brand tidak mengubah halaman lain.
- `bestseller.html` adalah halaman khusus yang terpisah dari `products.html` (Kategori/Katalog). Tautan lama `products.html?sort=popular` dialihkan ke halaman khusus ini.
- Penghitungan produk terlaris memakai total kuantitas item berdasarkan `id` produk pada pesanan dengan status `Diproses`, `Dikirim`, atau `Selesai`. Pesanan `Menunggu Konfirmasi` dan `Dibatalkan` tidak masuk perhitungan.
- Data peringkat masih dibatasi oleh LocalStorage pada browser/perangkat yang sama. Untuk peringkat global yang konsisten bagi semua pengunjung dibutuhkan backend/database bersama.


## Pembaruan Header & Banner

- Logo storefront menggunakan simbol geometris portal ZEN STORE dan lockup terpisah untuk Light Mode dan Dark Mode.
- Header dibagi menjadi utility strip, area logo/pencarian/aksi akun, dan navigation bar.
- Navigasi tetap menampilkan nama menu dan SVG icon; pada smartphone menu dibuka melalui tombol hamburger.
- Carousel memakai flex track dengan setiap slide selebar viewport. Clone slide pertama/terakhir digunakan untuk infinite loop tanpa layar kosong.
- Lima ilustrasi banner dibuat khusus dalam format SVG lokal sehingga tidak bergantung pada layanan gambar eksternal.
- Banner yang sebelumnya disimpan oleh Admin tetap dipertahankan. Pada instalasi lama dengan empat banner default, slide highlight kelima ditambahkan sebagai fallback tampilan storefront.


## Header & Homepage Visual Update (Futuristic Glass v2)
- Announcement strip now uses factual welcome and store-experience copy only.
- Header and navigation use glassmorphism with a dimensional ZEN STORE lockup.
- Five locally hosted WebP hero scenes are used as default artwork; uploaded Admin banner images still override these defaults.
- The feature strip below the hero uses factual product-information, contact, and ordering descriptions.
- Carousel remains a continuous horizontal translateX track with cloned edge slides, 5-second autoplay, manual controls, and reduced-motion handling.
- The five default banner descriptions were refreshed in `js/storage.js`; existing browser LocalStorage banner edits are intentionally preserved.


## Navigation Bar Layout Fix
- Removed the decorative promotional pill from the navigation markup so it cannot flex-shrink into a clipped vertical shape.
- Desktop navigation distributes the eight text-and-icon links across the available row width.
- Tablet widths use a horizontally scrollable navigation row rather than compressing menu labels.
- Small mobile widths retain a two-column menu inside the existing hamburger toggle.
- Navigation destinations and active-page logic are unchanged.
