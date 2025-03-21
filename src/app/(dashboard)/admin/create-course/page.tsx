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

import { useCreateCourseMutation } from "@/redux/api/admin-api/course";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGetInstructorsQuery } from "@/redux/api/admin-api/user";

export default function CreateCourse() {
	const { data: instructors } = useGetInstructorsQuery(undefined);
	const [createCourse] = useCreateCourseMutation();

	const form = useForm<z.infer<typeof createCourseSchema>>({
		resolver: zodResolver(createCourseSchema),
		defaultValues: {
			thumbnail: "",
			title: "",
			price: 0,
			description: "",
		},
	});

	const handleCourseSubmit = async (
		values: z.infer<typeof createCourseSchema>
	) => {
		try {
			const response = await createCourse(values).unwrap();
			console.log(response);
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
					className="space-y-8 max-w-xl w-full mt-5"
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
						name="instructor"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Course instructor</FormLabel>
								<FormControl>
									<Input
										placeholder="Instructor"
										{...field}
									/>
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
										{instructors?.result?.map((user) => (
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
										rows={5}
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
		</div>
	);
}
