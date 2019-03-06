import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from 'react-native-theme';
import PropTypes from 'prop-types';
import Icon from './Icon';

export default class IconButton extends Component {
  render() {
    const { containerStyle, icon, iconStyle, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={[styles.authIBtncontainer, containerStyle]}>
        <Icon active name={icon} style={[styles.authIBtnIcon, iconStyle]} />
      </TouchableOpacity>
    );
  }
}

IconButton.propTypes = {
  containerStyle: PropTypes.number.isRequired,
  iconStyle: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

IconButton.defaultProps = {};
