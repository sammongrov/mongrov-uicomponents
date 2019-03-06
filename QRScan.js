import React, { Component } from 'react';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import PropTypes from 'prop-types';
import { styles } from 'react-native-theme';

export default class QRScan extends Component {
  render() {
    const { onRead } = this.props;
    return (
      <View style={styles.container}>
        <RNCamera onBarCodeRead={onRead} style={styles.flex1} />
      </View>
    );
  }
}

QRScan.propTypes = {
  onRead: PropTypes.func.isRequired,
};

QRScan.defaultProps = {};
