"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { loginSchema } from "@/form-schema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { setCookie } from "@/actions/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import { setCredentials } from "@/redux/slice/authSlice";
import { decodeToken } from "@/lib/decodeToken";
import { useLoginToAccountMutation } from "@/redux/api/authApi";

export default function LoginForm() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [loginToAccount, { isLoading }] = useLoginToAccountMutation();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleLogin = async (values: z.infer<typeof loginSchema>) => {
		try {
			const res = await loginToAccount(values).unwrap(); // server action

			if (res.success) {
				toast.success("Logged in successfully");
				await setCookie(res?.result?.accessToken); // setting cookie

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const user: any = decodeToken(res?.result?.accessToken);
				dispatch(
					setCredentials({
						user: user,
						token: res?.result?.accessToken,
					})
				);
				router.push(`/${user?.role}`);
			} else {
				toast.error("Invalid credentials");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast(error?.data?.message);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleLogin)}
				className="space-y-8"
			>
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
								<Input
									placeholder="Password"
									{...field}
									type="password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isLoading}>
					Login
				</Button>
			</form>
		</Form>
	);
}
