import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from 'react-native-theme';
import PropTypes from 'prop-types';

export default class Badge extends Component {
  render() {
    const { messageCount } = this.props;
    return (
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{messageCount < 99 ? messageCount : '99+'}</Text>
      </View>
    );
  }
}

Badge.propTypes = {
  messageCount: PropTypes.number.isRequired,
};

Badge.defaultProps = {};
