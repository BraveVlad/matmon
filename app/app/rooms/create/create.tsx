import { Button, StyleSheet, Text, View, FlatList } from "react-native";
import React from "React"
export default function CreateTreasureModal() {

	const data = [
		{ id: '1', title: 'Item 1' },
		{ id: '2', title: 'Item 2' },
		{ id: '3', title: 'Item 3' },
		{ id: '4', title: 'Item 4' },
		{ id: '5', title: 'Item 5' },
	  ];

	  const renderItem = ({ item }) => (
		<View style={styles.item}>
		  <Text style={styles.title}>{item.title}</Text>
		</View>
	  );

	return (
		<View style={styles.container}>
			<Text>Create a Room</Text>
			<View style={styles.container}>
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
 			</View>
			<Button onclick="">Create a new room</Button>


		</View>
	);
}


	const styles = StyleSheet.create({
		container: {
		  flex: 1,
		  paddingTop: 50,
		},
		item: {
		  backgroundColor: '#f9c2ff',
		  padding: 20,
		  marginVertical: 8,
		  marginHorizontal: 16,
		},
		title: {
		  fontSize: 24,
		},
	  });

