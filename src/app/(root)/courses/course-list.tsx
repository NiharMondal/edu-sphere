"use client";

import { Button } from "@/components/ui/button";
import { useGetCourseQuery } from "@/redux/api/admin-api/courseApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CourseList() {
	const { data: courses, isLoading } = useGetCourseQuery();

	if (isLoading) return <p>Loading...</p>;
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
			{courses?.result?.map((course) => (
				<div
					className="bg-white rounded-md divide-y divide-muted-foreground w-full"
					key={course?._id}
				>
					<div className="overflow-hidden">
						<Image
							src={course.thumbnail}
							height={200}
							width={200}
							alt="course-thumbnail"
							className="w-full h-[200px] rounded-sm"
						/>

						<div className="flex justify-between items-center text-xs mt-1 mb-2 p-2">
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

						<Link href={`/courses/${course?.slug}`}>
							<Button variant={"outline"} className="w-full">
								See Details
							</Button>
						</Link>
					</div>
				</div>
			))}
		</div>
	);
}
