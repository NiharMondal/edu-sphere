"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import React from "react";

import Container from "@/components/shared/Container";
import { Clock } from "lucide-react";
import AppLoading from "@/app/loading";
import { useCourseBySlugQuery } from "@/redux/api/course/courseApi";
import { useMakePaymentMutation } from "@/redux/api/enrollment/enrollmentApi";
import { useAppSelector } from "@/hooks";
import { selectedUser } from "@/redux/slice/authSlice";
import { toast } from "sonner";

export default function CourseInformation({ slug }: { slug: string }) {
	const user = useAppSelector(selectedUser);
	const [makePayment, { isLoading: paymentLoading }] =
		useMakePaymentMutation();
	const { data: course, isLoading } = useCourseBySlugQuery(slug);

	if (isLoading) return <AppLoading />;

	const handleClick = async () => {
		const data = {
			course: course?.result._id,
			student: user?.id,
			amount: course?.result?.price,
		};
		try {
			const res = await makePayment(data).unwrap();
			if (res?.result) {
				window.location.href = res?.result?.url;
				toast.message("Redirecting to checkout page...");
			} else {
				toast.error("Something went wrong!");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			toast.warning(error?.data?.message);
		}
	};
	return (
		<Container>
			<div className="grid grid-cols-1 md:grid-cols-2 place-content-center gap-10 py-20">
				<div className="space-y-2">
					<h2 className="font-semibold text-gray-shade-15">
						{course?.result.title}
					</h2>

					<p className="text-gray-shade-35 text-base lg:text-lg">
						{course?.result?.description}
					</p>

					<div className="flex items-center gap-x-3">
						<div className=" data-[slot=avatar]:ring-2 data-[slot=avatar]:ring-orange-shade-50">
							<Avatar>
								<AvatarImage
									src={course?.result?.instructor?.avatar}
									alt="instructor-photo"
								/>
								<AvatarFallback>AU</AvatarFallback>
							</Avatar>
						</div>
						<span className="font-semibold text-gray-shade-30">
							By {course?.result?.instructor?.name}
						</span>
					</div>
					<Button size={"lg"} onClick={handleClick}>
						{paymentLoading ? "Loading" : "Enroll Now"}
					</Button>
				</div>
				<div className="rounded-md overflow-hidden">
					<Image
						src={course?.result?.thumbnail || ""}
						height={500}
						width={1200}
						alt="advanced-Javascript"
						className="w-full h-full rounded-md overflow-hidden"
					/>
				</div>
			</div>

			<h2 className="text-gray-shade-30 font-semibold">Curriculum</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
				{course?.result?.modules.map((mod) => (
					<div
						className="bg-white p-5 md:p-8 xl:p-12 rounded-md max-h-fit"
						key={mod._id}
					>
						<p className="text-right font-bold text-gray-shade-15 text-2xl">
							{`0${mod.index}`}
						</p>
						<p className="text-2xl font-semibold py-4">
							{mod.title}
						</p>
						<div className="space-y-5">
							{mod.lectures.map((lec, index) => (
								<div
									className="px-4 py-5 bg-white border md:flex items-center justify-between space-y-3 rounded-md  hover:ring-orange-shade-80 hover:ring-2 group"
									key={lec._id}
								>
									<div>
										<p className="font-medium text-xl text-gray-shade-20">
											{lec.title}
										</p>
										<p className="text-gray-shade-35">
											Lesson {index + 1}
										</p>
									</div>
									<span className="bg-white-shade-97 px-3 py-2 inline-flex gap-x-2 text-gray-shade-35 cursor-default group-hover:bg-orange-shade-90 group-hover:text-gray-shade-30 rounded-md">
										<Clock />
										{lec.duration}
									</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</Container>
	);
}
