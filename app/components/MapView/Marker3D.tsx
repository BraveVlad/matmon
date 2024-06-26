import { View, Text, StyleSheet } from "react-native";
import { Marker } from "./MapView";
import WebView from "react-native-webview";

export default function Marker3D() {
	return (
		<Marker
			coordinate={{
				latitude: 31.073873470982637,
				longitude: 35.02810625316275,
			}}
		></Marker>
	);
}

const styles = StyleSheet.create({
	webviewContainer: {
		width: 200,
		height: 200,
	},
});
