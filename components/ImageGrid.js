import React from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  TouchableOpacity, 
  FlatList,
  Dimensions,
  ActivityIndicator,
  Text,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const { width } = Dimensions.get('window');
const GRID_COLUMNS = 4;
const IMAGE_MARGIN = 2;
const IMAGE_SIZE = (width - (IMAGE_MARGIN * (GRID_COLUMNS + 1))) / GRID_COLUMNS;

export default class ImageGrid extends React.Component {
  state = {
    images: [],
    loading: true,
    hasPermission: false,
  };

  async componentDidMount() {
    await this.getPhotos();
  }

  getPhotos = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== 'granted') {
        this.setState({ loading: false, hasPermission: false });
        return;
      }

      this.setState({ hasPermission: true });

      // Son 20 fotoğrafı al
      const result = await MediaLibrary.getAssetsAsync({
        first: 20,
        mediaType: 'photo',
        sortBy: [[MediaLibrary.SortBy.creationTime, false]],
      });

      this.setState({
        images: result.assets,
        loading: false,
      });
    } catch (error) {
      console.error('Fotoğraflar alınırken hata:', error);
      this.setState({ loading: false });
    }
  };

  handlePressImage = (image) => {
    const { onPressImage } = this.props;
    if (onPressImage) {
      onPressImage(image.uri);
    }
  };

  renderImageItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => this.handlePressImage(item)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: item.uri }}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { images, loading, hasPermission } = this.state;

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }

    if (!hasPermission) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.permissionText}>
            Galeriye erişim izni gerekiyor
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={images}
          renderItem={this.renderImageItem}
          keyExtractor={(item) => item.id}
          numColumns={GRID_COLUMNS}
          contentContainerStyle={styles.gridContainer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gridContainer: {
    padding: IMAGE_MARGIN,
  },
  imageContainer: {
    margin: IMAGE_MARGIN,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  permissionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
