"use client";
import { config } from "@/config";
import { TLecture, TModule, TServerResponse } from "@/types";
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
import { toast } from "sonner";

const fetchModule = async (): Promise<TServerResponse<TModule[]>> => {
	const res = await fetch(`${config.backend_url}/module/course/module`);
	const course = await res.json();
	return course;
};

const createLecture = async (payload: Partial<TLecture>) => {
	try {
		const res = await fetch(
			`${config.backend_url}/lecture/module/${payload.module}/create`,
			{
				method: "POST",
				body: JSON.stringify(payload),
				headers: { "Content-Type": "application/json" },
			}
		);
		const data = await res.json();
		return data;
	} catch (error) {
		return error;
	}
};

export default function CreateLecture() {
	const queryClient = useQueryClient();
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

	const mutation = useMutation({
		mutationFn: createLecture,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lecture"] });
			toast("Lecture has been created");
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			toast(error?.data?.message);
		},
	});
	async function handleLecture(values: z.infer<typeof lectureSchema>) {
		mutation.mutate(values);
	}

	if (isPending) return "Please wait...";
	if (error) return "An error occured";
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleLecture)}
				className="space-y-8"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Lecture title</FormLabel>
							<FormControl>
								<Input placeholder="Title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem>
							<FormLabel>URL</FormLabel>
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
								{...field}
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
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Select Type</FormLabel>
							<Select
								onValueChange={field.onChange}
								required={true}
								{...field}
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
				<Button type="submit">Create lecture</Button>
			</form>
		</Form>
	);
}
