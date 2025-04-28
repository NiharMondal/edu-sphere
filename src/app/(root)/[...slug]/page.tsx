import React from "react";
import VideoPlayer from "./video-player";
import { Progress } from "@/components/ui/progress";
import { Search } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { TCourseResponse, TServerResponse } from "@/types";
import Link from "next/link";
const fetchCourseData = async (
	slug: string
): Promise<TServerResponse<TCourseResponse>> => {
	const res = await fetch(
		`http://localhost:5000/api/v1/courses/by-slug/${slug}`,
		{
			cache: "no-cache",
		}
	);
	const data = await res.json();
	return data;
};

export default async function WatchLecture({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}) {
	console.log((await params).slug[2]);
	const courseSlug = (await params).slug[0];
	const lectureSlug = (await params).slug[2];
	const data = await fetchCourseData(courseSlug);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const lectureSlugToLecture: { [slug: string]: any } = {};
	for (const mod of data.result.modules) {
		for (const lec of mod.lectures) {
			lectureSlugToLecture[lec.slug] = lec;
		}
	}

	// Quick lookup
	const currentLecture = lectureSlugToLecture[lectureSlug];
	console.log(currentLecture);
	if (!data?.success) {
		return <p>Something went wrong!</p>;
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-5 overflow-hidden gap-10">
			<VideoPlayer data={currentLecture} />
			<div className="col-span-full md:col-span-2 bg-gray-200 rounded-md p-4 space-y-3">
				<div className="flex items-center justify-between gap-x-5 h-6">
					<span className="text-nowrap text-sm md:text-base">
						Running module: 1
					</span>
					<div className="w-full flex gap-x-3 items-center">
						<Progress
							value={4}
							max={14}
							className="w-full h-2 text-green-300"
						/>
						<span>4/14</span>
					</div>
				</div>
				<div className=" flex items-center hover:ring-1 hover:ring-accent-foreground bg-white rounded-md py-1 px-4">
					<Search />
					<input type="text" className="w-full outline-none p-2" />
				</div>

				<div className="bg-white px-4 py-2 rounded-md">
					{data?.result?.modules.map((mod) => (
						<Accordion
							type="single"
							collapsible
							key={mod._id}
							className="w-full shadow-lg px-2 bg-white rounded-md mb-2"
						>
							<AccordionItem value={mod.title}>
								<AccordionTrigger className="text-base no-underline hover:no-underline">
									{mod.title}
								</AccordionTrigger>
								<AccordionContent>
									{mod?.lectures?.map((lec, idx) => {
										// console.log(lec.slug);
										return (
											<div key={lec._id}>
												<Link
													href={`/${courseSlug}/video/${lec?.slug}`}
												>
													<p className="my-1">
														<span className="mr-2">
															Lecture {idx + 1}:
														</span>
														{lec.title}
													</p>
												</Link>
											</div>
										);
									})}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</div>
			</div>
		</div>
	);
}
