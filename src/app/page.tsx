import Benefits from "@/components/landing/benefits";
import Courses from "@/components/landing/courses";
import FAQs from "@/components/landing/faqs";
import HeroSection from "@/components/landing/hero-section";
import Testimonials from "@/components/landing/testimonials";
import Container from "@/components/shared/Container";

import Footer from "@/components/shared/footer";
import GeometricBackground from "@/components/shared/geometric-background";

import Navbar from "@/components/shared/navbar";
import VideoPlayer from "@/components/ui/video-player";

export default function Home() {
	return (
		<section>
			<GeometricBackground>
				<Navbar />
				<HeroSection />
			</GeometricBackground>
			<Courses />
			<Benefits />
			<Container>
				<VideoPlayer />
			</Container>
			<Testimonials />
			<FAQs />
			<Footer />
		</section>
	);
}
