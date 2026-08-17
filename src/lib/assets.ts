// Assets are served from /public/media so they work identically on the Lovable
// preview, Vercel, and any custom domain (no host-specific asset proxy).


export const ASSETS = {
  background: "/media/BACKGROUND_UTAMA.png",
  ornamentTopLeft: "/media/ORNAMEN_POJOK_KIRI_ATAS.png",
  ornamentTopRight: "/media/ORNAMEN_POJOK_KANAN_ATAS.png",
  ornamentBottomLeft: "/media/ORNAMEN_POJOK_KIRI_BAWAH.png",
  ornamentBottomRight: "/media/ORNAMEN_POJOK_KANAN_BAWAH.png",
  couple: "/media/Poto_mempelai.png",
  groom: "/media/Profil_mempelai_pria.png",
  bride: "/media/Profil_mempelai_wanita.png",
  qris: "/media/QRIS.jpg",
  music: "/media/Kabagyan.mp3",
  logo: "/media/logo-wedstory.webp",
};

// Everything visible on the cover page — blocks the initial fade-in.
export const COVER_IMAGES = [
  ASSETS.background,
  ASSETS.ornamentTopLeft,
  ASSETS.ornamentTopRight,
  ASSETS.ornamentBottomLeft,
  ASSETS.ornamentBottomRight,
  ASSETS.couple,
];

// Warmed quietly after the cover is on screen.
export const PRELOAD_IMAGES = [ASSETS.groom, ASSETS.bride, ASSETS.qris, ASSETS.logo];

