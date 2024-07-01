import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Slot, router, usePathname } from "expo-router";
import {
	Platform,
	View,
	Text,
	Button,
	StyleSheet,
	Pressable,
} from "react-native";
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

	function formatTitle() {
		if (currentPath === "/rooms") return "My Rooms";

		return "Matmon";
	}
	return (
		<SafeAreaView>
			<View
				style={{
					flexDirection: "row",
					backgroundColor: "#46178F",
					// height: 44,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{!isIndex && (
					<Pressable style={{ marginRight: "auto" }} onPress={handleBackButton}>
						<Text style={styles.backButton}>⬅️</Text>
					</Pressable>
				)}
				<Text style={styles.title}>{formatTitle()}</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	backButton: {
		fontSize: 32,
		// alignSelf: "flex-start",
		// margin: 6,x
	},
	title: {
		flex: 1,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 32,
		color: "white",
		marginRight: "10%",
	},
});
