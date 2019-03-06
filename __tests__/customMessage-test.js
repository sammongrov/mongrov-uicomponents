import React from 'react';
import { Clipboard, Alert } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Actions } from 'react-native-router-flux';
import {DBManager} from 'app-module';

import CustomMessage from '../CustomMessage';

configure({ adapter: new Adapter() });

jest.mock('react-native-router-flux', () => ({
  Actions: {
    currentScene: '',
    ViewImage: jest.fn(),
    pop: jest.fn(),
  },
}));

jest.mock('../../app/DBManager', () => {
  const dbManager = {
    group: {
      findMessageById: jest.fn(() => ({
        user: { _id: 'user123', name: '', username: 'test-username' }, // 'test-user'
        text: 'test-text1',
        image: 'http://test-images/test-image1.png',
      })),
      getNumOfMessageReplies: jest.fn(() => 7),
    },
  };
  return dbManager;
});

jest.mock('Alert', () => ({
  alert: jest.fn((str1, str2, arr) => {
    arr[0].onPress();
  }),
}));

const currentMessage = {
  _id: '123987',
  user: {
    _id: '6968745',
    name: 'test-user',
  },
  replyMessageId: '11111',
  group: 'new-group',
  type: 1,
  isReply: true,
  status: 1,
  likes: 5,
  text: 'test-text',
  createdAt: '2017-11-24T19:21:42.183Z',
  updatedAt: '2017-11-24T19:21:42.183Z',
};

let position = 'left';
let canDelete = false;
let isSameUser = false;

beforeEach(() => {
  jest.resetModules();
});

it('first TO to be called', () => {
  currentMessage.likes = 0;
  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
    />,
  );
  // console.log(customMessage.debug());
  const TO = customMessage.find('TouchableOpacity').first();
  TO.props().onPress();

  expect(customMessage.state().repliesCounter).toBe(7);
  expect(customMessage.state().bubblePress).toBe(true);
  expect(customMessage.state().showMessageActions).toBe(true);
  expect(customMessage.state().messageActionsFor).toBe('123987');
});

it('first TO to be called', () => {
  //
  currentMessage.likes = 45;
  //
  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
    />,
  );
  customMessage.setState({
    showMessageActions: true,
    bubblePress: false,
    messageActionsFor: '123456',
  });
  const instance = customMessage.instance();
  instance.getNumOfReplies = jest.fn(() => 14);
  const TO = customMessage.find('TouchableOpacity').first();
  TO.props().onPress();

  expect(customMessage.state().repliesCounter).toBe(14);
  expect(customMessage.state().bubblePress).toBe(true);
  expect(customMessage.state().showMessageActions).toBe(false);
  expect(customMessage.state().messageActionsFor).toBe('');
});

it('renderReply TO is called with else case', () => {
  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
    />,
  );
  const TO = customMessage
    .find('FastImage')
    .first()
    .parent();
  TO.props().onPress();

  expect(Actions.currentScene).toEqual('');
  expect(Actions.ViewImage).not.toBeCalled();
});

it('renderReply TO is called', () => {
  Actions.currentScene = 'ChatRoomScene';
  Actions.pop.mockClear();
  Actions.ViewImage = jest.fn((props) => {
    props.goBack();
  });
  position = 'right';
  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
    />,
  );
  const TO = customMessage
    .find('FastImage')
    .first()
    .parent();
  TO.props().onPress();

  expect(Actions.currentScene).toEqual('ChatRoomScene');
  expect(Actions.ViewImage).toBeCalled();
});

it('renderReply else case, renderMessageActions-msgHasReplies TO is called ', () => {
  currentMessage.replyMessageId = '';
  currentMessage.likes = 0;

  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
    />,
  );

  // console.log(customMessage.debug());
  expect(customMessage.state().messageActionsFor).toBe('');
  expect(customMessage.state().showMessageActions).toBe(false);

  const instance = customMessage.instance();
  instance.handleReply = jest.fn();
  const TO = customMessage.find({ name: 'corner-up-left' }).parent();
  TO.props().onPress();

  expect(instance.handleReply).toBeCalledWith(currentMessage);
});

it('renderMessageActions-msgHasLikes TO is called ', () => {
  currentMessage.replyMessageId = '11111';
  currentMessage.likes = 12;

  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
    />,
  );

  // console.log(customMessage.debug());
  expect(customMessage.state().messageActionsFor).toBe('');
  expect(customMessage.state().showMessageActions).toBe(false);

  const instance = customMessage.instance();
  instance.handleLike = jest.fn();
  const TO = customMessage.find({ name: 'thumbs-up' }).parent();
  TO.props().onPress();

  expect(instance.handleLike).toBeCalledWith(currentMessage._id);
});

it('renderMessageActions 2-if case, all TO is called', () => {
  DbManager.group.getNumOfMessageReplies = jest.fn(() => 0);
  canDelete = true;
  isSameUser = true;

  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
    />,
  );
  customMessage.setState({ messageActionsFor: '123987' });
  // console.log(customMessage.debug());
  const inst = customMessage.instance();
  inst.handleLike = jest.fn();
  inst.handleReply = jest.fn();
  inst.handleCopy = jest.fn();
  inst.handleMessageInfo = jest.fn();
  inst.handleDelete = jest.fn();

  const TO1 = customMessage.find({ name: 'thumbs-up' }).parent();
  TO1.props().onPress();
  expect(inst.handleLike).toBeCalledWith(currentMessage._id);

  const TO2 = customMessage.find({ name: 'corner-up-left' }).parent();
  TO2.props().onPress();
  expect(inst.handleReply).toBeCalledWith(currentMessage);

  const TO3 = customMessage.find({ name: 'copy' }).parent();
  TO3.props().onPress();
  expect(inst.handleCopy).toBeCalledWith(currentMessage.text);

  const TO4 = customMessage.find({ name: 'alert-circle' }).parent();
  TO4.props().onPress();
  expect(inst.handleMessageInfo).toBeCalledWith(currentMessage);

  const TO5 = customMessage.find({ name: 'trash-2' }).parent();
  TO5.props().onPress();
  expect(inst.handleDelete).toBeCalledWith(currentMessage);
});

it('handleLike', () => {
  const likeMessage = jest.fn();
  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
      likeMessage={likeMessage}
    />,
  );

  const inst = customMessage.instance();
  const messageId = '555';
  inst.handleLike(messageId);

  expect(likeMessage).toBeCalled();
  expect(customMessage.state().showMessageActions).toBe(false);
  expect(customMessage.state().messageActionsFor).toBe('');
});

it('handleReply', () => {
  const replyMessage = jest.fn();
  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
      replyMessage={replyMessage}
    />,
  );

  const message = currentMessage;
  const inst = customMessage.instance();
  inst.handleReply(message);

  expect(replyMessage).toBeCalled();
  expect(customMessage.state().showMessageActions).toBe(false);
  expect(customMessage.state().messageActionsFor).toBe('');
});

it('handleMessageInfo', () => {
  const messageInfo = jest.fn();
  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
      messageInfo={messageInfo}
    />,
  );
  const message = currentMessage;
  const inst = customMessage.instance();
  inst.handleMessageInfo(message);

  expect(messageInfo).toBeCalled();
  expect(customMessage.state().showMessageActions).toBe(false);
  expect(customMessage.state().messageActionsFor).toBe('');
});

it('handleCopy', () => {
  jest.mock('Clipboard', () => ({
    setString: jest.fn(),
  }));

  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
    />,
  );
  const text = 'clipBoard-test-text';
  const inst = customMessage.instance();
  inst.handleCopy(text);

  expect(Clipboard.setString).toBeCalled();
  expect(customMessage.state().showMessageActions).toBe(false);
  expect(customMessage.state().messageActionsFor).toBe('');
});

it('handleDelete, No button', () => {
  const deleteMessage = jest.fn();
  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
      deleteMessage={deleteMessage}
    />,
  );
  const message = currentMessage;
  const inst = customMessage.instance();
  inst.handleDelete(message);

  expect(Alert.alert).toBeCalled();
});

it('handleDelete, Yes button', () => {
  jest.mock('Alert', () => ({
    alert: jest.fn((str1, str2, arr) => {
      arr[1].onPress();
    }),
  }));

  const deleteMessage = jest.fn();
  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
      deleteMessage={deleteMessage}
    />,
  );
  const message = currentMessage;
  const inst = customMessage.instance();
  inst.handleDelete(message);

  expect(Alert.alert).toBeCalled();
  expect(deleteMessage).toBeCalled();
  expect(customMessage.state().showMessageActions).toBe(false);
  expect(customMessage.state().messageActionsFor).toBe('');
});

it('handleLike, likeMessage defaultProps', () => {
  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
    />,
  );

  const inst = customMessage.instance();
  const messageId = '555';
  inst.handleLike(messageId);

  expect(customMessage.state().showMessageActions).toBe(false);
  expect(customMessage.state().messageActionsFor).toBe('');
});

it('handleReply, replyMessage defaultProps', () => {
  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
    />,
  );

  const message = currentMessage;
  const inst = customMessage.instance();
  inst.handleReply(message);

  expect(customMessage.state().showMessageActions).toBe(false);
  expect(customMessage.state().messageActionsFor).toBe('');
});

it('handleMessageInfo, messageInfo defaultProps', () => {
  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
    />,
  );
  const message = currentMessage;
  const inst = customMessage.instance();
  inst.handleMessageInfo(message);

  expect(customMessage.state().showMessageActions).toBe(false);
  expect(customMessage.state().messageActionsFor).toBe('');
});

it('handleDelete, Yes button, deleteMessage defaultProps', () => {
  jest.mock('Alert', () => ({
    alert: jest.fn((str1, str2, arr) => {
      arr[1].onPress();
    }),
  }));

  const customMessage = shallow(
    <CustomMessage
      currentMessage={currentMessage}
      position={position}
      canDelete={canDelete}
      isSameUser={isSameUser}
    />,
  );
  const message = currentMessage;
  const inst = customMessage.instance();
  inst.handleDelete(message);

  expect(Alert.alert).toBeCalled();
  expect(customMessage.state().showMessageActions).toBe(false);
  expect(customMessage.state().messageActionsFor).toBe('');
});

it('componentDidUpdate', () => {
  const customMessage = shallow(<CustomMessage currentMessage={currentMessage} />);
  currentMessage.likes = 25;
  customMessage.setProps({ currentMessage });

  expect(customMessage.state().msgHasLikes).toBe(true);
});

it('if line 202 else value, and line 147 else value', () => {
  currentMessage.likes = 0;
  DbManager.group.getNumOfMessageReplies = jest.fn(() => 0);
  const tree = renderer
    .create(
      <CustomMessage
        currentMessage={currentMessage}
        position={position}
        canDelete={canDelete}
        isSameUser={isSameUser}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
