import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "React";

const [gameId, setGameId] = useState('');

const handleInputChange = (e) => {
	setGameId(e.target.value);
  };

  const handleSubmit = (e) => {
	e.preventDefault(); 
	console.log('Game ID:', gameId);	
  };

export default function JoinGameScreen() {
	return (
		<View style={styles.container}>
			<Text>Welcome to Matmon!</Text>
			<form onSubmit={handleSubmit}>
				<div>
				<label className="label">Enter game ID</label>
				<input
					className="input"
					value={gameId}
					onChange={handleInputChange}
				/>
				</div>
				<Button type="submit">Join game!</Button>
			</form>
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
