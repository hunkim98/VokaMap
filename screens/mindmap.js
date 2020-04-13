import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  PanResponder,
  TouchableHighlight,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Svg, { Line } from "react-native-svg";
import Chapter1 from "../chap1_dict.json";
import { useRoute } from "@react-navigation/stack";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export default class Mindmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(), //this is the starting point of animation
      scale: new Animated.Value(0.5),
      backCount: 0,
      scaleBoolean: true,
      Xinput: deviceHeight - deviceWidth * 0.5 - 50,
      Yinput: deviceHeight * 0.5,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      x3: 0,
      y3: 0,
      x4: 0,
      y4: 0,
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value,
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y },
      ]),

      onPanResponderRelease: (e, { vx, vy }) => {
        this.state.pan.flattenOffset();
      },
    });
  }

  handlePressButton = () => {
    Animated.timing(this.state.pan, {
      toValue: { x: 0, y: 0 },
      delay: 200,
      duration: 400,
    }).start();
    //this.state.pan.setValue({ x: 0, y: 0 });
  };

  doubleTap = () => {
    this.setState({ backCount: this.state.backCount + 1 });
    //this.state.backCount++;
    if (this.state.backCount == 1) {
      clearTimeout(this.backTimer);
      if (this.state.scaleBoolean) {
        Animated.timing(this.state.scale, {
          toValue: 1,
          dekay: 100,
          duration: 300,
        }).start();
        this.setState({ scaleBoolean: !this.state.scaleBoolean });
        //this.setState({ Xinput: deviceHeight * 0.5 - deviceWidth * 0.5 + 20 });
        //this.setState({ Yinput: 0 });
      } else {
        Animated.timing(this.state.scale, {
          toValue: 0.5,
          dekay: 100,
          duration: 300,
        }).start();
        this.setState({ scaleBoolean: !this.state.scaleBoolean });
        //this.setState({ Xinput: deviceHeight - deviceWidth * 0.5 + 20 });
        //this.setState({ Yinput: deviceHeight * 0.5 + 20 });
      }
      this.setState({ backCount: 0 }); //I don't know why but I need to do "==1", but this only works
    } else {
      this.backTimer = setTimeout(() => {
        this.setState({ backCount: 0 });
      }, 400); //mention here the time for clearing the counter in ms, 함수 실행한지 x초 뒤에 숫자를 초기화한다, backTimer라는 함수를 여기서 만듦
    }
  };

  pressed = () => {
    this.lastPress = new Date().getTime();
  };

  navigateTo집 = () => {
    let time = new Date().getTime();
    let delta = time - this.lastPress;
    if (delta < 300) {
      navigation.navigate("집");
    }
  };

  render() {
    //let { pan } = this.state;
    let constrainedX = this.state.pan.x.interpolate({
      inputRange: [0 - this.state.Xinput, this.state.Xinput],
      outputRange: [0 - this.state.Xinput, this.state.Xinput],
      extrapolate: "clamp",
    });

    let constrainedY = this.state.pan.y.interpolate({
      inputRange: [0 - this.state.Yinput, this.state.Yinput],
      outputRange: [0 - this.state.Yinput, this.state.Yinput],
      extrapolate: "clamp",
    });

    let [translateX, translateY] = [constrainedX, constrainedY];

    let rotate = "0deg";

    let scale = this.state.scale;

    let imageStyle = {
      transform: [{ translateX }, { translateY }, { rotate }, { scale }],
    };

    var middle = this.state.x1;

    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
          <TouchableWithoutFeedback onPress={this.doubleTap}>
            <View
              style={styles.flexBox}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => false}
            >
              <Svg height={deviceHeight * 3} width={deviceHeight * 3}>
                {this.props.route.params.step1
                  ? [
                      <Line
                        x1={this.state.x1 + 150 / 2}
                        y1={this.state.y1 + 150 / 2}
                        x2={this.state.x2 + 150 / 2}
                        y2={this.state.y2 + 150 / 2}
                        stroke="black"
                        strokeWidth="2"
                      />,
                      <Line
                        x1={this.state.x1 + 150 / 2}
                        y1={this.state.y1 + 150 / 2}
                        x2={this.state.x3 + 150 / 2}
                        y2={this.state.y3 + 150 / 2}
                        stroke="black"
                        strokeWidth="2"
                      />,
                      <Line
                        x1={this.state.x1 + 150 / 2}
                        y1={this.state.y1 + 150 / 2}
                        x2={this.state.x4 + 150 / 2}
                        y2={this.state.y4 + 150 / 2}
                        stroke="black"
                        strokeWidth="2"
                      />,
                    ]
                  : null}
              </Svg>

              <View
                onStartShouldSetResponder={() => true}
                style={styles.CircleShape}
                onLayout={({ nativeEvent }) => {
                  this.setState({
                    x1: nativeEvent.layout.x,
                    y1: nativeEvent.layout.y,
                  });
                }}
              >
                <TouchableWithoutFeedback
                  onPressIn={this.pressed}
                  onPressOut={() => {
                    let time = new Date().getTime();
                    let delta = time - this.lastPress;
                    if (delta < 200) {
                      navigation.navigate("집");
                    }
                  }}
                >
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {this.state.scaleBoolean ? (
                      <Text style={styles.TextShape1}>집</Text>
                    ) : (
                      <Text style={styles.EnglishText}>
                        {Chapter1.집[0].word_E}
                      </Text>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <View
                style={[
                  styles.CircleShape,
                  { left: middle + 200, top: middle - 200 },
                ]}
                onLayout={({ nativeEvent }) => {
                  this.setState({
                    x2: nativeEvent.layout.x,
                    y2: nativeEvent.layout.y,
                  });
                }}
              >
                <Text style={styles.TextShape1}>
                  {this.props.route.params.step2}
                </Text>
              </View>

              <View
                style={[
                  styles.CircleShape,
                  { left: middle - 200, top: middle - 200 },
                ]}
                onLayout={({ nativeEvent }) => {
                  this.setState({
                    x3: nativeEvent.layout.x,
                    y3: nativeEvent.layout.y,
                  });
                }}
              >
                <Text style={styles.TextShape1}>거실</Text>
              </View>

              <View
                style={[
                  styles.CircleShape,
                  { left: middle, top: middle + 225 },
                ]}
                onLayout={({ nativeEvent }) => {
                  this.setState({
                    x4: nativeEvent.layout.x,
                    y4: nativeEvent.layout.y,
                  });
                }}
              >
                <Text style={styles.TextShape1}>부엌</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
        <TouchableHighlight
          style={styles.touchCenter}
          onPress={this.handlePressButton}
          //onPress={() => navigation.navigate("집")}
        >
          <Text style={styles.TextShape2}>Tap to go to center</Text>
        </TouchableHighlight>
        <View style={styles.propview}>
          <Text>
            doubletap = {this.state.backCount} {middle}|
          </Text>
          <Text>
            position = {this.state.x1} , {this.state.y1}
          </Text>
          <Text>
            position = {this.state.pan.x._value} , {this.state.pan.y._value}
          </Text>
        </View>
      </View>
    );
  }
}

//<LabelView label="doubleTapUp" value={this.state.backCount}></LabelView>

const styles = StyleSheet.create({
  propview: {
    position: "absolute",
    textAlign: "justify",
    flexDirection: "row",
    marginRight: 10,
  },
  container: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  touchCenter: {
    position: "absolute",
    backgroundColor: "#B2B2B2",
    top: deviceHeight / 14,
    width: 200,
    height: 50,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  flexBox: {
    width: deviceHeight * 3,
    height: deviceHeight * 3,
    borderRadius: 100 / 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  CircleShape: {
    zIndex: 1,
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: "#27ae60",
    justifyContent: "center",
    alignItems: "center",
  },
  TextShape1: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  EnglishText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  TextShape2: {
    color: "white",
    fontSize: 18,
  },
  Trapezoid: {
    position: "absolute",
    transform: [{ rotate: "0deg" }],

    width: 10,
    height: 120,
    backgroundColor: "#A4BCA4",
  },
});
