const INSTAGRAM = "https://www.instagram.com/slimcybertech";
const WHATSAPP_CHANNEL = "https://whatsapp.com/channel/0029Vb8BAyd0G0XYpCcddb3o";
const LOGO = "https://slimcybertech.com/images/Logo.jpeg";

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://slimcybertech.com/#organization",
    name: "SlimCyberTech",
    url: "https://slimcybertech.com",
    logo: {
      "@type": "ImageObject",
      url: LOGO,
    },
    description:
      "SlimCyberTech is a software company in West Nile, Uganda. Web, mobile, AI, security, and consulting.",
    foundingDate: "2020",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Arua",
      addressRegion: "West Nile",
      addressCountry: "UG",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+256772581510",
        email: "info@slimcybertech.com",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [INSTAGRAM, WHATSAPP_CHANNEL],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://slimcybertech.com/#website",
    url: "https://slimcybertech.com",
    name: "SlimCyberTech",
    description: "Software from West Nile, Uganda",
    publisher: {
      "@id": "https://slimcybertech.com/#organization",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://slimcybertech.com/#localbusiness",
    name: "SlimCyberTech",
    image: LOGO,
    url: "https://slimcybertech.com",
    telephone: "+256772581510",
    email: "info@slimcybertech.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Arua",
      addressRegion: "West Nile",
      addressCountry: "UG",
    },
    // Wikipedia: Arua 3°02′07″N 30°54′39″E → 3.03528, 30.91083
    geo: {
      "@type": "GeoCoordinates",
      latitude: 3.03528,
      longitude: 30.91083,
    },
    areaServed: {
      "@type": "Place",
      name: "Africa",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software Development",
    provider: {
      "@id": "https://slimcybertech.com/#organization",
    },
    areaServed: {
      "@type": "Place",
      name: "Africa",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "SlimCyberTech Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Software Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cybersecurity" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Data Analysis" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud & DevOps" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tech Consulting" } },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
