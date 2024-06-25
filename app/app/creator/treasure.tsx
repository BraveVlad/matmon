import React, { useState } from "react";
import { Button, StyleSheet, View, Modal, Text } from "react-native";

export default function CreateTreasureModal() {
  const [isModalOn, setIsModalOn] = useState(false);

  const toggleModal = () => {
    setIsModalOn(!isModalOn);
  };

  return (
    <View style={styles.container}>
      <Button title="Open Map" onPress={toggleModal} />

      <Modal
        visible={isModalOn}
        animationType="slide"
        onRequestClose={toggleModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>This is the modal content</Text>
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
});
