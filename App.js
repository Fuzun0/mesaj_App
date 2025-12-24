import 'react-native-get-random-values';
import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import Status from './components/Status';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import InputMethodEditor from './components/InputMethodEditor';
import MessagingContainer from './components/MessagingContainer';
import ImageGrid from './components/ImageGrid';
import { createTextMessage, createImageMessage, createLocationMessage } from './utils/MessageUtils';
import { INPUT_METHOD } from './utils/constants';

export default class App extends React.Component {
  state = {
    messages: [
      createTextMessage('Merhaba! Nasılsın?'),
      createTextMessage('İyi, sen nasılsın?'),
      createTextMessage('Bu harika bir yer!'),
    ],
  };

  // Mesaj silme fonksiyonu
  handleDeleteMessage = (messageId) => {
    this.setState(prevState => ({
      messages: prevState.messages.filter(msg => msg.id !== messageId),
    }));
  };
  handlePressMessage = (message) => {
    const options = ['Sil', 'İptal'];
    
    // Görsel mesajlar için tam ekran seçeneği ekle
    if (message.type === 'image') {
      options.unshift('Tam Ekran');
    }

    Alert.alert(
      'Mesaj İşlemleri',
      'Ne yapmak istersiniz?',
      options.map(option => ({
        text: option,
        onPress: () => {
          if (option === 'Sil') {
            this.confirmDeleteMessage(message);
          } else if (option === 'Tam Ekran') {
            this.handleFullScreenImage(message);
          }
        },
        style: option === 'Sil' ? 'destructive' : option === 'İptal' ? 'cancel' : 'default',
      })),
    );
  };

  confirmDeleteMessage = (message) => {
    Alert.alert(
      'Mesajı Sil',
      'Bu mesajı silmek istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            this.handleDeleteMessage(message.id);
          },
        },
      ],
    );
  };

  handleFullScreenImage = (message) => {
    // Tam ekran görsel gösterimi için modal veya navigation kullanılabilir
    console.log('Tam ekran göster:', message.uri);
    Alert.alert('Tam Ekran', 'Görsel tam ekranda açılacak...');
  };

  handleSendText = (text) => {
    const message = createTextMessage(text);
    this.setState(prevState => ({
      messages: [message, ...prevState.messages],
    }));
  };

  handleSendImage = (uri) => {
    const message = createImageMessage(uri);
    this.setState(prevState => ({
      messages: [message, ...prevState.messages],
    }));
  };

  handleSendLocation = (coordinate) => {
    const message = createLocationMessage(coordinate);
    this.setState(prevState => ({
      messages: [message, ...prevState.messages],
    }));
  };

  render() {
    const { messages } = this.state;

    return (
      <View style={styles.container}>
        <Status />
        <MessagingContainer
          renderInputMethodEditor={({ inputMethod, onChangeInputMethod, onChangeContentHeight }) => (
            <View style={styles.inputContainer} onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              onChangeContentHeight(height);
            }}>
              {inputMethod === INPUT_METHOD.CUSTOM ? (
                <ImageGrid onPressImage={this.handleSendImage} />
              ) : null}
              <Toolbar 
                inputMethod={inputMethod}
                onChangeInputMethod={onChangeInputMethod}
                onSendImage={this.handleSendImage}
                onSendLocation={this.handleSendLocation}
              />
              <InputMethodEditor 
                onSubmit={this.handleSendText}
              />
            </View>
          )}
        >
          <MessageList 
            messages={messages}
            onPressMessage={this.handlePressMessage} 
          />
        </MessagingContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    backgroundColor: '#fff',
  },
});
