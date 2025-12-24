import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Keyboard,
  LayoutAnimation,
  BackHandler,
} from 'react-native';
import { INPUT_METHOD, DEFAULT_KEYBOARD_HEIGHT } from '../utils/constants';

export default class MessagingContainer extends React.Component {
  state = {
    inputMethod: INPUT_METHOD.NONE,
    keyboardHeight: DEFAULT_KEYBOARD_HEIGHT,
    keyboardWillShow: false,
    keyboardWillHide: false,
    contentHeight: 0,
  };

  subscription = [];

  componentDidMount() {
    // Klavye event listener'larını ekle
    this.subscription = [
      Keyboard.addListener('keyboardWillShow', this.handleKeyboardWillShow),
      Keyboard.addListener('keyboardWillHide', this.handleKeyboardWillHide),
      Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow),
      Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide),
    ];

    // Android geri tuşu listener'ı ekle
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }
  }

  componentWillUnmount() {
    // Tüm listener'ları temizle
    this.subscription.forEach(sub => {
      if (sub && sub.remove) {
        sub.remove();
      }
    });

    // Android geri tuşu listener'ını kaldır
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputMethod } = this.state;
    
    // InputMethod değiştiğinde layout animasyonu uygula
    if (prevState.inputMethod !== inputMethod) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }

  // Android geri tuşu yönetimi
  handleBackPress = () => {
    const { inputMethod } = this.state;
    
    // Eğer özel görsel seçici açıksa, kapat ve event'i tüket
    if (inputMethod === INPUT_METHOD.CUSTOM) {
      this.setInputMethod(INPUT_METHOD.NONE);
      return true; // Event tüketildi
    }
    
    // Diğer durumlarda normal geri tuşu davranışı
    return false;
  };

  handleKeyboardWillShow = (event) => {
    const { height } = event.endCoordinates;
    
    this.setState({
      keyboardWillShow: true,
      keyboardWillHide: false,
      keyboardHeight: height,
    });
  };

  handleKeyboardWillHide = () => {
    this.setState({
      keyboardWillShow: false,
      keyboardWillHide: true,
    });
  };

  handleKeyboardDidShow = (event) => {
    const { height } = event.endCoordinates;
    
    this.setState({
      keyboardWillShow: false,
      keyboardHeight: height,
      inputMethod: INPUT_METHOD.KEYBOARD,
    });
  };

  handleKeyboardDidHide = () => {
    this.setState({
      keyboardWillHide: false,
      inputMethod: INPUT_METHOD.NONE,
    });
  };

  setInputMethod = (inputMethod) => {
    // Özel görsel seçici açılırken klavyeyi kapat
    if (inputMethod === INPUT_METHOD.CUSTOM) {
      Keyboard.dismiss();
    }

    this.setState({ inputMethod });
  };

  handleChangeContentHeight = (contentHeight) => {
    this.setState({ contentHeight });
  };

  render() {
    const {
      inputMethod,
      keyboardHeight,
      keyboardWillShow,
      keyboardWillHide,
      contentHeight,
    } = this.state;

    const { children, renderInputMethodEditor } = this.props;

    // Klavye veya özel input metodu için yükseklik hesapla
    const useContentHeight = keyboardWillShow || inputMethod === INPUT_METHOD.KEYBOARD;
    const containerHeight = keyboardHeight;
    const inputMethodHeight = useContentHeight ? contentHeight : containerHeight;

    return (
      <View style={styles.container}>
        {/* Ana içerik (MessageList vb.) */}
        <View style={styles.content}>
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              onChangeInputMethod: this.setInputMethod,
              inputMethod,
            })
          )}
        </View>

        {/* Input Method Editor (Klavye veya Özel Görsel Seçici) */}
        <View style={[styles.inputMethodEditor, { height: inputMethodHeight }]}>
          {renderInputMethodEditor({
            inputMethod,
            onChangeInputMethod: this.setInputMethod,
            onChangeContentHeight: this.handleChangeContentHeight,
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  inputMethodEditor: {
    backgroundColor: '#fff',
  },
});
