"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import { store } from "./redux/store";

export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</Provider>
	);
}
