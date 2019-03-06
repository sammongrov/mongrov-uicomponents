import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import PropTypes from 'prop-types';
import { Icon, NavBar, Text, Screen } from '@ui/components';
import { styles } from 'react-native-theme';
import { Colors } from '@ui/theme_default';

export default class Camera extends Component {
  getFlashIcon = (flashType) => {
    let icon = flashType;
    switch (flashType) {
      case 'on':
        icon = 'flash';
        break;
      case 'auto':
        icon = 'flash-auto';
        break;

      case 'torch':
        icon = 'lightbulb-on';
        break;
      default:
        icon = 'flash-off';
        break;
    }
    return icon;
  };

  renderCameraIcon() {
    const { cameraIconEnable, onCameraPress, recordIndicator } = this.props;
    if (cameraIconEnable && !recordIndicator) {
      return (
        <TouchableOpacity style={styles.cameraCaptureButtonView} onPress={onCameraPress}>
          <Icon name="camera-enhance" size={30} color={Colors.ICON_WHITE} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  renderVideoIcon() {
    const { videoIconEnable, videoRecord, recordIndicator } = this.props;
    if (videoIconEnable) {
      return (
        <TouchableOpacity style={styles.videoCaptureButtonView} onPress={videoRecord}>
          <Icon
            name={recordIndicator === false ? 'video' : 'stop'}
            size={30}
            color={recordIndicator === false ? Colors.ICON_WHITE : Colors.ICON_RED}
          />
        </TouchableOpacity>
      );
    }
    return null;
  }

  renderIcon() {
    const { cameraIconEnable, videoIconEnable, flashType } = this.props;
    if (cameraIconEnable || videoIconEnable) {
      return (
        <View style={[styles.cameraOverlayBottom]}>
          {this.renderFlashIcon(flashType)}
          {this.renderCameraIcon()}
          {this.renderVideoIcon()}
          {this.renderCameraSwitchIcon()}
        </View>
      );
    }
  }

  renderCameraSwitchIcon() {
    const { switchAction, showCameraSwitchIcon } = this.props;
    if (showCameraSwitchIcon) {
      return (
        <TouchableOpacity onPress={switchAction}>
          <Icon
            name="camera-party-mode"
            type="material-community"
            color={Colors.ICON_WHITE}
            size={30}
          />
        </TouchableOpacity>
      );
    }
  }

  renderFlashIcon(flashIconName) {
    const { changeFlashAction } = this.props;
    return (
      <TouchableOpacity onPress={changeFlashAction}>
        <Icon
          name={this.getFlashIcon(flashIconName)}
          type="material-community"
          color={Colors.ICON_WHITE}
          size={30}
        />
      </TouchableOpacity>
    );
  }

  renderCameraNavbar(flashIcon) {
    const { goBack, recordingTime, recordIndicator } = this.props;
    return (
      <NavBar
        navContainerStyle={styles.cameraNavContainer}
        leftComponent={
          !recordIndicator && (
            <TouchableOpacity onPress={goBack}>
              <Icon
                name="chevron-left"
                type="material-community"
                color={Colors.ICON_WHITE}
                size={36}
              />
            </TouchableOpacity>
          )
        }
        rightComponent={
          <View style={[styles.rowDirection, styles.marginRight10]}>
            {this.renderFlashIcon(flashIcon)}
            {this.renderCameraSwitchIcon()}
          </View>
        }
        titleComponent={
          recordIndicator && (
            <View style={[styles.rowFlex, styles.alignJustifyCenter]}>
              <Icon name="record" type="material-community" color={Colors.ICON_RED} size={18} />
              <Text style={styles.timerText}>{recordingTime}</Text>
            </View>
          )
        }
      />
    );
  }

  renderBackButton() {
    const { goBack } = this.props;
    return (
      <TouchableOpacity style={styles.cameraBackButton} onPress={goBack}>
        <Icon name="chevron-left" size={30} color={Colors.ICON_WHITE} width={30} />
      </TouchableOpacity>
    );
  }

  render() {
    const { refs, cameraSwitch, flashType } = this.props;
    return (
      <Screen safeBgColors={['#000', '#000']}>
        {this.renderBackButton()}
        <RNCamera
          ref={refs}
          style={styles.alignCenterJustifyEnd}
          type={cameraSwitch}
          flashMode={flashType}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="App needs your permission to use your camera"
        />
        {this.renderIcon()}
      </Screen>
    );
  }
}

Camera.propTypes = {
  cameraIconEnable: PropTypes.bool,
  videoIconEnable: PropTypes.bool,
  onCameraPress: PropTypes.func,
  refs: PropTypes.func,
  videoRecord: PropTypes.func,
  recordIndicator: PropTypes.bool,
  cameraSwitch: PropTypes.string,
  flashType: PropTypes.string,
  groupId: PropTypes.string,
  showCameraSwitchIcon: PropTypes.bool,
  switchAction: PropTypes.func,
  changeFlashAction: PropTypes.func,
  goBack: PropTypes.func.isRequired,
  recordingTime: PropTypes.string,
};

Camera.defaultProps = {
  cameraIconEnable: false,
  videoIconEnable: false,
  onCameraPress: () => {},
  refs: () => {},
  videoRecord: () => {},
  switchAction: () => {},
  changeFlashAction: () => {},
  recordIndicator: false,
  cameraSwitch: 'back',
  flashType: 'off',
  groupId: '',
  showCameraSwitchIcon: true,
  recordingTime: '',
};
