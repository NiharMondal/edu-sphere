import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { TCourseResponse } from "@/types/course.types";
type CourseCardProps = {
	course: TCourseResponse;
};
export default function CourseCard({ course }: CourseCardProps) {
	return (
		<div className="bg-white shadow-sm hover:shadow-md hover:ring-1 hover:ring-orange-shade-70 rounded-md overflow-hidden">
			<Image
				src={course.thumbnail}
				height={200}
				width={200}
				alt={course.title}
				className="h-auto md:h-[200px] w-full rounded-t-md rounded-b-none overflow-hidden object-center object-cover bg-white-shade-97 "
			/>
			<ul className="flex  items-center justify-between gap-2 text-sm py-2 px-4 border-b">
				<li className="border rounded py-1 px-2">{course.duration}</li>
				<li className=" border rounded py-1 px-2">{course.level}</li>
			</ul>
			<div className="p-4 ">
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
		</div>
	);
}
