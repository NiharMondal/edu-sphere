import React from "react";
import MyEnrolledCourses from "./my-enrolled-course";

export default function StudentDashboard() {
	return (
		<div>
			<h3 className="mt-10">Your enrolled courses lists</h3>

			<MyEnrolledCourses />
		</div>
	);
}
