import { baseApi } from "../baseApi";

const courseApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// only admin can create course
		createCourse: builder.mutation({
			query: (payload) => ({
				url: "/courses",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["courses"],
		}),

		getCourse: builder.query({
			query: () => ({
				url: "/courses",
				method: "GET",
			}),
			providesTags: ["courses"],
		}),
	}),
});

export const { useCreateCourseMutation, useGetCourseQuery } = courseApi;
