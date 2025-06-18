"use client";

import CourseCard from "@/components/shared/course-card";
import { useAllCourseQuery } from "@/redux/api/course/courseApi";

import React from "react";

export default function CourseList() {
	const { data: courses, isLoading } = useAllCourseQuery({});

	if (isLoading) return <p>Loading...</p>;
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 ">
			{courses?.result?.map((course) => (
				<CourseCard course={course} key={course._id} />
			))}
		</div>
	);
}
