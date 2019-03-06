import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Clipboard, Alert } from 'react-native';
import { Colors } from '@ui/theme_default';
import { styles } from 'react-native-theme';
import { MessageText } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { FeatherIcon } from '@ui/components';
import FastImage from 'react-native-fast-image';
import {DBManager} from 'app-module';

export default class CustomMessage extends Component {
  state = {
    showMessageActions: false,
    messageActionsFor: '',
    repliesCounter: 0,
    msgHasLikes: false,
    msgHasReplies: false,
    bubblePress: false,
  };

  componentWillMount() {
    const { currentMessage } = this.props;
    const numOfReplies = this.getNumOfReplies(currentMessage._id, currentMessage.group);
    if (currentMessage.likes > 0) {
      this.setState({ msgHasLikes: true });
    }
    if (numOfReplies > 0) {
      this.setState({ msgHasReplies: true, repliesCounter: numOfReplies });
    }
  }

  /* eslint-disable */
  componentDidUpdate(prevProps, prevState) {
    // console.log(`MESSAGE ${this.props.currentMessage.text} is updated.`);
    const { currentMessage } = this.props;
    const numOfReplies = this.getNumOfReplies(currentMessage._id, currentMessage.group);
    if (prevProps.currentMessage.likes !== currentMessage.likes) {
      this.setState({ msgHasLikes: true });
    }
    if (prevState.repliesCounter !== numOfReplies) {
      this.setState({ msgHasReplies: true, repliesCounter: numOfReplies });
    }
  }
  /* eslint-enable */

  handleLike = (messageId) => {
    const { likeMessage } = this.props;
    likeMessage(messageId);
    this.setState({ showMessageActions: false, messageActionsFor: '' });
  };

  handleReply = (message) => {
    const { replyMessage } = this.props;
    replyMessage(message);
    this.setState({ showMessageActions: false, messageActionsFor: '' });
  };

  handleCopy = (text) => {
    Clipboard.setString(text);
    this.setState({ showMessageActions: false, messageActionsFor: '' });
  };

  handleMessageInfo = (message) => {
    const { messageInfo } = this.props;
    messageInfo(message);
    this.setState({ showMessageActions: false, messageActionsFor: '' });
  };

  handleDelete = (message) => {
    const { deleteMessage } = this.props;
    Alert.alert(
      'Delete',
      'Do you want to delete message?',
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            deleteMessage(message._id, message.user._id);
            this.setState({ showMessageActions: false, messageActionsFor: '' });
          },
        },
      ],
      { cancelable: false },
    );
  };

  getNumOfReplies = (messageId, groupId) => {
    const numOfReplies = DBManager.group.getNumOfMessageReplies(messageId, groupId);
    return numOfReplies;
  };

  renderReply = (props) => {
    const { replyMessageId } = props.currentMessage;
    const replyMessageObj = DBManager.group.findMessageById(replyMessageId);
    // console.log('REPLY MESSAGE ID, OBJ', replyMessageId, replyMessageObj);

    if (replyMessageId && replyMessageObj) {
      const { user, text, image } = replyMessageObj;
      const sideColor = props.position === 'left' ? Colors.TEXT_DARK : Colors.TEXT_REPLY_RIGHT;
      return (
        <View style={styles.threadedMessageContainer}>
          <View style={styles.threadedMessageView}>
            <Text
              style={[styles.threadedMessageText, { color: sideColor }]}
              numberOfLines={1}
            >{`${user.name || user.username}:`}</Text>
            <Text style={{ color: sideColor }}>{text}</Text>
          </View>
          {image && (
            <TouchableOpacity
              onPress={() => {
                if (Actions.currentScene === 'ChatRoomScene') {
                  // this.setState({ actionsMenu: false });
                  Actions.ViewImage({
                    imageUrl: image,
                    goBack: () => Actions.pop,
                  });
                }
              }}
              style={styles.padding3}
            >
              <FastImage
                style={styles.threadedMessageImage}
                source={{
                  uri: image,
                  priority: FastImage.priority.high,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    }
  };

  renderMessageActions = (props) => {
    const { position, currentMessage, canDelete, isSameUser } = props;
    const { messageActionsFor, repliesCounter, msgHasLikes, msgHasReplies } = this.state;
    // const repliesCounter = this.getNumOfReplies(currentMessage._id, currentMessage.group);
    // console.log('SHOW MESSAGE ACTIONS', messageActionsFor);
    // console.log('Replies counter', repliesCounter, 'for', currentMessage._id);

    const iconColor = position === 'left' ? '#696969' : Colors.ICON_WHITE;
    const borderColor = position === 'left' ? '#dfdfdf' : '#70B1FF';
    if (messageActionsFor !== currentMessage._id && (msgHasLikes || msgHasReplies)) {
      return (
        <View
          style={[
            styles.rowDirection,
            {
              borderTopColor: borderColor,
              borderTopWidth: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginLeft: 10,
              marginRight: 8,
              paddingVertical: 10,
            },
          ]}
        >
          {msgHasLikes && (
            <TouchableOpacity
              style={[
                styles.rowDirection,
                {
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginRight: 20,
                },
              ]}
              onPress={() => this.handleLike(currentMessage._id)}
            >
              <FeatherIcon name="thumbs-up" color={iconColor} size={20} />
              <Text style={{ color: iconColor, fontSize: 16, paddingLeft: 5 }}>
                {currentMessage.likes}
              </Text>
            </TouchableOpacity>
          )}
          {msgHasReplies && (
            <TouchableOpacity
              style={[
                styles.rowDirection,
                {
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginRight: 20,
                },
              ]}
              onPress={() => this.handleReply(currentMessage)}
            >
              <FeatherIcon name="corner-up-left" color={iconColor} size={20} />
              <Text style={{ color: iconColor, paddingLeft: 5, fontSize: 16 }}>
                {repliesCounter}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
    if (messageActionsFor === currentMessage._id) {
      return (
        <View
          style={[
            styles.rowDirection,
            {
              borderTopColor: borderColor,
              borderTopWidth: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginLeft: 10,
              marginRight: 8,
              paddingVertical: 10,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.rowDirection,
              {
                alignItems: 'center',
              },
            ]}
            onPress={() => this.handleLike(currentMessage._id)}
          >
            <FeatherIcon name="thumbs-up" color={iconColor} size={20} />
            <Text style={{ color: iconColor, fontSize: 16, paddingLeft: 5 }}>
              {currentMessage.likes}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.rowDirection,
              {
                alignItems: 'center',
              },
            ]}
            onPress={() => this.handleReply(currentMessage)}
          >
            <FeatherIcon name="corner-up-left" color={iconColor} size={20} />
            <Text style={{ color: iconColor, paddingLeft: 5, fontSize: 16 }}>{repliesCounter}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleCopy(currentMessage.text)}>
            <FeatherIcon name="copy" color={iconColor} size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleMessageInfo(currentMessage)}>
            <FeatherIcon name="alert-circle" color={iconColor} size={20} />
          </TouchableOpacity>
          {canDelete &&
            isSameUser && (
              <TouchableOpacity onPress={() => this.handleDelete(currentMessage)}>
                <FeatherIcon name="trash-2" color={iconColor} size={20} />
              </TouchableOpacity>
            )}
        </View>
      );
    }
  };

  render() {
    const { currentMessage } = this.props;
    const { showMessageActions, messageActionsFor, bubblePress } = this.state;
    // console.log('STATE MESSAGE ACTIONS', showMessageActions);
    // console.log('MESSAGE ACTIONS ID', messageActionsFor);
    return (
      <View style={bubblePress ? { minWidth: 250 } : null}>
        <TouchableOpacity
          onPress={() => {
            if (!showMessageActions) {
              const repliesCounter = this.getNumOfReplies(currentMessage._id, currentMessage.group);
              this.setState({
                repliesCounter,
                bubblePress: !bubblePress,
              });
            }
            this.setState({
              showMessageActions: !showMessageActions,
              messageActionsFor: messageActionsFor === '' ? currentMessage._id : '',
              bubblePress: !bubblePress,
            });
          }}
        >
          {this.renderReply(this.props)}
          <MessageText {...this.props} />
          {this.renderMessageActions(this.props)}
        </TouchableOpacity>
      </View>
    );
  }
}

CustomMessage.propTypes = {
  currentMessage: PropTypes.object,
  position: PropTypes.string,
  canDelete: PropTypes.bool,
  isSameUser: PropTypes.bool,
  replyMessage: PropTypes.func,
  messageInfo: PropTypes.func,
  deleteMessage: PropTypes.func,
  likeMessage: PropTypes.func,
};

CustomMessage.defaultProps = {
  currentMessage: {},
  position: '',
  canDelete: false,
  isSameUser: false,
  replyMessage: () => {},
  messageInfo: () => {},
  deleteMessage: () => {},
  likeMessage: () => {},
};
