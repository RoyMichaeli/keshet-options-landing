import Image from "next/image";

export function Hero() {

  return (
    <section className="w-full bg-background overflow-hidden">
      {/* Mobile Image */}
      <div className="flex md:hidden">
        <div className="relative w-full aspect-video">
          <Image
            src="/images/hero-mobile.png"
            alt="קורס מסחר באופציות"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Desktop Image */}
      <div className="hidden md:flex justify-center bg-background">
        <div className="relative w-full max-w-[1400px] aspect-[16/8.2]">
          <Image
            src="/images/hero-desktop.png"
            alt="קורס מסחר באופציות"
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover scale-[1.01]"
          />
        </div>
      </div>
    </section>
  );
}
