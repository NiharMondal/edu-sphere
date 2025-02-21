"use client";
import { config } from "@/config";
import { TModule, TServerResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { lectureSchema } from "@/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const fetchModule = async (): Promise<TServerResponse<TModule[]>> => {
	const res = await fetch(`${config.backend_url}/module/course/module`);
	const course = await res.json();
	return course;
};

export default function LectureForm() {
	const form = useForm<z.infer<typeof lectureSchema>>({
		resolver: zodResolver(lectureSchema),
		defaultValues: {
			title: "",
			module: "",
			type: "",
			url: "",
		},
	});

	const {
		data: modules,
		isPending,
		error,
	} = useQuery({ queryKey: ["module"], queryFn: fetchModule });

	if (isPending) return "Please wait...";
	if (error) return "An error occured";

	function createModule(values: z.infer<typeof lectureSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(createModule)}
				className="space-y-8"
			>
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
					name="module"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Select Module</FormLabel>
							<Select
								onValueChange={field.onChange}
								required={true}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a verified module to display" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{modules?.result?.map((module) => (
										<SelectItem
											key={module?._id}
											value={module?._id}
										>
											{module?.title}
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
							<FormLabel>Select Course</FormLabel>
							<Select
								onValueChange={field.onChange}
								required={true}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="text">Text</SelectItem>
									<SelectItem value="video">Video</SelectItem>
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Create Module</Button>
			</form>
		</Form>
	);
}
