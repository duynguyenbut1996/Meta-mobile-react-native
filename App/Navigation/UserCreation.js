import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

import FirstStep from "../Containers/AccountCreation/FirstStep";
import SecondStep from "../Containers/AccountCreation/SecondStep";
import FinalStep from "../Containers/AccountCreation/FinalStep";

const UserCreation = createStackNavigator(
  {
    FirstStep: {
      screen: FirstStep
    },
    SecondStep: {
      screen: SecondStep
    },
    FinalStep: {
      screen: FinalStep
    }
  },
  {
    initialRouteName: "FirstStep",
    defaultNavigationOptions: {
      headerTitle: (
        <Text
          style={{
            flex: 1,
            color: "#fff",
            fontWeight: "bold",
            flexDirection: "row",
            justifyContent: "center",
            textAlign: "center",
            fontSize: 20,
            alignSelf: "center"
          }}
        >
          New Account
        </Text>
      ),
      headerStyle: {
        backgroundColor: "#000000"
      }
    }
  }
);

UserCreation.navigationOptions = {
  drawerLabel: "UserCreation"
};

export default UserCreation;
