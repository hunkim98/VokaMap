import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Platform,
  PanResponder,
  Component
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY()
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      onPanResponderRelease: (e, { vx, vy }) => {
        this.state.pan.flattenOffset();
      }
    });
  }

  render() {
    let { pan } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let imageStyle = { transform: [{ translateX }, { translateY }] };

    return (
      <View style={styles.container}>
        <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
          <View style={styles.flexBox}>
            <View style={styles.CircleShape}>
              <Text style={styles.TextShape}>집</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth * 1,
    height: deviceHeight * 1,
    backgroundColor: "#8e44ad",
    alignItems: "center",
    justifyContent: "center"
  },
  flexBox: {
    width: deviceHeight * 2,
    height: deviceHeight * 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  CircleShape: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "#27ae60",
    justifyContent: "center",
    alignItems: "center"
  },
  TextShape: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  }
});
