import { TServerResponse } from "@/types";
import { baseApi } from "./baseApi";
import { TPaymentResponseForTable } from "@/types/payment.types";

const transactionApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		allTransaction: builder.query<
			TServerResponse<TPaymentResponseForTable[]>,
			void
		>({
			query: () => ({
				url: "/payments",
				method: "GET",
			}),
		}),
	}),
});

export const { useAllTransactionQuery } = transactionApi;
