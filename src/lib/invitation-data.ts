import { supabase } from "@/integrations/supabase/client";
import { ASSETS } from "./assets";

export type EventInfo = {
  title: string;
  day: string;
  date: string;
  month: string;
  time: string;
  place: string;
  address: string;
  mapsUrl: string;
};

export type StoryItem = {
  title: string;
  subtitle: string;
  year: string;
  description: string;
};

export type InvitationData = {
  id: string;
  slug: string;
  theme: string;
  musicUrl: string;
  couplePhoto: string;
  groom: { name: string; full: string; father: string; mother: string; photo: string };
  bride: { name: string; full: string; father: string; mother: string; photo: string };
  opening: { title: string; greeting: string; dateLabel: string };
  weddingDate: string;
  akad: EventInfo;
  resepsi: EventInfo;
  quote: { arabic: string; translation: string; source: string };
  loveStory: StoryItem[];
  gift: {
    bank: string;
    account: string;
    holder: string;
    addressName: string;
    address: string;
    qris: string;
  };
  gallery: string[];
};

type ContentRow = Record<string, unknown>;

function text(row: ContentRow, key: string, fallback = "") {
  const value = row[key];
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

function parseStory(value: unknown): StoryItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      title: String(item["title"] ?? ""),
      subtitle: String(item["subtitle"] ?? ""),
      year: String(item["year"] ?? ""),
      description: String(item["description"] ?? ""),
    }));
}

export function mapInvitation(
  invitation: { id: string; slug: string; theme: string; music_url: string },
  content: ContentRow | null,
  photos: { image_url: string; type: string }[] = [],
): InvitationData {
  const row = content ?? {};
  return {
    id: invitation.id,
    slug: invitation.slug,
    theme: invitation.theme,
    musicUrl: invitation.music_url || ASSETS.music,
    couplePhoto: text(row, "couple_photo_url", ASSETS.couple),
    groom: {
      name: text(row, "groom_name", "Mempelai Pria"),
      full: text(row, "groom_full_name", text(row, "groom_name", "Mempelai Pria")),
      father: text(row, "groom_father"),
      mother: text(row, "groom_mother"),
      photo: text(row, "groom_photo_url", ASSETS.groom),
    },
    bride: {
      name: text(row, "bride_name", "Mempelai Wanita"),
      full: text(row, "bride_full_name", text(row, "bride_name", "Mempelai Wanita")),
      father: text(row, "bride_father"),
      mother: text(row, "bride_mother"),
      photo: text(row, "bride_photo_url", ASSETS.bride),
    },
    opening: {
      title: text(row, "opening_title", "The Wedding Of"),
      greeting: text(row, "opening_greeting", "Yth. Bapak/Ibu/Saudara/i"),
      dateLabel: text(row, "opening_date_label"),
    },
    weddingDate: text(row, "wedding_date", new Date().toISOString()),
    akad: {
      title: text(row, "akad_title", "Akad Nikah"),
      day: text(row, "akad_day"),
      date: text(row, "akad_date"),
      month: text(row, "akad_month"),
      time: text(row, "akad_time"),
      place: text(row, "akad_place"),
      address: text(row, "akad_address"),
      mapsUrl: text(row, "akad_maps_url"),
    },
    resepsi: {
      title: text(row, "reception_title", "Resepsi"),
      day: text(row, "reception_day"),
      date: text(row, "reception_date"),
      month: text(row, "reception_month"),
      time: text(row, "reception_time"),
      place: text(row, "reception_place"),
      address: text(row, "reception_address"),
      mapsUrl: text(row, "reception_maps_url"),
    },
    quote: {
      arabic: text(row, "quote_arabic"),
      translation: text(row, "quote_translation"),
      source: text(row, "quote_source"),
    },
    loveStory: parseStory(row["love_story"]),
    gift: {
      bank: text(row, "gift_bank"),
      account: text(row, "gift_account"),
      holder: text(row, "gift_holder"),
      addressName: text(row, "gift_address_name"),
      address: text(row, "gift_address"),
      qris: text(row, "qris_url", ASSETS.qris),
    },
    gallery: photos.filter((p) => p.type === "gallery").map((p) => p.image_url),
  };
}

/** Loads one invitation (design template + its own data) by public slug. */
export async function fetchInvitationBySlug(slug: string): Promise<InvitationData | null> {
  const { data: invitation } = await supabase
    .from("invitations")
    .select("id, slug, theme, music_url")
    .eq("slug", slug.toLowerCase())
    .maybeSingle();
  if (!invitation) return null;

  const [contentRes, photosRes] = await Promise.all([
    supabase
      .from("invitation_content")
      .select("*")
      .eq("invitation_id", invitation.id)
      .maybeSingle(),
    supabase
      .from("invitation_photos")
      .select("image_url, type, sort_order")
      .eq("invitation_id", invitation.id)
      .order("sort_order", { ascending: true }),
  ]);

  return mapInvitation(invitation, contentRes.data as ContentRow | null, photosRes.data ?? []);
}

/** Resolves the personal guest link for a slug + code, if it exists. */
export async function fetchGuestByCode(slug: string, code: string) {
  const { data } = await supabase.rpc("get_guest_by_code", { _slug: slug, _code: code });
  const row = Array.isArray(data) ? data[0] : null;
  return row ?? null;
}

export function invitationUrl(slug: string, code?: string) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return code ? `${origin}/${slug}/${code}` : `${origin}/${slug}`;
}

export function makeGuestCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length: 5 },
    () => alphabet[Math.floor(Math.random() * alphabet.length)],
  ).join("");
}
