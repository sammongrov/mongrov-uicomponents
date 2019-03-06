// import { Platform } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, NavBar } from '@ui/components';
import renderer from 'react-test-renderer';

const mockMath = global.Math;
mockMath.random = () => 0.5;
global.Math = mockMath;

jest.mock('Platform', () => {
  const Platform = require.requireActual('Platform');
  Platform.OS = 'android';
  return Platform;
});

it('navbar title renders correctly', () => {
  const tree = renderer
    .create(
      <NavBar
        titleComponent={
          <TouchableOpacity>
            <Icon name="chevron-left" color="red" size={24} />
          </TouchableOpacity>
        }
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('chat navbar renders correctly', () => {
  const tree = renderer.create(<NavBar chatTitle="John" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('navbar title renders correctly', () => {
  const tree = renderer.create(<NavBar titleText="John" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('type props returns null correctly', () => {
  const inst = renderer.create(<NavBar chatInfo="online" type="d" />);
  expect(inst.getInstance()._renderChatInfo('d')).toBeTruthy();
  expect(inst.getInstance()._renderChatInfo()).toBeNull();
});

it('type props returns null correctly', () => {
  const inst = renderer.create(<NavBar chatSubTitle="group" type="d" />);
  expect(inst.getInstance()._renderChatInfo('d')).toBeFalsy();
  expect(inst.getInstance()._renderChatInfo()).toBeNull();
});
