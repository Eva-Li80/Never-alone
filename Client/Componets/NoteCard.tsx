import React from "react";
import { View, Text } from "react-native";
import { Button, Card } from "react-native-paper";
import { DailyNote } from "../utils/types";
import { styles } from "../utils/styleSheet";

interface Props {
  dailyNote: DailyNote;
  onDelete: (id: string) => void;
  child: string;
}

export default function NoteCard({ dailyNote, onDelete, child }: Props) {
  const handleDelete = () => onDelete(dailyNote.id);
  return (
    <View style={{ width: "100%", padding: 10 }}>
      <Card style={{ borderRadius: 10 }}>
        <Card.Title style={styles.title} title={dailyNote.title} />
        <Card.Content style={styles.citat}>
          <Text>{dailyNote.content}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={handleDelete} color="#c48a9f">
            {child}
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
