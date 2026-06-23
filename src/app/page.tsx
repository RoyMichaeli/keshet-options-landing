import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { StatsCounter } from "@/components/StatsCounter";
import { Instructor } from "@/components/Instructor";
import { CourseSyllabus } from "@/components/CourseSyllabus";
import { Audience } from "@/components/Audience";
import { Testimonials } from "@/components/Testimonials";
import { FutureCourses } from "@/components/FutureCourses";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <StatsCounter />
        <Instructor />
        <CourseSyllabus />
        <Audience />
        <Testimonials />
        <FutureCourses />
        <FAQ />
        <LeadForm />
      </main>
      <Footer />
      <ExitIntentPopup />
    </>
  );
}
