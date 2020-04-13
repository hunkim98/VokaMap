import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Button,
  Animated,
  TouchableHighlight,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Chapter1 from "../chap1_dict.json";

const 집_dict = Chapter1.집;
var deviceHeight = Dimensions.get("window").height;

export default class 집 extends React.Component {
  renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.word_E}</Text>
        <Text>{item.definition_E}</Text>
        {item.examples.map((item, index) => (
          <Text key={index}> {item} </Text>
        ))}
        <Text></Text>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Button
          onPress={() => navigation.setParams({ step1: true })}
          title="help"
        ></Button>
        <FlatList
          data={집_dict}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
});
