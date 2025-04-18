import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import React from "react";

export default function StudentDashboard() {
	return (
		<div>
			<h3 className="mt-10">Your enrolled courses lists</h3>

			<div className="grid grid-cols-5 gap-8 mt-5">
				<div className="col-span-full lg:col-span-1">
					<Image
						src={"/logo.svg"}
						width={300}
						height={300}
						alt="course-photo"
					/>
				</div>
				<div className="col-span-full lg:col-span-4 space-y-4">
					<h4>Course title</h4>
					<Progress value={100} max={100} className="w-full" />

					<Button>Continue course</Button>
				</div>
			</div>
		</div>
	);
}
