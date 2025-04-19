"use client";

import EduCard from "@/components/dashboard/edu-card";
import { useGetCourseQuery } from "@/redux/api/admin-api/courseApi";
import React from "react";

export default function CourseList() {
	const { data: courses, isLoading } = useGetCourseQuery();

	if (isLoading) return <p>Loading...</p>;
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
			{courses?.result?.map((course) => (
				<EduCard course={course} key={course._id} />
			))}
		</div>
	);
}
