"use client";

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
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import EsModal from "@/components/shared/es-modal";
import {
	DialogContent,
	DialogTrigger,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import {
	useAllLecturesQuery,
	useDeleteLectureMutation,
} from "@/redux/api/admin-api/lectureApi";

import UpdateLecture from "@/components/admin-ui/UpdateLecture";

export default function LectureTable() {
	const { data: courses } = useAllLecturesQuery(); // fetching courses

	const [deleteLecture, { isLoading: deleteLoading }] =
		useDeleteLectureMutation();

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteLecture(id).unwrap();
			if (res.success) {
				toast.success("Lecture deleted successfully");
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};
	return (
		<Table>
			<TableCaption>A list of recently created lectures.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="text-primary">Title</TableHead>
					<TableHead className="text-primary">Type</TableHead>
					<TableHead className="text-primary">Module Name</TableHead>
					<TableHead className="text-center text-primary">
						Action
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="text-muted-foreground">
				{courses?.result?.map((lecture) => (
					<TableRow key={lecture._id}>
						<TableCell className="font-medium text-accent-foreground">
							{lecture.title}
						</TableCell>
						<TableCell>{lecture.type}</TableCell>
						<TableCell>{lecture?.module?.title}</TableCell>
						<TableCell className="text-center space-y-1 space-x-1">
							<EsModal>
								<DialogTrigger asChild>
									<Button variant="outline">
										<Edit />
										<span>Edit</span>
									</Button>
								</DialogTrigger>
								<DialogContent className="w-full md:max-w-3xl">
									<DialogHeader>
										<DialogTitle>
											Update lecture
										</DialogTitle>
										<DialogDescription className="sr-only">
											Make changes to your profile here.
										</DialogDescription>
									</DialogHeader>

									<UpdateLecture lectureId={lecture._id} />
								</DialogContent>
							</EsModal>

							<Button
								size={"sm"}
								variant={"destructive"}
								disabled={deleteLoading}
								onClick={() => handleDelete(lecture?._id)}
							>
								<Trash />
								Delete
							</Button>
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
