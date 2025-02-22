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
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TModule, TModuleResponse, TServerResponse } from "@/types";
import { config } from "@/config";
import { useEffect } from "react";
import { moduleSchema } from "@/form-schema";

const fetchModuleById = async (
	moduleId: string
): Promise<TServerResponse<TModuleResponse> | null> => {
	try {
		const res = await fetch(`${config.backend_url}/module/${moduleId}`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const updateModule = async (moduleId: string, payload: Partial<TModule>) => {
	try {
		const res = await fetch(
			`${config.backend_url}/module/admin/${moduleId}`,
			{
				method: "PATCH",
				body: JSON.stringify(payload),
				headers: { "Content-Type": "application/json" },
			}
		);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default function UpdateModule({ moduleId }: { moduleId: string }) {
	const queryClient = useQueryClient();

	const {
		data: module,
		isPending,
		error,
	} = useQuery({
		queryKey: ["single-module", moduleId],
		queryFn: () => fetchModuleById(moduleId),
		enabled: !!moduleId,
	});

	const form = useForm<z.infer<typeof moduleSchema>>({
		resolver: zodResolver(moduleSchema),
		defaultValues: {
			title: module?.result.title || "",
		},
	});

	useEffect(() => {
		if (module?.result) {
			form.reset({
				title: module.result.title || "",
			});
		}
	}, [module?.result, moduleId, form]);

	const mutation = useMutation({
		mutationFn: (payload: Partial<TModule>) =>
			updateModule(moduleId, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["module"],
			});
			toast("Module has been updated");
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onError: (error: any) => {
			toast(error?.data?.message);
		},
	});
	const handleModule = (values: z.infer<typeof moduleSchema>) => {
		mutation.mutate(values);
	};

	if (isPending) return "Please wait...";
	if (error) return "An error occured";

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
							<FormLabel>Module Title</FormLabel>
							<FormControl>
								<Input placeholder="Title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Update module</Button>
			</form>
		</Form>
	);
}
