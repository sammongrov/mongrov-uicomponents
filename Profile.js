import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from 'react-native-theme';
import moment from 'moment';
import { Text, Avatar, Icon } from '@ui/components';
import PropTypes from 'prop-types';
import { iOSColors } from 'react-native-typography';

export default class Profile extends Component {
  state = {};

  renderIcon() {
    const { onPress, showIcon, iconName, iconSize, iconColor } = this.props;
    if (showIcon) {
      return (
        <TouchableOpacity style={styles.profileIconContainer} onPress={onPress}>
          <Icon
            size={iconSize}
            reverse
            name={iconName}
            color={iconColor}
            style={styles.profileIconSpace}
          />
        </TouchableOpacity>
      );
    }
    return null;
  }

  renderMembersData() {
    const { totalMembers, onlineMembers } = this.props;
    if (totalMembers && onlineMembers) {
      return (
        <Text style={[styles.subtextBlack1, styles.textContainer]}>
          {`${totalMembers} members (${onlineMembers}) online`}
        </Text>
      );
    }
    return null;
  }

  renderProfileUserName() {
    const { profileUname } = this.props;
    if (profileUname) {
      return <Text style={[styles.subtextBlackbody, styles.textContainer]}>{profileUname}</Text>;
    }
    return null;
  }

  renderProfileAnnouncement() {
    const { profileAnnouncement } = this.props;
    if (profileAnnouncement) {
      return (
        <Text style={[styles.subtextBlackbody, styles.textContainer]}>{profileAnnouncement}</Text>
      );
    }
    return null;
  }

  renderStatusDetail() {
    const { showStatusText, statusColor } = this.props;
    if (showStatusText) {
      return (
        <View style={[styles.memberSubView]}>
          <View style={[styles.statusCircle, { backgroundColor: statusColor }]} />
          <Text style={[styles.subtextBlackbody]}>{showStatusText}</Text>
        </View>
      );
    }
    return null;
  }

  renderEmailDetail() {
    const { profileMailId } = this.props;
    if (profileMailId) {
      return (
        <View style={[styles.memberSubView]}>
          <Icon
            name="email-outline"
            type="material-community"
            style={styles.profileSubIconStyle}
            size={17}
            color={iOSColors.gray}
          />
          <Text style={[styles.subtextBlackbody]}>{profileMailId}</Text>
        </View>
      );
    }
    return null;
  }

  renderLoginTime() {
    const { lastLoginTime } = this.props;
    if (lastLoginTime) {
      return (
        <View style={[styles.memberSubView]}>
          <Icon
            name="clock"
            type="material-community"
            style={styles.profileSubIconStyle}
            size={17}
            color={iOSColors.gray}
          />
          <Text style={[styles.subtextBlackbody]}>
            {`Last Login at ${moment(new Date(lastLoginTime)).format('hh:mm A')}`}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    const { avatarName, avatarUrl, avatarSize, profileTitle, profileStyle } = this.props;
    return (
      <View style={[styles.paddingVertical30, styles.alignJustifyCenter, profileStyle]}>
        <View>
          <Avatar avatarUrl={avatarUrl} avatarName={avatarName} avatarSize={avatarSize} />
          {this.renderIcon()}
        </View>
        <Text style={[styles.groupTitleText, styles.textContainer]}>{profileTitle}</Text>
        {this.renderProfileUserName()}
        {this.renderProfileAnnouncement()}
        {this.renderMembersData()}
        {this.renderStatusDetail()}
        {this.renderEmailDetail()}
        {this.renderLoginTime()}
      </View>
    );
  }
}

Profile.propTypes = {
  profileStyle: PropTypes.shape(),
  iconColor: PropTypes.string,
  avatarUrl: PropTypes.string,
  avatarName: PropTypes.string,
  iconName: PropTypes.string,
  avatarSize: PropTypes.number,
  iconSize: PropTypes.number,
  showIcon: PropTypes.bool,
  profileTitle: PropTypes.string,
  onPress: PropTypes.func,
  profileUname: PropTypes.string,
  showStatusText: PropTypes.string,
  profileMailId: PropTypes.string,
  lastLoginTime: PropTypes.string,
  statusColor: PropTypes.string,
  totalMembers: PropTypes.string,
  onlineMembers: PropTypes.string,
  profileAnnouncement: PropTypes.string,
};

Profile.defaultProps = {
  profileStyle: null,
  iconColor: null,
  iconName: 'camera-iris',
  avatarUrl: null,
  avatarName: '',
  avatarSize: 60,
  iconSize: 30,
  showIcon: false,
  profileTitle: '',
  onPress: () => {},
  profileUname: '',
  showStatusText: '',
  profileMailId: '',
  lastLoginTime: '',
  statusColor: null,
  totalMembers: '',
  onlineMembers: '',
  profileAnnouncement: '',
};
