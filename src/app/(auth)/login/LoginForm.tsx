"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { loginSchema } from "@/form-schema";
import { Form } from "@/components/ui/form";
import { setCookie } from "@/actions/auth-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import { setCredentials } from "@/redux/slice/authSlice";
import { decodeToken } from "@/lib/decodeToken";
import { useLoginToAccountMutation } from "@/redux/api/authApi";
import ESInput from "@/components/form/ESInput";

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
			console.log(res);
			if (res?.success) {
				toast.success("Logged in successfully");
				await setCookie(res?.result?.accessToken); // setting cookie

				const user = decodeToken(res?.result?.accessToken);

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
			console.log(error);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleLogin)}
				className="space-y-5"
			>
				<ESInput form={form} name="email" label="Email" />
				<ESInput
					form={form}
					name="password"
					label="Password"
					type="password"
				/>

				<Button type="submit" disabled={isLoading}>
					Login
				</Button>
			</form>
		</Form>
	);
}
