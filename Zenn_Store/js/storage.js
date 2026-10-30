/* ZEN STORE local data layer. Static hosting stores data only in this browser. */
(function(){
  const KEY='zen_store_data_v1';
  const DEFAULT_CATEGORIES=[
    {id:'cat-smartphone',name:'Smartphone',description:'HP & gadget terbaru',icon:'📱'},
    {id:'cat-laptop',name:'Laptop',description:'Laptop & aksesoris lengkap',icon:'💻'},
    {id:'cat-accessories',name:'Aksesoris',description:'Aksesoris gadget & elektronik',icon:'🎧'},
    {id:'cat-electronics',name:'Elektronik',description:'Peralatan rumah & kantor',icon:'🖥️'},
    {id:'cat-fashion',name:'Fashion',description:'Pakaian & outfit',icon:'👕'},
    {id:'cat-home',name:'Rumah & Dapur',description:'Perlengkapan rumah & dapur',icon:'🏠'},
    {id:'cat-sport',name:'Olahraga',description:'Perlengkapan olahraga',icon:'⚽'},
    {id:'cat-beauty',name:'Kecantikan',description:'Perawatan diri',icon:'🧴'},
    {id:'cat-toys',name:'Mainan',description:'Mainan anak & hobi',icon:'🎮'},
    {id:'cat-books',name:'Buku',description:'Buku & alat tulis',icon:'📚'},
    {id:'cat-other',name:'Lainnya',description:'Produk kategori lainnya',icon:'•••'}
  ];
  const DEFAULT_BANNERS=[
    {id:'banner-main',type:'main',eyebrow:'✦ Nikmati Pengalaman Belanja',title:'Temukan Produk Pilihan',highlight:'Terbaikmu',description:'Jelajahi berbagai pilihan produk dan informasi yang tersusun jelas, hanya di ZEN STORE.',buttonText:'Mulai Belanja',link:'products.html',enabled:true,sort:1},
    {id:'banner-promo',type:'promo',eyebrow:'✦ Sorotan Promo',title:'Temukan Penawaran',highlight:'Pilihanmu',description:'Lihat informasi promo yang tersedia di ZEN STORE. Detail penawaran mengikuti informasi yang ditambahkan oleh Admin.',buttonText:'Lihat Promo',link:'promo.html',enabled:true,sort:2},
    {id:'banner-new',type:'new',eyebrow:'✦ Product Showcase',title:'Jelajahi Katalog',highlight:'ZEN STORE',description:'Temukan berbagai produk yang telah dipublikasikan beserta detail informasinya.',buttonText:'Jelajahi Katalog',link:'products.html',enabled:true,sort:3},
    {id:'banner-featured',type:'experience',eyebrow:'✦ Digital Lifestyle',title:'Belanja Lebih Mudah',highlight:'Dari Mana Saja',description:'Cari produk, simpan favorit, dan lanjutkan pemesanan melalui alur yang mudah dipahami.',buttonText:'Mulai Jelajahi',link:'products.html',enabled:true,sort:4},
    {id:'banner-highlight',type:'highlight',eyebrow:'✦ Shopping Experience',title:'Jelajahi ZEN STORE',highlight:'Lebih Praktis',description:'Lihat katalog, informasi produk, dan layanan toko dalam satu pengalaman digital.',buttonText:'Kenali ZEN STORE',link:'about.html',enabled:true,sort:5}
  ];
  const DEFAULT_SETTINGS={storeName:'ZEN STORE',tagline:'Better Life, Better You',description:'ZEN STORE adalah proyek toko online dengan fokus pada pengalaman belanja yang mudah, informatif, dan nyaman.',logo:'',whatsapp:'',email:'',address:'',instagram:'',tiktok:'',shippingInfo:'Informasi pengiriman akan dikonfirmasi oleh tim toko.',paymentInfo:'Metode pembayaran dikonfirmasi setelah pesanan dibahas melalui WhatsApp.',serviceCards:[{icon:'🚚',title:'Informasi Pengiriman',description:'Detail pengiriman dikonfirmasi saat pemesanan.'},{icon:'🛡️',title:'Informasi Produk',description:'Keterangan produk mengikuti data yang dimasukkan Admin.'},{icon:'💳',title:'Konfirmasi Pembayaran',description:'Tanyakan metode pembayaran yang tersedia.'},{icon:'🎧',title:'Bantuan Pelanggan',description:'Hubungi tim toko melalui kontak yang tersedia.'}]};
  const DEFAULT_DEVELOPER={name:'',role:'',bio:'',photo:'',links:[]};
  function clone(v){return JSON.parse(JSON.stringify(v));}
  function fresh(){return {version:1,products:[],categories:clone(DEFAULT_CATEGORIES),wishlist:[],cart:[],orders:[],banners:clone(DEFAULT_BANNERS),promotions:[],settings:clone(DEFAULT_SETTINGS),developer:clone(DEFAULT_DEVELOPER)};}
  function read(){try{const raw=localStorage.getItem(KEY);if(!raw)return fresh();const s=JSON.parse(raw);const d=fresh();return {...d,...s,categories:Array.isArray(s.categories)?s.categories:d.categories,products:Array.isArray(s.products)?s.products:[],wishlist:Array.isArray(s.wishlist)?s.wishlist:[],cart:Array.isArray(s.cart)?s.cart:[],orders:Array.isArray(s.orders)?s.orders:[],banners:Array.isArray(s.banners)?s.banners:d.banners,promotions:Array.isArray(s.promotions)?s.promotions:[],settings:{...d.settings,...(s.settings||{})},developer:{...d.developer,...(s.developer||{})}};}catch(e){console.warn('Data ZEN STORE tidak dapat dibaca:',e);return fresh();}}
  let state=read();
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));return true;}catch(e){console.error(e);return false;}}
  function get(){return state;}
  function replace(next){state={...fresh(),...next};return persist();}
  function patch(key,value){state[key]=value;return persist();}
  function uid(prefix='id'){return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);}
  function money(n){return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(n)||0);}
  function text(v){return String(v??'').trim();}
  function escape(v){return text(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  window.ZenStore={get,persist,replace,patch,uid,money,escape,DEFAULT_CATEGORIES:clone(DEFAULT_CATEGORIES),DEFAULT_BANNERS:clone(DEFAULT_BANNERS),DEFAULT_SETTINGS:clone(DEFAULT_SETTINGS),KEY};
  if(!localStorage.getItem(KEY)){persist();}
})();
