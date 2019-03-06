import React, { Component } from 'react';
import { TextInput as RNTextInput } from 'react-native';

export default class TextInput extends Component {
  render() {
    return <RNTextInput {...this.props} />;
  }
}
