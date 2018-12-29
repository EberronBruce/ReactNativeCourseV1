// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator
 } from 'react-native';
import { connect } from 'react-redux'

import { addPlace } from '../../store/actions/index.js';
import PlaceInput from '../../components/PlaceInput/PlaceInput.js';
import MainText from "../../components/UI/MainText/MainText.js";
import HeadingText from "../../components/UI/HeadingText/HeadingText.js";
import PickImage from "../../components/PickImage/PickImage.js";
import PickLocation from "../../components/PickLocation/PickLocation.js";
import validate from "../../utility/validation.js";
import { startAddPlace } from "../../store/actions/index.js";


type Props = {onAddPlace: Function, navigator: Object, isLoading: bool, placeAdded: bool, onStartAddPlace: Function};
type State = {controls: Object};

class SharePlaceScreen extends Component<Props, State> {
  static navigatorStyle = {
    navBarButtonColor: "orange"
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  };

  componentWillMount() {
    this.reset();
  };

  reset = () => {
    this.setState({
      controls: {
        placeName: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        }
      }
    })
  };

  componentDidUpdate() {
    if (this.props.placeAdded) {
      this.props.navigator.switchToTab({tabInded: 0});
      //this.props.onStartAddPlace();
    }
  }

  onNavigatorEvent = (event) => {
    if (event.type === "ScreenChangedEvent"){
      if (event.id === "willAppear") {
        this.props.onStartAddPlace();
      }
    }
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
            side: "left"
          });
      }
    }
  };

  placeNameChangedHandler = (val: string) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      };
    });
  };

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
        ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      }
    });
  };

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      }
    });
  };

  placeAddedHandler = () => {
      this.props.onAddPlace(
        this.state.controls.placeName.value,
        this.state.controls.location.value,
        this.state.controls.image.value
      );
      this.reset();
      this.imagePicker.reset();
      this.locationPicker.reset();
  };

  render() {
    let submitButton = (
      <Button
        title="Share the Place!"
        onPress={this.placeAddedHandler}
        disabled={
          !this.state.controls.placeName.valid ||
          !this.state.controls.location.valid ||
          !this.state.controls.image.valid
        }
      />
    );

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText style={styles.nothing}>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage
            onImagePicked={this.imagePickedHandler}
            ref={ref => this.imagePicker = ref}
          />
          <PickLocation
            onLocationPick={this.locationPickedHandler}
            ref={ref => this.locationPicker = ref}
          />
          <PlaceInput
            placeData={this.state.controls.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <View style={styles.button}>
            {submitButton}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height: 150
  },
  button: {
    margin: 8
  },
  previewImage: {
    width: "100%",
    height: "100%"
  },
  nothing: {

  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) =>
    dispatch(addPlace(placeName, location, image)),
    onStartAddPlace: () => dispatch(startAddPlace())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
