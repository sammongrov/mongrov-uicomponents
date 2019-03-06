import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { Colors } from '@ui/theme_default';

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class TabIcon extends Component {
  static propTypes = {
    iconName: PropTypes.string.isRequired,
  };

  static defaultProps = {};

  state = {};

  render() {
    const { iconName } = this.props;
    return (
      <View style={styles.container}>
        <Icon name={iconName} type="material-community" size={22} color={Colors.TEXT_TAB} />
      </View>
    );
  }
}
