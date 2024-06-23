import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from 'react-native-maps';;

export default function RoomCreationScreen() {
	return (
		<View style={styles.container}>
			<Text>Welcome to Room Creation Screen!</Text>
			<TouchableOpacity>
				<Link href={''}>create</Link>
			</TouchableOpacity>
			<TouchableOpacity>
				<Link href={''}>start</Link>
			</TouchableOpacity>
			<MapView style={styles.map} />
		</View>)};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: '12%',
		height: '12%'
	}
});
