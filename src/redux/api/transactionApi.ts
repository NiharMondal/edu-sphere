import { baseApi } from "./baseApi";

const transactionApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		allTransaction: builder.query({
			query: () => ({
				url: "/transactions",
				method: "GET",
			}),
		}),
	}),
});

export const { useAllTransactionQuery } = transactionApi;
