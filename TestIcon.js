import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    // height: 30,
    // width: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  labelStyle: { fontSize: 11, paddingBottom: 5 },
});

export default class TabIcon extends Component {
  static propTypes = {
    iconName: PropTypes.string.isRequired,
    kumarP: PropTypes.string,
    focused: PropTypes.bool,
    title: PropTypes.string,
  };

  static defaultProps = {
    kumarP: 'def',
    focused: false,
    title: '',
  };

  state = {};

  render() {
    const { iconName, focused, title } = this.props;
    // alert(this.props.title);
    return (
      <View style={styles.container}>
        <Icon
          name={iconName}
          type="material-community"
          size={26}
          color={focused ? 'red' : 'black'}
        />
        <Text style={[styles.labelStyle, { color: focused ? 'red' : 'black' }]}>{title}</Text>
      </View>
    );
  }
}
