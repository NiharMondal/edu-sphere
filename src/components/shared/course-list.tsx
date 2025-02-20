import CourseCard from "@/components/shared/course-card";
import React from "react";

export default function CourseList() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
			<CourseCard />
		</div>
	);
}
