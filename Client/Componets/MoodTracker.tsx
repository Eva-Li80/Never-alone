import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { styles } from "../utils/styleSheet";

interface props {
  label: string[];
  dataset: number[];
}

export default function MoodTracker(props: props) {
  const linedata = {
    labels: props.label,
    datasets: [
      {
        data: props.dataset,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.moodcontent}>
      <LineChart
        data={linedata}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={{
          backgroundColor: "#F3EEF6",
          backgroundGradientFrom: "#F3EEF6",
          backgroundGradientTo: "#F3EEF6",
          decimalPlaces: 0,
          color: (opacity = 0) => `rgba(64, 64, 64, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        fromZero={true}
        bezier
        segments={5}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
