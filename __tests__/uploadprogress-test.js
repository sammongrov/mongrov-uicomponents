import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UploadProgress from '../UploadProgress';

configure({ adapter: new Adapter() });
jest.mock('react-native-router-flux', () => ({
  Actions: { pop: jest.fn() },
}));

beforeEach(() => {
  jest.resetModules();
});

it('render correctly without props', () => {
  jest.doMock('Platform', () => {
    const Platform = require.requireActual('Platform');
    Platform.OS = 'android';
    return Platform;
  });
  const rootComponent = renderer.create(<UploadProgress />).toJSON();
  expect(rootComponent).toMatchSnapshot();
});

it('android', () => {
  jest.doMock('Platform', () => {
    const Platform = require.requireActual('Platform');
    Platform.OS = 'android';
    return Platform;
  });
  const tree = renderer.create(<UploadProgress uploadFilePercent={0.3281} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('ios', () => {
  jest.doMock('Platform', () => {
    const Platform = require.requireActual('Platform');
    Platform.OS = 'ios';
    return Platform;
  });
  const tree = renderer.create(<UploadProgress uploadFilePercent={0.98756} />).toJSON();
  expect(tree).toMatchSnapshot();
});
