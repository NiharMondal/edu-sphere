import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";
import { TLectureRequest, TLectureResponse } from "@/types/lecture.types";

const lectureApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createLecture: builder.mutation<
			TServerResponse<TLectureResponse>,
			{ moduleId: string; payload: TLectureRequest }
		>({
			query: ({ moduleId, payload }) => ({
				url: `/lectures/${moduleId}/create`,
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["lectures"],
		}),
		allLectures: builder.query<TServerResponse<TLectureResponse[]>, void>({
			query: () => ({
				url: "/lectures",
				method: "GET",
			}),
			providesTags: ["lectures"],
		}),
		lectureById: builder.query<TServerResponse<TLectureResponse>, string>({
			query: (id) => ({
				url: `/lectures/${id}`,
				method: "GET",
			}),
			providesTags: ["lectures"],
		}),
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
		deleteLecture: builder.mutation<
			TServerResponse<TLectureResponse>,
			string
		>({
			query: (id) => ({
				url: `/lectures/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["lectures"],
		}),
	}),
});

export const {
	useAllLecturesQuery,
	useCreateLectureMutation,
	useLectureByIdQuery,
	useDeleteLectureMutation,
	useUpdateLectureMutation,
} = lectureApi;
