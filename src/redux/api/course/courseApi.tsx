import { baseApi } from "../baseApi";
import { TCourse, TCourseResponse, TServerResponse } from "@/types";

const courseApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		//create course --- only admin can create course
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

		allCourse: builder.query<
			TServerResponse<TCourseResponse[]>,
			Record<string, string>
		>({
			query: () => {
				return {
					url: "/courses",
					method: "GET",
				};
			},
			providesTags: ["courses"],
		}),

		courseBySlug: builder.query<TServerResponse<TCourseResponse>, string>({
			query: (slug) => ({
				url: `/courses/by-slug/${slug}`,
				method: "GET",
			}),
			providesTags: ["courses"],
		}),

		courseById: builder.query<TServerResponse<TCourseResponse>, string>({
			query: (id) => ({
				url: `/courses/${id}`,
				method: "GET",
			}),
			providesTags: ["courses"],
		}),

		popularCourses: builder.query<TServerResponse<TCourseResponse[]>, void>(
			{
				query: () => {
					return {
						url: "/courses/popular-courses",
						method: "GET",
					};
				},
				providesTags: ["courses"],
			}
		),
	}),
});

export const {
	useCreateCourseMutation,
	useAllCourseQuery,
	useCourseByIdQuery,
	useCourseBySlugQuery,
} = courseApi;
