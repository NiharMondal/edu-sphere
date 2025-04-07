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
import { lectureSchema } from "@/form-schema";

import { toast } from "sonner";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useCreateLectureMutation } from "@/redux/api/admin-api/lectureApi";
import { useState } from "react";
import { useGetCourseQuery } from "@/redux/api/admin-api/courseApi";
import { useModuleByCourseIdQuery } from "@/redux/api/admin-api/moduleApi";
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
export default function CreateLectureForm() {
	const [courseId, setCourseId] = useState("");

	const { data: courses, isLoading: courseLoading } = useGetCourseQuery();
	const { data: modules } = useModuleByCourseIdQuery(courseId, {
		skip: !courseId,
	});
	const [createLecture, { isLoading: cLoading }] = useCreateLectureMutation();

	const form = useForm<z.infer<typeof lectureSchema>>({
		resolver: zodResolver(lectureSchema),
		defaultValues: {
			course: "",
			content: "",
			module: "",
			title: "",
			duration: "",
			type: "",
		},
	});

	// watching type and then rendering duration field
	const type = form.watch("type");
	const showDuration = type === "video";
	const selectedModule = form.watch("course");
	const handleLectureSubmit = async (
		values: z.infer<typeof lectureSchema>
	) => {
		console.log(values);
		try {
			const response = await createLecture(values).unwrap();
			console.log(response);
			if (response.success) {
				toast.success("Lecture created successfully");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

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
							name="course"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Course</FormLabel>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											setCourseId(value);
										}}
										defaultValue={field.value}
										disabled={courseLoading}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select Course" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{courses?.result?.map((course) => (
												<SelectItem
													key={course?._id}
													value={course?._id}
												>
													{course?.title}
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
							name="module"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Module</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={!selectedModule}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select Module" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{modules?.result?.map((user) => (
												<SelectItem
													key={user?._id}
													value={user?._id}
												>
													{user?.title}
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
										defaultValue={field.value}
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
											disabled={!showDuration}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" disabled={cLoading}>
						Create Lecture
					</Button>
				</form>
			</Form>
		</div>
	);
}
