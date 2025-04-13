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
	}),
});

export const { useAllUsersQuery, useSingleUserQuery } = userApi;
