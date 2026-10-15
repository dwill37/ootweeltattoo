import Image from "next/image";
import { EnvelopeSimple, FacebookLogo, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Ph } from "@/components/ui/Placeholder";
import { IMG } from "@/lib/images";
import { MESSAGES, NAV_LINKS, PHONE_DISPLAY, PHONE_TEL, SITE, wa } from "@/lib/site";

const SOCIALS = [
  { label: "Instagram", href: SITE.links.instagram, Icon: InstagramLogo },
  { label: "Facebook", href: SITE.links.facebook, Icon: FacebookLogo },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-ink px-5 pb-28 pt-20 text-paper md:px-8 md:pb-12">
      <div className="mx-auto grid max-w-[1360px] grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="relative aspect-[640/484] w-44 overflow-hidden rounded-[var(--radius-photo)]">
            <Image src={IMG.logo.src} alt={IMG.logo.alt} fill sizes="176px" className="object-cover" />
          </div>
          <p translate="no" className="display mt-6 text-3xl">Oot Weel Tattoo</p>
          <p className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-ink-mute-on-dark">Tattoo and piercing studio in Playa del Carmen.</p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-paper">Visit</h2>
          <address className="mt-4 grid gap-2 text-[15px] not-italic leading-relaxed text-ink-mute-on-dark">
            <span>{SITE.address.line1}</span>
            <span>{SITE.address.line2}</span>
            <span>Plus code: JWFF+9J</span>
            <span>
              Open until {SITE.hours.closes} · <Ph>days and opening time</Ph>
            </span>
          </address>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-paper">Contact</h2>
          <ul className="mt-4 grid gap-2 text-[15px] text-ink-mute-on-dark">
            <li>
              <a href={PHONE_TEL} className="hover:text-paper">{PHONE_DISPLAY}</a>
            </li>
            <li>
              <a href={wa(MESSAGES.quote)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-paper">
                <WhatsappLogo size={16} aria-hidden /> WhatsApp
              </a>
            </li>
            <li>
              {SITE.links.email ? (
                <a href={`mailto:${SITE.links.email}`} className="inline-flex items-center gap-1.5 hover:text-paper">
                  <EnvelopeSimple size={16} aria-hidden /> {SITE.links.email}
                </a>
              ) : (
                <Ph>email</Ph>
              )}
            </li>
          </ul>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-paper">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-[15px] text-ink-mute-on-dark">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-paper">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1360px] flex-col-reverse gap-6 border-t border-paper/12 pt-8 text-sm text-ink-mute-on-dark sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Oot Weel Tattoo. All rights reserved.</p>
        <ul className="flex items-center gap-3">
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-11 place-items-center rounded-full bg-paper/8 text-paper transition-colors hover:bg-paper/16">
                  <Icon size={20} aria-hidden />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <span className="grid size-11 place-items-center rounded-full bg-paper/8 text-paper" aria-hidden>
                    <Icon size={20} />
                  </span>
                  <Ph>{label} URL</Ph>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
