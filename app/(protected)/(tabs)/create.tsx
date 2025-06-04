import { generateCard } from "@/lib/api/create";
import React, { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";

const CreateScreen = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleGenerate = async () => {
    if (!title || !category || !content) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    try {
      const newCard = await generateCard({
        title,
        category,
        content,
        owner: "leo@messi.com", // Hardcoded for now
      });

      console.log("✅ Card created:", newCard);
      Alert.alert("Success", "Card generated and saved!");
      setTitle("");
      setCategory("");
      setContent("");
    } catch (error: any) {
      console.error("❌ Error generating card:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Content"
        multiline
        numberOfLines={6}
        value={content}
        onChangeText={setContent}
      />

      <Button title="Generate" onPress={handleGenerate} />
    </ScrollView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
});