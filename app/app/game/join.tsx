import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from "react-native";


export default function JoinGameScreen() {

	const [gameId, setGameId] = useState('');

	const handleInputChange = (text : string) => {
		setGameId(text);
	};
	const handleSubmit = () => {
		console.log('Game ID:', gameId);	
	};

	return (
		<View style={styles.container}>
		  <Text>Welcome to Matmon!</Text>
		  <View style={styles.inputContainer}>
			<Text style={styles.label}>Enter game ID</Text>
			<TextInput
			  style={styles.input}
			  value={gameId}
			  onChangeText={handleInputChange}
			/>
		  </View>
		  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
			<Text style={styles.buttonText}>Join game!</Text>
		  </TouchableOpacity>
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
	inputContainer: {
	  marginVertical: 20,
	  width: '80%',
	},
	label: {
	  fontSize: 16,
	  marginBottom: 8,
	},
	input: {
	  height: 40,
	  borderColor: 'gray',
	  borderWidth: 1,
	  paddingHorizontal: 10,
	  borderRadius: 5,
	},
	button: {
	  backgroundColor: '#1E90FF',
	  padding: 10,
	  borderRadius: 5,
	  alignItems: 'center',
	  marginTop: 20,
	},
	buttonText: {
	  color: '#fff',
	  fontSize: 16,
	},
  });
