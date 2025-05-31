"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/hooks";
import { useMyEnrolledCoursesQuery } from "@/redux/api/user-api/enrollmentApi";
import { selectedUser } from "@/redux/slice/authSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MyEnrolledCourses() {
	const user = useAppSelector(selectedUser);
	const { data: enrolledCourses, isLoading } = useMyEnrolledCoursesQuery(
		user!.id,
		{
			skip: !user?.id,
		}
	);

	if (isLoading) return <p>Loading...</p>;

	return (
		<div className="grid grid-cols-6 gap-8 mt-5 bg-gray-200 rounded-md p-5">
			{enrolledCourses?.result?.map((course) => (
				<React.Fragment key={course?._id}>
					<div className="col-span-full lg:col-span-2">
						<Image
							src={course.course.thumbnail}
							width={300}
							height={300}
							alt="course-photo"
							loading="lazy"
							className="rounded-md overflow-hidden h-[230] w-full"
						/>
					</div>
					<div className="col-span-full lg:col-span-4 space-y-4 place-content-center">
						<h4>{course?.course?.title}</h4>
						<div className="flex items-center justify-between gap-x-10">
							<Progress
								value={course?.progress?.progress}
								max={100}
								className="w-full"
							/>
							<span>{course?.progress?.progress}% </span>
						</div>

						<Button>
							<Link
								href={`/${course?.course?._id}/${course.progress?.lastWatchedLecture?.type}/${course?.progress?.lastWatchedLecture?._id}`}
							>
								Continue Course
							</Link>
						</Button>
					</div>
				</React.Fragment>
			))}
		</div>
	);
}
