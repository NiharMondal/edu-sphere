"use client";
import React from "react";
import Container from "../shared/Container";
import { Button } from "../ui/button";
import { useAllCourseQuery } from "@/redux/api/course/courseApi";
import Image from "next/image";
import AppLoading from "@/app/loading";
import Link from "next/link";

export default function PopularCourses() {
	const { data: courses, isLoading } = useAllCourseQuery({});

	if (isLoading) return <AppLoading />;
	return (
		<div className="bg-white">
			<Container>
				<div className="py-16 px-6  text-center">
					<h2 className="text-3xl font-bold mb-10">
						Popular Courses
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-8 max-w-6xl mx-auto">
						{courses?.result?.map((course, index) => (
							<div
								key={course._id}
								data-aos="fade-right"
								data-aos-delay={index * 30}
								className="border rounded-2xl p-4 shadow-sm"
							>
								<Image
									src={course.thumbnail}
									alt={course.title}
									width={200}
									height={200}
									className="rounded-xl w-full h-[200px] mb-4"
								/>
								<h3 className="text-xl font-semibold">
									{course.title}
								</h3>
								<p className="text-sm text-gray-600">
									{course.instructor?.name} • ⭐️
									{course.rating}
								</p>
								<Button className="mt-4 w-full">
									<Link href={`/courses/${course.slug}`}>
										See Details
									</Link>
								</Button>
							</div>
						))}
					</div>
				</div>
			</Container>
		</div>
	);
}
