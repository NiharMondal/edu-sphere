"use client";
import CourseCard from "@/components/shared/course-card";
import { config } from "@/config";
import { TCourse, TServerResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function CourseList() {
	const fetchTodos = async (): Promise<TServerResponse<TCourse[]>> => {
		const res = await fetch(`${config.backend_url}/course`);
		const courses = await res.json();
		return courses;
	};

	const {
		data: courses,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["course"],
		queryFn: fetchTodos,
	});

	if (isLoading) return "Loading...";
	if (error) return "An error occured";
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
			{courses?.result.map((course) => (
				<CourseCard key={course._id} data={course} />
			))}
		</div>
	);
}
