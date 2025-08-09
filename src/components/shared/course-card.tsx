import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { TCourseResponse } from "@/types/course.types";
import { ArrowRight } from "lucide-react";
import Rating from "../ui/rating";
import { cn } from "@/lib/utils";
type CourseCardProps = {
	course: TCourseResponse;
};
export default function CourseCard({ course }: CourseCardProps) {
	return (
		<div className="relative bg-white shadow-sm hover:shadow-md rounded-md overflow-hidden duration-200 group">
			<div className="relative h-auto md:h-[200px] w-full rounded-t-md overflow-hidden">
				{course.pricingType === "free" && (
					<span className="absolute top-4 left-4 bg-primary text-white px-3 py-[2px] rounded z-40">
						Free
					</span>
				)}
				<Image
					src={course?.thumbnail}
					height={200}
					width={200}
					alt={course?.title}
					className="h-full w-full object-center object-cover bg-white-shade-97 group-hover:scale-105 duration-200"
					loading="lazy"
				/>
			</div>
			<ul className="flex  items-center justify-between gap-2 text-sm py-3 px-4 border-b">
				<li className="border rounded py-1 px-2">{course?.duration}</li>
				<li className=" border rounded py-1 px-2">{course?.level}</li>
			</ul>
			<div className="p-4 space-y-2">
				<p className="font-medium text-gray-shade-15">
					{course?.title}
				</p>
				<div
					className={cn(
						"flex items-center bg-orange-shade-97 py-2 px-4 rounded-md",
						course?.rating ? "justify-between" : "justify-center"
					)}
				>
					<p className="font-semibold text-center">
						&#2547;{course.price}
					</p>
					{course?.rating && (
						<Rating
							initialRating={course.rating}
							readOnly={true}
							className="size-4"
						/>
					)}
				</div>
				<div className="hidden group-hover:block group-hover:absolute group-hover:bottom-4 group-hover:right-4 group-hover:left-4">
					<Link href={`/courses/${course?.slug}`}>
						<Button className="mt-3 w-full hover:tracking-wide transition-all  duration-200">
							See Details
							<ArrowRight />
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
