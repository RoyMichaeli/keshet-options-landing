import Image from "next/image";

export function Hero() {
  return (
    <section className="w-full bg-background overflow-hidden">
      {/* Mobile Image */}
      <div className="md:hidden">
        <Image
          src="/images/hero-mobile.png"
          alt="קורס מסחר באופציות"
          width={1080}
          height={603}
          priority
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>

      {/* Desktop Image */}
      <div className="hidden md:block bg-background">
        <Image
          src="/images/hero-desktop.png"
          alt="קורס מסחר באופציות"
          width={1672}
          height={934}
          priority
          sizes="(max-width: 1400px) 100vw, 1400px"
          className="w-full h-auto max-w-[1400px] mx-auto"
        />
      </div>
    </section>
  );
}
