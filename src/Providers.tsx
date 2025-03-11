/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
	MutationFunction,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { Provider } from "react-redux";
import { fetcher } from "./lib/fetcher";
import { store } from "./redux/store";

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				queryFn: async ({ queryKey }) => {
					const url = queryKey[0] as string;
					return fetcher({ url });
				},
			},
			mutations: {
				mutationFn: fetcher as MutationFunction<any, any>,
			},
		},
	});
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</Provider>
	);
}
