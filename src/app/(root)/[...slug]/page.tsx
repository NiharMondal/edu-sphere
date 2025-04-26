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
const fetchCourseData = async (
	slug: string
): Promise<TServerResponse<TCourseResponse>> => {
	const res = await fetch(
		`http://localhost:5000/api/v1/courses/by-slug/${slug}`,
		{
			next: { revalidate: 5000 },
		}
	);
	const data = await res.json();
	return data;
};

export default async function WatchLecture({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const data = await fetchCourseData(slug[0]);
	if (!data?.success) {
		return <p>Something went wrong!</p>;
	}
	return (
		<div className="grid grid-cols-1 md:grid-cols-5 overflow-hidden gap-10">
			<VideoPlayer />
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
