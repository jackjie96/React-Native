import React from 'react';
import {
  SafeAreaView, ViewPropTypes, View, Dimensions, StyleSheet, Text,
} from 'react-native';

//* components
import MyText from './Text';

import AwesomeAlert from 'react-native-awesome-alert';
import PropTypes from 'prop-types';

/*
referrerLink : https://www.npmjs.com/package/react-native-awesome-alert/v/0.4.2
modalProps check : https://facebook.github.io/react-native/docs/modal.html
*/

export default class CustomAlert extends React.Component {
  static propTypes =
  {
    message: PropTypes.string.isRequired,
    buttons: PropTypes.array.isRequired,
    modalProps: PropTypes.object,
    modalContainerStyle: ViewPropTypes.style,
    modalViewStyle: ViewPropTypes.style,
    messageViewStyle: ViewPropTypes.style,
    messageTextStyle: Text.propTypes.style,
    buttonContainerStyle: ViewPropTypes.style,
    buttonTextStyle: Text.propTypes.style,
    buttonStyle: ViewPropTypes.style,
  };

  static defaultProps =
  {
    modalProps: {
      transparent: true,
      animationType: 'fade',
    },
    modalContainerStyle: {},
    modalViewStyle: {},
    messageViewStyle: {},
    messageTextStyle: {},
    buttonContainerStyle: {},
    buttonTextStyle: {},
    buttonStyle: {},
  };

  alert = () =>
  {
    this.awesomeAlert.alert('', this.renderMessage(), this.props.buttons);
  }

  renderMessage = () => 
  (
    <View style={[styles.messageView, this.props.messageViewStyle]}>
      <MyText style={[styles.messageText, this.props.messageTextStyle]}>
      {
        this.props.message
      }
      </MyText>
    </View>
  )

  render() {
    return (
      <SafeAreaView>
        <AwesomeAlert
          styles={{
            modalContainer: [styles.modalContainerStyle, this.props.modalContainerStyle],
            modalView: [styles.modalViewStyle, this.props.modalViewStyle],
            titleText: styles.titleTextStyle,
            buttonContainer: [styles.buttonContainerStyle, this.props.buttonContainerStyle],
            buttonText: [styles.buttonTextStyle, this.props.buttonTextStyle],
            button: [{ width: `${100 / this.props.buttons.length}%` }, styles.buttonStyle, this.props.buttonStyle],
          }}
          ref={(ref) => { this.awesomeAlert = ref; }}
          modalProps={this.props.modalProps}
        />
      </SafeAreaView>
    );
  }
}

const { height, width } = Dimensions.get('window');
const modalHeight = height / 5;

const styles = StyleSheet.create({
  modalContainerStyle: {
    backgroundColor: 'rgba(49,49,49,0.5)',
  },
  modalViewStyle: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 0,
    width: width * 0.85,
    minHeight: modalHeight,
  },
  titleTextStyle: {
    position: 'absolute',
    padding: 0,
  },
  messageView: {
    minHeight: modalHeight / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    textAlign: 'center',
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    borderColor: '#dfdfdf',
    borderTopWidth: 0.5,
    minHeight: modalHeight / 2,
  },
  buttonTextStyle: {
    fontSize: 14,
    color: '#929292',
  },
  buttonStyle: {
    borderColor: '#dfdfdf',
    // borderWidth: 0.5,
    padding: 10,
  },
});

