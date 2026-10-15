import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Why } from "@/components/sections/Why";
import { Tattoos } from "@/components/sections/Tattoos";
import { Piercings } from "@/components/sections/Piercings";
import { Work } from "@/components/sections/Work";
import { Artists } from "@/components/sections/Artists";
import { Studio } from "@/components/sections/Studio";
import { Reviews } from "@/components/sections/Reviews";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Location } from "@/components/sections/Location";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { FLAGS, SITE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  url: SITE.url,
  image: `${SITE.url}/opengraph-image.jpg`,
  telephone: "+529983036643",
  priceRange: "$$", // [PLACEHOLDER: confirm price range indicator]
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  // Decoded from plus code JWFF+9J. [PLACEHOLDER: verify latitude/longitude]
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  hasMap: SITE.links.directions,
  employee: { "@type": "Person", name: "Elvis", jobTitle: "Tattoo artist" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: SITE.rating,
    reviewCount: SITE.reviewCount,
    bestRating: 5,
  },
  // [PLACEHOLDER: opening days and opening time; only the 23:00 closing time is confirmed]
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00", // [PLACEHOLDER: opening time]
      closes: "23:00",
    },
  ],
};

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Why />
        <Tattoos />
        {FLAGS.showPiercings && <Piercings />}
        <Work />
        <Artists />
        {FLAGS.showStudio && <Studio />}
        <Reviews />
        <HowItWorks />
        <Location />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
