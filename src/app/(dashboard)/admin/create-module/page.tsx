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

import { useGetCourseQuery } from "@/redux/api/admin-api/courseApi";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useCreateModuleMutation } from "@/redux/api/admin-api/moduleApi";
import { createModuleSchema } from "@/form-schema";

export default function CreateModulePage() {
	const { data: courses, isLoading: courseLoading } = useGetCourseQuery();
	const [createModule, { isLoading: moduleLoading }] =
		useCreateModuleMutation();

	const form = useForm<z.infer<typeof createModuleSchema>>({
		resolver: zodResolver(createModuleSchema),
		defaultValues: {
			course: "",
			title: "",
		},
	});

	const selectedCourse = form.watch("course");

	const handleCourseSubmit = async (
		values: z.infer<typeof createModuleSchema>
	) => {
		try {
			const response = await createModule({
				courseId: values.course,
				payload: values,
			}).unwrap();

			if (response.success) {
				toast.success("Module created successfully");
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
					onSubmit={form.handleSubmit(handleCourseSubmit)}
					className="max-w-3xl w-full mt-10 space-y-5"
				>
					{/* Course Select Field */}
					<FormField
						control={form.control}
						name="course"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Course title</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									disabled={courseLoading}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select course" />
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

					{/* Module Title Input Field */}
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Module title</FormLabel>
								<FormControl>
									<Input
										placeholder="Title"
										{...field}
										disabled={!selectedCourse}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={moduleLoading}>
						Create Module
					</Button>
				</form>
			</Form>
		</div>
	);
}
