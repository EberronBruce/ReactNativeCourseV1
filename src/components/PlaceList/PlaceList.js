/* @flow */

import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import ListItem from '../ListItem/ListItem';

type Props = {places: Array<Object>, onItemDeleted: Function};

const placeList = (props : Props) => {

    return (
        <FlatList
          style={styles.listContainer}
          data={props.places}
          renderItem={(info) => (
            <ListItem
              placeName={info.item.name}
              placeImage={info.item.image}
              onItemPressed={() => props.onItemDeleted(info.item.key)}
            />
          )}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
      width: "100%"
    }
});

export default placeList;
