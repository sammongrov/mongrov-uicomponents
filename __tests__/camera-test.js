import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Camera from '../Camera';

configure({ adapter: new Adapter() });
const onCameraPress = jest.fn();
const refs = jest.fn();
const videoRecord = jest.fn();
const switchAction = jest.fn();
const changeFlashAction = jest.fn();
const goBack = jest.fn();

it('camera renders correctly without props', () => {
  const tree = renderer.create(<Camera />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('camera renders correctly with props', () => {
  const tree = renderer
    .create(
      <Camera
        cameraIconEnable={true}
        videoIconEnable={true}
        onCameraPress={onCameraPress}
        refs={refs}
        videoRecord={videoRecord}
        switchAction={switchAction}
        changeFlashAction={changeFlashAction}
        recordIndicator={true}
        cameraSwitch="front"
        flashType="on"
        groupId="LPW25O95XZ91"
        showCameraSwitchIcon={false}
        recordingTime="10:01"
        goBack={goBack}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('camera gets flash icons', () => {
  it('flash-auto', () => {
    const camera = shallow(
      <Camera cameraIconEnable={true} videoIconEnable={true} flashType="auto" />,
    );
    const flashIcon = camera.find({ name: 'flash-auto' });
    expect(flashIcon).toHaveLength(1);
  });

  it('lightbulb-on', () => {
    const camera = shallow(
      <Camera cameraIconEnable={true} videoIconEnable={true} flashType="torch" />,
    );
    const flashIcon = camera.find({ name: 'lightbulb-on' });
    expect(flashIcon).toHaveLength(1);
  });

  it('flash-off', () => {
    const camera = shallow(<Camera cameraIconEnable={true} videoIconEnable={false} />);
    const flashIcon = camera.find({ name: 'flash-off' });
    expect(flashIcon).toHaveLength(1);
  });
});

describe('press camera buttons', () => {
  it('press camera icon', () => {
    const camera = shallow(
      <Camera cameraIconEnable={true} recordIndicator={false} onCameraPress={onCameraPress} />,
    );
    const cameraIcon = camera.find({ name: 'camera-enhance' }).parent();
    cameraIcon.props().onPress();
    expect(cameraIcon.props().onPress).toEqual(onCameraPress);
    expect(onCameraPress.mock.calls.length).toBe(1);
  });

  it('press camera icon - default prop', () => {
    const camera = shallow(<Camera cameraIconEnable={true} recordIndicator={false} />);
    const cameraIcon = camera.find({ name: 'camera-enhance' }).parent();
    cameraIcon.props().onPress();
    expect(cameraIcon.props().onPress).toBeInstanceOf(Function);
  });

  it('press video icon', () => {
    const camera = shallow(
      <Camera videoIconEnable={true} recordIndicator={false} videoRecord={videoRecord} />,
    );
    const videoIcon = camera.find({ name: 'video' }).parent();
    videoIcon.props().onPress();
    expect(videoIcon.props().onPress).toEqual(videoRecord);
    expect(videoRecord.mock.calls.length).toBe(1);
  });

  it('press video icon - default prop', () => {
    const camera = shallow(<Camera videoIconEnable={true} recordIndicator={true} />);
    const videoIcon = camera.find({ name: 'stop' }).parent();
    videoIcon.props().onPress();
    expect(videoIcon.props().onPress).toBeInstanceOf(Function);
  });

  it('press cameraSwitch icon', () => {
    const camera = shallow(
      <Camera cameraIconEnable={true} switchAction={switchAction} showCameraSwitchIcon={true} />,
    );
    const switchIcon = camera.find({ name: 'camera-party-mode' }).parent();
    switchIcon.props().onPress();
    expect(switchIcon.props().onPress).toEqual(switchAction);
    expect(switchAction.mock.calls.length).toBe(1);
  });

  it('press cameraSwitch icon - default prop', () => {
    const camera = shallow(<Camera cameraIconEnable={true} showCameraSwitchIcon={true} />);
    const switchIcon = camera.find({ name: 'camera-party-mode' }).parent();
    switchIcon.props().onPress();
    expect(switchIcon.props().onPress).toBeInstanceOf(Function);
  });

  it('press flash icon', () => {
    const camera = shallow(
      <Camera cameraIconEnable={true} changeFlashAction={changeFlashAction} flashType="auto" />,
    );
    const flashIcon = camera.find({ name: 'flash-auto' }).parent();
    flashIcon.props().onPress();
    expect(flashIcon.props().onPress).toEqual(changeFlashAction);
    expect(changeFlashAction.mock.calls.length).toBe(1);
  });

  it('press flash icon - default props', () => {
    const camera = shallow(<Camera cameraIconEnable={true} flashType="auto" />);
    const flashIcon = camera.find({ name: 'flash-auto' }).parent();
    flashIcon.props().onPress();
    expect(flashIcon.props().onPress).toBeInstanceOf(Function);
  });

  it('press back button', () => {
    const camera = shallow(<Camera cameraIconEnable={true} goBack={goBack} />);
    const backButton = camera.find({ name: 'chevron-left' }).parent();
    backButton.props().onPress();
    expect(backButton.props().onPress).toEqual(goBack);
    expect(goBack.mock.calls.length).toBe(1);
  });
});

describe('renderCameraNavbar', () => {
  it('gets called with no title component', () => {
    const tree = renderer.create(
      <Camera
        goBack={goBack}
        recordingTime="00:05"
        recordIndicator={false}
        flashType="auto"
        cameraIconEnable={true}
      />,
    );
    const cameraInstance = tree.getInstance();
    const navBarTree = renderer.create(cameraInstance.renderCameraNavbar('auto'));
    const navBarInstance = navBarTree.getInstance();
    expect(navBarInstance.props.titleComponent).toBeFalsy();
    expect(navBarInstance.props.leftComponent).toBeTruthy();
    expect(navBarInstance.props.rightComponent).toBeTruthy();
  });

  it('gets called with no left component', () => {
    const tree = renderer.create(
      <Camera
        goBack={goBack}
        recordingTime="00:05"
        recordIndicator={true}
        flashType="auto"
        cameraIconEnable={true}
      />,
    );
    const cameraInstance = tree.getInstance();
    const navBarTree = renderer.create(cameraInstance.renderCameraNavbar('auto'));
    const navBarInstance = navBarTree.getInstance();
    expect(navBarInstance.props.titleComponent).toBeTruthy();
    expect(navBarInstance.props.leftComponent).toBeFalsy();
    expect(navBarInstance.props.rightComponent).toBeTruthy();
  });
});
