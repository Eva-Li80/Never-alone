import { Dimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useAppDispatch, useAppSelector } from "../store/store";
//import MoodPicker from "../Componets/MoodPicker";
import { AppState } from "../store/store";
import { Mood } from "../utils/types";
import { BottomBar } from "../Componets/BottomBar";
import { styles } from "../utils/styleSheet";
import MoodTracker from "../Componets/MoodTracker";
import { getMonthlyData, getWeeklyData, sortData } from "../utils/statistic";
import { Button, Dialog, Portal } from "react-native-paper";
import { createMood, getAllMoods } from "../store/moodTrackerSlice";

type Props = NativeStackScreenProps<RootStackParamList, "MoodTracker">;

export default function MoodTrackerScreen({ navigation, route }: Props) {
  const [weeklyData, setWeeklyData] = React.useState<number[] | null>();
  const [montlyData, setMontlyData] = React.useState<number[] | null>();
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const currentData = (state: AppState) => {
    return state.mood.data;
  };
  const dispatch = useAppDispatch();

  const currentMoodData = useAppSelector(currentData);

  React.useEffect(() => {
    dispatch(getAllMoods());
  }, []);

  React.useEffect(() => {
    if (currentMoodData) {
      setWeeklyData(getWeeklyData(currentMoodData));
    }
  }, [currentMoodData]);
  React.useEffect(() => {
    if (currentMoodData) {
      setMontlyData(getMonthlyData(currentMoodData));
    }
  }, [currentMoodData]);

  function onPress(icon: string) {
    dispatch(createMood({ icon }));
    setMessage("Registrerat");
    showDialog();
  }

  const icons: string[] = ["😢", "👎", "👌", "👍", "😊"];

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%", marginBottom: 50 }}>
        <Text style={styles.title}>Hur mår du idag?</Text>
        <View style={styles.moodcontent}>
          {icons.map((element, key) => (
            <Button
              key={key}
              style={styles.moodbutton}
              onPress={() => onPress(element)}
            >
              {element}
            </Button>
          ))}
        </View>
        <Text style={styles.title}>Senaste veckan</Text>
        {weeklyData ? (
          <MoodTracker label={icons} dataset={weeklyData}></MoodTracker>
        ) : (
          <Text>Finns ingen data att visa</Text>
        )}
        <Text style={styles.title}>Senaste månaden</Text>
        {montlyData ? (
          <MoodTracker label={icons} dataset={montlyData}></MoodTracker>
        ) : (
          <Text>Finns ingen data att visa</Text>
        )}
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
