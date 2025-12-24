import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { createTextMessage, createImageMessage, createLocationMessage } from '../utils/MessageUtils';

export default class MessageList extends React.Component {
  renderMessageBody = ({ type, text, uri, coordinate }) => {
    switch (type) {
      case 'text':
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>{text}</Text>
          </View>
        );

      case 'image':
        return (
          <Image
            style={styles.image}
            source={{ uri }}
            resizeMode="cover"
          />
        );

      case 'location':
        return (
          <MapView
            style={styles.map}
            initialRegion={{
              ...coordinate,
              latitudeDelta: coordinate.latitudeDelta || 0.0922,
              longitudeDelta: coordinate.longitudeDelta || 0.0421,
            }}
          >
            <MapView.Marker coordinate={coordinate} />
          </MapView>
        );

      default:
        return null;
    }
  };

  renderMessageItem = ({ item }) => {
    return (
      <View style={styles.messageRow}>
        <TouchableOpacity
          style={styles.messageContainer}
          onPress={() => this.handlePressMessage(item)}
          activeOpacity={0.7}
        >
          {this.renderMessageBody(item)}
        </TouchableOpacity>
      </View>
    );
  };

  handlePressMessage = (message) => {
    const { onPressMessage } = this.props;
    if (onPressMessage) {
      onPressMessage(message);
    }
  };

  render() {
    const { messages = [] } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          inverted
          data={messages}
          renderItem={this.renderMessageItem}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flatList: {
    flex: 1,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  messageContainer: {
    maxWidth: '75%',
  },
  messageBubble: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  map: {
    width: 250,
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
