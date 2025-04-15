"use client";
import { useAllUsersQuery } from "@/redux/api/user-api/userApi";
import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import EsModal from "@/components/shared/es-modal";
import {
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Info } from "lucide-react";
import UserDetails from "@/components/admin-ui/UserDetails";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUserRoleMutation } from "@/redux/api/admin-api/user";
import { toast } from "sonner";

const userRole = [
	{
		value: "admin",
		level: "Admin",
	},
	{
		value: "instructor",
		level: "Instructor",
	},
	{
		value: "student",
		level: "Student",
	},
];

export default function UserTable() {
	const { data: users, isLoading } = useAllUsersQuery();

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<Table>
			<TableCaption>A list of recently created users.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="text-primary">Name</TableHead>
					<TableHead className="text-primary">Email</TableHead>
					<TableHead className="text-primary">Role</TableHead>
					<TableHead className="text-center text-primary">
						Action
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="text-muted-foreground">
				{users?.result?.map((user) => (
					<TableRow key={user._id}>
						<TableCell className="font-medium text-accent-foreground">
							{user.name}
						</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{user.role}</TableCell>
						<TableCell className="text-center space-y-1 space-x-1">
							<EsModal>
								<DialogTrigger asChild>
									<Button variant={"destructive"}>
										<Edit />
										Update Role
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>
											Update user role
										</DialogTitle>
										<DialogDescription className="sr-only">
											Make changes to your profile here.
										</DialogDescription>
									</DialogHeader>

									<UpdateUserRole
										uRole={user?.role}
										userId={user._id}
									/>
								</DialogContent>
							</EsModal>
							<EsModal>
								<DialogTrigger asChild>
									<Button variant="outline">
										<Info />
										<span>Details</span>
									</Button>
								</DialogTrigger>
								<DialogContent className="w-full md:max-w-3xl">
									<DialogHeader>
										<DialogTitle>
											See more about this user
										</DialogTitle>
										<DialogDescription className="sr-only">
											Make changes to your profile here.
										</DialogDescription>
									</DialogHeader>

									<UserDetails userId={user._id} />
								</DialogContent>
							</EsModal>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

const UpdateUserRole = ({
	uRole,
	userId,
}: {
	uRole: string;
	userId: string;
}) => {
	const [updateUserRole] = useUpdateUserRoleMutation();
	const userRoleSchema = z.object({
		role: z.string(),
	});
	const form = useForm<z.infer<typeof userRoleSchema>>({
		resolver: zodResolver(userRoleSchema),
		defaultValues: {
			role: uRole || "student",
		},
	});

	const updateRole = async (values: z.infer<typeof userRoleSchema>) => {
		try {
			const res = await updateUserRole({
				id: userId,
				payload: values,
			}).unwrap();

			if (res.success) {
				toast.success("Role updated successfully");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(updateRole)}
				className="space-y-5"
			>
				<FormField
					name="role"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>User Role</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={uRole || field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select file type" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{userRole.map((value) => (
										<SelectItem
											key={value.value}
											value={value.value}
										>
											{value.level}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Update Role</Button>
			</form>
		</Form>
	);
};
