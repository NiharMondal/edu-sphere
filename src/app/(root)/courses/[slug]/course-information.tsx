"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useGetCourseBySlugQuery } from "@/redux/api/admin-api/courseApi";
import { TCourseResponse } from "@/types";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Book } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
export default function CourseInformation({ slug }: { slug: string }) {
	const { data: singleCourse, isLoading } = useGetCourseBySlugQuery(slug);

	if (isLoading) return <p>Loading...</p>;
	const {
		title,
		description,
		thumbnail,
		instructor: { name, avatar },
		totalLectures,
		totalModules,
		modules,
	} = singleCourse?.result as TCourseResponse;
	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-5">
					<h4>{title}</h4>
					<p className="text-sm">{description}</p>
					<Button>Purchase Course</Button>

					<h5>Instructor</h5>
					<div className="flex items-center gap-x-2">
						<Avatar className="ring-1 ring-accent-foreground overflow-hidden">
							<AvatarImage src={avatar} alt="instructor" />
							<AvatarFallback>{name}</AvatarFallback>
						</Avatar>
						<span>{name}</span>
					</div>
				</div>
				<div className="">
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
			</div>
		</div>
	);
}
