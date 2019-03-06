import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from '@ui/components';
import PropTypes from 'prop-types';
import { styles } from 'react-native-theme';

export default class ErrorInfo extends Component {
  renderErrorInfo() {
    const { errorType, error } = this.props;
    if (JSON.stringify(error) !== JSON.stringify({}) && errorType === 'error') {
      return (
        <View style={[styles.errorInfoError]}>
          <Text style={[styles.errorInfoErrorText]}>{error.message}</Text>
        </View>
      );
    }
    if (JSON.stringify(error) !== JSON.stringify({}) && errorType === 'warning') {
      return (
        <View style={[styles.errorInfoWarning]}>
          <Text style={[styles.errorInfoWarningText]}>{error.message}</Text>
        </View>
      );
    }
  }

  render() {
    return <View>{this.renderErrorInfo()}</View>;
  }
}

ErrorInfo.propTypes = {
  errorType: PropTypes.string,
  error: PropTypes.instanceOf(Object),
};

ErrorInfo.defaultProps = {
  errorType: null,
  error: {},
};
