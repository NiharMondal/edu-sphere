"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetCourseBySlugQuery } from "@/redux/api/admin-api/courseApi";
import { TCourseResponse } from "@/types";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import Image from "next/image";
import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/shared/Container";
import img from "../../../../assets/web-design.png";
import { Clock } from "lucide-react";
export default function CourseInformation({ slug }: { slug: string }) {
	// const { data: singleCourse, isLoading } = useGetCourseBySlugQuery(slug);

	// if (isLoading) return <p>Loading...</p>;
	// const {
	// 	title,
	// 	description,
	// 	thumbnail,
	// 	instructor,
	// 	totalLectures,
	// 	totalModules,
	// 	modules,
	// } = singleCourse?.result as TCourseResponse;
	return (
		<Container>
			{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-5">
					<h4 className="hidden md:block">{title}</h4>
					<p className="text-sm">{description}</p>
					<Button>Purchase Course</Button>

					<h5>Instructor</h5>
					<div className="flex items-center gap-x-2">
						<Avatar className="ring-1 ring-accent-foreground overflow-hidden">
							<AvatarImage
								src={instructor?.avatar}
								alt="instructor"
							/>
							<AvatarFallback>{instructor?.name}</AvatarFallback>
						</Avatar>
						<span>{instructor?.name}</span>
					</div>
				</div>
				<div className="order-first md:order-last">
					<h4 className="md:hidden block mb-2">{title}</h4>
					<Image
						src={thumbnail}
						height={200}
						width={200}
						alt={`course-thumbnail-${title}`}
						className="w-full h-[350px] rounded-md"
					/>
				</div>
			</div>

			<div className="mt-10">
				<div>
					<h4>Curriculum</h4>
					<span className="inline-block mr-5">
						{totalModules} Modules
					</span>
					<span>{totalLectures} Lectures</span>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
					{modules.map((mod, index) => (
						<Accordion
							type="single"
							collapsible
							key={mod._id}
							className="w-full shadow-lg px-2 bg-white rounded-md"
						>
							<AccordionItem value={mod.title}>
								<AccordionTrigger>
									<div className="flex items-center justify-center gap-x-5 text-base font-semibold rounded-md no-underline">
										<div className="flex flex-col justify-center p-2 bg-destructive rounded no-underline">
											<span className="font-bold">
												{index + 1}
											</span>
											<span className="text-xs font-medium">
												Module
											</span>
										</div>
										<span className="hover:no-underline">
											{mod.title}
										</span>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									{mod.lectures.map((lec, idx) => (
										<div key={lec._id}>
											<p className="my-1">
												<span className="mr-2">
													Lecture {idx + 1}:
												</span>
												{lec.title}
											</p>
										</div>
									))}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</div> */}
			<div className="grid grid-cols-1 md:grid-cols-2 place-content-center gap-5 py-20">
				<h2>Advanced Javascript</h2>
				<p className="text-gray-shade-35 text-lg">
					Welcome to our UI/UX Design course! This comprehensive
					program will equip you with the knowledge and skills to
					create exceptional user interfaces (UI) and enhance user
					experiences (UX). Dive into the world of design thinking,
					wireframing, prototyping, and usability testing. Below is an
					overview of the curriculum
				</p>
			</div>
			<div className="rounded-md overflow-hidden">
				<Image
					src={img}
					height={500}
					width={1200}
					alt="advanced-Javascript"
					className="w-full h-full rounded-md overflow-hidden"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
				<div className="bg-white p-5 md:p-12 rounded-md">
					<p className="text-right font-bold text-gray-shade-15 text-2xl">
						01
					</p>
					<p className="text-2xl font-semibold py-4">
						Introduction to UI/UX Design
					</p>

					<div className="space-y-5">
						<div className="px-4 py-5 bg-white border flex items-center justify-between rounded-md  hover:ring-orange-shade-80 hover:ring-2 group">
							<div>
								<p className="font-medium text-xl text-gray-shade-20">
									Understanding UI/UX Design Principles
								</p>
								<p className="text-gray-shade-35">Lesson 1</p>
							</div>
							<Button className="bg-white-shade-97 px-3 py-2 text-gray-shade-35 cursor-default group-hover:bg-orange-shade-90 group-hover:text-gray-shade-30">
								<Clock />
								45 minutes
							</Button>
						</div>
						<div className="px-4 py-5 bg-white border flex items-center justify-between rounded-md  hover:ring-orange-shade-80 hover:ring-2 group">
							<div>
								<p className="font-medium text-xl text-gray-shade-20">
									Understanding UI/UX Design Principles
								</p>
								<p className="text-gray-shade-35">Lesson 1</p>
							</div>
							<Button className="bg-white-shade-97 px-3 py-2 text-gray-shade-35 cursor-default group-hover:bg-orange-shade-90 group-hover:text-gray-shade-30">
								<Clock />
								45 minutes
							</Button>
						</div>
						<div className="px-4 py-5 bg-white border flex items-center justify-between rounded-md  hover:ring-orange-shade-80 hover:ring-2 group">
							<div>
								<p className="font-medium text-xl text-gray-shade-20">
									Understanding UI/UX Design Principles
								</p>
								<p className="text-gray-shade-35">Lesson 1</p>
							</div>
							<Button className="bg-white-shade-97 px-3 py-2 text-gray-shade-35 cursor-default group-hover:bg-orange-shade-90 group-hover:text-gray-shade-30">
								<Clock />
								45 minutes
							</Button>
						</div>
					</div>
				</div>
				<div className="bg-white p-12 rounded-md">
					<p className="text-right font-bold text-gray-shade-15 text-2xl">
						01
					</p>
					<p className="text-2xl font-semibold py-4">
						Introduction to UI/UX Design
					</p>

					<div className="space-y-5">
						<div className="px-4 py-5 bg-white border flex items-center justify-between rounded-md  hover:ring-orange-shade-80 hover:ring-2 group">
							<div>
								<p className="font-medium text-xl text-gray-shade-20">
									Understanding UI/UX Design Principles
								</p>
								<p className="text-gray-shade-35">Lesson 1</p>
							</div>
							<Button className="bg-white-shade-97 px-3 py-2 text-gray-shade-35 cursor-default group-hover:bg-orange-shade-90 group-hover:text-gray-shade-30">
								<Clock />
								45 minutes
							</Button>
						</div>
						<div className="px-4 py-5 bg-white border flex items-center justify-between rounded-md  hover:ring-orange-shade-80 hover:ring-2 group">
							<div>
								<p className="font-medium text-xl text-gray-shade-20">
									Understanding UI/UX Design Principles
								</p>
								<p className="text-gray-shade-35">Lesson 1</p>
							</div>
							<Button className="bg-white-shade-97 px-3 py-2 text-gray-shade-35 cursor-default group-hover:bg-orange-shade-90 group-hover:text-gray-shade-30">
								<Clock />
								45 minutes
							</Button>
						</div>
						<div className="px-4 py-5 bg-white border flex items-center justify-between rounded-md  hover:ring-orange-shade-80 hover:ring-2 group">
							<div>
								<p className="font-medium text-xl text-gray-shade-20">
									Understanding UI/UX Design Principles
								</p>
								<p className="text-gray-shade-35">Lesson 1</p>
							</div>
							<Button className="bg-white-shade-97 px-3 py-2 text-gray-shade-35 cursor-default group-hover:bg-orange-shade-90 group-hover:text-gray-shade-30">
								<Clock />
								45 minutes
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
