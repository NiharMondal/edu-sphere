"use client";
import React from "react";
import Container from "../shared/Container";
import SectionTitle from "../shared/Section-Title";

import { useAllCourseQuery } from "@/redux/api/courseApi";
import AppLoading from "@/app/loading";
import CourseCard from "../shared/course-card";
const data = {
	title: "Our Courses",
	description:
		"Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.",
	link: "/courses",
};
export default function Courses() {
	const { data: courses, isLoading } = useAllCourseQuery({});

	if (isLoading) return <AppLoading />;
	return (
		<Container className="py-20">
			<SectionTitle data={data} />

			<div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				{courses?.result?.map((course) => (
					<CourseCard course={course} key={course._id} />
				))}
			</div>
		</Container>
	);
}
