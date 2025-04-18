import { z } from "zod";

export const createCourseSchema = z.object({
	thumbnail: z
		.string({ required_error: "Thumbnail is required" })
		.url({ message: "Provide a valid URL" })
		.trim(),
	title: z
		.string({ required_error: "Name is required" })
		.min(3, "Should be more than 3 characters")
		.max(50, "Should be less than 30 characters"),
	price: z.coerce
		.number({ required_error: "Name is required" })
		.positive({ message: "Price can not be negative" })
		.max(2000, "Should be less than 30 characters"),
	description: z
		.string({ required_error: "Description is required" })
		.min(20, { message: "Min characters is 20" })
		.max(1000, { message: "Max character is 1000" })
		.trim(),
	instructor: z
		.string({ required_error: "Instructor is required" })
		.nonempty({ message: "Please select instructor" })
		.trim(),
});

export const registrationSchema = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.min(3, "Should be more than 3 characters")
		.max(30, "Should be less than 30 characters"),
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Enter a valid email" })
		.trim(),
	password: z
		.string({ required_error: "Password is required" })
		.min(6, "Min length is 6")
		.max(25, "Max length is 25")
		.trim(),
});

export const loginSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Enter a valid email" })
		.trim(),
	password: z
		.string({ required_error: "Password is required" })
		.min(5, "Min length is 6")
		.trim(),
});

export const createModuleSchema = z.object({
	title: z
		.string({ required_error: "Module title is required" })
		.min(5, "Min length is 6")
		.max(40, "Max length is 40")
		.trim(),

	course: z
		.string({
			required_error: "Course ID is required",
		})
		.nonempty({ message: "Course can not be empty" }),
});
export const updateModuleSchema = z.object({
	title: z
		.string({ required_error: "Module title is required" })
		.min(5, "Min length is 6")
		.max(40, "Max length is 40")
		.trim(),
});

export const lectureSchema = z.object({
	course: z.string({ required_error: "Course is required" }),

	title: z
		.string({ required_error: "Lecture title is required" })
		.min(5, "Min length is 6")
		.max(40, "Max length is 40")
		.trim(),
	type: z
		.string({ required_error: "File type is required" })
		.nonempty({ message: "File type is required" }),
	module: z
		.string({ required_error: "Module ID is required" })
		.nonempty({ message: "Please select a module" }),
	duration: z.string({ required_error: "Duration is required" }),
	content: z
		.string({ required_error: "URL is required" })
		.url({ message: "Provide a valid URL" })
		.trim(),
});
export const lectureUpdateSchema = z.object({
	title: z
		.string({ required_error: "Lecture title is required" })
		.min(5, "Min length is 6")
		.max(40, "Max length is 40")
		.trim(),
	type: z.string({ required_error: "File type is required" }),
	duration: z.string({ required_error: "Duration is required" }).optional(),
	content: z
		.string({ required_error: "URL is required" })
		.url({ message: "Provide a valid URL" })
		.trim(),
});

export const changePasswordSchema = z
	.object({
		oldPassword: z
			.string({ required_error: "Provide your old password" })
			.min(6, { message: "Min length is 6" })
			.max(30, { message: "Max length is 30" })
			.nonempty({ message: "Old password is required" })
			.trim(),
		newPassword: z
			.string({ required_error: "New password is required" })
			.min(6, { message: "Min length is 6" })
			.max(30, { message: "Max length is 30" })
			.nonempty({ message: "New password is required" })
			.trim(),
		confirmPassword: z
			.string({ required_error: "Confirm password is required" })
			.trim(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	})
	.refine((data) => data.oldPassword !== data.newPassword, {
		message: "New password must be different from the old password",
		path: ["newPassword"],
	});

export const userUpdateSchema = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.nonempty({ message: "Name can not be empty" })
		.optional(),
	email: z
		.string()
		.email({ message: "Provide a valid information" })
		.optional(),
});
