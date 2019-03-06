import React, { Component } from 'react';
import QRCode from 'react-native-qrcode-svg';
import PropTypes from 'prop-types';

export default class QRCodeGenerator extends Component {
  render() {
    const { qrColor, qrValue, qrSize } = this.props;
    return <QRCode color={qrColor} value={qrValue} size={qrSize} />;
  }
}

QRCodeGenerator.propTypes = {
  qrColor: PropTypes.string,
  qrValue: PropTypes.string.isRequired,
  qrSize: PropTypes.number,
};

QRCodeGenerator.defaultProps = {
  qrColor: '#090909',
  qrSize: 150,
};
