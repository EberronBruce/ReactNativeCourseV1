// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native';

type Props = {};

class SideDrawer extends Component<Props> {
  render() {
    return (
      <View style={[
        styles.container,
        {width: Dimensions.get("window").width * 0.8 }
      ]}
      >
        <Text>SideDrawer</Text>
      </View>
    );
  }
}

const styles =  StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor: "white",
    flex: 1
  }
});

export default SideDrawer;
