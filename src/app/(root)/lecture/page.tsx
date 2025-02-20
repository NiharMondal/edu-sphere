"use client";
import { ArrowLeftCircle, Search } from "lucide-react";
import React, { useState } from "react";
import ProgressBar from "./progress-bar";
import { Input } from "@/components/ui/input";
import { TModule, TServerResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { config } from "@/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactPlayer from "react-player/youtube";
const fetchModules = async (): Promise<TServerResponse<TModule[]>> => {
	const res = await fetch(`${config.backend_url}/module/course/module`);
	const data = await res.json();
	return data;
};

export default function Lecture() {
	const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
	const [currentLectureIndex, setCurrentLectureIndex] = useState(0);

	const {
		data: modules,
		isPending,
		error,
	} = useQuery({ queryKey: ["module"], queryFn: fetchModules });

	// Get current module and lecture
	const currentModule = modules?.result[currentModuleIndex];
	const currentLecture = currentModule?.lectures[currentLectureIndex];

	if (isPending) return "Please wait...";
	if (error) return "An error occured...";

	const handleNext = () => {
		if (currentLectureIndex < currentModule!.lectures.length - 1) {
			setCurrentLectureIndex(currentLectureIndex + 1);
		} else if (currentModuleIndex < modules?.result?.length - 1) {
			// Move to the next module if available
			setCurrentModuleIndex(currentModuleIndex + 1);
			setCurrentLectureIndex(0);
		}
	};

	const handlePrev = () => {
		if (currentLectureIndex > 0) {
			setCurrentLectureIndex(currentLectureIndex - 1);
		} else if (currentModuleIndex > 0) {
			// Move to the last lecture of the previous module
			setCurrentModuleIndex(currentModuleIndex - 1);
			setCurrentLectureIndex(
				modules?.result?.[currentModuleIndex - 1].lectures.length - 1
			);
		}
	};

	console.log(currentLecture?.url);
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-8">
			<div className="h-[400px] lg:col-span-2">
				<h4 className="font-semibold inline-flex gap-x-3 mb-2">
					<Link href={"/courses"}>
						<ArrowLeftCircle />
					</Link>
					{currentLecture?.title}
				</h4>
				<div className="h-[350px] md:h-[400px] w-full">
					{currentLecture?.type === "video" ? (
						<ReactPlayer url={currentLecture?.url} />
					) : (
						<p>Lecture type not supported</p>
					)}
					<div className="flex items-center justify-end gap-x-5 mt-3">
						<Button
							size={"sm"}
							variant={"outline"}
							onClick={handlePrev}
						>
							Previous
						</Button>
						<Button size={"sm"} onClick={handleNext}>
							Next
						</Button>
					</div>
				</div>
			</div>
			<div className="lg:col-span-1 bg-gray-200  p-3 rounded-md">
				<div className="flex items-center justify-between border-b border-muted-foreground pb-3">
					<p>Module: {currentModule?.index} </p>

					<ProgressBar />
				</div>
				<div className="relative my-4">
					<Input
						type="text"
						placeholder="Search..."
						className="w-full outline-none rounded-full p-2 pl-4 ring-1 ring-secondary focus:ring-1 focus:ring-accent-foreground focus:min-w-40"
					/>
					<span className="absolute right-3 top-1/2 transform -translate-y-1/2">
						<Search />
					</span>
				</div>
				<div className="max-h-[470px]">
					<Accordion type="single" collapsible>
						{modules?.result?.map((module) => (
							<AccordionItem
								value={module._id}
								className="border-b border-muted"
								key={module._id}
							>
								<AccordionTrigger className="text-lg hover:no-underline">
									{module.title}
								</AccordionTrigger>
								<AccordionContent>
									{module?.lectures?.map((lecture) => (
										<ul key={lecture._id} className="pl-5">
											<li className="divide-y">
												{lecture.title}
											</li>
										</ul>
									))}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	);
}
