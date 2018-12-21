// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ImageBackground,
  Dimensions
} from 'react-native';
import startMainTabs from "../MainTabs/startMainTabs.js";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput.js";
import HeadingText from "../../components/UI/HeadingText/HeadingText.js";
import MainText from "../../components/UI/MainText/MainText.js";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground.js"
import backgroundImage from "../../assets/background.jpg"

type State = {
  viewMode: string
};
type Props = {};

class AuthScreen extends Component<Props, State> {
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
  };

  constructor(props : Props) {
    super(props);
    Dimensions.addEventListener( "change", this.updateStyles);
  }

  componentWillUnmount () {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = (dims: Object) => {
    this.setState({
      viewMode:
      dims.window.height > 500 ? "portrait" : "landscape"
    });
  }

  loginHandler = () => {
    startMainTabs();
  }

  render() {
    let headingText = null;

    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText style={styles.heading}>Please Login In</HeadingText>
        </MainText>
      );
    }
    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.container}>
            {headingText}
            <ButtonWithBackground color="#29aaf4" onPress={() => alert("Hello")}>
              Switch to Login
            </ButtonWithBackground>
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Your E-Mail Address"
                style={styles.input}
              />
              <View
                style={
                  this.state.viewMode === "portrait"
                    ? styles.portraitPasswordContainer
                    : styles.landscapePasswordContainer
                }
              >
                <View
                  style={
                    this.state.viewMode === "portrait"
                      ? styles.portraitPasswordWrapper
                      : styles.landscapePasswordWrapper
                  }
                >
                  <DefaultInput placeholder="Password" style={styles.input}/>
                </View>
                <View
                  style={
                    this.state.viewMode === "portrait"
                      ? styles.portraitPasswordWrapper
                      : styles.landscapePasswordWrapper
                  }
                >
                  <DefaultInput placeholder="Confirm Password" style={styles.input}/>
                </View>
              </View>
            </View>
            <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
              Submit
            </ButtonWithBackground>
          </View>
        </ImageBackground>
    );
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    backgroundImage: {
      width: "100%",
      flex: 1
    },
    inputContainer: {
      width: "80%",
    },
    input: {
      backgroundColor: "#eee",
      borderColor: "#bbb"
    },
    heading: {

    },
    landscapePasswordContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    portraitPasswordContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    landscapePasswordWrapper: {
      width: "45%"
    },
    portraitPasswordWrapper: {
      width: "100%"
    }
  });

export default AuthScreen;
