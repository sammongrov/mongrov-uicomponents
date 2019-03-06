import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from '@ui/components';
import AppIntroSlider from 'react-native-app-intro-slider';
import PropTypes from 'prop-types';
import { styles } from 'react-native-theme';

export default class Intro extends Component {
  _renderNextButton = () => (
    <View style={styles.btnIconRounded}>
      <Icon
        testID="next-button"
        name="arrow-right"
        type="material-community"
        color="rgba(255, 255, 255, .9)"
        size={24}
      />
    </View>
  );

  _renderDoneButton = () => (
    <View style={styles.btnIconRounded}>
      <Icon
        testID="done-button"
        name="check"
        type="material-community"
        color="rgba(255, 255, 255, .9)"
        size={24}
      />
    </View>
  );

  render() {
    const { slides, onDone, onSkip } = this.props;
    return (
      <AppIntroSlider
        testID="guides"
        slides={slides}
        onDone={onDone}
        onSkip={onSkip}
        renderNextButton={this._renderNextButton}
        renderDoneButton={this._renderDoneButton}
        showSkipButton
      />
    );
  }
}
Intro.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDone: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
};
