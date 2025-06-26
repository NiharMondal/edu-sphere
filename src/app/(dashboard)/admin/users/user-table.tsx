"use client";
import React, { useCallback } from "react";
import moment from "moment";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	useAllUsersQuery,
	useUpdateUserRoleMutation,
} from "@/redux/api/userApi";
import { ESTable } from "@/components/shared/es-table";
import { TUserResponse } from "@/types/user.types";
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
	const { data: users, isLoading } = useAllUsersQuery({});
	const [updateUserRole] = useUpdateUserRoleMutation();

	const columns = [
		{ key: "name", label: "Name" },
		{ key: "role", label: "Role" },
		{
			key: "createdAt",
			label: "Registration Date",
			render: (user: TUserResponse) =>
				moment(`${user.createdAt}`, "YYYYMMDD").format("MMM DD YYYY"),
		},
		{
			key: "actions",
			label: "Actions",

			render: (user: TUserResponse) => (
				<Select
					defaultValue={user?.role}
					value={user?.role}
					onValueChange={(value) =>
						handleUpdateRole(value, user?._id)
					}
				>
					<SelectTrigger className="max-w-[120px]">
						<SelectValue placeholder="Select role" />
					</SelectTrigger>

					<SelectContent>
						{userRole.map((value) => (
							<SelectItem key={value.value} value={value.value}>
								{value.level}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			),
		},
	];
	const handleUpdateRole = useCallback(
		async (value: string, userId: string) => {
			try {
				const res = await updateUserRole({
					userId,
					payload: { role: value },
				}).unwrap();
				if (res.success) {
					toast.success("User role updated successfully");
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (error: any) {
				toast.error(error?.data?.message);
				console.log(error);
			}
		},
		[updateUserRole]
	);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			{users?.result?.length ? (
				<ESTable
					columns={columns}
					rowKey={(item) => item._id}
					data={users?.result}
				/>
			) : (
				<p>No data found!</p>
			)}
		</div>
	);
}
