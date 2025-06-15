"use client";
import AppLoading from "@/app/loading";
import { useCourseByIdQuery } from "@/redux/api/course/courseApi";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Search } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import ReactPlayer from "react-player";
import { TLectureResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { useCompleteLectureMutation } from "@/redux/api/progress/progressApi";
import { useAppSelector } from "@/hooks";
import { selectedUser } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";

type TWrapperProps = {
	data: {
		courseId: string;
		type: string;
		lectureId: string;
	};
};

export default function Wrapper({ data }: TWrapperProps) {
	const route = useRouter();
	const user = useAppSelector(selectedUser);
	const [completeLecture] = useCompleteLectureMutation();
	const { data: course, isLoading } = useCourseByIdQuery(data.courseId);
	const [currentLecture, setCurrentLecture] = useState<TLectureResponse>(
		{} as TLectureResponse
	);

	useEffect(() => {
		if (!course?.result) return;

		for (const mod of course?.result?.modules) {
			const found = mod?.lectures.find(
				(lec) => lec._id === data.lectureId
			);
			if (found) {
				setCurrentLecture(found);
				break;
			}
		}
	}, [data.lectureId, course]);

	const getFlatLectureList = () => {
		const flatList = [];
		if (course?.result) {
			for (const mod of course?.result?.modules) {
				for (const lec of mod.lectures) {
					flatList.push({ ...lec, moduleId: mod._id });
				}
			}
			return flatList;
		}
	};

	const flatLectures = getFlatLectureList();
	const currentIndex = flatLectures?.findIndex(
		(lec) => lec._id === data.lectureId
	);
	const isFirst = currentIndex === 0; // this is for disabling previous button
	const isLast = currentIndex === flatLectures!.length - 1; // this is for disabling next button

	const markAndGoToLecture = async (offset: number) => {
		const flatLectures = getFlatLectureList();
		const currentIndex = flatLectures?.findIndex(
			(lec) => lec._id === data.lectureId
		);

		const nextLecture = flatLectures
			? flatLectures[(currentIndex as number) + offset]
			: null;

		try {
			const res = await completeLecture({
				lecId: data.lectureId,
				payload: {
					student: user?.id as string,
					course: course?.result._id as string,
				},
			}).unwrap();
			if (res.success) {
				route.push(
					`/${data.courseId}/${nextLecture?.type}/${nextLecture?._id}`
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (isLoading) return <AppLoading />;

	return (
		<div className="grid grid-cols-1 lg:grid-cols-5 overflow-hidden gap-10">
			<div className="col-span-full lg:col-span-3">
				<div>
					<h4 className="mb-2 px-2">{currentLecture.title}</h4>
					<div className=" rounded-md h-[350px] lg:h-[450px] overflow-hidden">
						<ReactPlayer
							height={"100%"}
							width={"100%"}
							style={{ borderRadius: "20px" }}
							url={currentLecture?.content}
							controls={true}
						/>
					</div>
				</div>
				<div className="flex justify-between lg:justify-end items-center lg:gap-x-10 mt-3">
					<Button
						size={"sm"}
						onClick={() => markAndGoToLecture(-1)}
						disabled={isFirst}
					>
						Previous
					</Button>
					<Button
						size={"sm"}
						onClick={() => markAndGoToLecture(1)}
						disabled={isLast}
					>
						Next
					</Button>
				</div>
			</div>

			<div className="col-span-full lg:col-span-2 bg-gray-200 rounded-md p-4 space-y-3">
				<div className="flex items-center justify-between gap-x-5 h-6">
					<span className="text-nowrap text-sm lg:text-base">
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
				<div className=" flex items-center hover:ring-1 hover:ring-accent-foreground bg-white rounded-lg py-1 px-4">
					<Search />
					<input type="text" className="w-full outline-none p-2" />
				</div>

				<div className="bg-white px-4 py-2 rounded-md">
					{course?.result?.modules.map((mod) => (
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
									{mod?.lectures?.map((lec) => {
										// console.log(lec.slug);

										return (
											<div key={lec._id}>
												<Link
													href={`/${data.courseId}/video/${lec?._id}`}
												>
													<p className="my-1">
														<span className="mr-2">
															{currentLecture.slug ===
															lec.slug
																? " ✅"
																: "🔒"}
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
