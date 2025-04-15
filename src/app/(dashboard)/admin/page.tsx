import EduCard from "@/components/dashboard/edu-card";
import { Book, HandCoins, Users } from "lucide-react";

export default function Dashboard() {
	return (
		<section>
			<h5>
				Here is a short view about this website, that includes analytics
				and other information
			</h5>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5">
				<EduCard
					icon={<Users />}
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
					icon={<Users />}
					count={4}
					className="bg-amber-200"
					tag="Total Users"
				/>
			</div>
		</section>
	);
}
