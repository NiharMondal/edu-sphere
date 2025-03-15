import { config } from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = config.backend_url; // backend url

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: fetchBaseQuery({
		baseUrl,
	}),
	endpoints: () => ({}),
	tagTypes: ["lectures", "courses", "modules"],
});
