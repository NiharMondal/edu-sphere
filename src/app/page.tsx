import Banner from "@/components/home/banner";
import CourseList from "@/components/shared/course-list";
import Navbar from "@/components/shared/navbar";

export default function Home() {
	return (
		<section>
			<Navbar />
			<Banner />
			<div className="container space-y-8 mb-20">
				<h3>Latest Course</h3>
				<CourseList />
			</div>
		</section>
	);
}
