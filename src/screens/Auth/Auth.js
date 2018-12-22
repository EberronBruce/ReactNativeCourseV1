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
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground.js";
import backgroundImage from "../../assets/background.jpg";
import validate from '../../utility/validation.js';

type State = {
  viewMode: string,
  controls: Object
};
type Props = {};

class AuthScreen extends Component<Props, State> {
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword : {
        value: "",
        valid: false,
        validationRules: {
          equalTo: 'password'
        },
        touched: false
      }
    }
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
  };

  loginHandler = () => {
    startMainTabs();
  };

  updateInputState = (key: string, value: string) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid: key === 'password'
            ? validate(
              prevState.controls.confirmPassword.value,
              prevState.controls.confirmPassword.validationRules,
              connectedValue
            )
            : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

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
                value={this.state.controls.email.value}
                onChangeText={(val) => this.updateInputState('email', val)}
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
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
                  <DefaultInput
                    placeholder="Password"
                    style={styles.input}
                    value={this.state.controls.password.value}
                    onChangeText={(val) => this.updateInputState('password', val)}
                    valid={this.state.controls.password.valid}
                    touched={this.state.controls.password.touched}
                  />
                </View>
                <View
                  style={
                    this.state.viewMode === "portrait"
                      ? styles.portraitPasswordWrapper
                      : styles.landscapePasswordWrapper
                  }
                >
                  <DefaultInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    value={this.state.controls.confirmPassword.value}
                    onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                    valid={this.state.controls.confirmPassword.valid}
                    touched={this.state.controls.confirmPassword.touched}
                  />
                </View>
              </View>
            </View>
            <ButtonWithBackground
              color="#29aaf4"
              onPress={this.loginHandler}
              disabled={
                !this.state.controls.confirmPassword.valid ||
                !this.state.controls.email.valid ||
                !this.state.controls.password.valid
              }
            >
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
