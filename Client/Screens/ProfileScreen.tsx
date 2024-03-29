import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";
import { getProfile } from "../store/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Profile } from "../utils/types";
import { AppState } from "../store/store";
import { BottomBar } from "../Componets/BottomBar";
import { styles } from "../utils/styleSheet";
import SelectedImage from "../Componets/SelectedImage";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation, route }: Props) {
  const [profile, setProfile] = React.useState<Profile | null>();

  const dispatch = useAppDispatch();
  const currentProfile = (state: AppState) => {
    return state.profile.profile;
  };
  const currentUserProfile = useAppSelector(currentProfile);

  React.useEffect(() => {
    dispatch(getProfile());
  }, []);

  React.useEffect(() => {
    if (currentUserProfile) {
      setProfile(currentUserProfile);
    }
  }, [currentUserProfile]);

  return (
    <View style={styles.containertwo}>
      <ScrollView style={{ width: "90%", marginBottom: 35 }}>
        <Text style={styles.title}>{profile?.name}</Text>
        <SelectedImage stylesimage={styles.selectedImage} />
        <Text style={{ marginTop: 50 }}></Text>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Text style={styles.titleProfile}>Redigera profilsidan</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomBar navigation={navigation} route={route}></BottomBar>
    </View>
  );
}
