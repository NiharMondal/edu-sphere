import { TLectureRequest, TLectureResponse, TServerResponse } from "@/types";
import { baseApi } from "../baseApi";

const lectureApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//fetch all lectures
		allLectures: builder.query<TServerResponse<TLectureResponse[]>, void>({
			query: () => ({
				url: "/lectures",
				method: "GET",
			}),
			providesTags: ["lectures"],
		}),

		//create lecture
		createLecture: builder.mutation<
			TServerResponse<TLectureResponse>,
			TLectureRequest
		>({
			query: (payload) => ({
				url: `/lectures/${payload.module}/create`,
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["lectures"],
		}),

		//fetch single lecture
		singleLecture: builder.query<TServerResponse<TLectureResponse>, string>(
			{
				query: (id: string) => ({
					url: `/lectures/${id}`,
					method: "GET",
				}),
				providesTags: ["lectures"],
			}
		),

		//delete single lecture
		deleteLecture: builder.mutation<
			TServerResponse<TLectureResponse>,
			string
		>({
			query: (id: string) => ({
				url: `/lectures/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["lectures"],
		}),

		//update single lecture by ID
		updateLecture: builder.mutation<
			TServerResponse<TLectureResponse>,
			{ id: string; payload: Partial<TLectureRequest> }
		>({
			query: ({ id, payload }) => ({
				url: `/lectures/${id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["lectures"],
		}),
	}),
});

export const {
	useAllLecturesQuery,
	useSingleLectureQuery,
	useCreateLectureMutation,
	useUpdateLectureMutation,
	useDeleteLectureMutation,
} = lectureApi;
