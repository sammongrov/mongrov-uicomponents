import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Alert } from 'react-native';
import Badge from '../Badge';

configure({ adapter: new Adapter() });
const messageCount = () => Alert.alert('message');

it('Badge renders correctly', () => {
  const tree = renderer.create(<Badge messageCount={12} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('messageCount Component using shallow renders correctly', () => {
  const title = 'message';
  const wrapper = shallow(<Badge title={title} messageCount={messageCount} />);
  expect(wrapper.instance().props.messageCount).toBeTruthy();
});
