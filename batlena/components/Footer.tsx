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
      heading="Notre engagement"
      cta="Découvrir notre histoire"
      blocks={[
        {
          label: "Notre concept",
          description:
            "Nous proposons une sélection rigoureuse de produits fiables, durables et polyvalents, conçus pour répondre aux besoins du quotidien. Notre objectif : offrir une qualité élevée à des prix accessibles, sans compromis sur l’essentiel.",
        },
        {
          label: "Notre mission",
          description:
            "Notre mission est de rendre des produits de haute qualité accessibles au plus grand nombre à travers l’Europe. Grâce à une chaîne d’approvisionnement optimisée et transparente, nous réduisons les coûts inutiles afin de proposer le meilleur rapport qualité-prix à nos clients.",
        },
        {
          label: "Nos matériaux & standards",
          description:
            "Nous sélectionnons des matériaux résistants et performants, choisis pour leur durabilité, leur facilité d’entretien et leur excellent rapport qualité-prix. Chaque produit est testé pour répondre à des standards stricts de qualité.",
        },
        {
          label: "Notre équipe",
          description:
            "Nous sommes une équipe européenne engagée, soutenue par des partenaires logistiques et industriels de confiance. Ensemble, nous travaillons chaque jour pour livrer rapidement des produits fiables et abordables à nos clients partout en Europe.",
        },
      ]}
    />
  );
}
