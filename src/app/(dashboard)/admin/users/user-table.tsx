"use client";
import { useAllUsersQuery } from "@/redux/api/user-api/userApi";
import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
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
import { Info } from "lucide-react";
import UserDetails from "@/components/admin-ui/UserDetails";
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
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$2,500.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
