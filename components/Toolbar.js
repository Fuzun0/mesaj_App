import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { INPUT_METHOD } from '../utils/constants';

export default class Toolbar extends React.Component {
  handlePressCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('İzin Gerekli', 'Kamera kullanımı için izin vermeniz gerekiyor.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { onSendImage } = this.props;
      if (onSendImage) {
        onSendImage(result.assets[0].uri);
      }
    }
  };

  handlePressImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('İzin Gerekli', 'Galeri erişimi için izin vermeniz gerekiyor.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const { onSendImage } = this.props;
      if (onSendImage) {
        onSendImage(result.assets[0].uri);
      }
    }
  };

  handlePressLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('İzin Gerekli', 'Konum bilgisine erişim için izin vermeniz gerekiyor.');
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { coords: { latitude, longitude } } = location;
      const { onSendLocation } = this.props;
      
      if (onSendLocation) {
        onSendLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      Alert.alert('Hata', 'Konum bilgisi alınamadı. Lütfen tekrar deneyin.');
      console.error('Konum alma hatası:', error);
    }
  };

  handlePressImageGrid = () => {
    const { onChangeInputMethod, inputMethod } = this.props;
    
    if (onChangeInputMethod) {
      // Görsel grid açık/kapalı toggle yap
      const newInputMethod = inputMethod === INPUT_METHOD.CUSTOM 
        ? INPUT_METHOD.NONE 
        : INPUT_METHOD.CUSTOM;
      onChangeInputMethod(newInputMethod);
    }
  };

  render() {
    const { inputMethod } = this.props;
    const isCustomInputActive = inputMethod === INPUT_METHOD.CUSTOM;

    return (
      <View style={styles.toolbar}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={this.handlePressCamera}
        >
          <MaterialIcons name="camera-alt" size={28} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={this.handlePressImageLibrary}
        >
          <MaterialIcons name="photo-library" size={28} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={this.handlePressImageGrid}
        >
          <MaterialIcons 
            name="photo" 
            size={28} 
            color={isCustomInputActive ? "#FF3B30" : "#007AFF"} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={this.handlePressLocation}
        >
          <MaterialIcons name="location-on" size={28} color="#007AFF" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
});
