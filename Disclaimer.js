import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import theme, { styles } from 'react-native-theme';
import Button from './Button';
import Text from './Text';
import { translate } from '../i18n';

export default class Disclaimer extends Component {
  constructor(props) {
    super(props);
    const { locale } = this.props;
    this.locale = locale;
  }

  componentWillMount() {
    theme.setRoot(this);
  }

  render() {
    const { content, accept, onAccept } = this.props;
    return (
      <View style={[styles.fl_1, styles.p_20]}>
        <ScrollView style={[styles.primaryContent]} showsVerticalScrollIndicator={false}>
          <Text style={styles.paraText}>{content}</Text>
        </ScrollView>
        <View style={styles.paddingHorizontal80}>
          <Button
            testID="accept-button"
            onPress={onAccept}
            title={accept}
            buttonStyle={[styles.disclaimerButtonStyle]}
            containerStyle={[styles.marginTop8, styles.paddingHorizontal80]}
          />
        </View>
      </View>
    );
  }
}

Disclaimer.propTypes = {
  onAccept: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  accept: PropTypes.string,
  locale: PropTypes.string,
};

Disclaimer.defaultProps = {
  accept: translate('IAccept', this.locale),
  locale: null,
};
