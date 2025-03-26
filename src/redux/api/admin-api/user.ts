import { TInstructorResponse, TServerResponse } from "@/types";
import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createInstructor: builder.mutation({
			query: (payload) => ({
				url: "/users/instructor",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["users"],
		}),

		getInstructors: builder.query<
			TServerResponse<TInstructorResponse[]>,
			void
		>({
			query: () => ({
				url: "/users/instructors",
				method: "GET",
			}),
			providesTags: ["users"],
		}),
	}),
});

export const { useCreateInstructorMutation, useGetInstructorsQuery } = userApi;
