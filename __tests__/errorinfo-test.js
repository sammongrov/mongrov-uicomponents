import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Alert } from 'react-native';
import Errorinfo from '../ErrorInfo';

configure({ adapter: new Adapter() });
const error = () => Alert.alert('message');

it('Text renders correctly', () => {
  const tree = renderer.create(<Errorinfo />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Errorinfo Component using shallow renders correctly', () => {
  const errorType = 'error';
  const title = 'message';
  const wrapper = shallow(<Errorinfo title={title} errorType={errorType} error={error} />);
  expect(wrapper.instance().props.error).toMatchSnapshot();
});

test('Errorinfo Component using shallow renders correctly', () => {
  const errorType = 'warning';
  const title = 'message';
  const wrapper = shallow(<Errorinfo title={title} errorType={errorType} error={error} />);
  expect(wrapper.instance().props.error).toMatchSnapshot();
});
