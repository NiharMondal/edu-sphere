import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";
import { TReviewRequest, TReviewResponse } from "@/types/review.types";

const reviewApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createReview: builder.mutation<
			TServerResponse<TReviewResponse>,
			TReviewRequest
		>({
			query: (payload) => ({
				url: "/reviews",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["reviews"],
		}),
		allReviews: builder.query<
			TServerResponse<TReviewResponse[]>,
			Record<string, string>
		>({
			query: (params) => {
				console.log(params);
				return {
					url: "/reviews",
					method: "GET",
					params,
				};
			},
			providesTags: ["reviews"],
		}),

		deleteReview: builder.mutation<
			TServerResponse<TReviewResponse>,
			string
		>({
			query: (id) => ({
				url: `/reviews/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["reviews"],
		}),
		acceptReview: builder.mutation<
			TServerResponse<TReviewResponse>,
			string
		>({
			query: (id) => ({
				url: `/reviews/${id}/accept`,
				method: "PATCH",
			}),
			invalidatesTags: ["reviews"],
		}),

		undoAccept: builder.mutation<TServerResponse<TReviewResponse>, string>({
			query: (id) => ({
				url: `/reviews/${id}/undo-accept`,
				method: "PATCH",
			}),
			invalidatesTags: ["reviews"],
		}),
	}),
});

export const {
	useAllReviewsQuery,
	useCreateReviewMutation,
	useDeleteReviewMutation,
	useAcceptReviewMutation,
	useUndoAcceptMutation,
} = reviewApi;
