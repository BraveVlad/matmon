import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RoomCreationScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Room Creation Screen!</Text>
      <Pressable>
        <Link asChild href="">
          create
        </Link>
      </Pressable>
      <Pressable>
        <Link asChild href="">
          start
        </Link>
      </Pressable>
	  {/* map view here */}
	  {/* modal of trusere here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
