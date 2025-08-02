"use client";
import AppLoading from "@/app/loading";
import NoDataFound from "@/components/NoDataFound";
import Rating from "@/components/ui/rating";
import { useAppSelector } from "@/hooks";
import {
	useAllReviewsQuery,
	useDeleteReviewMutation,
} from "@/redux/api/reviewApi";
import { selectedUser } from "@/redux/slice/authSlice";
import { PenBox, Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function ReviewList() {
	const user = useAppSelector(selectedUser);
	const { data: myReviews, isLoading } = useAllReviewsQuery(
		{ student: user?.id as string },
		{
			skip: !user?.id,
		}
	);

	const [deleteReview] = useDeleteReviewMutation();

	const handleDelete = async (id: string) => {
		try {
			const res = await deleteReview(id).unwrap();
			if (res.success) {
				toast.success("Review deleted successfully");
			}
		} catch (error: any) {
			toast.error(error?.data?.message);
		}
	};

	if (isLoading) return <AppLoading />;
	return (
		<>
			{myReviews?.result.length === 0 && (
				<NoDataFound message="No reviews found!" />
			)}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 ">
				{myReviews?.result.map((review) => (
					<div
						key={review?._id}
						className="bg-white rounded-md p-5 shadow-md space-y-3"
					>
						<p className="font-semibold pb-2 border-b">
							{review?.course?.title}
						</p>
						<div className="flex items-center w-full justify-between">
							<Rating
								initialRating={review.rating}
								readOnly={true}
								totalStars={5}
							/>
							<div className="flex items-center gap-x-5">
								<PenBox className="size-5 hover:text-green-500 cursor-pointer" />
								<Trash
									className="size-5 text-red-400 hover:text-red-500 duration-200 cursor-pointer"
									onClick={() => handleDelete(review?._id)}
								/>
							</div>
						</div>
						<p className="text-muted">{review.message}</p>
					</div>
				))}
			</div>
		</>
	);
}
