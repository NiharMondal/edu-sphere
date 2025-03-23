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
import { createCourseSchema } from "@/form-schema";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	useGetCourseByIdQuery,
	useUpdateCourseMutation,
} from "@/redux/api/admin-api/course";

import { useEffect } from "react";
import { useGetInstructorsQuery } from "@/redux/api/admin-api/user";

export default function UpdateCourse({ courseId }: { courseId: string }) {
	//fetching course by id
	const { data: course, isLoading: courseLoading } =
		useGetCourseByIdQuery(courseId);

	//fetching instructors
	const { data: instructors, isLoading: instLoading } =
		useGetInstructorsQuery();

	const [updateCourse, { isLoading: updateLoading }] =
		useUpdateCourseMutation();

	const form = useForm<z.infer<typeof createCourseSchema>>({
		resolver: zodResolver(createCourseSchema),
		defaultValues: {
			title: course?.result?.title || "",
			thumbnail: course?.result?.thumbnail || "",
			price: course?.result?.price || 100,
			instructor: course?.result?.instructor?._id || "",
			description: course?.result?.description || "",
		},
	});

	//
	const handleCourseUpdate = async (
		values: z.infer<typeof createCourseSchema>
	) => {
		try {
			const res = await updateCourse({
				id: courseId,
				payload: values,
			}).unwrap();

			if (res.success) {
				toast.success("Course updated successfully");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	//updating default form values
	useEffect(() => {
		if (course?.result) {
			form.reset({
				title: course?.result?.title || "",
				thumbnail: course?.result?.thumbnail || "",
				price: course?.result?.price || 100,
				instructor: course?.result?.instructor?._id || "",
				description: course?.result?.description || "",
			});
		}
	}, [form, course?.result]);

	if (courseLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="grid grid-cols-1 place-items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleCourseUpdate)}
					className="max-w-3xl w-full  mt-10"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
						<FormField
							control={form.control}
							name="thumbnail"
							defaultValue={course?.result?.thumbnail}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Thumbnail URL</FormLabel>
									<FormControl>
										<Input
											placeholder="URL link"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Course title</FormLabel>
									<FormControl>
										<Input placeholder="Title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											placeholder="200"
											{...field}
											type="number"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="instructor"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Instructor</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
										disabled={instLoading}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select Instructor" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{instructors?.result?.map(
												(user) => (
													<SelectItem
														key={user?._id}
														value={user?._id}
													>
														{user?.name}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="description">
										Course description
									</FormLabel>

									<FormControl>
										<Textarea
											placeholder="Write short description about this course"
											id="description"
											rows={5}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" disabled={updateLoading}>
						Update course
					</Button>
				</form>
			</Form>
		</div>
	);
}
