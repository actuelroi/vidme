import React from "react";

interface InfoBlock {
  label: string;
  title?: string;
  description: string;
}

interface JourneySectionProps {
  backgroundLeft: string;
  backgroundRight: string;
  heading: string;
  cta: string;
  blocks: InfoBlock[];
}

const InfoItem: React.FC<InfoBlock> = ({ label, title, description }) => (
  <div className="space-y-3">
    <p className="text-xs tracking-widest text-gray-300 uppercase">{label}</p>
    {title && <h3 className="text-lg font-semibold">{title}</h3>}
    <p className="text-sm leading-relaxed text-gray-200 max-w-sm">{description}</p>
  </div>
);

export const OurJourneySection: React.FC<JourneySectionProps> = ({
  backgroundLeft,
  backgroundRight,
  heading,
  cta,
  blocks,
}) => {
  return (
    <section className="relative w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 text-white">
      {/* Left image */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundLeft})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 p-10 lg:p-16 flex flex-col justify-end h-full">
          <h1 className="font-serif text-4xl lg:text-5xl mb-6">{heading}</h1>
          <button className="w-fit text-sm border-b border-white pb-1 hover:opacity-80 transition">
            {cta}
          </button>
        </div>
      </div>

      {/* Right content */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundRight})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 p-10 lg:p-16">
          {blocks.map((block, idx) => (
            <InfoItem key={idx} {...block} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Preview
export default function Footer() {
  return (
    <OurJourneySection
      backgroundLeft="https://images.unsplash.com/photo-1549893074-0f15b44d53d0"
      backgroundRight="https://images.unsplash.com/photo-1520975916090-3105956dac38"
      heading="Our Journey"
      cta="Read Our Story"
      blocks={[
        {
          label: "Our Concept",
          description:
            "A well-edited collection of timeless, multipurpose pieces that are tried, tested and perfected. Crafted with love in small batches, with attention to the little details, full price transparency, and minimal impact on the environment.",
        },
        {
          label: "Our Mission",
          description:
            "Our mission is to redefine luxury fashion through a lens of ethical responsibility and functional elegance. We create meticulously designed handbags that are not only beautiful but also align with our unwavering commitment to cruelty-free practices and a transparent business model.",
        },
        {
          label: "Our Materials",
          description:
            "We exclusively use ultrafiber, a premium non-woven fabric. It's plush, sustainable, easy to maintain, and lighter than animal leather.",
        },
        {
          label: "Our People",
          description:
            "We're a small team supported by incredible freelancers, agencies, our manufacturing partners, and of course, the most amazing community. Thank you for making all of this possible.",
        },
      ]}
    />
  );
}
