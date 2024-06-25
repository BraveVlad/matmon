import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: "matmon",
	slug: "matmon",
	version: "1.0.0",
	orientation: "portrait",
	icon: "./assets/icon.png",
	userInterfaceStyle: "light",
	scheme: "com.matmon.app",
	owner: "matmon",
	splash: {
		image: "./assets/splash.png",
		resizeMode: "contain",
		backgroundColor: "#ffffff",
	},
	ios: {
		supportsTablet: true,
	},
	android: {
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
			backgroundColor: "#ffffff",
		},
		package: "com.matmon.app",
		config: {
			googleMaps: {
				apiKey: process.env.GOOGLE_MAP_API_KEY,
			},
		},
	},
	web: {
		favicon: "./assets/favicon.png",
		bundler: "metro",
	},
	plugins: ["expo-router"],
	extra: {
		router: {
			origin: false,
		},
		eas: {
			projectId: "63098ab0-0f62-4c5c-bbaa-a98fa9086a3e",
		},
	},
});
