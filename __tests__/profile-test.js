import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Alert } from 'react-native';
import Profile from '../Profile';

configure({ adapter: new Adapter() });

const onPress = () => Alert.alert('message');
const title = { showIcon: true };

const mockMath = global.Math;
mockMath.random = () => 0.5;
global.Math = mockMath;

it('Profile renders correctly', () => {
  const tree = renderer
    .create(
      <Profile
        title={title}
        avatarName="Avatar"
        iconName="camera-iris"
        avatarSize={60}
        iconSize={30}
        onPress={onPress}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('show props test', () => {
  const wrapper = shallow(<Profile showIcon={true} />);
  expect(wrapper.instance().props.showIcon).not.toBeNull();
});

it('member data renders correctly', () => {
  const tree = renderer
    .create(<Profile totalMembers="7" onlineMembers="5" profileUname="john" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('username renders correctly', () => {
  const tree = renderer.create(<Profile profileUname="john" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('announcement renders correctly', () => {
  const tree = renderer.create(<Profile profileAnnouncement="hello" />).toJSON();
  expect(tree).toMatchSnapshot();
});
it('status text renders correctly', () => {
  const tree = renderer.create(<Profile showStatusText="online" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('email information renders correctly', () => {
  const tree = renderer.create(<Profile profileMailId="john@gmail.com" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('login time renders correctly', () => {
  const tree = renderer.create(<Profile lastLoginTime="5.30" />).toJSON();
  expect(tree).toMatchSnapshot();
});
