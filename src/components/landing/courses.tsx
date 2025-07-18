"use client";
import React, { useEffect, useState } from "react";
import Container from "../shared/Container";
import SectionTitle from "../shared/Section-Title";

import { useAllCourseQuery } from "@/redux/api/courseApi";
import AppLoading from "@/app/loading";
import CourseCard from "../shared/course-card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useAllCategoriesQuery } from "@/redux/api/categoryApi";
import Image from "next/image";
import { cn } from "@/lib/utils";
const data = {
	title: "Our Courses",
	description:
		"Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.",
	link: "/courses",
};
export default function Courses() {
	const { data: categories, isLoading: categoryLoading } =
		useAllCategoriesQuery({});
	const [category, setCategory] = useState("");
	const { data: courses, isLoading } = useAllCourseQuery(
		{
			category,
		},
		{ skip: !category }
	);

	const handleCategory = (cId: string) => {
		setCategory(cId);
	};

	useEffect(() => {
		if (categories?.result) {
			setCategory(categories.result[0]._id);
		}
	}, [categories?.result]);

	if (isLoading) return <AppLoading />;
	return (
		<Container className="py-20">
			<SectionTitle data={data} />

			<Carousel className="w-[300px] md:w-[560px] lg:w-[900px] xl:w-full mx-auto mt-10">
				{categoryLoading && <p>Loading...</p>}
				<CarouselContent>
					{categories?.result?.length ? (
						categories.result?.map((cat) => (
							<CarouselItem key={cat._id} className="basis-auto">
								<div
									className={cn(
										"group",
										"flex items-center gap-x-3 py-2 px-4  border rounded hover:cursor-pointer",
										cat?._id === category
											? "bg-primary text-white"
											: "bg-secondary"
									)}
									onClick={() => handleCategory(cat?._id)}
								>
									<Image
										src={cat?.icon}
										width={40}
										height={40}
										alt={cat?.name}
										className="size-10"
									/>
									<div>
										<p
											className={cn(
												"group-hover:underline",
												"font-medium  text-nowrap text-sm",
												cat?._id === category
													? "text-white-shade-99"
													: "text-gray-shade-10"
											)}
										>
											{cat?.name}
										</p>
										<p
											className={cn(
												"text-xs",
												cat?._id === category
													? "text-white-shade-95"
													: "text-gray-shade-30"
											)}
										>
											{cat?.courseCount} courses
										</p>
									</div>
								</div>
							</CarouselItem>
						))
					) : (
						<p>No category</p>
					)}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
				{courses?.result?.length ? (
					courses?.result?.map((course) => (
						<CourseCard course={course} key={course?._id} />
					))
				) : (
					<p>No data found!</p>
				)}
			</div>
		</Container>
	);
}
