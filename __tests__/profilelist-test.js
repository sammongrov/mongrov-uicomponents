import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Alert } from 'react-native';

import ProfileList from '../ProfileList';

configure({ adapter: new Adapter() });
const onPress = () => Alert.alert('onPress');

it('ProfileList renders correctly', () => {
  const list = [
    {
      id: '0',
      title: 'smith@gmail.com',
      icon: 'email-outline',
      status: 'online',
      onPress: jest.fn(),
    },
    {
      id: '1',
      title: 'Link Facebook account',
      icon: 'facebook-box',
      status: 'online',
      onPress: jest.fn(),
    },
    {
      id: '2',
      title: 'Link Google account',
      icon: 'google',
      avatar_url: 'https://my-avatar.com/avatar-215.png',
      status: 'busy',
      onPress: jest.fn(),
      onAvatarPress: jest.fn(),
    },
    {
      id: '3',
      title: 'Link phone number',
      icon: 'phone',
      onPress: jest.fn(),
    },
    {
      id: '4',
      title: 'Logout',
      icon: 'logout',
      onPress: jest.fn(),
      style: 'color:2E88FF',
      date: '05.02.19',
      time: '12:16PM',
    },
  ];
  const tree = renderer.create(<ProfileList onPress={onPress} list={list} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('onAvatarPress is called', () => {
  const item = {
    id: '2',
    title: 'Link Google account',
    icon: 'google',
    avatar_url: 'https://my-avatar.com/avatar-215.png',
    status: 'busy',
    onAvatarPress: jest.fn(),
  };
  const root = shallow(<ProfileList list={[item]} />);
  const rootInstance = root.instance();
  const avatar = shallow(rootInstance.renderItem({ item })).find('Avatar');
  avatar.props().onAvatarPress();
  expect(item.onAvatarPress.mock.calls.length).toBe(1);
});
