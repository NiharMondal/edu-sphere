import { TEnrolledCourseResponse, TServerResponse } from "@/types";
import { baseApi } from "../baseApi";

const enrollmentApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		purchaseCourse: builder.mutation({
			query: (payload) => ({
				url: "/enrollments",
				method: "POST",
				body: payload,
			}),
		}),

		// FOR ADMIN
		allSellingCourse: builder.query({
			query: () => ({
				url: "/enrollments",
				method: "GET",
			}),
		}),

		myEnrolledCourses: builder.query<
			TServerResponse<TEnrolledCourseResponse[]>,
			string
		>({
			query: (id) => ({
				url: `/enrollments/my-enrollment/${id}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	usePurchaseCourseMutation,
	useAllSellingCourseQuery,
	useMyEnrolledCoursesQuery,
} = enrollmentApi;
