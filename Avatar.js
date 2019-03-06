import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from 'react-native-theme';
import PropTypes from 'prop-types';
import AppUtils from '@mongrov/utils';
import Text from './Text';

export default class Avatar extends Component {
  state = {
    urlErr: false,
    loading: false,
  };

  renderAvatar() {
    const { avatarUrl, avatarName, avatarSize } = this.props;
    const { urlErr, loading } = this.state;

    if (avatarUrl && !urlErr && !loading) {
      return (
        <FastImage
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          }}
          source={{
            uri: avatarUrl,
            priority: FastImage.priority.high,
          }}
          onError={() => this.setState({ urlErr: true })}
        />
      );
    }
    return <Text style={styles.avatarText}>{AppUtils.avatarInitials(avatarName)}</Text>;
  }

  render() {
    const { statusColor, avatarSize, avatarName, onAvatarPress } = this.props;
    return (
      <View
        style={[
          styles.rowDirection,
          {
            position: 'relative',
          },
        ]}
      >
        <TouchableOpacity
          onPress={onAvatarPress}
          style={[
            styles.avatarImageContainer,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              backgroundColor: AppUtils.getAvatarColor(avatarName),
            },
          ]}
        >
          {this.renderAvatar()}
        </TouchableOpacity>
        {statusColor !== null && (
          <View
            style={[
              styles.avatarStatusDot,
              {
                backgroundColor: statusColor,
                position: 'absolute',
                right: 0,
              },
            ]}
          />
        )}
      </View>
    );
  }
}

Avatar.propTypes = {
  statusColor: PropTypes.string,
  avatarUrl: PropTypes.string,
  avatarName: PropTypes.string,
  avatarSize: PropTypes.number,
  onAvatarPress: PropTypes.func,
};

Avatar.defaultProps = {
  statusColor: null,
  avatarUrl: null,
  avatarName: '',
  avatarSize: 60,
  onAvatarPress: () => {},
};
