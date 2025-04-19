import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { TCourseResponse } from "@/types";
// type TEduCardProps = {
// 	course: TCourseResponse;
// };
export default function EduCard({ course }: { course: TCourseResponse }) {
	console.log(course);
	return (
		<div className="bg-white rounded-md divide-y divide-muted-foreground divide-opacity-40">
			<div className="p-2">
				<Image
					src={course.thumbnail}
					height={200}
					width={200}
					alt="course-thumbnail"
				/>

				<div className="flex justify-between items-center text-xs mt-1 mb-2">
					<span className="bg-muted px-2 py-0.5 rounded-sm">
						Left: 30 days
					</span>
					<span className="bg-muted px-2 py-0.5 rounded-sm">
						Duration: 6 months
					</span>
				</div>
			</div>

			<div className="p-2">
				<h4 className="mb-4">{course?.title}</h4>

				<Button variant={"outline"} className="w-full">
					See Details
				</Button>
			</div>
		</div>
	);
}
