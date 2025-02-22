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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TCourse } from "@/types";
import { config } from "@/config";
import { useEffect } from "react";

const fetchCourse = async (courseId: string) => {
	try {
		const res = await fetch(`${config.backend_url}/course/${courseId}`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
const updateCourse = async (courseId: string, payload: Partial<TCourse>) => {
	try {
		const res = await fetch(`${config.backend_url}/course/${courseId}`, {
			method: "PATCH",
			body: JSON.stringify(payload),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		return data;
	} catch (error) {
		return error;
	}
};

export default function UpdateCourse({ courseId }: { courseId: string }) {
	const queryClient = useQueryClient();

	const {
		data: course,
		isPending,
		error,
	} = useQuery({
		queryKey: ["single-course", courseId],
		queryFn: () => fetchCourse(courseId),
		enabled: !!courseId,
	});

	const form = useForm<z.infer<typeof createCourseSchema>>({
		resolver: zodResolver(createCourseSchema),
		defaultValues: {
			thumbnail: course?.result?.thumbnail || "",
			title: course?.result.title || "",
			price: course?.result?.price || 0,
			description: course?.result?.description || "",
		},
	});

	useEffect(() => {
		if (course?.result) {
			form.reset({
				thumbnail: course.result.thumbnail || "",
				title: course.result.title || "",
				price: course.result.price || 0,
				description: course.result.description || "",
			});
		}
	}, [course?.result, courseId, form]);

	const mutation = useMutation({
		mutationFn: (payload: Partial<TCourse>) =>
			updateCourse(courseId, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["course"],
			});
			toast("Module has been updated");
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			toast(error?.data?.message);
		},
	});
	const handleCourse = (values: z.infer<typeof createCourseSchema>) => {
		mutation.mutate(values);
	};

	if (isPending) return "Please wait...";
	if (error) return "An error occured";
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleCourse)}
				className="space-y-8"
			>
				<FormField
					control={form.control}
					name="thumbnail"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Thumbnail URL</FormLabel>
							<FormControl>
								<Input placeholder="URL link" {...field} />
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
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor="description">
								Your message
							</FormLabel>

							<FormControl>
								<Textarea
									placeholder="Write short description about this course"
									id="description"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Update course</Button>
			</form>
		</Form>
	);
}
