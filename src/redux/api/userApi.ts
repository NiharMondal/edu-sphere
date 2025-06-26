import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";
import { TUserResponse } from "@/types/user.types";

const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		allUsers: builder.query<
			TServerResponse<TUserResponse[]>,
			Record<string, string>
		>({
			query: (params) => ({
				url: "/users",
				method: "GET",
				params: params,
			}),
			providesTags: ["users"],
		}),

		userById: builder.query<TServerResponse<TUserResponse>, string>({
			query: (id) => ({
				url: `/users/${id}`,
				method: "GET",
			}),
			providesTags: ["users"],
		}),

		updateUser: builder.mutation<
			TServerResponse<TUserResponse>,
			{ id: string; payload: Partial<TUserResponse> }
		>({
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
				method: "GET",
			}),
		}),

		updateUserRole: builder.mutation({
			query: ({ userId, payload }) => ({
				url: `/users/update-role/${userId}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["users"],
		}),
	}),
});

export const {
	useAllUsersQuery,
	useEnrolledCoursesQuery,
	useUpdateUserMutation,
	useUserByIdQuery,

	useUpdateUserRoleMutation,
} = userApi;
