import Banner from "@/components/home/banner";
import CourseCard from "@/components/shared/course-card";
import Navbar from "@/components/shared/navbar";

export default function Home() {
	return (
		<section>
			<Navbar />
			<Banner />
			<div className="container space-y-8">
				<h3>Latest Course</h3>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					<CourseCard />
				</div>
			</div>
		</section>
	);
}
