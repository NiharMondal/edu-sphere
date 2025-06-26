"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { lectureUpdateSchema } from "@/form-schema";

import { toast } from "sonner";

import { useEffect } from "react";
import {
	useLectureByIdQuery,
	useUpdateLectureMutation,
} from "@/redux/api/lectureApi";
import ESInput from "../form/ESInput";
import ESSelect from "../form/ESSelect";

type UpdateLectureProps = {
	lectureId: string;
	closeModal: () => void;
};

const fileType = [
	{
		value: "video",
		label: "Video",
	},
	{
		value: "pdf",
		label: "PDF",
	},
	{
		value: "text",
		label: "Text",
	},
];

type LectureUpdateForm = z.infer<typeof lectureUpdateSchema>;

export default function UpdateLecture({
	lectureId,
	closeModal,
}: UpdateLectureProps) {
	const { data: lectureDetails, isLoading } = useLectureByIdQuery(lectureId);

	console.log(lectureDetails);
	const [updateLecture, { isLoading: updateLoading }] =
		useUpdateLectureMutation();

	const form = useForm<LectureUpdateForm>({
		resolver: zodResolver(lectureUpdateSchema),
		defaultValues: {
			title: "",
			content: "",
			duration: 0,
			type: "video",
		},
	});

	const handleLectureSubmit = async (
		values: z.infer<typeof lectureUpdateSchema>
	) => {
		console.log(values);
		try {
			const response = await updateLecture({
				id: lectureId,
				payload: values,
			}).unwrap();

			if (response.success) {
				toast.success("Lecture updated successfully");
				closeModal();
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	//updating default form values
	useEffect(() => {
		if (lectureDetails?.result) {
			form.reset({
				title: lectureDetails?.result?.title || "",
				content: lectureDetails?.result?.content || "",
				type:
					(lectureDetails?.result
						?.type as LectureUpdateForm["type"]) || "video",
				duration: lectureDetails?.result?.duration || 0,
			});
		}
	}, [form, lectureDetails]);

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return (
		<div className="grid grid-cols-1 place-items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleLectureSubmit)}
					className="max-w-3xl w-full  mt-10"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
						<ESInput form={form} name="title" label="Title" />
						<ESInput
							form={form}
							name="content"
							label="Content URL"
						/>
						<ESSelect
							form={form}
							name="type"
							label="Select type"
							options={fileType}
						/>

						<ESInput
							form={form}
							type="number"
							name="duration"
							label="Duration"
						/>
					</div>
					<Button type="submit" disabled={updateLoading}>
						Update Lecture
					</Button>
				</form>
			</Form>
		</div>
	);
}
