import React from "react";
import CourseList from "../../../components/shared/course-list";

export default function Course() {
	return (
		<div className="space-y-8">
			<h1 className="text-4xl">
				<span className="">📚</span>All Courses
			</h1>
			<CourseList />
		</div>
	);
}
