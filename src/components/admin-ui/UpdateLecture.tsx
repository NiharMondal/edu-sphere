"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { lectureUpdateSchema } from "@/form-schema";

import { toast } from "sonner";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	useSingleLectureQuery,
	useUpdateLectureMutation,
} from "@/redux/api/admin-api/lectureApi";
import { useEffect } from "react";

const fileType = [
	{
		value: "video",
		level: "Video",
	},
	{
		value: "pdf",
		level: "PDF",
	},
	{
		value: "text",
		level: "Text",
	},
];
export default function UpdateLecture({ lectureId }: { lectureId: string }) {
	const { data: lectureDetails, isLoading } =
		useSingleLectureQuery(lectureId);

	const [updateLecture, { isLoading: updateLoading }] =
		useUpdateLectureMutation();

	const form = useForm<z.infer<typeof lectureUpdateSchema>>({
		resolver: zodResolver(lectureUpdateSchema),
		defaultValues: {
			title: lectureDetails?.result?.title || "",
			content: lectureDetails?.result?.content || "",
			type: lectureDetails?.result?.type || "",
			duration: lectureDetails?.result?.duration || "",
		},
	});

	const handleLectureSubmit = async (
		values: z.infer<typeof lectureUpdateSchema>
	) => {
		console.log(values);
		try {
			const response = await updateLecture({
				id: lectureId,
				payload: values,
			}).unwrap();

			if (response.success) {
				toast.success("Lecture updated successfully");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	//updating default form values
	useEffect(() => {
		if (lectureDetails?.result) {
			form.reset({
				title: lectureDetails?.result?.title || "",
				content: lectureDetails?.result?.content || "",
				type: lectureDetails?.result?.type || "",
				duration: lectureDetails?.result?.duration || "",
			});
		}
	}, [form, lectureDetails]);

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<div className="grid grid-cols-1 place-items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleLectureSubmit)}
					className="max-w-3xl w-full  mt-10"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Lecture Title</FormLabel>
									<FormControl>
										<Input
											placeholder="Lecture Title"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormLabel>URL</FormLabel>
									<FormControl>
										<Input
											placeholder="Content URL"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>File Type</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={
											lectureDetails?.result?.type ||
											field.value
										}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select file type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{fileType.map((value) => (
												<SelectItem
													key={value.value}
													value={value.value}
												>
													{value.level}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="duration"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Duration</FormLabel>
									<FormControl>
										<Input
											placeholder="Ex: 10 min"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" disabled={updateLoading}>
						Update Lecture
					</Button>
				</form>
			</Form>
		</div>
	);
}
