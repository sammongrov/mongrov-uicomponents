import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from 'react-native-theme';
import PropTypes from 'prop-types';
import { Text, Avatar } from '@ui/components';

export default class NavBar extends Component {
  _renderChatInfo(type) {
    const { chatInfo, chatSubTitle } = this.props;
    if (type === 'd' && chatInfo) {
      return (
        <Text numberOfLines={1} style={styles.navChatInfo}>
          {chatInfo}
        </Text>
      );
    }
    if (type !== 'd' && chatSubTitle) {
      return (
        <Text numberOfLines={1} style={styles.navChatInfo}>
          {chatSubTitle}
        </Text>
      );
    }
    return null;
  }

  _renderChatNavBar() {
    const { avatarUrl, avatarName, statusColor, chatTitle, type, onChatNavPress } = this.props;
    if (chatTitle) {
      return (
        <View style={[styles.rowFlex, styles.alignCenterJustifyStart]}>
          <Avatar
            avatarUrl={avatarUrl}
            avatarName={avatarName}
            avatarSize={36}
            statusColor={type === 'd' ? statusColor : null}
          />
          <TouchableOpacity
            style={[styles.centerColumnContainer, styles.paddingHorizontal10]}
            onPress={onChatNavPress}
          >
            <Text style={[styles.navChatTitle]} numberOfLines={1}>
              {chatTitle}
            </Text>
            {this._renderChatInfo(type)}
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }

  _renderTitleComponent() {
    const { titleComponent } = this.props;
    if (titleComponent) {
      return <View style={[styles.flex1, styles.alignJustifyCenter]}>{titleComponent}</View>;
    }
  }

  _renderTitleText() {
    const { titleText, textStyle, titleTextLine, titleContainer } = this.props;
    if (titleText) {
      return (
        <View style={[styles.flex1, styles.alignJustifyCenter, titleContainer]}>
          <Text style={[styles.navTitleStyle, textStyle]} numberOfLines={titleTextLine}>
            {titleText}
          </Text>
        </View>
      );
    }
  }

  render() {
    const { leftComponent, rightComponent, navContainerStyle } = this.props;
    return (
      <View style={[styles.navContainer, navContainerStyle]}>
        <View style={[styles.navSideButtonDimension, styles.alignJustifyCenter]}>
          {leftComponent}
        </View>
        {this._renderChatNavBar()}
        {this._renderTitleComponent()}
        {this._renderTitleText()}
        <View style={[styles.navSideButtonDimension, styles.alignJustifyCenter]}>
          {rightComponent}
        </View>
      </View>
    );
  }
}

NavBar.propTypes = {
  leftComponent: PropTypes.node,
  titleComponent: PropTypes.node,
  titleText: PropTypes.string,
  titleContainer: PropTypes.object,
  rightComponent: PropTypes.node,
  navContainerStyle: PropTypes.shape(),
  textStyle: PropTypes.shape(),
  statusColor: PropTypes.string,
  avatarUrl: PropTypes.string,
  avatarName: PropTypes.string,
  chatTitle: PropTypes.string,
  chatSubTitle: PropTypes.string,
  chatInfo: PropTypes.any,
  type: PropTypes.string,
  onChatNavPress: PropTypes.func,
  titleTextLine: PropTypes.number,
};

NavBar.defaultProps = {
  leftComponent: undefined,
  titleComponent: undefined,
  rightComponent: undefined,
  titleText: '',
  navContainerStyle: null,
  textStyle: null,
  titleContainer: null,
  statusColor: null,
  avatarUrl: null,
  avatarName: '',
  chatTitle: '',
  chatSubTitle: '',
  chatInfo: '',
  type: 'd',
  onChatNavPress: null,
  titleTextLine: 1,
};
