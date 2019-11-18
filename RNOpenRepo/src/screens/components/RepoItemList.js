import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';

const btnImg = require('../../../assets/images/right_arrow_red.png');

const RepoItemList = ({data, navigation}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => navigation.navigate('RepoDetailScreen', {data})}>
    <View style={styles.leftSide}>
      <Text style={styles.dataName}>{data.name}</Text>
      <Text style={styles.dataDescription}>{data.description}</Text>
    </View>

    <View style={styles.rightSide}>
      <Image style={styles.btnImg} source={btnImg} />
    </View>
  </TouchableOpacity>
);

export default RepoItemList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    minHeight: 50,
    alignItems: 'center',
    marginBottom: 10,
  },
  leftSide: {
    width: '85%',
  },
  rightSide: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataName: {
    fontSize: 15,
    color: '#0366d6',
    fontWeight: 'bold',
  },
  dataDescription: {
    fontSize: 12,
    color: '#586069',
  },
  btnImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
