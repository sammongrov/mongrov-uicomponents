import { Button as RNEButton } from 'react-native-elements';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { title, buttonStyle, containerStyle, onPress } = this.props;
    return (
      <RNEButton
        title={title}
        buttonStyle={buttonStyle}
        containerStyle={containerStyle}
        onPress={onPress}
      />
    );
  }
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  buttonStyle: PropTypes.instanceOf(Object),
  containerStyle: PropTypes.instanceOf(Object),
};

Button.defaultProps = {
  buttonStyle: {},
  containerStyle: {},
};
