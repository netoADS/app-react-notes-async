import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  Card,
  FAB,
  IconButton,
  MD3Colors,
  Paragraph,
  Title,
} from "react-native-paper";

const APP_KEY_STORAGE = "APP_KEY_MY_NOTES";

type HomeScreenProps = {
  navigation: any;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [notes, setNotes] = useState<string[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const notasSalvas = await AsyncStorage.getItem(APP_KEY_STORAGE);
      if (notasSalvas !== null) {
        setNotes(JSON.parse(notasSalvas));
      }
    } catch (err) {
      console.error("Erro ao ler notas:", err);
    }
  };

  const handleAddNote = async (note: string) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
    try {
      await AsyncStorage.setItem(APP_KEY_STORAGE, JSON.stringify(note));
      navigation.goBack();
    } catch (err) {
      console.error("Erro ao salvar nota:", err);
    }
  };

  const deletarItem = async (note: string) => {
    console.log(note);
    storage.removeItem(note);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {notes.map((note, index) => (
          <Card key={`card-key-${index}`} style={styles.card}>
            <Card.Content>
              <Title>{`Nota ${index + 1}`}</Title>
              <Paragraph>{note}</Paragraph>
            </Card.Content>

            <Card.Actions style={styles.buttonPosition}>
              <IconButton
                icon="trash-can"
                iconColor={MD3Colors.error50}
                size={20}
                onPress={() => deletarItem(note)}
              />
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon={"plus"}
        onPress={() =>
          navigation.navigate("AddNote", { onAddNote: handleAddNote })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },

  buttonPosition: {
    justifyContent: "flex-end",
  },
});

export default HomeScreen;
