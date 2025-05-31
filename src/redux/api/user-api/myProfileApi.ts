import { TServerResponse } from "@/types";
import { baseApi } from "../baseApi";
export type TProfile = {
	name: string;
	email: string;
	avatar: string;
};
const profileApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		myProfile: builder.query<TServerResponse<TProfile>, void>({
			query: () => ({
				url: `/users/my-profile`,
				method: "GET",
			}),
			providesTags: ["users"],
		}),
	}),
});

export const { useMyProfileQuery } = profileApi;
