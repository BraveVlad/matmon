import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Slot, router, usePathname } from "expo-router";
import { Platform, View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function RootLayout() {
	useReactQueryDevTools(queryClient);

	return (
		<QueryClientProvider client={queryClient}>
			<TopBar />
			<Slot />
			{/* {Platform.OS === "web" && <ReactQueryDevtools initialIsOpen={false} />} */}
		</QueryClientProvider>
	);
}

function TopBar() {
	const currentPath = usePathname();
	const isIndex = currentPath === "/" ? true : false;
	console.log(currentPath);

	function handleBackButton() {
		if (router.canGoBack()) {
			router.back();
		}
		router.replace("/");
	}

	return (
		<SafeAreaView>
			<View
				style={{
					flexDirection: "row",
					backgroundColor: "#7BFEF9",
					height: 44,
					alignItems: "center",
				}}
			>
				{!isIndex && <Button title="⬅️" onPress={handleBackButton} />}
				<Text style={{ margin: "auto" }}>Matmon</Text>
			</View>
		</SafeAreaView>
	);
}
