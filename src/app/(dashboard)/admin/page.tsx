import EduCard from "@/components/dashboard/edu-card";
import { Book, GraduationCap, HandCoins, Speech } from "lucide-react";

export default function Dashboard() {
	return (
		<section>
			<h5 className="mt-5">
				Here is a short view about this website, that includes analytics
				and other information
			</h5>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 bg-white-shade-99 rounded-md p-5 lg:p-10">
				<EduCard
					icon={<GraduationCap />}
					count={570}
					className="bg-blue-200"
					tag="Total Students"
				/>
				<EduCard
					icon={<Book />}
					count={4}
					className="bg-green-200"
					tag="Total Courses"
				/>
				<EduCard
					icon={<HandCoins />}
					count={12728}
					className="bg-pink-200"
					tag="Total Earnings"
				/>
				<EduCard
					icon={<Speech />}
					count={4}
					className="bg-amber-200"
					tag="Total Instructor"
				/>
			</div>
		</section>
	);
}
