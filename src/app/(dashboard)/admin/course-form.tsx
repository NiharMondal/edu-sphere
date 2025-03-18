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
import { QueryClient, useMutation } from "@tanstack/react-query";
import { TCourse } from "@/types";
import { config } from "@/config";

const createCourse = async (payload: Partial<TCourse>) => {
	try {
		const res = await fetch(`${config.backend_url}/course`, {
			method: "POST",
			body: JSON.stringify(payload),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		return data;
	} catch (error) {
		return error;
	}
};
export default function CreateCourse() {
	const queryClient = new QueryClient();

	const form = useForm<z.infer<typeof createCourseSchema>>({
		resolver: zodResolver(createCourseSchema),
		defaultValues: {
			thumbnail: "",
			title: "",
			price: 0,
			description: "",
		},
	});

	const mutation = useMutation({
		mutationFn: createCourse,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["course"] });
			toast("Course has been created");
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			toast(error?.data?.message);
		},
	});
	const handleCourse = async (values: z.infer<typeof createCourseSchema>) => {
		mutation.mutate(values);
	};

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
				<Button type="submit">Create course</Button>
			</form>
		</Form>
	);
}
