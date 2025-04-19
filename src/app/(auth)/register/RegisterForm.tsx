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

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateAccountMutation } from "@/redux/api/authApi";

export default function RegisterForm() {
	const router = useRouter();
	const [createAccount] = useCreateAccountMutation();
	const form = useForm<z.infer<typeof registrationSchema>>({
		resolver: zodResolver(registrationSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const handleSubmit = async (values: z.infer<typeof registrationSchema>) => {
		try {
			const res = await createAccount(values).unwrap();

			if (res?.success) {
				toast.success("Account created Successfully");
				router.push("/login");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
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
