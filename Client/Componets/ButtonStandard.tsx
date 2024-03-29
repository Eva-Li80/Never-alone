import React from "react";
import { Button, Text } from "react-native-paper";

interface Props {
  onPress: () => void;
  text: string;
  icon?: string;
  disabled?: boolean;
}

const ButtonStandard = ({ text, icon, onPress, disabled }: Props) => {
  return (
    <Button
      icon={icon}
      disabled={disabled}
      onPress={onPress}
      mode="elevated"
      style={{
        width: "80%",
        backgroundColor: "#b76392",
        elevation: 5,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 18,
        }}
      >
        {text}
      </Text>
    </Button>
  );
};

export default ButtonStandard;
