/**
 * Single source of truth for business facts.
 * Every value here comes from the Google Business Profile.
 * Anything not confirmed is marked [PLACEHOLDER: ...] so it is easy to find and fill.
 */

export const PHONE_DISPLAY = "+52 998 303 6643";
export const PHONE_TEL = "tel:+529983036643";
const WA_BASE = "https://wa.me/529983036643";

/** WhatsApp link with an English pre-filled message (URL-encoded). */
export function wa(message: string) {
  return `${WA_BASE}?text=${encodeURIComponent(message)}`;
}

export const MESSAGES = {
  quote: "Hi Oot Weel! I saw your website and I'd like a quote for a tattoo.",
  first: "Hi Oot Weel! It would be my first tattoo and I'd like a quote.",
  together: "Hi Oot Weel! We're two people and we'd like to get tattooed together.",
  piercing: "Hi Oot Weel! I saw your website and I'd like to book a piercing.",
  elvis: "Hi Oot Weel! I saw your website and I'd like to book a tattoo with Elvis.",
  style: (style: string) =>
    `Hi Oot Weel! I saw your website and I'd like a quote for a tattoo (${style}).`,
  artist: (name: string) =>
    `Hi Oot Weel! I saw your website and I'd like to book a tattoo with ${name}.`,
} as const;

export const SITE = {
  name: "Oot Weel Tattoo",
  url: "https://ootweeltattoo.com", // [PLACEHOLDER: final domain]
  rating: 4.9,
  reviewCount: 15,
  address: {
    line1: "Avenida 10, between Av. Juárez and Calle 2 Norte", // [PLACEHOLDER: confirm address format and street number]
    line2: "77710 Playa del Carmen, Q.R., México",
    street: "Avenida 10, between Av. Juárez and Calle 2 Norte",
    locality: "Playa del Carmen",
    region: "Quintana Roo",
    postalCode: "77710",
    country: "MX",
  },
  plusCode: "JWFF+9J Playa del Carmen, Quintana Roo, México",
  /**
   * Decoded from plus code JWFF+9J (full code 76GJJWFF+9J).
   * [PLACEHOLDER: verify latitude/longitude on Google Maps]
   */
  geo: { lat: 20.62344, lng: -87.07594 },
  hours: {
    closes: "23:00",
    opens: "[PLACEHOLDER: opening time]",
    days: "[PLACEHOLDER: opening days]",
  },
  links: {
    // Working fallback until the exact Google reviews link is provided.
    googleReviews:
      "https://www.google.com/maps/search/?api=1&query=Oot%20Weel%20tattoo%2C%20Playa%20del%20Carmen", // [PLACEHOLDER: Google reviews link]
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=JWFF%2B9J%20Playa%20del%20Carmen%2C%20Quintana%20Roo",
    mapEmbed:
      "https://maps.google.com/maps?q=20.62344,-87.07594&z=17&hl=en&output=embed", // pin from decoded plus code
    instagram: null as string | null, // [PLACEHOLDER: Instagram URL]
    facebook: null as string | null, // [PLACEHOLDER: Facebook URL]
    email: null as string | null, // [PLACEHOLDER: email]
  },
} as const;

/** Section visibility flags. Flip to false to hide a section or card. */
export const FLAGS = {
  showPiercings: true,
  showStudio: true,
} as const;

export const NAV_LINKS = [
  { href: "#tattoos", label: "Tattoos" },
  ...(FLAGS.showPiercings ? [{ href: "#piercings", label: "Piercings" }] : []),
  { href: "#work", label: "Work" },
  { href: "#artists", label: "Artists" },
  { href: "#reviews", label: "Reviews" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];
