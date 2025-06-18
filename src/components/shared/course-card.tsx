import { TCourseResponse } from "@/types";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
type CourseCardProps = {
	course: TCourseResponse;
};
export default function CourseCard({ course }: CourseCardProps) {
	return (
		<div className=" bg-white p-4 md:p-5 rounded-md space-y-6 shadow-sm hover:shadow-md hover:ring-1 hover:ring-gray-shade-70">
			<Image
				src={course.thumbnail}
				height={200}
				width={200}
				alt={course.title}
				className="h-[230px] w-full rounded overflow-hidden object-center"
			/>
			<div className="flex items-center justify-between md:flex-col 2xl:flex-row gap-3">
				<div className="grid grid-cols-2 gap-x-3">
					<span className="border rounded py-1 px-2">
						{course.duration}
					</span>
					<span className="border rounded py-1 px-2">
						{course.level}
					</span>
				</div>
				<div className="col-span-full xl:col-span-1 font-medium text-gray-shade-15">
					By {course.instructor.name}
				</div>
			</div>
			<div>
				<p className="font-semibold text-xl text-gray-shade-15">
					{course.title}
				</p>

				<Link href={`/courses/${course.slug}`}>
					<Button
						className="inline-block mt-5 w-full bg-white-shade-97"
						variant={"outline"}
					>
						See Details
					</Button>
				</Link>
			</div>
		</div>
	);
}
