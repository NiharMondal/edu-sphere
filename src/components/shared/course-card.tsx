"use client";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Delete } from "lucide-react";
import { TCourse } from "@/types";
import Modal from "./modal";
import { useState } from "react";
import UpdateCourse from "../dashboard/update-course";
import { config } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
	data: TCourse;
	role?: string;
};
const deleteCourse = async (courseId: string) => {
	const res = await fetch(`${config.backend_url}/course/${courseId}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		throw new Error("Failed to delete course");
	}

	return res.json(); // Return the response after deletion
};
export default function CourseCard({ data, role }: Props) {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);

	const mutation = useMutation({
		mutationFn: (courseId: string) => deleteCourse(courseId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["course"] });
			toast.success("Course deleted successfully!");
		},
		onError: (error) => {
			toast.error("Failed to delete course");
			console.error(error);
		},
	});

	return (
		<Card className="overflow-hidden hover:ring-1 hover:ring-primary">
			<div className="h-[200px]">
				<Image
					src={data?.thumbnail}
					width={200}
					height={200}
					alt="react-course"
					className="w-full h-full"
				/>
			</div>
			<CardHeader className="px-3">
				<CardTitle className="text-xl">{data?.title}</CardTitle>
				<CardDescription>${data?.price}</CardDescription>
			</CardHeader>
			<CardFooter className="px-3 flex flex-col">
				<Link href={`/courses/${data?.slug}`} className="w-full">
					<Button
						className="w-full hover:bg-muted-foreground hover:text-secondary"
						variant={"outline"}
						size={"lg"}
					>
						See Details
						<ArrowRight />
					</Button>
				</Link>

				{role && (
					<div className="flex items-center justify-between w-full mt-3 text-xs">
						<Modal
							isOpen={open}
							onOpenChange={setOpen}
							triggerText="Edit"
						>
							<UpdateCourse courseId={data?._id} />
						</Modal>

						<span
							className="inline-flex items-center  gap-x-2 p-2 rounded-md bg-destructive/75 hover:bg-destructive text-destructive-foreground cursor-pointer"
							onClick={() => mutation.mutate(data?._id)}
						>
							<Delete size={18} /> Delete
						</span>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}
