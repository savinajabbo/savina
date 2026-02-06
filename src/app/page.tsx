import { Nav } from "@/components/nav";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Nav />

      <main className="px-6 pb-24 sm:px-10 md:px-12 lg:px-24">
        {/* Hero Image — rounded corners on bottom only, side margins */}
        <div className="animate-fade-in relative mx-auto aspect-[4/2.5] w-full max-w-6xl overflow-hidden rounded-b-2xl">
          {/* Placeholder gradient — replace with your own image */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-600 via-zinc-700 to-zinc-900" />

          {/* Uncomment and use this when you have your image: */}
          {/* <Image
            src="/hero.jpg"
            alt="Savina Jabbo"
            fill
            className="object-cover"
            priority
          /> */}

          {/* Name overlay — independently positioned elements */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 sm:left-12 md:left-16">
            <h1 className="text-[18vw] font-bold uppercase leading-[0.85] tracking-tighter text-white/90 sm:text-[15vw] md:text-[12vw] lg:text-[10rem]">
              SAVINA
            </h1>
          </div>
          <div className="absolute left-8 top-1/2 translate-y-[10%] sm:left-12 md:left-16">
            <h2 className="text-[18vw] font-bold uppercase leading-[0.85] tracking-tighter text-white/90 sm:text-[15vw] md:text-[12vw] lg:text-[10rem]">
              JABBO
            </h2>
          </div>
        </div>

        {/* Description — left-aligned below the image, matching image width */}
        <div className="animate-fade-in-delay-1 mx-auto mt-6 max-w-5xl">
          <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            CEO & Co-founder of [Company]. [Your role/location]. [Short bio sentence]. 
            [Another interesting fact]. [Personality trait or hobby].
          </p>
        </div>
      </main>
    </>
  );
}
