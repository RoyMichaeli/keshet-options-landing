import Image from "next/image";

export function Hero() {

  return (
    <section className="w-full bg-[#0a1628] overflow-hidden">
      {/* Mobile Image */}
      <div className="flex md:hidden">
        <div className="relative w-full aspect-[17.5/20]">
          <Image
            src="/images/hero-mobile.png"
            alt="קורס מסחר באופציות"
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
      </div>

      {/* Desktop Image */}
      <div className="hidden md:flex">
        <div className="relative w-full aspect-[16/9]">
          <Image
            src="/images/hero-desktop.png"
            alt="קורס מסחר באופציות"
            fill
            priority
            sizes="100vw"
            className="object-cover scale-[1.01]"
          />
        </div>
      </div>
    </section>
  );
}
