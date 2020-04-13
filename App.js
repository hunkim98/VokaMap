import React, { useContext } from "react";
import BooleanContextProvider from "./global_variable/global";
import { UserContext } from "./global_variable/global";
import { Button, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Svg, { Line } from "react-native-svg";
import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";

import Mindmap from "./screens/mindmap";
import 집 from "./screens/집";

const Stack = createStackNavigator();

export default class Navigator1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step1: false,
      step2: "change",
      step3: "default",
    };
  }

  press집 = () => {
    this.setState({ step1: true });
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Mindmap"
            component={Mindmap}
            initialParams={{ step1: false, step3: this.state.step3 }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="집"
            component={집}
            options={{
              title: "",
              headerRight: () => (
                <TouchableWithoutFeedback
                  onPress={this.press집}
                  style={{ marginRight: 10 }}
                >
                  <Text style={{ fontSize: 16, color: "#00cc00" }}>
                    {this.state.step1 ? "Confirmed" : "Confirm"}
                  </Text>
                </TouchableWithoutFeedback>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
