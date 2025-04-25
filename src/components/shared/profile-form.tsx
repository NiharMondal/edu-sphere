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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "../ui/input";
import {
	useSingleUserQuery,
	useUpdateInformationMutation,
} from "@/redux/api/user-api/userApi";
import { userUpdateSchema } from "@/form-schema";

import { useAppSelector } from "@/hooks";
import { selectedUser } from "@/redux/slice/authSlice";
import { useEffect } from "react";

export default function ProfileForm() {
	const user = useAppSelector(selectedUser);

	const { data: userDetails, isLoading } = useSingleUserQuery(
		user?.id as string,
		{
			skip: !user?.id,
		}
	);

	const [updateInformation, { isLoading: updateLoading }] =
		useUpdateInformationMutation();
	const form = useForm<z.infer<typeof userUpdateSchema>>({
		resolver: zodResolver(userUpdateSchema),
		defaultValues: {
			name: "",
			email: "",
		},
	});

	const handleUserDetails = async (
		values: z.infer<typeof userUpdateSchema>
	) => {
		try {
			const res = await updateInformation({
				id: user?.id,
				payload: values,
			}).unwrap();

			if (res?.success) {
				toast.success("User information updated successfully");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	//updating default form values
	useEffect(() => {
		if (userDetails?.result) {
			form.reset({
				name: userDetails?.result?.name || "",
				email: userDetails?.result?.email || "",
			});
		}
	}, [form, userDetails?.result]);

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<Form {...form}>
			<form
				className="max-w-xl w-full mt-10 space-y-5 p-10 border"
				onSubmit={form.handleSubmit(handleUserDetails)}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Name" {...field} />
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
							<FormLabel>Email Address</FormLabel>
							<FormControl>
								<Input placeholder="Email address" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={updateLoading}>
					Update
				</Button>
			</form>
		</Form>
	);
}
