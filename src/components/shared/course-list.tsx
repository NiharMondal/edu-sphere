"use client";
import CourseCard from "@/components/shared/course-card";
import { config } from "@/config";
import { TCourse, TServerResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {
	role?: "admin";
	search?: string | string[] | undefined;
};

const fetchCourses = async (
	search: string | string[] | undefined
): Promise<TServerResponse<TCourse[]>> => {
	const query = search?.length ? `?search=${search}` : "";

	const res = await fetch(`${config.backend_url}/course${query}`);
	if (!res.ok) {
		throw new Error("Something went wrong!");
	}
	const data = await res.json();

	return data;
};
export default function CourseList({ role, search }: Props) {
	const {
		data: courses,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["course", search],
		queryFn: () => fetchCourses(search),
	});

	if (isLoading) return "Loading...";
	if (error) return "An error occured";
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
			{courses?.result?.map((course) => (
				<CourseCard key={course._id} data={course} role={role} />
			))}
		</div>
	);
}
