import { TCourse, TCourseResponse, TServerResponse } from "@/types";
import { baseApi } from "../baseApi";

const courseApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// only admin can create course
		createCourse: builder.mutation<
			TServerResponse<TCourseResponse[]>,
			TCourse
		>({
			query: (payload) => ({
				url: "/courses",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["courses"],
		}),

		getCourse: builder.query<TServerResponse<TCourseResponse[]>, void>({
			query: () => ({
				url: "/courses",
				method: "GET",
			}),
			providesTags: ["courses"],
		}),
		getCourseById: builder.query<TServerResponse<TCourseResponse>, string>({
			query: (id) => ({
				url: `/courses/${id}`,
				method: "GET",
			}),
			providesTags: ["courses"],
		}),

		//course by slug
		getCourseBySlug: builder.query<
			TServerResponse<TCourseResponse>,
			string
		>({
			query: (id) => ({
				url: `/courses/by-slug/${id}`,
				method: "GET",
			}),
			providesTags: ["courses"],
		}),

		// only admin can create course
		updateCourse: builder.mutation<
			TServerResponse<TCourseResponse>,
			{ id: string; payload: TCourse }
		>({
			query: ({ id, payload }) => ({
				url: `/courses/${id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["courses"],
		}),

		deleteCourse: builder.mutation<
			TServerResponse<TCourseResponse>,
			string
		>({
			query: (id) => ({
				url: `/courses/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["courses"],
		}),
	}),
});

export const {
	useCreateCourseMutation,
	useGetCourseQuery,
	useGetCourseByIdQuery,
	useGetCourseBySlugQuery,
	useUpdateCourseMutation,
	useDeleteCourseMutation,
} = courseApi;
