import { TServerResponse, TUser, TUserDetails } from "@/types";
import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		allUsers: builder.query<TServerResponse<TUser[]>, void>({
			query: () => ({
				url: "/users",
				method: "GET",
			}),
			providesTags: ["users"],
		}),
		singleUser: builder.query<TServerResponse<TUserDetails>, string>({
			query: (id) => ({
				url: `/users/${id}`,
				method: "GET",
			}),
			providesTags: ["users"],
		}),

		updateInformation: builder.mutation({
			query: ({ id, payload }) => ({
				url: `/users/${id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["users"],
		}),

		enrolledCourses: builder.query({
			query: () => ({
				url: `/enrolled`,
			}),
		}),
	}),
});

export const {
	useAllUsersQuery,
	useSingleUserQuery,
	useUpdateInformationMutation,
} = userApi;
