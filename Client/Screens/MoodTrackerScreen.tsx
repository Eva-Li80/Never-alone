import { Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AppState } from "../store/store";
import { BottomBar } from "../Componets/BottomBar";
import { styles } from "../utils/styleSheet";
import MoodTracker from "../Componets/MoodTracker";
import { getDateToString, getNumber } from "../utils/statistic";
import { Button, Dialog, Portal } from "react-native-paper";
import { createMood, getAllMoods } from "../store/moodTrackerSlice";

type Props = NativeStackScreenProps<RootStackParamList, "MoodTracker">;

export default function MoodTrackerScreen({ navigation, route }: Props) {
  const [weeklyData, setWeeklyData] = React.useState<number[] | null>();
  const [testData, setTestData] = React.useState<string[] | null>();
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [disabled, setDisabled] = React.useState<boolean>(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const currentData = (state: AppState) => {
    return state.mood.data;
  };
  const dispatch = useAppDispatch();

  const currentMoodData = useAppSelector(currentData);

  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    .toString()
    .substring(3, 10);

  React.useEffect(() => {
    dispatch(getAllMoods());
  }, []);

  React.useEffect(() => {
    if (currentMoodData) {
      setWeeklyData(getNumber(currentMoodData));
      setTestData(getDateToString(currentMoodData));
    }
    if (testData) {
      if (testData.includes(date, 0)) setDisabled(true);
    }
  }, [currentMoodData]);

  function onPress(value: number) {
    dispatch(createMood({ value }));
    setMessage("Registrerat");
    showDialog();
  }

  const icons: number[] = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", marginBottom: 50 }}>
        <Text style={styles.title}>Hur mår du idag?</Text>
        <View style={styles1.content}>
          {icons.map((element) => (
            <Pressable
              style={styles1.button}
              disabled={disabled}
              onPress={() => onPress(element)}
            >
              <Text>{element}</Text>
            </Pressable>
          ))}
        </View>
        {disabled == true ? (
          <Text style={styles.smallText}>
            Du har redan registrerat dagens mood.
          </Text>
        ) : (
          <Text></Text>
        )}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.title}>Senaste veckan</Text>
          {testData && weeklyData ? (
            <MoodTracker label={testData} dataset={weeklyData}></MoodTracker>
          ) : (
            <Text>Finns ingen data att visa</Text>
          )}
        </View>
      </ScrollView>
      <View>
        <Portal>
          <Dialog visible={visible}>
            <Dialog.Content>
              <Text>{message}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      <BottomBar navigation={navigation} route={route}></BottomBar>
    </View>
  );
}

const styles1 = StyleSheet.create({
  button: {
    marginLeft: 23,
    borderRadius: 45,
    height: 55,
    width: 55,
    backgroundColor: "#b76392",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    marginTop: 15,
    flexDirection: "row",
  },
  content2: {
    marginTop: 15,
  },
});
