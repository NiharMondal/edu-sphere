import { z } from "zod";

export const createCourseSchema = z.object({
	thumbnail: z
		.string({ required_error: "Thumbnail is required" })
		.url({ message: "Provide a valid URL" })
		.trim(),
	title: z
		.string({ required_error: "Name is required" })
		.min(3, "Should be more than 3 charactes")
		.max(30, "Should be less than 30 charactes"),
	price: z
		.number({ required_error: "Price should be number" })
		.positive({ message: "Price can not be negative" })
		.max(2000, { message: "Price can not excede 2000 dollar" }),
	description: z
		.string({ required_error: "Description is required" })
		.min(20, { message: "Min characters is 20" })
		.max(1000, { message: "Max character is 1000" })
		.trim(),
});

export const registrationSchema = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.min(3, "Should be more than 3 charactes")
		.max(30, "Should be less than 30 charactes"),
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

export const moduleSchema = z.object({
	title: z
		.string({ required_error: "Course title is required" })
		.min(5, "Min length is 6")
		.max(40, "Max length is 40")
		.trim(),

	course: z.string({ required_error: "Course ID is required" }),
});

export const lectureSchema = z.object({
	title: z
		.string({ required_error: "Lecture title is required" })
		.min(5, "Min length is 6")
		.max(40, "Max length is 40")
		.trim(),
	type: z.string({ required_error: "Doc type is required" }).trim(),
	module: z.string({ required_error: "Module ID is required" }),
	url: z
		.string({ required_error: "URL is required" })
		.url({ message: "Provide a valid URL" })
		.trim(),
});
