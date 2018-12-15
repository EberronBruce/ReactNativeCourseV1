// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  ImageBackground
} from 'react-native';
import startMainTabs from "../MainTabs/startMainTabs.js";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput.js";
import HeadingText from "../../components/UI/HeadingText/HeadingText.js";
import MainText from "../../components/UI/MainText/MainText.js";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground.js"
import backgroundImage from "../../assets/background.jpg"

type State = {};
type Props = {};

class AuthScreen extends Component<Props, State> {
  loginHandler = () => {
    startMainTabs();
  }

  render() {
    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
          <View style={styles.container}>
            <MainText>
              <HeadingText style={styles.heading}>Please Login In</HeadingText>
            </MainText>
            <ButtonWithBackground color="#29aaf4" onPress={() => alert("Hello")}>
              Switch to Login
            </ButtonWithBackground>
            <View style={styles.inputContainer}>
              <DefaultInput placeholder="Your E-Mail Address" style={styles.input}/>
              <DefaultInput placeholder="Password" style={styles.input}/>
              <DefaultInput placeholder="Confirm Password" style={styles.input}/>
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
    }
  });

export default AuthScreen;
