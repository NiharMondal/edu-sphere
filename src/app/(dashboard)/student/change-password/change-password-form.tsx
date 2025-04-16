"use client";
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
import { changePasswordSchema } from "@/form-schema";
import { useChangePasswordMutation } from "@/redux/api/user-api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function ChangePasswordForm() {
	const [changePassword] = useChangePasswordMutation();
	const form = useForm<z.infer<typeof changePasswordSchema>>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	const handleChangePassword = async (
		values: z.infer<typeof changePasswordSchema>
	) => {
		const res = await changePassword({ id: "", payload: values }).unwrap();
		if (res?.success) {
			toast.success("Password changed successfully");
		}
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};
	return (
		<Form {...form}>
			<form
				className="max-w-xl w-full mt-10 space-y-5 p-10 border"
				onSubmit={form.handleSubmit(handleChangePassword)}
			>
				<FormField
					control={form.control}
					name="oldPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Old Password</FormLabel>
							<FormControl>
								<Input
									placeholder="Old password"
									{...field}
									type="password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password</FormLabel>
							<FormControl>
								<Input
									placeholder="New password"
									{...field}
									type="password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									placeholder="Confirm password"
									{...field}
									type="password"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Change Password</Button>
			</form>
		</Form>
	);
}
