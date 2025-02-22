"use client";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { config } from "@/config";
import { TLectureResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "../shared/modal";
import { useState } from "react";
import UpdateLectureForm from "@/app/(admin)/dashboard/lecture/update-lecture-form";
import { toast } from "sonner";
import { Button } from "../ui/button";

const fetchLecture = async () => {
	const res = await fetch(`${config.backend_url}/lecture`);
	if (!res.ok) {
		throw new Error("something went wrong");
	}
	const data = await res.json();
	return data;
};

const deleteLecture = async (lectureId: string) => {
	const res = await fetch(
		`${config.backend_url}/lecture/admin/${lectureId}`,
		{
			method: "DELETE",
		}
	);
	if (!res.ok) {
		throw new Error("something went wrong");
	}
	const data = await res.json();
	return data;
};
export default function LectureTable() {
	const queryClient = useQueryClient();
	const [selectedLectureId, setSelectedLectureId] = useState<string | null>(
		null
	);
	const [openLectureModal, setOpenLectureModal] = useState(false);
	const { data: lectures } = useQuery({
		queryKey: ["lecture"],
		queryFn: fetchLecture,
	});

	const mutation = useMutation({
		mutationFn: (lectureId: string) => deleteLecture(lectureId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lecture"] });
			toast.success("Module deleted successfully!");
		},
		onError: (error) => {
			toast.error("Failed to delete course");
			console.error(error);
		},
	});
	return (
		<Table>
			<TableCaption>A list of recent lectures.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Title</TableHead>
					<TableHead>Type</TableHead>
					<TableHead>Module</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{lectures?.result?.map((lecture: TLectureResponse) => (
					<TableRow key={lecture._id}>
						<TableCell>{lecture.title}</TableCell>
						<TableCell>{lecture.type}</TableCell>
						<TableCell>{lecture?.module?.title}</TableCell>
						<TableCell>
							<Button
								variant={"outline"}
								size={"sm"}
								onClick={() => {
									setSelectedLectureId(lecture._id);
									setOpenLectureModal(true);
								}}
							>
								Edit
							</Button>
							<Modal
								isOpen={openLectureModal}
								onOpenChange={setOpenLectureModal}
							>
								{selectedLectureId && (
									<UpdateLectureForm
										lectureId={selectedLectureId}
									/>
								)}
							</Modal>
						</TableCell>
						<TableCell>
							<Button
								variant={"destructive"}
								size={"sm"}
								onClick={() => mutation.mutate(lecture?._id)}
							>
								Delete
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
