import React from 'react';
import { StyleSheet, View, Text, Platform, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';

export default class Status extends React.Component {
  state = {
    info: null,
  };

  async componentDidMount() {
    // İlk durumu al
    const info = await NetInfo.fetch();
    this.setState({ info });

    // Bağlantı değişikliklerini dinle
    this.subscription = NetInfo.addEventListener((info) => {
      this.setState({ info });
    });
  }

  componentWillUnmount() {
    // Aboneliği kaldır
    if (this.subscription) {
      this.subscription();
    }
  }

  render() {
    const { info } = this.state;
    
    // Bağlantı bilgisi henüz yüklenmediyse hiçbir şey gösterme
    if (!info) {
      return null;
    }

    // Bağlantı varsa hiçbir şey gösterme
    const isConnected = info.isConnected;
    if (isConnected) {
      return <View style={styles.status} />;
    }

    // Bağlantı yoksa kırmızı bar göster
    const backgroundColor = 'red';

    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle="light-content"
        animated={false}
      />
    );

    const messageContainer = (
      <View style={styles.messageContainer} pointerEvents="none">
        <View style={[styles.bubble, { backgroundColor }]}>
          <Text style={styles.text}>No network connection</Text>
        </View>
      </View>
    );

    if (Platform.OS === 'ios') {
      return (
        <View style={[styles.status, { backgroundColor }]}>
          {statusBar}
          {messageContainer}
        </View>
      );
    }

    return (
      <View style={styles.status}>
        {statusBar}
        {messageContainer}
      </View>
    );
  }
}

const statusHeight = Constants.statusBarHeight;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    maxWidth: 400,
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
