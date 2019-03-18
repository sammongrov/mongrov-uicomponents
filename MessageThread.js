import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { styles } from 'react-native-theme';
import { Colors } from '@ui/theme_default';
import { iOSColors } from 'react-native-typography';
import FastImage from 'react-native-fast-image';
import AppUtil from '@utils';
import { Icon } from '@ui/components';
import { AudioPlay } from '@ui/attachments';
import DbManager from '../app/DBManager';
import videoThumbnail from '../../../src/images/videoThumb.jpg';

// TODO: clean old styles of MessageThread
const customStyles = StyleSheet.create({
  threadsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messageContainer: {
    flexDirection: 'column',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#DDF8FF',
    borderRadius: 10,
  },
  rowContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  topUserContainer: {
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  threadCounter: {
    marginLeft: 4,
  },
  topUser: {
    color: '#2E88FF',
    fontSize: 16,
  },
  messageText: {
    fontSize: 16,
  },
  threadUsers: {
    color: iOSColors.gray,
    fontSize: 14,
  },
  lastMessageContainer: {
    alignItems: 'flex-end',
  },
  lastMessage: {
    color: '#070707',
    fontWeight: 'bold',
    fontSize: 14,
    maxWidth: '70%',
  },
  lastMessageTs: {
    color: iOSColors.gray,
    fontWeight: '600',
    fontSize: 12,
  },
  marginBottom5: {
    marginBottom: 5,
  },
  alignCenter: {
    alignItems: 'center',
  },
  audioContainer: {
    backgroundColor: Colors.BG_CHAT_DETAIL_BUBBLE_RIGHT,
    paddingBottom: 16,
    paddingTop: 10,
    borderRadius: 8,
    maxWidth: '90%',
  },
});

export default class MessageThread extends PureComponent {
  getThreadMembers = (childMessages) => {
    const members = new Set();
    childMessages.forEach((msg) => {
      const userName = this.getUser(msg.user);
      members.add(userName);
    });
    const membersArr = Array.from(members);
    // console.log('THREAD MEMBERS', membersArr);
    return membersArr;
  };

  getUser = (userObj) => {
    const userName = userObj.name || userObj.username || '';
    return userName;
  };

  getMembersString = (childMessages) => {
    let membersString;
    const membersArr = this.getThreadMembers(childMessages).reverse();
    if (membersArr.length < 4) {
      membersString = membersArr.join(', ');
    } else {
      const restOfMembers = membersArr.length - 3;
      membersString = `${membersArr.slice(0, 3).join(', ')} + ${restOfMembers}`;
    }
    // console.log('MEMBERS STRING', membersString);
    return membersString;
  };

  goToReplyMessage = (replyMessage) => {
    const { group, user, messages } = this.props;
    if (replyMessage && replyMessage._id && replyMessage.user) {
      Actions.ReplyMessage({
        group,
        user,
        messages,
        replyMessage,
      });
    }
  };

  filterParentMessages(messages) {
    const _messages = messages.slice();
    // console.log('MESSAGES LENGTH', _messages.length);
    const parentMessages = _messages.reduce((acc, msg) => {
      if (!msg.isReply && !msg.replyMessageId) {
        const childMessages = DbManager.group.findAllChildMessages(messages, msg._id);
        if (childMessages.length > 0) {
          const _msg = msg;
          _msg.childMessages = childMessages;
          return acc.concat(_msg);
        }
      }
      return acc;
    }, []);
    // console.log('PARENT MESSAGES', parentMessages);
    return parentMessages;
  }

  renderItem = ({ item }) => {
    // console.log('ITEM', item);
    const parentMessageUser = this.getUser(item.user);
    const members = this.getMembersString(item.childMessages);
    const threadLength = item.childMessages.length;
    const lastChildMessage = item.childMessages[0];
    const lastMessageUser = this.getUser(lastChildMessage.user);
    let lastMessageText = lastChildMessage.text;
    const lastMessageTime = AppUtil.formatDate(lastChildMessage.createdAt);

    // last message text
    if (!lastMessageText && lastChildMessage.remoteFile) {
      lastMessageText = 'attachments';
    } else if (lastChildMessage.image) {
      lastMessageText = 'Image';
    } else if (!lastMessageText) {
      lastMessageText = 'No Message';
    }

    // attachments (video, audio)
    let showVideo, showAudio, playerThumbnail, filePath;
    if (item.remoteFile) {
      showVideo =
        item.type === 2 || (item.remoteFileType && item.remoteFileType.startsWith('video'));
      playerThumbnail = item.status > 0 ? videoThumbnail : '';
      showAudio =
        item.type === 3 || (item.remoteFileType && item.remoteFileType.startsWith('audio'));
      filePath = item.status > 0 ? item.remoteFile : '';
    }

    return (
      <View style={[customStyles.messageContainer]}>
        <TouchableOpacity
          onPress={() => {
            this.goToReplyMessage(item);
          }}
        >
          <View
            style={[styles.rowDirection, customStyles.rowContainer, customStyles.topUserContainer]}
          >
            <Text style={[customStyles.topUser]}>{parentMessageUser}</Text>
            <View
              style={[styles.rowDirection, customStyles.rowContainer, customStyles.alignCenter]}
            >
              <Icon
                name="comment-outline"
                type="material-community"
                color={Colors.NAV_ICON}
                size={15}
              />
              <Text style={[customStyles.threadCounter]}>{threadLength}</Text>
            </View>
          </View>

          <View style={[customStyles.marginBottom5]}>
            {item.image &&
              item.status > 0 && (
                <FastImage
                  style={[styles.chatDetailImageMessageView, customStyles.marginBottom5]}
                  source={{
                    uri: item.image,
                    priority: FastImage.priority.high,
                  }}
                />
              )}
            <Text numberOfLines={3} style={[customStyles.messageText]}>
              {item.text}
            </Text>
          </View>

          {showVideo && (
            <View style={[customStyles.marginBottom5]}>
              <FastImage style={styles.chatDetailImageMessageView} source={playerThumbnail} />
            </View>
          )}

          {showAudio && (
            <View style={[customStyles.audioContainer, customStyles.marginBottom5]}>
              <AudioPlay
                audioFile={filePath}
                showPlayer={item.status > 0}
                showDelete={false}
                position="right"
              />
            </View>
          )}

          <View style={[customStyles.marginBottom5]}>
            <Text style={[customStyles.threadUsers]}>{members}</Text>
          </View>
          <View
            style={[
              styles.rowDirection,
              customStyles.rowContainer,
              customStyles.lastMessageContainer,
            ]}
          >
            <Text style={[customStyles.lastMessage]} numberOfLines={2}>
              {lastMessageUser} - {lastMessageText}
            </Text>
            <Text style={[customStyles.lastMessageTs]}>{lastMessageTime}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { messages } = this.props;
    const parentMessages = this.filterParentMessages(messages);
    if (parentMessages.length > 0) {
      return (
        <ScrollView
          style={[styles.flex1, styles.chatDetailContainer]}
          contentContainerStyle={[customStyles.threadsContainer]}
        >
          <FlatList
            keyExtractor={(item) => item._id}
            data={parentMessages}
            renderItem={this.renderItem}
            scrollEnabled={false}
          />
        </ScrollView>
      );
    }
    // return <Text>No threads to show</Text>;
    return null;
  }
}

MessageThread.defaultProps = {
  group: {},
  user: {},
  messages: [],
};

MessageThread.propTypes = {
  group: PropTypes.object,
  user: PropTypes.object,
  messages: PropTypes.array,
};
