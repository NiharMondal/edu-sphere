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
import { registrationSchema } from "@/form-schema";
import { config } from "@/config";
import { TRegister } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const register = async (payload: TRegister) => {
	const res = await fetch(`${config.backend_url}/auth/register`, {
		method: "POST",
		body: JSON.stringify(payload),
		headers: {
			"Content-type": "application/json",
		},
	});

	if (!res.ok) {
		throw new Error("Something went wrong");
	}

	const data = await res.json();
	return data;
};
export default function RegisterForm() {
	const router = useRouter();
	const form = useForm<z.infer<typeof registrationSchema>>({
		resolver: zodResolver(registrationSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const mutation = useMutation({
		mutationFn: register,
		onSuccess: () => {
			// queryClient.invalidateQueries("user");
			toast("Successfully registered an account");
			router.push("/login");
		},
		onError: (error) => {
			toast("Something went wrong!");
			console.log(error);
		},
	});

	const handleSubmit = (values: z.infer<typeof registrationSchema>) => {
		mutation.mutate(values);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="space-y-8"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Full name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
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
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="Password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Create Account</Button>
			</form>
		</Form>
	);
}
