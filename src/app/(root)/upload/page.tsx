"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/form-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { CldUploadWidget } from "next-cloudinary";
import { config } from "@/config";
import Image from "next/image";

export default function Upload() {
	const form = useForm<z.infer<typeof categorySchema>>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: "",
			icon: "",
		},
	});

	const handleLogin = (values: z.infer<typeof categorySchema>) => {
		console.log(values);
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleLogin)}
				className="space-y-8"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Email address" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="icon"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Course Thumbnail</FormLabel>
							<FormControl>
								<div>
									<CldUploadWidget
										uploadPreset={
											config.cloud_upload_preset
										}
										onSuccess={(result) => {
											if (
												typeof result.info ===
													"object" &&
												"secure_url" in result.info
											) {
												field.onChange(
													result.info.secure_url
												);
											}
										}}
									>
										{({ open }) => (
											<Button
												variant={"secondary"}
												onClick={() => open()}
											>
												Upload Image
											</Button>
										)}
									</CldUploadWidget>

									{field.value && (
										<Image
											src={field.value}
											width={100}
											height={100}
											alt="Uploaded"
											className="mt-2 h-32 rounded-lg"
										/>
									)}
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Create Category</Button>
			</form>
		</Form>
	);
}
