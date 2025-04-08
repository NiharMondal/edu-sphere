import { baseApi } from "../baseApi";

const lectureApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//fetch all lectures
		allLectures: builder.query({
			query: () => ({
				url: "/lectures",
				method: "GET",
			}),
			providesTags: ["lectures"],
		}),

		//create lecture
		createLecture: builder.mutation({
			query: (payload) => ({
				url: `/lectures/${payload.module}/create`,
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["lectures"],
		}),

		//fetch single lecture
		singleLecture: builder.query({
			query: (id: string) => ({
				url: `/lectures/${id}`,
				method: "GET",
			}),
			providesTags: ["lectures"],
		}),

		//delete single lecture
		deleteLecture: builder.mutation({
			query: (id: string) => ({
				url: `/lectures/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["lectures"],
		}),

		//update single lecture by ID
		updateLecture: builder.mutation({
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
