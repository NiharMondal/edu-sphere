import { baseApi } from "../baseApi";

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
	}),
});

export const { useMakePaymentMutation } = enrollmentApi;
