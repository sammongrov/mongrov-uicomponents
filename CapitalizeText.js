import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const CapitalizeText = (props) => {
  const { children } = props;
  const text = children
    ? children.slice(0, 1).toUpperCase() + children.slice(1, children.length)
    : '';
  return <Text {...props}>{text}</Text>;
};

CapitalizeText.propTypes = {
  children: PropTypes.string,
};

CapitalizeText.defaultProps = {
  children: '',
};

export default CapitalizeText;
