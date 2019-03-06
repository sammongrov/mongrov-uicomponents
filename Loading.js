import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles } from 'react-native-theme';
import { Colors } from '@ui/theme_default';

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }
}
