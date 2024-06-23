import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Slot } from "expo-router";
import { Platform } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
	useReactQueryDevTools(queryClient);

	return (
		<QueryClientProvider client={queryClient}>
			<Slot />
			{Platform.OS === "web" && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	);
}
