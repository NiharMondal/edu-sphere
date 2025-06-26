import { RootState } from "../store";
import { config } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = config.backend_url; // backend url

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		baseUrl,
		credentials: "include",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;

			if (token) {
				headers.set("authorization", token);
			}
			return headers;
		},
	}),
	endpoints: () => ({}),
	tagTypes: [
		"users",
		"lectures",
		"courses",
		"modules",
		"categories",
		"enrollments",
		"transactions",
		"progress",
	],
});
