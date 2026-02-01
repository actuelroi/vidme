export default function SaleHero() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden bg-gray-100" id="sale-hero">
      <img
        src="/hero.png"
        alt="Fashion model wearing white top"
        className="absolute inset-0 w-full h-full object-cover grayscale"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/70" />

      {/* Text */}
      <div className="relative z-10 flex items-center h-full px-12">
        <h1 className="text-red-600 font-extrabold leading-tight text-5xl md:text-6xl">
          SOLDES<br />
          JUSQU'À <span className="tracking-tight">-70%</span>
        </h1>
      </div>
    </div>
  );
}
