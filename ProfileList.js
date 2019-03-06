import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { iOSColors } from 'react-native-typography';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import { styles } from 'react-native-theme';
import { Icon, Avatar } from '@ui/components';
import { Colors } from '@ui/theme_default';

export default class ProfileList extends Component {
  static propTypes = {};

  static defaultProps = {};

  keyExtractor = (item) => item.id;

  renderItem = ({ item }) => {
    const { profileContainerStyle } = this.props;
    let statusColor = iOSColors.gray;
    switch (item.status) {
      case 'online':
        statusColor = iOSColors.green;
        break;
      case 'away':
        statusColor = iOSColors.yellow;
        break;
      case 'busy':
        statusColor = iOSColors.red;
        break;
      default:
        statusColor = iOSColors.midGray;
    }
    return (
      <ListItem
        key={item.id}
        title={item.title}
        subtitle={item.subTitle ? item.subTitle : null}
        leftIcon={
          item.icon && (
            <Icon
              name={item.icon}
              type="material-community"
              color={item.title === 'Logout' ? Colors.TEXT_HEADER : iOSColors.gray}
              size={26}
            />
          )
        }
        leftAvatar={
          item.avatar_url &&
          statusColor && (
            <Avatar
              avatarUrl={item.avatar_url}
              avatarName={item.title}
              avatarSize={50}
              statusColor={statusColor}
              onAvatarPress={item.onAvatarPress ? item.onAvatarPress : null}
            />
          )
        }
        containerStyle={[styles.listItemContainerStyle, profileContainerStyle]}
        onPress={item.onPress ? item.onPress : null}
        titleStyle={
          item.subTitle
            ? styles.listItemTitle
            : [
                styles.fontSize16,

                {
                  color: item.title === 'Logout' ? Colors.TEXT_HEADER : iOSColors.black,
                },
              ]
        }
        subtitleStyle={styles.listItemSubTitle}
        rightTitle={
          item.date &&
          item.time && (
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ color: iOSColors.gray, fontSize: 14, textAlign: 'right' }}>
                {item.date ? item.date : ''}
              </Text>
              <Text style={{ color: iOSColors.gray, fontSize: 12, textAlign: 'right' }}>
                {item.time ? item.time : ''}
              </Text>
            </View>
          )
        }
      />
    );
  };

  render() {
    const { list } = this.props;
    return <FlatList keyExtractor={this.keyExtractor} data={list} renderItem={this.renderItem} />;
  }
}

ProfileList.propTypes = {
  profileContainerStyle: PropTypes.shape(),
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      icon: PropTypes.string,
      onPress: PropTypes.func,
    }),
  ),
};

ProfileList.defaultProps = {
  profileContainerStyle: null,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: '',
      title: '',
      icon: '',
      onPress: () => {},
    }),
  ),
};
