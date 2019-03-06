import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from 'react-native-theme';
import { Colors } from '@ui/theme_default';
import LinearGradient from 'react-native-linear-gradient';

export default class Screen extends Component {
  render() {
    const { children, safeBgColors, safeGradLocations, onLayout } = this.props;
    return (
      <LinearGradient colors={safeBgColors} style={{ flex: 1 }} locations={safeGradLocations}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.authScreenContainer} onLayout={onLayout}>
            {children}
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

Screen.propTypes = {
  children: PropTypes.node.isRequired,
  safeBgColors: PropTypes.array,
  safeGradLocations: PropTypes.array,
  onLayout: PropTypes.func,
};

Screen.defaultProps = {
  safeBgColors: [Colors.BG_DEFAULT_SAFECOLOR_TOP, Colors.BG_DEFAULT_SAFECOLOR_BOTTOM],
  safeGradLocations: [0, 1],
  onLayout: () => {},
};
