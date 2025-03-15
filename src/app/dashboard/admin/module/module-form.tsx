"use client";
import { config } from "@/config";
import { TCourse, TServerResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { moduleSchema } from "@/form-schema";
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
import { toast } from "sonner";

const fetchCourse = async (): Promise<TServerResponse<TCourse[]>> => {
	const res = await fetch(`${config.backend_url}/course`);
	if (!res.ok) {
		throw new Error("Something went wrong!");
	}
	const course = await res.json();
	return course;
};

const createModule = async (values: { title: string; course?: string }) => {
	try {
		const res = await fetch(
			`${config.backend_url}/module/course/${values.course}/create`,
			{
				method: "POST",
				body: JSON.stringify(values),
				headers: { "Content-Type": "application/json" },
			}
		);
		const data = await res.json();
		return data;
	} catch (error) {
		return error;
	}
};

export default function ModuleForm() {
	const queryClient = useQueryClient();
	const form = useForm<z.infer<typeof moduleSchema>>({
		resolver: zodResolver(moduleSchema),
		defaultValues: {
			title: "",
			course: "",
		},
	});

	const {
		data: courses,
		isPending,
		error,
	} = useQuery({ queryKey: ["course"], queryFn: fetchCourse });

	const mutation = useMutation({
		mutationFn: createModule,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["module"] });
			toast("Module has been created");
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			toast(error?.data?.message);
		},
	});
	const handleModule = async (values: z.infer<typeof moduleSchema>) => {
		mutation.mutate(values);
	};

	if (isPending) return "Please wait...";
	if (error) return "An error occured";
	if (courses?.result.length === 0) return "No course found!";
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleModule)}
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
					name="course"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Select Course</FormLabel>
							<Select
								onValueChange={field.onChange}
								required={true}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select a verified course to display" />
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
				<Button type="submit">Create Module</Button>
			</form>
		</Form>
	);
}
