"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";

import { persistStore } from "redux-persist";
const persistor = persistStore(store);
export default function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient();
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
}
