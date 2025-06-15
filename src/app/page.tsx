import Benefits from "@/components/landing/benefits";
import Courses from "@/components/landing/courses";
import FAQs from "@/components/landing/faqs";
import HeroSection from "@/components/landing/hero-section";
import Testimonials from "@/components/landing/testimonials";

import Footer from "@/components/shared/footer";

import Navbar from "@/components/shared/navbar";

export default function Home() {
	return (
		<section>
			<Navbar />
			<HeroSection />
			<Benefits />
			<Courses />
			<Testimonials />
			<FAQs />
			<Footer />
		</section>
	);
}
