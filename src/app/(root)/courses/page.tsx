import React from "react";

import CourseList from "./course-list";

export default async function CoursePage() {
	return (
		<div className="space-y-10">
			<h3>All Courses</h3>

			<CourseList />
		</div>
	);
}
