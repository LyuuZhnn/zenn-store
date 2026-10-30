(function(){
  const S=window.ZenStore; if(!S)return;
  const app=document.getElementById('app');
  const state=()=>S.get();
  const page=document.body.dataset.page||'home';
  let sliderTimer=null,sliderIndex=1,sliderPaused=false,sliderProgressTimer=null,sliderTrack=null,sliderOriginalSlides=[],sliderDots=[],sliderBar=null,sliderTransitioning=false;
  const navItems=[['home','home','Beranda','index.html'],['catalog','grid','Kategori','products.html'],['bestseller','flame','Produk Terlaris','bestseller.html'],['promo','tag','Promo','promo.html'],['wishlist','heart','Wishlist','wishlist.html'],['orders','package','Pesanan','orders.html'],['about','info','Tentang Kami','about.html'],['contact','phone','Kontak','contact.html']];
  function esc(v){return S.escape(v);}
  function link(h,t,cls=''){return `<a class="${cls}" href="${h}">${t}</a>`;}
  function svgIcon(name,cls=''){const d={home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"/>',grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',flame:'<path d="M12 22c4.4 0 7-3.1 7-7.2 0-2.5-1.2-4.8-3.7-7.1-.2 2.1-1.1 3.3-2.3 4.1.1-3.6-1.5-6.5-4.5-9.1.1 3.8-1.1 5.8-3 8C2.7 14 4.1 22 12 22Z"/><path d="M12 18c1.8 0 2.8-1.3 2.8-3.1 0-.9-.4-1.7-1.2-2.4-.1 1-.6 1.6-1.3 2-.2-1.2-.7-2-1.7-2.8-.1 1.2-.5 1.7-1 2.4C8.5 16 9.3 18 12 18Z"/>',tag:'<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3.4 13.4a2 2 0 0 1 0-2.8l7.2-7.2A2 2 0 0 1 12 2.8H20a1.2 1.2 0 0 1 1.2 1.2v8a2 2 0 0 1-.6 1.4Z"/><circle cx="16.5" cy="7.5" r="1.5"/>',heart:'<path d="M20.8 8.7c0 5.5-8.8 11.3-8.8 11.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z"/>',package:'<path d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9L12 3Z"/><path d="m3.5 7.5 8.5 4.7 8.5-4.7M12 12.2V21M7.5 5.4 16 10"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',phone:'<path d="M5.5 3.5 8 3l2 4.5-2 1.8a15 15 0 0 0 6.7 6.7l1.8-2L21 16l-.5 2.5c-.3 1.5-1.7 2.5-3.2 2.2C10 19.2 4.8 14 3.3 6.7 3 5.2 4 3.8 5.5 3.5Z"/>',search:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',moon:'<path d="M20.7 14.2A8.6 8.6 0 0 1 9.8 3.3 8.8 8.8 0 1 0 20.7 14.2Z"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',cart:'<path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 8H6"/><circle cx="10" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',shield:'<path d="M12 3 20 6v5c0 5-3.2 8-8 10-4.8-2-8-5-8-10V6Z"/><path d="m8.5 12 2.3 2.3 4.8-5"/>',file:'<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5M10 13h5m-5 4h5"/>',headset:'<path d="M4 13v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/><path d="M17 20h-3"/>',bag:'<path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',sparkle:'<path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/>',arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',chevron:'<path d="m6 9 6 6 6-6"/>'};return `<svg class="ui-icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d[name]||d.info}</svg>`;}
  function header(){
    const active=page==='home'?'home':page==='catalog'||page==='detail'?'catalog':page;
    const theme=document.documentElement.dataset.theme==='dark'?'dark':'light';
    const mark=theme==='dark'?svgIcon('moon') : svgIcon('sun');
    const brandLogo=state().settings.logo||`assets/logo/zen-lockup${theme==='dark'?'-dark':''}.svg`;
    return `<header class="site-header">
      <div class="header-utility"><div class="container utility-inner">
        <div class="announcement-cluster">
          <span class="announcement-item"><span class="announcement-symbol">${svgIcon('sparkle')}</span>Selamat datang di ZEN STORE!</span>
          <span class="announcement-divider" aria-hidden="true"></span>
          <span class="announcement-item announcement-secondary"><span class="announcement-symbol">${svgIcon('shield')}</span>Belanja lebih mudah, nyaman, dan informatif</span>
        </div>
        <span class="utility-tagline"><span class="announcement-symbol">${svgIcon('sparkle')}</span>Better Life, Better You</span>
      </div></div>
      <div class="container topbar"><button class="mobile-menu-toggle" data-action="mobile-menu" aria-label="Buka menu">${svgIcon('menu')}</button>
        <a class="brand" href="index.html" aria-label="ZEN STORE beranda"><img src="${esc(brandLogo)}" alt="ZEN STORE — Better Life, Better You"></a>
        <form class="search-wrap" id="global-search"><span class="search-icon">${svgIcon('search')}</span><input name="q" type="search" placeholder="Cari produk, merek, atau kategori..." aria-label="Cari produk"><select name="category" aria-label="Pilih kategori"><option value="">Semua Kategori</option>${state().categories.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('')}</select><button class="search-submit" type="submit" aria-label="Cari">${svgIcon('search')}</button></form>
        <div class="top-actions"><button class="icon-action theme-action" data-action="theme" aria-label="Ganti ke ${theme==='dark'?'Light':'Dark'} Mode" title="Ganti tema"><span class="action-icon" id="theme-icon">${mark}</span></button><button class="icon-action account-action" type="button" data-action="account-info" aria-label="Akun pelanggan"><span class="action-icon account-avatar">${svgIcon('user')}</span><span class="action-label">Akun</span>${svgIcon('chevron','tiny-chevron')}</button><a class="icon-action" href="wishlist.html" aria-label="Wishlist"><span class="action-icon">${svgIcon('heart')}</span><span class="action-label">Wishlist</span><b class="count-pill">${state().wishlist.length}</b></a><a class="icon-action" href="cart.html" aria-label="Keranjang belanja"><span class="action-icon">${svgIcon('cart')}</span><span class="action-label">Keranjang</span><b class="count-pill">${state().cart.reduce((n,x)=>n+x.qty,0)}</b></a></div>
      </div><div class="nav-row" id="nav-row"><nav class="container nav-inner" aria-label="Navigasi utama">${navItems.map(([id,ico,label,url])=>`<a class="nav-link ${active===id?'active':''}" href="${url}" ${active===id?'aria-current="page"':''}><span class="nav-icon">${svgIcon(ico)}</span><span>${label}</span></a>`).join('')}</nav></div></header>`;
  }
  function footer(){const st=state().settings,theme=document.documentElement.dataset.theme==='dark'?'dark':'light',logo=st.logo||`assets/logo/zen-lockup${theme==='dark'?'-dark':''}.svg`;return `<footer class="site-footer"><div class="container"><div class="footer-grid footer-grid--compact"><div class="footer-brand"><img src="${esc(logo)}" alt="ZEN STORE"><p>${esc(st.description||'Belanja lebih mudah dengan informasi toko yang jelas dan pengalaman yang nyaman.')}</p></div><div><h3>Navigasi</h3><div class="footer-links">${link('index.html','Beranda')}${link('products.html','Katalog')}${link('bestseller.html','Produk Terlaris')}${link('promo.html','Promo')}${link('about.html','Tentang Kami')}</div></div><div><h3>Bantuan</h3><div class="footer-links">${link('orders.html','Pesanan')}${link('wishlist.html','Wishlist')}${link('cart.html','Keranjang')}${link('contact.html','Kontak')}</div></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ZEN STORE. Hak cipta dilindungi.</span><span>Better Life, Better You</span></div></div></footer>`;}
  function sectionTitle(icon,title,sub,href=''){return `<div class="section-heading"><div class="section-title"><span class="title-icon">${icon}</span><div><h2>${title}</h2><p>${sub}</p></div></div>${href?`<a class="text-link" href="${href}">Lihat Semua →</a>`:''}</div>`;}
  function artVisual(type,title){const keys=['main','promo','new','featured','experience','highlight'];const key=keys.includes(type)?type:'main';const assets={main:'assets/images/hero-main.webp',promo:'assets/images/hero-promo.webp',new:'assets/images/hero-new.webp',featured:'assets/images/hero-experience.webp',experience:'assets/images/hero-experience.webp',highlight:'assets/images/hero-highlight.webp'};const labels={main:'Komposisi produk elektronik premium',promo:'Produk teknologi dengan aksen promosi',new:'Koleksi produk dalam studio showroom cerah',featured:'Gaya hidup digital dan perangkat modern',experience:'Pengalaman belanja digital melalui smartphone',highlight:'Visual keranjang belanja dan katalog digital'};return `<div class="hero-art"><img class="hero-art-image" src="${assets[key]}" alt="${esc(labels[key]||title||'Visual ZEN STORE')}" ${key==='main'?'fetchpriority="high"':'loading="lazy"'}></div>`;}
  function hero(){
    let banners=state().banners.filter(b=>b.enabled!==false).sort((a,b)=>(a.sort||0)-(b.sort||0));
    const original=state().banners;
    const defaultIds=['banner-main','banner-promo','banner-new','banner-featured'];
    if(original.length===4&&defaultIds.every(id=>original.some(b=>b.id===id))){
      const fifth=S.DEFAULT_BANNERS.find(b=>b.id==='banner-highlight');
      if(fifth&&!banners.some(b=>b.id===fifth.id))banners=[...banners,{...fifth}].sort((a,b)=>(a.sort||0)-(b.sort||0));
    }
    const slides=banners.length?banners:S.DEFAULT_BANNERS;
    return `<section class="hero" id="hero-slider" tabindex="0" aria-label="Informasi utama ZEN STORE" aria-roledescription="carousel"><div class="hero-slides" id="hero-track">${slides.map((b,i)=>{const allowed=['main','promo','new','featured','experience','highlight'];const type=allowed.includes(b.type)?b.type:'main';const art=b.image?`<div class="hero-art"><img class="hero-art-image" src="${esc(b.image)}" alt="${esc(b.title||'Banner ZEN STORE')}" ${i===0?'fetchpriority="high"':'loading="lazy"'}></div>`:artVisual(type,b.title);return `<article class="hero-slide hero-slide--${type} ${i===0?'active':''}" data-slide="${i}" aria-label="Banner ${i+1} dari ${slides.length}">${art}<div class="hero-copy"><span class="eyebrow"><span class="hero-eyebrow-spark">✦</span>${esc(b.eyebrow||'ZEN STORE · Better Life')}</span><h${i===0?'1':'2'}>${esc(b.title||'Selamat datang')} <span>${esc(b.highlight||'')}</span></h${i===0?'1':'2'}><p>${esc(b.description||'Informasi dan layanan ZEN STORE.')}</p><a class="btn" href="${esc(b.link||'products.html')}">${esc(b.buttonText||'Mulai Belanja')} ${svgIcon('arrow')}</a></div><div class="hero-float-card hero-float-card--one"><span>${svgIcon('file')}</span><div><b>Informasi Produk</b><small>Detail yang mudah dipahami</small></div></div><div class="hero-float-card hero-float-card--two"><span>${svgIcon('bag')}</span><div><b>Jelajahi Katalog</b><small>Pilihan sesuai kebutuhan</small></div></div></article>`;}).join('')}</div><button class="hero-arrow prev" data-action="slide-prev" aria-label="Banner sebelumnya">‹</button><button class="hero-arrow next" data-action="slide-next" aria-label="Banner berikutnya">›</button><div class="hero-dots" role="group" aria-label="Pilih banner">${slides.map((_,i)=>`<button class="hero-dot ${i===0?'active':''}" data-action="slide-to" data-index="${i}" aria-label="Tampilkan banner ${i+1}" aria-pressed="${i===0?'true':'false'}"></button>`).join('')}</div><div class="hero-progress" id="hero-progress" aria-hidden="true"></div><span class="hero-count" aria-live="polite"><b id="hero-current">01</b><i>/</i>${String(slides.length).padStart(2,'0')}</span></section>`;
  }
  function categories(){return `<section class="section">${sectionTitle('▦','Jelajahi Kategori','Pilih kategori untuk melihat produk yang tersedia.')}<div class="category-grid">${state().categories.map((c,i)=>`<a class="category-card" href="products.html?category=${encodeURIComponent(c.id)}">${c.image?`<img class="category-image" src="${esc(c.image)}" alt="" loading="lazy">`:`<span class="category-icon">${esc(c.icon||'▦')}</span>`}<strong>${esc(c.name)}</strong><small>${esc(c.description||'Lihat kategori')}</small></a>`).join('')}</div></section>`;}
  function services(){const cards=[['shield','Pilihan Produk','Jelajahi produk yang dipublikasikan di katalog.','products.html'],['file','Informasi Produk','Baca detail produk sebelum menentukan pilihan.','products.html'],['headset','Layanan Pelanggan','Tanyakan informasi melalui kontak yang tersedia.','contact.html'],['bag','Pemesanan Praktis','Lanjutkan pesanan dari keranjang ke WhatsApp.','cart.html']];return `<section class="service-strip" aria-label="Keunggulan pengalaman belanja">${cards.map(([icon,title,desc,url],i)=>`<a class="service-card" href="${url}"><span class="service-icon">${svgIcon(icon)}</span><span class="service-copy"><strong>${title}</strong><small>${desc}</small></span><span class="service-arrow">${svgIcon('arrow')}</span></a>`).join('')}</section>`;}
  const guide=[['⌕','Cari Produk','Gunakan pencarian atau pilih kategori yang Anda butuhkan.','Mudah & Cepat'],['🛒','Masukkan Keranjang','Pilih produk dan atur jumlah yang diinginkan.','Bisa diubah kapan saja'],['▣','Konfirmasi Pesanan','Periksa ringkasan lalu hubungi toko melalui WhatsApp.','Detail transparan'],['🚚','Proses Pengiriman','Pengiriman dan estimasi dikonfirmasi oleh tim toko.','Info dari toko'],['✓','Pesanan Selesai','Pastikan pesanan diterima dan sampaikan ulasan.','Terima Kasih!']];
  function guides(){return `<section class="section">${sectionTitle('▤','Panduan Belanja','Mudah, jelas, dan nyaman.')}<div class="content-columns"><div class="guide-grid">${guide.map((g,i)=>`<article class="guide-card"><span class="guide-number">${i+1}</span><div class="guide-icon">${g[0]}</div><h3>${g[1]}</h3><p>${g[2]}</p><span class="guide-tag">${g[3]}</span></article>`).join('')}</div><div class="side-stack"><div class="support-card"><div style="font-size:24px;margin-bottom:4px">☏</div><h3>Butuh Bantuan?</h3><p>Hubungi tim ZEN STORE untuk pertanyaan tentang katalog, pesanan, dan informasi layanan.</p><a class="btn" href="contact.html">Hubungi Kami →</a></div><div class="update-card"><span class="big">▤</span><div><h3>Ikuti Informasi Terbaru</h3><p>Lihat artikel, informasi toko, dan pembaruan yang tersedia.</p><a class="btn" href="about.html">Lihat Informasi →</a></div></div></div></div></section>`;}
  function information(){const cards=[['📣','Informasi Promo','Promo hanya ditampilkan ketika sudah ditambahkan oleh Admin.'],['✦','Tips & Panduan','Baca panduan belanja dan informasi produk.'],['🛡️','Transparansi Informasi','Detail produk mengikuti data yang disediakan toko.'],['★','Info Keanggotaan','Informasi program member dapat ditambahkan oleh pengelola.']];return `<section class="section">${sectionTitle('★','Informasi Terbaru','Informasi toko dan panduan yang dapat membantu Anda.','about.html')}<div class="info-grid">${cards.map(c=>`<a class="info-card" href="${c[0]==='📣'?'promo.html':'about.html'}"><span class="info-icon">${c[0]}</span><div><strong>${c[1]}</strong><p>${c[2]}</p></div></a>`).join('')}</div></section>`;}
  function productEmpty(){return `<div class="empty-state"><div class="empty-icon">▦</div><h3>Produk Belum Tersedia</h3><p>Belum ada produk yang ditambahkan ke katalog. Silakan kembali lagi nanti.</p><a class="btn secondary" href="contact.html">Tanyakan Informasi →</a></div>`;}
  function home(){const products=state().products.filter(p=>p.published!==false&&!p.demo);return `${hero()}${services()}${categories()}${guides()}${information()}<section class="section">${sectionTitle('✧','Produk Pilihan','Produk yang telah dipublikasikan oleh Admin.','products.html')}${products.length?`<div class="product-grid">${products.slice(0,4).map(productCard).join('')}</div>`:productEmpty()}</section>`;}
  function pageHero(title,desc){return `<div class="page-hero"><h1>${title}</h1><p>${desc}</p></div>`;}
  function productCard(p){const id=esc(p.id);const fav=state().wishlist.includes(p.id);return `<article class="product-card"><a href="product-detail.html?id=${encodeURIComponent(p.id)}" class="product-image">${p.image?`<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">`:`<span class="product-placeholder">▧</span>`}</a><div class="product-body"><h3>${esc(p.name)}</h3><div class="product-price">${S.money(p.price)}</div><div class="product-meta">${esc((state().categories.find(c=>c.id===p.category)||{}).name||'Tanpa kategori')} · Stok ${Number(p.stock)||0}</div><div class="product-actions"><button class="btn" data-action="add-cart" data-id="${id}">+ Keranjang</button><button class="heart-btn ${fav?'active':''}" data-action="toggle-wishlist" data-id="${id}" aria-label="Wishlist">${fav?'♥':'♡'}</button></div></div></article>`;}
  function catalog(){const q=new URLSearchParams(location.search),term=q.get('q')||'',cat=q.get('category')||'',sort=q.get('sort')||'new';if(sort==='popular'){location.replace('bestseller.html');return '';}let list=state().products.filter(p=>p.published!==false&&!p.demo);const title=cat?(state().categories.find(c=>c.id===cat)||{}).name||'Kategori':'Katalog Produk';if(term)list=list.filter(p=>[p.name,p.description,(state().categories.find(c=>c.id===p.category)||{}).name].join(' ').toLowerCase().includes(term.toLowerCase()));if(cat)list=list.filter(p=>p.category===cat);if(sort==='price-asc')list.sort((a,b)=>a.price-b.price);else if(sort==='price-desc')list.sort((a,b)=>b.price-a.price);else list.sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));return `${pageHero(title,'Lihat produk yang telah dimasukkan dan dipublikasikan oleh Admin ZEN STORE.')}<div class="toolbar"><input class="field" id="catalog-q" type="search" value="${esc(term)}" placeholder="Cari nama atau deskripsi produk..."><select class="select-field" id="catalog-category"><option value="">Semua kategori</option>${state().categories.map(c=>`<option value="${esc(c.id)}" ${cat===c.id?'selected':''}>${esc(c.name)}</option>`).join('')}</select><select class="select-field" id="catalog-sort"><option value="new" ${sort==='new'?'selected':''}>Terbaru</option><option value="price-asc" ${sort==='price-asc'?'selected':''}>Harga terendah</option><option value="price-desc" ${sort==='price-desc'?'selected':''}>Harga tertinggi</option></select></div><p class="muted" style="font-size:12px;margin:0 0 12px">${list.length} produk ditemukan</p>${list.length?`<div class="product-grid">${list.map(productCard).join('')}</div>`:productEmpty()}`;}
  function wishlist(){const products=state().products.filter(p=>state().wishlist.includes(p.id)&&p.published!==false&&!p.demo);return `${pageHero('Wishlist','Simpan produk yang ingin Anda lihat kembali.')} ${products.length?`<div class="product-grid">${products.map(productCard).join('')}</div>`:`<div class="empty-state"><div class="empty-icon">♡</div><h3>Wishlist Anda masih kosong</h3><p>Produk favorit yang Anda simpan akan muncul di sini.</p><a class="btn" href="products.html">Jelajahi Katalog</a></div>`}`;}
  function cart(){const s=state();const rows=s.cart.map(item=>({item,p:s.products.find(p=>p.id===item.id)})).filter(x=>x.p&&x.p.published!==false&&!x.p.demo);const total=rows.reduce((n,x)=>n+x.p.price*x.item.qty,0);return `${pageHero('Keranjang Belanja','Periksa kembali produk dan jumlah pesanan Anda.')}<div class="cart-layout"><div class="content-card">${rows.length?rows.map(({item,p})=>`<div class="cart-row"><div class="cart-thumb">${p.image?`<img src="${esc(p.image)}" alt="${esc(p.name)}">`:'▧'}</div><div><strong style="font-size:12px">${esc(p.name)}</strong><div class="muted" style="font-size:11px">${S.money(p.price)}</div><button class="text-link" data-action="remove-cart" data-id="${esc(p.id)}" style="border:0;background:none;padding:5px 0">Hapus</button></div><div class="qty-control"><button data-action="qty-minus" data-id="${esc(p.id)}">−</button><b>${item.qty}</b><button data-action="qty-plus" data-id="${esc(p.id)}">+</button></div><strong class="cart-item-total" style="font-size:12px">${S.money(p.price*item.qty)}</strong></div>`).join(''):`<div class="empty-state" style="border:0"><div class="empty-icon">🛒</div><h3>Keranjang masih kosong</h3><p>Tambahkan produk dari katalog untuk memulai pesanan.</p><a class="btn" href="products.html">Lihat Katalog</a></div>`}</div><aside class="content-card"><h3 style="font:800 16px Manrope;margin:0 0 10px">Ringkasan Pesanan</h3><div class="summary-line"><span>Jumlah item</span><b>${rows.reduce((n,x)=>n+x.item.qty,0)}</b></div><div class="summary-line"><span>Subtotal</span><b>${S.money(total)}</b></div><div class="summary-line"><span>Pengiriman</span><span class="muted">Dikonfirmasi toko</span></div><div class="summary-line total"><span>Total produk</span><b>${S.money(total)}</b></div><p class="muted" style="font-size:10px">Biaya pengiriman dan metode pembayaran akan dikonfirmasi oleh toko.</p><a class="btn" style="width:100%" href="${rows.length?'checkout.html':'products.html'}">Lanjut Checkout →</a></aside></div>`;}
  function checkout(){const s=state();const rows=s.cart.map(i=>({i,p:s.products.find(p=>p.id===i.id)})).filter(x=>x.p&&x.p.published!==false&&!x.p.demo);const total=rows.reduce((n,x)=>n+x.p.price*x.i.qty,0);if(!rows.length)return `${pageHero('Checkout','Lengkapi pesanan Anda.')}<div class="empty-state"><h3>Belum ada produk untuk checkout</h3><p>Tambahkan produk ke keranjang terlebih dahulu.</p><a class="btn" href="products.html">Lihat Katalog</a></div>`;return `${pageHero('Checkout Pesanan','Isi informasi kontak dan alamat. Pesanan akan dikirim ke WhatsApp toko untuk dikonfirmasi.')}<div class="cart-layout"><form id="checkout-form" class="content-card"><div class="form-grid"><div class="form-field"><label for="customer-name">Nama lengkap *</label><input class="field" id="customer-name" name="name" required maxlength="80"></div><div class="form-field"><label for="customer-phone">Nomor telepon *</label><input class="field" id="customer-phone" name="phone" type="tel" required maxlength="22"></div><div class="form-field full"><label for="customer-address">Alamat pengiriman *</label><textarea class="textarea-field" id="customer-address" name="address" required maxlength="500"></textarea></div><div class="form-field full"><label for="customer-note">Catatan tambahan</label><textarea class="textarea-field" id="customer-note" name="note" maxlength="300" placeholder="Opsional"></textarea></div></div><div class="notice" style="margin-top:14px"><strong>Catatan:</strong> WhatsApp akan terbuka dengan ringkasan pesanan. Pesanan belum dianggap dibayar atau diproses sampai dikonfirmasi oleh pihak toko.</div><button class="btn" type="submit" style="margin-top:14px;width:100%">Kirim Pesanan via WhatsApp →</button></form><aside class="content-card"><h3 style="font:800 16px Manrope;margin:0 0 12px">Ringkasan</h3>${rows.map(x=>`<div class="summary-line"><span>${esc(x.p.name)} × ${x.i.qty}</span><b>${S.money(x.p.price*x.i.qty)}</b></div>`).join('')}<div class="summary-line total"><span>Total</span><b>${S.money(total)}</b></div></aside></div>`;}
  function orders(){const list=state().orders.slice().sort((a,b)=>b.createdAt-a.createdAt);return `${pageHero('Riwayat Pesanan','Daftar pesanan yang tersimpan di browser/perangkat ini.')}<div class="notice" style="margin-bottom:14px"><strong>Info penyimpanan lokal:</strong> riwayat ini hanya tersedia pada browser dan perangkat tempat pesanan dibuat. Data tidak otomatis terkirim ke perangkat Admin.</div>${list.length?`<div class="content-card"><div class="table-wrap"><table class="data-table"><thead><tr><th>No. Pesanan</th><th>Tanggal</th><th>Item</th><th>Total</th><th>Status</th></tr></thead><tbody>${list.map(o=>`<tr><td>${esc(o.id)}</td><td>${new Date(o.createdAt).toLocaleDateString('id-ID')}</td><td>${o.items.length} produk</td><td>${S.money(o.total)}</td><td><span class="status warning">${esc(o.status)}</span></td></tr>`).join('')}</tbody></table></div></div>`:`<div class="empty-state"><div class="empty-icon">▣</div><h3>Belum ada pesanan</h3><p>Pesanan yang dibuat melalui browser ini akan tampil di sini.</p><a class="btn" href="products.html">Mulai Belanja</a></div>`}`;}
  function aboutIcon(name){
    const paths={
      bag:'<path d="M5 8h14l-1.1 12H6.1L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><path d="m9 13 2 2 4-4"/>',
      info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
      check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16.5 9"/>',
      headphones:'<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/><path d="M17 19a5 5 0 0 1-5 3"/>',
      search:'<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4 4"/>',
      cart:'<path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.5L22 8H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>',
      chat:'<path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-4 2v-5a7.5 7.5 0 1 1 17-4.5Z"/><path d="M8 11h8M8 14h5"/>',
      truck:'<path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7.5" cy="19" r="1.8"/><circle cx="17.5" cy="19" r="1.8"/>',
      wallet:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 9h18M16 14h2"/><path d="M6 6V4h12"/>',
      spark:'<path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>'
    };
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.spark}</svg>`;
  }
  function about(){
    const st=state().settings;
    const cats=state().categories.slice(0,4);
    const firstProduct=state().products.find(p=>p.published!==false&&!p.demo);
    const secondProduct=state().products.find(p=>p.published!==false&&!p.demo&&p.id!==firstProduct?.id);
    const catalogPreview=[firstProduct,secondProduct].filter(Boolean);
    return `<div class="about-page">
      <section class="about-hero" aria-labelledby="about-title">
        <div class="about-hero-copy" data-reveal>
          <span class="about-eyebrow"><span class="about-eyebrow-dot"></span> BRAND STORY · ZEN STORE</span>
          <h1 id="about-title">Tentang <span>ZEN STORE</span></h1>
          <p>Selamat datang di ZEN STORE, tempat untuk menemukan pengalaman berbelanja yang lebih mudah, nyaman, dan informatif.</p>
          <div class="about-hero-actions"><a class="about-primary-btn" href="products.html">Jelajahi Produk <span>↗</span></a><a class="about-quiet-link" href="#about-story">Kenali ZEN STORE <span>↓</span></a></div>
          <div class="about-promise-row"><span>${aboutIcon('check')} Mudah digunakan</span><span>${aboutIcon('info')} Informasi jelas</span></div>
        </div>
        <div class="about-hero-visual" data-reveal>
          <div class="about-visual-halo"></div><div class="about-visual-orbit about-orbit-one"></div><div class="about-visual-orbit about-orbit-two"></div>
          <div class="about-main-art"><img src="assets/images/hero-main.svg" alt="Ilustrasi tas belanja digital dan identitas ZEN STORE" loading="lazy"></div>
          <div class="about-float-card about-float-top"><span class="about-float-icon">${aboutIcon('bag')}</span><span><b>Shopping made simple</b><small>Jelajahi dalam satu tempat</small></span><i>↗</i></div>
          <div class="about-float-card about-float-bottom"><span class="about-float-check">✓</span><span><b>Pengalaman yang nyaman</b><small>Informasi produk lebih tertata</small></span></div>
          <div class="about-visual-stamp"><b>ZEN</b><small>BETTER LIFE<br>BETTER YOU</small></div>
        </div>
        <div class="about-hero-bottom"><span>01 / OUR INTRODUCTION</span><span>SCROLL TO EXPLORE <b>↓</b></span></div>
      </section>

      <section class="about-story" id="about-story" data-reveal>
        <div class="about-story-heading"><span class="about-section-index">01 — THE STORY</span><p class="about-overline">MENGENAL LEBIH DEKAT</p><h2>Mengenal Lebih Dekat <span>ZEN STORE</span></h2><p class="about-story-copy">ZEN STORE merupakan platform toko online yang dikembangkan untuk menghadirkan pengalaman berbelanja yang praktis melalui tampilan yang modern, informasi produk yang mudah dipahami, dan proses pemesanan yang sederhana.</p><a class="about-text-link" href="products.html">Lihat katalog produk <b>↗</b></a></div>
        <div class="about-dashboard-scene" aria-label="Ilustrasi antarmuka website ZEN STORE">
          <div class="about-dashboard-glow"></div><div class="about-dashboard-window">
            <div class="about-window-bar"><div class="about-window-dots"><i></i><i></i><i></i></div><span>zenstore.id</span><span class="about-window-lock">⌑</span></div>
            <div class="about-window-content"><aside class="about-window-sidebar"><img src="assets/logo/zen-mark.svg" alt=""><span class="is-current"></span><i></i><i></i><i></i></aside><div class="about-window-main"><div class="about-window-welcome"><span>WELCOME TO ZEN STORE</span><b>Temukan yang<br>Anda butuhkan.</b><small>Jelajahi katalog dengan mudah.</small></div><div class="about-window-search">⌕ <span>Cari produk pilihan...</span></div><div class="about-window-label">Jelajahi kategori</div><div class="about-window-categories">${cats.map((c,i)=>`<span><b>${esc(c.icon||['▧','◈','⌘','✦'][i]||'▦')}</b><small>${esc(c.name)}</small></span>`).join('')}</div><div class="about-window-label">Pilihan untuk Anda</div><div class="about-window-products">${catalogPreview.length?catalogPreview.map((p,i)=>`<div class="about-window-product">${p.image?`<img src="${esc(p.image)}" alt="" loading="lazy">`:`<b>${i?'✧':'▧'}</b>`}<span>${esc(p.name)}</span><small>${S.money(p.price)}</small></div>`).join(''):`<div class="about-window-product"><b>✧</b><span>Katalog produk</span><small>Dikelola oleh toko</small></div><div class="about-window-product"><b>▧</b><span>Produk pilihan</span><small>Lihat katalog</small></div>`}</div></div></div>
          </div>
          <div class="about-device-phone"><div class="about-phone-speaker"></div><div class="about-phone-brand"><img src="assets/logo/zen-mark.svg" alt=""><b>ZEN STORE</b></div><div class="about-phone-banner">Belanja lebih mudah<br><strong>mulai dari sini.</strong></div><div class="about-phone-search">⌕ Cari produk</div><div class="about-phone-tiles"><i>▧</i><i>◈</i><i>⌘</i><i>✦</i></div><small>Explore · Discover · Shop</small></div>
          <div class="about-ui-chip about-ui-chip--one"><span>⌕</span> Search products</div><div class="about-ui-chip about-ui-chip--two"><span>✓</span> Easy experience</div>
        </div>
      </section>

      <section class="about-benefits" id="about-benefits" data-reveal>
        <div class="about-section-head"><div><span class="about-section-index">02 — WHY ZEN STORE</span><p class="about-overline">DIBUAT UNTUK MEMUDAHKAN</p><h2>Belanja dengan cara<br><span>yang lebih sederhana.</span></h2></div><p>Setiap bagian dirancang untuk membantu pengunjung menjelajahi produk, memahami informasi, dan melanjutkan pemesanan dengan lebih praktis.</p></div>
        <div class="about-feature-grid">
          <article class="about-feature about-feature--blue"><div class="about-feature-top"><span>01 / PRACTICAL</span><i>${aboutIcon('bag')}</i></div><div class="about-feature-art about-feature-art--bag"><div class="about-bag-shape">Z</div><span class="about-art-orbit"></span></div><h3>Belanja Lebih Praktis</h3><p>Temukan dan jelajahi berbagai produk melalui tampilan website yang mudah digunakan.</p><a href="products.html" aria-label="Jelajahi katalog">↗</a></article>
          <article class="about-feature about-feature--cyan"><div class="about-feature-top"><span>02 / INFORMATION</span><i>${aboutIcon('info')}</i></div><div class="about-feature-art about-feature-art--info"><div class="about-info-sheet"><b>PRODUCT INFO</b><i></i><i></i><i class="short"></i><span>✓</span></div></div><h3>Informasi Produk</h3><p>Dapatkan informasi produk yang tersusun secara jelas untuk membantu proses pemilihan.</p><a href="products.html" aria-label="Lihat informasi produk">↗</a></article>
          <article class="about-feature about-feature--violet"><div class="about-feature-top"><span>03 / EASY ORDER</span><i>${aboutIcon('cart')}</i></div><div class="about-feature-art about-feature-art--cart"><div class="about-cart-orb">${aboutIcon('cart')}</div><span class="about-cart-spark">✦</span><span class="about-cart-dot"></span></div><h3>Pemesanan Mudah</h3><p>Nikmati proses pemesanan yang dirancang agar lebih praktis dan mudah dipahami.</p><a href="cart.html" aria-label="Buka keranjang">↗</a></article>
          <article class="about-feature about-feature--navy"><div class="about-feature-top"><span>04 / CUSTOMER CARE</span><i>${aboutIcon('headphones')}</i></div><div class="about-feature-art about-feature-art--care"><div class="about-care-ring">${aboutIcon('chat')}</div><span class="about-care-bubble">Hello!</span></div><h3>Layanan Pelanggan</h3><p>Informasi dan konfirmasi pesanan dapat dilakukan melalui kontak layanan toko yang tersedia.</p><a href="contact.html" aria-label="Hubungi ZEN STORE">↗</a></article>
        </div>
      </section>

      <section class="about-journey" data-reveal>
        <div class="about-journey-head"><span class="about-section-index">03 — HOW IT WORKS</span><p class="about-overline">LANGKAH YANG MUDAH DIIKUTI</p><h2>Mulai dari temukan,<br><span>hingga pesanan terkonfirmasi.</span></h2><p>Alur berbelanja dibuat sederhana agar setiap langkah mudah dipahami.</p></div>
        <div class="about-timeline"><div class="about-timeline-line"><span></span></div>
          <article class="about-step"><div class="about-step-number">01</div><div class="about-step-icon">${aboutIcon('search')}</div><span class="about-step-label">DISCOVER</span><h3>Pilih Produk</h3><p>Jelajahi katalog dan temukan produk yang ingin dibeli.</p></article>
          <article class="about-step"><div class="about-step-number">02</div><div class="about-step-icon">${aboutIcon('cart')}</div><span class="about-step-label">ORDER</span><h3>Lakukan Pemesanan</h3><p>Tambahkan produk ke keranjang dan lanjutkan proses checkout.</p></article>
          <article class="about-step"><div class="about-step-number">03</div><div class="about-step-icon">${aboutIcon('chat')}</div><span class="about-step-label">CONFIRM</span><h3>Konfirmasi Pesanan</h3><p>Ikuti proses konfirmasi pesanan melalui WhatsApp sesuai prosedur yang tersedia di website.</p></article>
        </div>
      </section>

      <section class="about-services" data-reveal>
        <div class="about-service-intro"><span class="about-section-index">04 — SERVICE INFORMATION</span><p class="about-overline">INFORMASI SEBELUM MEMESAN</p><h2>Detail layanan,<br><span>tetap transparan.</span></h2><p>Informasi berikut membantu Anda memahami hal-hal yang akan dikonfirmasi saat proses pemesanan.</p></div>
        <div class="about-service-cards">
          <article class="about-service-card about-service-shipping"><div class="about-service-icon">${aboutIcon('truck')}</div><div><span>DELIVERY INFORMATION</span><h3>Informasi Pengiriman</h3><p>Informasi pengiriman dan detail pesanan akan dikonfirmasi oleh pihak toko.</p></div><div class="about-service-decoration">↗</div></article>
          <article class="about-service-card about-service-payment"><div class="about-service-icon">${aboutIcon('wallet')}</div><div><span>PAYMENT INFORMATION</span><h3>Informasi Pembayaran</h3><p>Metode pembayaran dan konfirmasi pembayaran akan diinformasikan setelah pesanan dibahas melalui WhatsApp.</p></div><div class="about-service-decoration">✦</div></article>
        </div>
      </section>

      <section class="about-showcase" data-reveal>
        <div class="about-showcase-copy"><span class="about-section-index">05 — THE ZEN EXPERIENCE</span><p class="about-overline">A CLOSER LOOK</p><h2>Temukan pengalaman<br><span>ZEN STORE.</span></h2><p>Mulai dari pencarian, katalog, hingga keranjang belanja—jelajahi fitur yang memang tersedia di website dalam satu pengalaman yang terhubung.</p><a class="about-showcase-link" href="index.html">Kunjungi beranda <b>↗</b></a></div>
        <div class="about-showcase-visual"><div class="about-showcase-glow"></div><div class="about-showcase-browser"><div class="about-showcase-top"><img src="assets/logo/zen-lockup.svg" alt="ZEN STORE"><span>ZEN STORE <i>● ● ●</i></span></div><div class="about-showcase-screen"><div class="about-showcase-copyline"><small>BETTER LIFE, BETTER YOU</small><b>Belanja mudah,<br>pilihan di tangan.</b><span></span></div><div class="about-showcase-products"><div><b>▧</b><small>Produk</small></div><div><b>◈</b><small>Kategori</small></div><div><b>♡</b><small>Wishlist</small></div></div><div class="about-showcase-search">⌕ <span>Cari produk...</span></div></div></div><div class="about-showcase-phone"><div class="about-phone-speaker"></div><img src="assets/logo/zen-mark.svg" alt=""><strong>ZEN STORE</strong><div class="about-phone-mini-banner">Explore<br><b>your choice.</b></div><div class="about-phone-mini-row"><i>▧</i><i>◈</i><i>⌘</i></div></div><div class="about-showcase-float"><span>✦</span><b>One connected<br>shopping space</b></div></div>
      </section>

      <section class="about-cta" data-reveal><div class="about-cta-pattern"></div><div class="about-cta-copy"><span>YOUR NEXT SHOPPING EXPERIENCE</span><h2>Siap Menjelajahi<br>ZEN STORE?</h2><p>Temukan berbagai pilihan produk dan nikmati pengalaman berbelanja yang lebih praktis bersama ZEN STORE.</p><a href="index.html" class="about-cta-btn">Mulai Belanja <b>↗</b></a></div><div class="about-cta-art"><div class="about-cta-ring"></div><img src="assets/images/hero-featured.svg" alt="Ilustrasi pilihan produk ZEN STORE" loading="lazy"><span class="about-cta-orbit">ZEN STORE · SHOP · DISCOVER</span></div></section>
    </div>`;
  }
  function bestseller(){
    const s=state();
    const visible=s.products.filter(p=>p.published!==false&&!p.demo);
    const confirmedStatuses=new Set(['Diproses','Dikirim','Selesai']);
    const confirmedOrders=s.orders.filter(o=>confirmedStatuses.has(String(o.status||'').trim()));
    const units=new Map();
    confirmedOrders.forEach(order=>(order.items||[]).forEach(item=>{
      const id=item.id||visible.find(p=>p.name===item.name)?.id;
      const qty=Math.max(0,Number(item.qty)||0);
      if(id&&qty)units.set(id,(units.get(id)||0)+qty);
    }));
    const ranked=visible.map(p=>({...p,unitsSold:units.get(p.id)||0}))
      .filter(p=>p.unitsSold>0)
      .sort((a,b)=>b.unitsSold-a.unitsSold||String(a.name).localeCompare(String(b.name),'id'));
    const totalUnits=ranked.reduce((sum,p)=>sum+p.unitsSold,0);
    const rankCards=ranked.map((p,i)=>`<div class="bestseller-ranked-card"><span class="bestseller-rank">#${i+1} <small>TERLARIS</small></span>${productCard(p)}<div class="bestseller-sold">${p.unitsSold.toLocaleString('id-ID')} unit terjual</div></div>`).join('');
    return `<section class="bestseller-hero"><div class="bestseller-hero-copy"><span class="bestseller-kicker">ZEN STORE · CUSTOMER PICKS</span><h1>Produk <span>Terlaris</span></h1><p>Temukan produk yang paling banyak dipesan berdasarkan pesanan yang sudah dikonfirmasi di ZEN STORE.</p><a class="about-primary-btn" href="products.html">Jelajahi Semua Produk <span>↗</span></a></div><div class="bestseller-hero-art"><div class="bestseller-art-orbit"></div><img src="assets/images/hero-featured.svg" alt="Ilustrasi produk pilihan ZEN STORE" loading="lazy"><div class="bestseller-art-tag">✦ CUSTOMER PICKS</div></div><div class="bestseller-hero-foot"><span>RANKING BERDASARKAN DATA PESANAN</span><span>${ranked.length?`${ranked.length} produk · ${totalUnits.toLocaleString('id-ID')} unit terjual`:'MENUNGGU DATA PENJUALAN'}</span></div></section>
      <section class="bestseller-content"><div class="bestseller-heading"><div><span class="about-section-index">CURATED BY CUSTOMER ORDERS</span><h2>Favorit pelanggan<span>.</span></h2><p>Urutan dihitung dari jumlah unit pada pesanan berstatus Diproses, Dikirim, atau Selesai. Pesanan yang dibatalkan dan masih menunggu konfirmasi tidak dihitung.</p></div><a class="about-text-link" href="products.html">Lihat katalog <b>↗</b></a></div>
      <div class="notice bestseller-data-note"><strong>Catatan data:</strong> karena website ini menggunakan penyimpanan browser (LocalStorage), peringkat hanya berdasarkan pesanan yang tersimpan pada browser/perangkat ini dan tidak otomatis tersinkron dengan perangkat pengunjung lain.</div>
      ${ranked.length?`<div class="product-grid bestseller-grid">${rankCards}</div>`:`<div class="empty-state bestseller-empty"><div class="empty-icon">✧</div><h3>Belum ada data produk terlaris</h3><p>Produk akan masuk ke daftar ini setelah terdapat pesanan yang dikonfirmasi dan statusnya diperbarui menjadi Diproses, Dikirim, atau Selesai.</p><a class="btn" href="products.html">Jelajahi Katalog →</a></div>`}</section>`;
  }
  function contact(){const d=state().developer,developerName=d.name||'MUSYAFFA HANIF SUNNI',developerRole=d.role||'TJKT Enthusiast';return `<section class="contact-page"><article class="contact-intro-card"><div class="contact-intro-icon" aria-hidden="true">✦</div><div class="contact-intro-copy"><span class="contact-kicker">ZEN STORE · CONTACT</span><h1>Hubungi Kami</h1><p>Temukan informasi mengenai ZEN STORE dan hubungi developer melalui informasi kontak yang tersedia di bawah ini.</p></div><div class="contact-intro-orbit" aria-hidden="true"></div></article><section class="developer-profile-card contact-developer-card" aria-label="Profil developer"><div class="developer-profile-main"><span class="developer-kicker">DEVELOPER</span><h2>${esc(developerName)}</h2><p class="developer-subtitle">${esc(developerRole)}</p></div><div class="developer-profile-details"><div class="developer-detail"><span class="developer-detail-icon" aria-hidden="true">▤</span><div><small>SEKOLAH</small><strong>SMK NEGERI 1 ADIWERNA</strong></div></div><div class="developer-detail"><span class="developer-detail-icon" aria-hidden="true">⌘</span><div><small>JURUSAN</small><strong>Teknik Jaringan Komputer dan Telekomunikasi (TJKT)</strong></div></div></div><div class="developer-contact-list"><a class="developer-contact-item" href="https://wa.me/6282221101650" target="_blank" rel="noopener noreferrer"><span class="developer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.1L4 20l1.1-4a8.2 8.2 0 1 1 15.1-4.2Z"/><path d="M9 8.5c.3-.7.7-.6 1-.6l.8 1.8-.8 1c.7 1.3 1.6 2.1 2.9 2.7l.9-.9 1.8.8c.1.8-.4 1.5-1 1.7-1.2.4-3.1-.6-4.6-2.1-1.6-1.6-2.4-3.4-1.9-4.4Z"/></svg></span><span><small>WHATSAPP</small><strong>0822 2110 1650</strong></span><span class="developer-contact-arrow" aria-hidden="true">↗</span></a><div class="developer-contact-item developer-address"><span class="developer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.3"/></svg></span><span><small>ALAMAT</small><strong>Indonesia, Jawa Tengah, Kabupaten Tegal.</strong></span></div><a class="developer-contact-item" href="mailto:gzberhanif@gmail.com"><span class="developer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4.5 7 7.5 6 7.5-6"/></svg></span><span><small>GMAIL</small><strong>gzberhanif@gmail.com</strong></span><span class="developer-contact-arrow" aria-hidden="true">↗</span></a></div></section></section>`;}
  function promo(){const active=state().promotions.filter(p=>p.enabled!==false);return `${pageHero('Promo & Penawaran','Informasi promo resmi yang diatur oleh Admin ZEN STORE.')} ${active.length?`<div class="info-grid">${active.map(p=>`<article class="info-card"><span class="info-icon">％</span><div><strong>${esc(p.title)}</strong><p>${esc(p.description||'')}</p></div></article>`).join('')}</div>`:`<div class="empty-state"><div class="empty-icon">◇</div><h3>Belum ada promo aktif</h3><p>Informasi promo akan ditampilkan di sini setelah ditambahkan oleh pengelola toko.</p></div>`}`;}
  function detail(){const id=new URLSearchParams(location.search).get('id');const p=state().products.find(x=>x.id===id&&x.published!==false&&!x.demo);if(!p)return `${pageHero('Detail Produk','Informasi produk ZEN STORE.')}<div class="empty-state"><h3>Produk tidak ditemukan</h3><p>Produk mungkin sudah dihapus atau belum dipublikasikan.</p><a class="btn" href="products.html">Kembali ke Katalog</a></div>`;return `${pageHero('Detail Produk',esc(p.name))}<div class="cart-layout"><div class="product-image" style="height:340px;border-radius:16px;border:1px solid var(--line)">${p.image?`<img src="${esc(p.image)}" alt="${esc(p.name)}">`:'<span class="product-placeholder">▧</span>'}</div><div class="content-card"><span class="status">${esc((state().categories.find(c=>c.id===p.category)||{}).name||'Produk')}</span><h1 style="font:800 25px Manrope;margin:12px 0 5px">${esc(p.name)}</h1><div class="product-price" style="font-size:22px">${S.money(p.price)}</div><p class="muted" style="font-size:12px">Stok tersedia: ${Number(p.stock)||0}</p><p style="font-size:13px;white-space:pre-wrap">${esc(p.description||'Belum ada deskripsi produk.')}</p><div class="form-field" style="max-width:110px;margin:15px 0"><label for="detail-qty">Jumlah</label><input class="field" id="detail-qty" type="number" min="1" max="${Math.max(1,Number(p.stock)||1)}" value="1"></div><div class="product-actions"><button class="btn" data-action="detail-add" data-id="${esc(p.id)}">Tambah ke Keranjang</button><button class="heart-btn ${state().wishlist.includes(p.id)?'active':''}" data-action="toggle-wishlist" data-id="${esc(p.id)}">♡</button></div></div></div>`;}
  function toast(msg,type=''){const host=document.querySelector('.toast-host')||(()=>{const e=document.createElement('div');e.className='toast-host';document.body.append(e);return e;})();const t=document.createElement('div');t.className='toast '+type;t.textContent=msg;host.append(t);setTimeout(()=>t.remove(),3000);}
  function updateCounts(){document.querySelectorAll('.count-pill').forEach((el,i)=>{el.textContent=i===0?state().wishlist.length:state().cart.reduce((n,x)=>n+x.qty,0);});}
  function toggleTheme(){const current=document.documentElement.dataset.theme;const next=current==='dark'?'light':'dark';document.documentElement.dataset.theme=next;localStorage.setItem('zen_theme',next);const icon=document.getElementById('theme-icon');if(icon)icon.innerHTML=svgIcon(next==='dark'?'moon':'sun');const themeButton=document.querySelector('.theme-action');if(themeButton)themeButton.setAttribute('aria-label',`Ganti ke ${next==='dark'?'Light':'Dark'} Mode`);if(!state().settings.logo){const logo=`assets/logo/zen-lockup${next==='dark'?'-dark':''}.svg`;const brand=document.querySelector('.brand img');const foot=document.querySelector('.footer-brand img');if(brand)brand.src=logo;if(foot)foot.src=logo;}}
  function initTheme(){const saved=localStorage.getItem('zen_theme');const prefers=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;const theme=saved||(prefers?'dark':'light');document.documentElement.dataset.theme=theme;}
  function startSlider(){
    const el=document.getElementById('hero-slider');
    if(!el)return;
    const track=document.getElementById('hero-track');
    if(!track)return;

    clearTimeout(sliderTimer);
    clearTimeout(sliderProgressTimer);
    track.querySelectorAll('.hero-slide--clone').forEach(node=>node.remove());
    sliderOriginalSlides=[...track.querySelectorAll('.hero-slide:not(.hero-slide--clone)')];
    sliderDots=[...el.querySelectorAll('.hero-dot')];
    sliderBar=document.getElementById('hero-progress');
    const currentCount=document.getElementById('hero-current');
    if(!sliderOriginalSlides.length)return;

    sliderTrack=track;
    sliderIndex=sliderOriginalSlides.length>1?1:0;
    sliderTransitioning=false;
    const reduceMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const slideCount=sliderOriginalSlides.length;

    // Lock the track into a real horizontal flex row. Slides are never hidden or swapped.
    track.style.display='flex';
    track.style.flexDirection='row';
    track.style.flexWrap='nowrap';
    track.style.width='100%';
    track.style.willChange='transform';

    if(slideCount>1){
      const first=sliderOriginalSlides[0].cloneNode(true);
      const last=sliderOriginalSlides[slideCount-1].cloneNode(true);
      first.classList.add('hero-slide--clone');
      last.classList.add('hero-slide--clone');
      first.setAttribute('aria-hidden','true');
      last.setAttribute('aria-hidden','true');
      first.querySelectorAll('a,button,input,select,textarea,[tabindex]').forEach(node=>node.setAttribute('tabindex','-1'));
      last.querySelectorAll('a,button,input,select,textarea,[tabindex]').forEach(node=>node.setAttribute('tabindex','-1'));
      first.removeAttribute('data-slide');
      last.removeAttribute('data-slide');
      track.insertBefore(last,track.firstChild);
      track.appendChild(first);
    }

    function logicalIndex(){return slideCount>1?(sliderIndex-1+slideCount)%slideCount:0;}
    function syncControls(){
      const logical=logicalIndex();
      sliderOriginalSlides.forEach((slide,i)=>{
        slide.classList.toggle('active',i===logical);
        slide.setAttribute('aria-hidden',i===logical?'false':'true');
      });
      sliderDots.forEach((dot,i)=>{
        const active=i===logical;
        dot.classList.toggle('active',active);
        dot.setAttribute('aria-pressed',active?'true':'false');
      });
      if(currentCount)currentCount.textContent=String(logical+1).padStart(2,'0');
    }
    function applyPosition(animate){
      if(!sliderTrack)return;
      sliderTrack.style.transition=animate&&!reduceMotion()
        ?'transform 820ms cubic-bezier(.65,0,.35,1)'
        :'none';
      sliderTrack.style.transform=`translateX(-${sliderIndex*100}%)`;
      syncControls();
      if(!animate||reduceMotion())void sliderTrack.offsetWidth;
    }

    function clearTransitionFallback(){
      if(sliderProgressTimer){clearTimeout(sliderProgressTimer);sliderProgressTimer=null;}
    }
    function settleTransition(){
      if(!sliderTrack||!sliderTransitioning)return;
      clearTransitionFallback();
      if(sliderIndex===0||sliderIndex===slideCount+1){
        // The clone and its real counterpart are visually identical; jump only after
        // the slide animation has completed, with transitions disabled for one frame.
        sliderIndex=sliderIndex===0?slideCount:1;
        sliderTrack.style.transition='none';
        sliderTrack.style.transform=`translateX(-${sliderIndex*100}%)`;
        void sliderTrack.offsetWidth;
        requestAnimationFrame(()=>{
          if(!sliderTrack)return;
          sliderTrack.style.transition='transform 820ms cubic-bezier(.65,0,.35,1)';
          sliderTransitioning=false;
          syncControls();
          scheduleAutoplay();
        });
      }else{
        sliderTransitioning=false;
        syncControls();
        scheduleAutoplay();
      }
    }

    if(track.dataset.continuousBound!=='true'){
      track.dataset.continuousBound='true';
      track.addEventListener('transitionend',event=>{
        if(event.target===track&&event.propertyName==='transform')settleTransition();
      });
    }

    // Start on the first real slide without animating in from the clone.
    applyPosition(false);
    requestAnimationFrame(()=>{
      if(sliderTrack)sliderTrack.style.transition='transform 820ms cubic-bezier(.65,0,.35,1)';
    });

    function resetProgress(){
      if(!sliderBar)return;
      sliderBar.style.transition='none';
      sliderBar.style.width='0%';
      if(reduceMotion())return;
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        if(!sliderBar)return;
        sliderBar.style.transition='width 5s linear';
        sliderBar.style.width='100%';
      }));
    }
    function scheduleAutoplay(){
      clearTimeout(sliderTimer);
      resetProgress();
      if(!reduceMotion()&&!sliderPaused&&!document.hidden&&slideCount>1){
        sliderTimer=setTimeout(()=>{
          moveSlider(sliderIndex+1,true);
        },5000);
      }
    }
    function moveSlider(target,fromAutoplay=false){
      if(!sliderTrack||slideCount<2||sliderTransitioning)return;
      if(target===sliderIndex){scheduleAutoplay();return;}
      sliderTransitioning=true;
      sliderIndex=target;
      applyPosition(true);
      if(reduceMotion()){
        settleTransition();
        return;
      }
      // Fallback for browsers that throttle or omit transitionend.
      clearTransitionFallback();
      sliderProgressTimer=setTimeout(settleTransition,1000);
      if(!fromAutoplay)scheduleAutoplay();
      else resetProgress();
    }
    function pause(){sliderPaused=true;clearTimeout(sliderTimer);}
    function resume(){sliderPaused=false;scheduleAutoplay();}

    if(el.dataset.sliderBound!=='true'){
      el.dataset.sliderBound='true';
      el.addEventListener('mouseenter',pause);
      el.addEventListener('mouseleave',resume);
      el.addEventListener('focusin',pause);
      el.addEventListener('focusout',event=>{if(!el.contains(event.relatedTarget))resume();});
      el.addEventListener('keydown',event=>{
        if(event.key==='ArrowRight'){event.preventDefault();moveSlider(sliderIndex+1);}
        if(event.key==='ArrowLeft'){event.preventDefault();moveSlider(sliderIndex-1);}
      });
      let touchX=0;
      el.addEventListener('touchstart',event=>{touchX=event.changedTouches[0].clientX;pause();},{passive:true});
      el.addEventListener('touchend',event=>{
        const delta=event.changedTouches[0].clientX-touchX;
        if(Math.abs(delta)>45)moveSlider(sliderIndex+(delta<0?1:-1));
        resume();
      },{passive:true});
      document.addEventListener('visibilitychange',()=>{
        if(document.hidden)clearTimeout(sliderTimer);
        else if(!sliderPaused)scheduleAutoplay();
      });
    }

    window.zenSliderSetTo=index=>{
      const target=Math.max(0,Math.min(slideCount-1,Number(index)||0));
      if(slideCount>1)moveSlider(target+1);
    };
    window.zenSliderMove=moveSlider;
    window.zenSliderResume=resume;
    scheduleAutoplay();
  }
  function addToCart(id,qty=1){const s=state(),p=s.products.find(x=>x.id===id);if(!p||p.published===false||p.demo){toast('Produk tidak tersedia.','error');return;}const stock=Math.max(0,Number(p.stock)||0);const item=s.cart.find(x=>x.id===id);const next=(item?.qty||0)+qty;if(stock<1||next>stock){toast('Jumlah melebihi stok yang tersedia.','error');return;}if(item)item.qty=next;else s.cart.push({id,qty});S.persist();updateCounts();toast('Produk ditambahkan ke keranjang.');}
  function toggleWishlist(id){const s=state(),i=s.wishlist.indexOf(id);if(i>=0)s.wishlist.splice(i,1);else s.wishlist.push(id);S.persist();toast(i>=0?'Produk dihapus dari Wishlist.':'Produk ditambahkan ke Wishlist.');render();}
  function updateQty(id,delta){const s=state(),it=s.cart.find(x=>x.id===id),p=s.products.find(x=>x.id===id);if(!it||!p)return;const qty=it.qty+delta;if(qty<1){s.cart=s.cart.filter(x=>x.id!==id);}else if(qty>(Number(p.stock)||0)){toast('Jumlah melebihi stok.','error');return;}else it.qty=qty;S.persist();render();}
  function bind(){app.addEventListener('click',e=>{const navLink=e.target.closest('.nav-link');if(navLink)document.getElementById('nav-row')?.classList.remove('mobile-open');const el=e.target.closest('[data-action]');if(!el)return;const a=el.dataset.action,id=el.dataset.id;if(a==='theme')toggleTheme();if(a==='account-info')toast('Akun pelanggan belum diaktifkan pada versi statis. Anda tetap dapat membuat pesanan tanpa login.');if(a==='mobile-menu')document.getElementById('nav-row')?.classList.toggle('mobile-open');if(a==='slide-prev')startSliderStep(-1);if(a==='slide-next')startSliderStep(1);if(a==='slide-to'){window.zenSliderSetTo?.(Number(el.dataset.index)||0);}if(a==='add-cart')addToCart(id);if(a==='detail-add'){const qty=Math.max(1,Number(document.getElementById('detail-qty')?.value)||1);addToCart(id,qty);}if(a==='toggle-wishlist')toggleWishlist(id);if(a==='remove-cart'){const s=state();s.cart=s.cart.filter(x=>x.id!==id);S.persist();render();}if(a==='qty-minus')updateQty(id,-1);if(a==='qty-plus')updateQty(id,1);});
    const search=document.getElementById('global-search');search?.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(search),q=String(fd.get('q')||'').trim(),cat=String(fd.get('category')||'');location.href='products.html?'+new URLSearchParams({q,category:cat}).toString();});
    document.getElementById('catalog-q')?.addEventListener('keydown',e=>{if(e.key==='Enter')catalogFilter();});document.getElementById('catalog-category')?.addEventListener('change',catalogFilter);document.getElementById('catalog-sort')?.addEventListener('change',catalogFilter);
    document.getElementById('checkout-form')?.addEventListener('submit',submitCheckout);
  }
  function startSliderStep(d){if(!sliderTrack||sliderOriginalSlides.length<2||sliderTransitioning)return;window.zenSliderMove?.(sliderIndex+d);}
  function catalogFilter(){const q=document.getElementById('catalog-q')?.value||'',cat=document.getElementById('catalog-category')?.value||'',sort=document.getElementById('catalog-sort')?.value||'new';location.href='products.html?'+new URLSearchParams({q,category:cat,sort}).toString();}
  function submitCheckout(e){e.preventDefault();const s=state(),fd=new FormData(e.target),rows=s.cart.map(i=>({i,p:s.products.find(p=>p.id===i.id)})).filter(x=>x.p&&x.p.published!==false&&!x.p.demo);if(!rows.length){toast('Keranjang kosong.','error');return;}for(const x of rows){if(x.i.qty>(Number(x.p.stock)||0)){toast('Stok produk '+x.p.name+' tidak mencukupi.','error');return;}}
    const phone=String(s.settings.whatsapp||'').replace(/\D/g,'');if(!phone){toast('Nomor WhatsApp toko belum diatur. Hubungi Admin.','error');return;}
    const total=rows.reduce((n,x)=>n+x.p.price*x.i.qty,0),order={id:'ZEN-'+Date.now().toString(36).toUpperCase(),createdAt:Date.now(),name:fd.get('name'),phone:fd.get('phone'),address:fd.get('address'),note:fd.get('note'),items:rows.map(x=>({id:x.p.id,name:x.p.name,price:x.p.price,qty:x.i.qty})),total,status:'Menunggu Konfirmasi'};s.orders.push(order);S.persist();
    const lines=['Halo ZEN STORE, saya ingin mengonfirmasi pesanan berikut.','',`Nomor Pesanan: ${order.id}`,`Nama: ${order.name}`,`Telepon: ${order.phone}`,`Alamat: ${order.address}`,'','Daftar Produk:',...order.items.map(x=>`- ${x.name} x${x.qty} — ${S.money(x.price*x.qty)}`),'',`Total: ${S.money(total)}`,`Catatan: ${order.note||'-'}`,'','Mohon konfirmasi ketersediaan dan proses selanjutnya.'];const url='https://wa.me/'+phone+'?text='+encodeURIComponent(lines.join('\n'));s.cart=[];S.persist();window.open(url,'_blank','noopener');toast('Ringkasan pesanan disiapkan. Konfirmasi melalui WhatsApp.');setTimeout(()=>location.href='orders.html',700);
  }
  function initAboutReveal(){
    const nodes=document.querySelectorAll('[data-reveal]');
    if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){nodes.forEach(n=>n.classList.add('is-visible'));return;}
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});
    nodes.forEach(node=>observer.observe(node));
  }
  function render(){initTheme();document.title=(document.querySelector('title')?.textContent||'ZEN STORE');const content=({home,catalog,bestseller,wishlist,cart,checkout,orders,about,contact,promo,detail}[page]||home)();app.innerHTML=header()+`<main class="container">${content}</main>`+footer();const theme=document.getElementById('theme-icon');if(theme)theme.innerHTML=svgIcon(document.documentElement.dataset.theme==='dark'?'moon':'sun');bind();if(page==='home')startSlider();if(page==='about')initAboutReveal();}
  render();
})();
