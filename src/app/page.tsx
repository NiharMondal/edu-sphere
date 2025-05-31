import Banner from "@/components/home/banner";
import PopularCourses from "@/components/home/popular-courses";
import Testimonials from "@/components/home/testimonials";
import WhyChooseUs from "@/components/home/why-choose-us";
import Footer from "@/components/shared/footer";

import Navbar from "@/components/shared/navbar";

export default function Home() {
	return (
		<section>
			<Navbar />
			<Banner />
			<WhyChooseUs />
			<PopularCourses />
			<Testimonials />
			<Footer />
		</section>
	);
}
