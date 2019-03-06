import React, { Component } from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: 'OpenSans-Regular',
  },
});

export default class Text extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.shape(), PropTypes.array]),
  };

  static defaultProps = {
    style: null,
    children: null,
  };

  render() {
    const { style, children } = this.props;
    return (
      <RNText {...this.props} style={[styles.defaultStyle, style]}>
        {children}
      </RNText>
    );
  }
}
