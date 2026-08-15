import background from "@/assets/BACKGROUND_UTAMA.png.asset.json";
import ornamentTopLeft from "@/assets/ORNAMEN_POJOK_KIRI_ATAS.png.asset.json";
import ornamentTopRight from "@/assets/ORNAMEN_POJOK_KANAN_ATAS.png.asset.json";
import ornamentBottomLeft from "@/assets/ORNAMEN_POJOK_KIRI_BAWAH.png.asset.json";
import ornamentBottomRight from "@/assets/ORNAMEN_POJOK_KANAN_BAWAH.png.asset.json";
import couple from "@/assets/Poto_mempelai.png.asset.json";
import groom from "@/assets/Profil_mempelai_pria.png.asset.json";
import bride from "@/assets/Profil_mempelai_wanita.png.asset.json";
import qris from "@/assets/QRIS.jpg.asset.json";
import music from "@/assets/Kabagyan.mp3.asset.json";

export const ASSETS = {
  background: background.url,
  ornamentTopLeft: ornamentTopLeft.url,
  ornamentTopRight: ornamentTopRight.url,
  ornamentBottomLeft: ornamentBottomLeft.url,
  ornamentBottomRight: ornamentBottomRight.url,
  couple: couple.url,
  groom: groom.url,
  bride: bride.url,
  qris: qris.url,
  music: music.url,
};

export const PRELOAD_IMAGES = [
  ASSETS.background,
  ASSETS.ornamentTopLeft,
  ASSETS.ornamentTopRight,
  ASSETS.ornamentBottomLeft,
  ASSETS.ornamentBottomRight,
  ASSETS.couple,
  ASSETS.groom,
  ASSETS.bride,
];
