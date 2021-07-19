import React, { useState } from "react";
import { TextInput, Text, TouchableOpacity, View, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from "react-navigation";
import { submitNotes } from "../state/actions";
import * as Constants from "../constants/constants";
import Styles from "../styles/Styles";
import Spinner from "../components/Spinner";

interface FormScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const FormScreen: React.FC<FormScreenProps> = (props) => {
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  const notesSubmitAlert = () => {
    Alert.alert(
      "Notes Submitted",
      "",
      [
        {
          text: "OK",
          onPress: () => {},
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const handleSubmit = () => {
    const { id } = props.navigation.state.params;

    if (!notes) {
      Alert.alert(
        "Invalid Input",
        "notes cannot be empty",
        [
          {
            text: "OK",
            onPress: () => {},
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
      return;
    }

    dispatch(submitNotes({ notes, id }));
    props.navigation.navigate(Constants.HOME_SCREEN);
    notesSubmitAlert();
  };

  return (
    <>
      <Spinner visible={app.pendingScreen} />
      <View style={Styles.container}>
        <View style={Styles.notesForm}>
          <TextInput
            onChangeText={(text) => setNotes(text)}
            editable
            multiline
            maxLength={250}
            style={Styles.notesTextInput}
          />
          <TouchableOpacity
            style={Styles.notesSubmitButton}
            onPress={() => handleSubmit()}
          >
            <Text style={Styles.notesSubmitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

FormScreen.navigationOptions = () => ({
  title: "Notes",
  headerStyle: Styles.headerStyle,
  headerTintColor: Styles.headerTintColor,
  headerTitleStyle: Styles.headerTitleStyle,
});

export default FormScreen;
