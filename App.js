import React from "react"
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native"

export default class App extends React.Component {
  state = {
    questions: [
      "Are you a morning person?",
      "Do you have any siblings?",
      "Are you happy with your current relationship status?",
      "Do you like school?",
      "Are you a risk-taker?",
      "Do you sing in the shower?",
      "Do you frequently use Twitter?",
      "Have you ever dumped someone?",
      "Do you have a pet?",
      "Do you like coffee?",
      "Do you enjoy long car rides?",
      "Do you care about your snapstreak?",
    ],
    changePOS: new Animated.Value(0),
    progBAR: new Animated.Value(0),
    indextostart: 0,
    overOPA: new Animated.Value(0),
    overFONT: new Animated.Value(20),
  }

  render() {
    var renderQUESorEND = () => {
      if (this.state.indextostart >= this.state.questions.length) {
        Animated.parallel([
          Animated.timing(this.state.overOPA, {
            toValue: 1,
            duration: 1000,
          }),
          Animated.timing(this.state.overFONT, {
            toValue: 80,
            duration: 1200,
          }),
        ]).start()
        return (
          <Animated.View
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              opacity: this.state.overOPA,
            }}
          >
            <Animated.Text
              style={{
                fontSize: this.state.overFONT,
                fontWeight: "bold",
                color: "white",
                letterSpacing: 30,
                marginLeft: 30,
              }}
            >
              OVER
            </Animated.Text>
          </Animated.View>
        )
      } else {
        return (
          <>
            <Animated.View
              style={{
                // backgroundColor: "yellow",
                height: "100%",
                width: "100%",
                position: "absolute",
                transform: [{ translateX: gotoleft }],
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 22,
                  textAlign: "center",
                }}
              >
                {this.state.questions[this.state.indextostart]}
              </Text>
            </Animated.View>
            <Animated.View
              style={{
                // backgroundColor: "green",
                height: "100%",
                width: "100%",
                position: "absolute",
                transform: [{ translateX: gotoright }],
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 22,
                  textAlign: "center",
                }}
              >
                {this.state.questions[this.state.indextostart + 1]}
              </Text>
            </Animated.View>
          </>
        )
      }
    }
    var gotoleft = this.state.changePOS.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -Dimensions.get("screen").width],
    })
    var gotoright = this.state.changePOS.interpolate({
      inputRange: [0, 1],
      outputRange: [Dimensions.get("screen").width, 0],
    })
    var progress = this.state.progBAR.interpolate({
      inputRange: [0, this.state.questions.length],
      outputRange: ["0%", "100%"],
    })

    var changeText = () => {
      Animated.parallel([
        Animated.timing(this.state.changePOS, {
          toValue: 1,
          duration: 200,
        }),
        Animated.timing(this.state.progBAR, {
          toValue: this.state.indextostart + 1,
          duration: 200,
        }),
      ]).start(() => {
        this.setState(
          {
            indextostart: this.state.indextostart + 1,
          },
          () => {
            this.state.changePOS.setValue(0)
          }
        )
      })
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View
          style={{
            // backgroundColor: "red",
            height: 100,
            width: "100%",
            position: "absolute",
            zIndex: 1,
          }}
        >
          {renderQUESorEND()}
        </View>
        <Animated.View
          style={{
            position: "absolute",
            width: progress,
            height: 10,
            backgroundColor: "white",
            zIndex: 1,
            bottom: 0,
            left: 0,
          }}
        ></Animated.View>
        <View style={{ height: "100%", width: "100%", flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "lightskyblue",
              height: "100%",
              width: "50%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            activeOpacity={0.8}
            onPress={changeText}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              NO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              height: "100%",
              width: "50%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            activeOpacity={0.8}
            onPress={changeText}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              YES
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
