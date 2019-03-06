import { Alert } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Intro from '../Intro';

const onDone = () => Alert.alert('Done');
const onSkip = () => Alert.alert('Skip');

it('appguide renders correctly', () => {
  const intro = [
    {
      key: 'slide1',
      title: 'Cost = Asset',
      text: 'Like banking, dApps hold some tokens for a free scalable cloud',
      image: {
        uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1266818-200.png',
      },
      backgroundColor: '#59b2ab',
    },
    {
      key: 'slide2',
      title: 'Fair price mining',
      text: 'Fair market price for Miners, Sharders, Blobbers',
      image: {
        uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/215031-200.png',
      },
      backgroundColor: '#febe29',
    },
    {
      key: 'slide3',
      title: 'Efficient infrastructure',
      text: 'Decoupled CPU, RAM, and SSD needs for cost-efficient mining, sharding and blobbing',
      image: {
        uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1484653-200.png',
      },
      backgroundColor: '#4F00BC',
    },
  ];
  const tree = renderer.create(<Intro slides={intro} onDone={onDone} onSkip={onSkip} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('icon button renders correctly', () => {
  const intro = [
    {
      key: 'slide1',
      title: 'Cost = Asset',
      text: 'Like banking, dApps hold some tokens for a free scalable cloud',
      image: {
        uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1266818-200.png',
      },
      backgroundColor: '#59b2ab',
    },
    {
      key: 'slide2',
      title: 'Fair price mining',
      text: 'Fair market price for Miners, Sharders, Blobbers',
      image: {
        uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/215031-200.png',
      },
      backgroundColor: '#febe29',
    },
    {
      key: 'slide3',
      title: 'Efficient infrastructure',
      text: 'Decoupled CPU, RAM, and SSD needs for cost-efficient mining, sharding and blobbing',
      image: {
        uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1484653-200.png',
      },
      backgroundColor: '#4F00BC',
    },
  ];
  const tree = renderer.create(<Intro slides={intro} onDone={onDone} onSkip={onSkip} />);
  const inst = tree.getInstance();
  expect(inst._renderDoneButton()).toMatchSnapshot();
});
