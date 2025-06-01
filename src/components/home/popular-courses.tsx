"use client";
import React from "react";
import Container from "../shared/Container";
import { Button } from "../ui/button";
import { useAllCourseQuery } from "@/redux/api/course/courseApi";

export default function PopularCourses() {
	const { data: courses, isLoading } = useAllCourseQuery();
	console.log(courses);
	return (
		<div className="bg-white">
			<Container>
				<div className="py-16 px-6  text-center">
					<h2 className="text-3xl font-bold mb-10">
						Popular Courses
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{[1, 2, 3].map((course) => (
							<div
								key={course}
								className="border rounded-2xl p-4 shadow-sm"
							>
								<img
									src="/course-thumbnail.jpg"
									alt="Course Thumbnail"
									className="rounded-xl mb-4"
								/>
								<h3 className="text-xl font-semibold">
									Course Title
								</h3>
								<p className="text-sm text-gray-600">
									Instructor Name • 12 hours • ⭐️ 4.8
								</p>
								<Button className="mt-4 w-full">
									Enroll Now
								</Button>
							</div>
						))}
					</div>
				</div>
			</Container>
		</div>
	);
}
