"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/shared/Container";
import { Clock } from "lucide-react";
import AppLoading from "@/app/loading";
import { useCourseBySlugQuery } from "@/redux/api/courseApi";
import { useMakePaymentMutation } from "@/redux/api/enrollmentApi";
import { useAppSelector } from "@/hooks";
import { selectedUser } from "@/redux/slice/authSlice";
import { toast } from "sonner";

export default function CourseInformation({ slug }: { slug: string }) {
	const user = useAppSelector(selectedUser);
	const [makePayment, { isLoading: paymentLoading }] =
		useMakePaymentMutation();
	const { data: course, isLoading } = useCourseBySlugQuery(slug);

	if (isLoading) return <AppLoading />;

	const handleEnrollment = async () => {
		//checking user logged-in or not
		if (!user?.id) {
			return toast.warning("Please login first");
		}
		//collecting data that is used to enroll course
		const data = {
			course: course?.result._id,
			student: user?.id,
			amount: course?.result?.price,
		};
		try {
			const res = await makePayment(data).unwrap();

			if (res?.result?.url) {
				window.location.href = res?.result?.url;
				toast.message("Redirecting to checkout page...");
			} else {
				toast.success("Enrolled successfully");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			toast.error(error?.data?.message);
		}
	};

	return (
		<Container>
			<div className="grid grid-cols-1 md:grid-cols-2 place-content-center gap-10 py-20">
				<div className="space-y-2">
					<h2 className="font-semibold text-gray-shade-15">
						{course?.result?.title}
					</h2>

					<p className="text-gray-shade-35 text-base lg:text-lg">
						{course?.result?.description}
					</p>

					<div className="flex items-center gap-x-3">
						<div className=" data-[slot=avatar]:ring-2 data-[slot=avatar]:ring-orange-shade-50">
							<Avatar>
								<AvatarImage
									src={
										course?.result?.instructor?.avatar || ""
									}
									alt="instructor-photo"
								/>
								<AvatarFallback>AU</AvatarFallback>
							</Avatar>
						</div>
						<span className="font-semibold text-gray-shade-30">
							By {course?.result?.instructor?.name}
						</span>
					</div>
					<Button size={"lg"} onClick={handleEnrollment}>
						{paymentLoading ? "Loading" : "Enroll Now"}
					</Button>
				</div>
				<div className="rounded-md overflow-hidden">
					<Image
						src={course?.result?.thumbnail || ""}
						height={500}
						width={1200}
						alt="advanced-Javascript"
						className="w-full h-[230px] md:h-[320px] rounded-md overflow-hidden"
					/>
				</div>
			</div>

			<h2 className="text-gray-shade-30 font-semibold">Curriculum</h2>
			<Accordion
				type="single"
				collapsible
				className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5"
			>
				{course?.result?.modules.map((mod) => (
					<AccordionItem
						key={mod._id}
						value={mod._id}
						className="p-5 bg-white rounded-md border"
					>
						<AccordionTrigger className="hover:no-underline text-base font-medium p-0">
							<div className="flex items-center gap-5">
								<div className="flex flex-col items-center justify-center bg-orange-shade-80 p-2 rounded-md">
									<span>Module</span>
									<span>{mod.index}</span>
								</div>
								<p className="text-left">{mod.title}</p>
							</div>
						</AccordionTrigger>
						<AccordionContent className="py-3 px-1 text-gray-shade-30 space-y-3">
							{mod.lectures.map((lec, index) => (
								<div
									key={lec._id}
									className="px-4 py-5 bg-white border flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0 rounded-md hover:ring-orange-shade-80 hover:ring-1 group"
								>
									<div>
										<p className="font-medium text-xl text-gray-shade-20">
											{lec.title}
										</p>
										<p className="text-gray-shade-35">
											Lesson {index + 1}
										</p>
									</div>
									<span className="bg-white-shade-97 px-3 py-2 inline-flex items-center gap-x-2 text-gray-shade-35 cursor-default group-hover:bg-orange-shade-90 group-hover:text-gray-shade-30 rounded-md">
										<Clock size={16} />
										{lec.duration}
									</span>
								</div>
							))}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</Container>
	);
}
