import React, { Component } from 'react';
import { Text, View, Platform, ProgressBarAndroid, ProgressViewIOS } from 'react-native';
import PropTypes from 'prop-types';
import { iOSColors } from 'react-native-typography';

export default class UploadProgress extends Component {
  render() {
    const { uploadFilePercent } = this.props;
    const progressPercentage = uploadFilePercent ? Number(uploadFilePercent.toFixed(1)) : 0;
    const displayPercentage = uploadFilePercent ? `${Math.ceil(uploadFilePercent * 100)}%` : '0%';
    let progressBar;
    if (Platform.OS === 'ios') {
      progressBar = (
        <ProgressViewIOS
          progress={progressPercentage}
          progressTintColor={iOSColors.blue}
          trackTintColor="#A6B9D8"
          progressViewStyle="bar"
          style={{ width: '60%' }}
        />
      );
    } else {
      progressBar = (
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          color={iOSColors.blue}
          progress={progressPercentage}
          style={{ width: '60%' }}
        />
      );
    }
    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
          top: '45%',
          left: 0,
          right: 0,
          flex: 1,
          alignItems: 'center',
        }}
      >
        {/* <Text style={{ color: iOSColors.gray, padding: 5 }}>Sending image...</Text> */}
        <Text style={{ color: iOSColors.blue }}>{displayPercentage}</Text>
        {progressBar}
      </View>
    );
  }
}

UploadProgress.propTypes = {
  uploadFilePercent: PropTypes.number,
};

UploadProgress.defaultProps = {
  uploadFilePercent: 0,
};
