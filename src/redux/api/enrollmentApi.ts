import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";
import { TMyEnrollmentResponse } from "@/types/enrollment.types";

const enrollmentApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		makePayment: builder.mutation({
			query: (payload) => {
				return {
					url: "/enrollments/create-checkout-session",
					method: "POST",
					body: payload,
				};
			},
		}),
		enrollToPaidCourse: builder.mutation({
			query: (payload) => {
				return {
					url: "/enrollments/create-checkout-session",
					method: "POST",
					body: payload,
				};
			},
		}),
		enrollToFreeCourse: builder.mutation({
			query: (payload) => {
				return {
					url: "/enrollments",
					method: "POST",
					body: payload,
				};
			},
		}),

		myEnrollments: builder.query<
			TServerResponse<TMyEnrollmentResponse[]>,
			string
		>({
			query: (userId) => ({
				url: `/enrollments/my-enrollment/${userId}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useMakePaymentMutation,
	useMyEnrollmentsQuery,
	useEnrollToFreeCourseMutation,
	useEnrollToPaidCourseMutation,
} = enrollmentApi;
