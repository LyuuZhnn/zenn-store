# ZEN STORE — Critical Slider & Navigation Fix

## Banner carousel
- Uses one horizontal flex track (`display:flex; flex-wrap:nowrap`) with every slide fixed at `flex: 0 0 100%`.
- Moves the entire track using `translateX()`; it does not hide/show or replace slide image sources during navigation.
- Keeps cloned first/last slides for seamless infinite wrapping.
- Uses an 820 ms symmetric easing curve and a 5-second autoplay delay.
- Previous/next, dot navigation, keyboard arrows, and touch swipe share the same movement handler.
- Manual navigation resets the autoplay clock; autoplay pauses during pointer/focus interaction and while the document is hidden.
- Respects `prefers-reduced-motion` and still permits manual slide navigation.

## Navigation bar
- The promotional pill component and its legacy CSS rules have been removed completely.
- The navigation contains only the eight destination links: Beranda, Kategori, Produk Terlaris, Promo, Wishlist, Pesanan, Tentang Kami, and Kontak.
- Desktop lays out all links in one row without flex-shrinking labels.
- Tablet uses horizontal scrolling when the full row does not fit.
- Mobile opens a two-column menu from the hamburger control.
- Shared stylesheet and app-script URLs have cache-busting query versions to prevent stale browser copies.

## QA performed
- JavaScript syntax checks passed for the storefront, storage, and admin app scripts.
- CSS parser reported zero parse errors in all project CSS files.
- Chromium DOM/computed-layout test: 5 original slides + 2 loop clones; horizontal flex track; slide width equals hero viewport width.
- Mid-transition measurement at 410 ms: both neighboring slides were visible in the slider viewport (approximately 64% / 36%).
- Manual next, dot-to-last, last-to-first, and first-to-last loop checks passed.
- Autoplay advanced to the next slide after the 5-second delay.
- Responsive navigation checks passed at 1440 px, 700 px, and 390 px; eight links retained and no promo element remained in the DOM.
- Reduced-motion check passed: manual navigation remained available with transition disabled.

The visual browser test used an isolated Chromium page with the project HTML, CSS, and JavaScript loaded inline because direct local server navigation is restricted in the test environment. The carousel's live computed transforms and element geometry were measured in Chromium.
