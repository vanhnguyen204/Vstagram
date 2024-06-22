import React, {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import ImagePicker, {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import Container from '../../components/Container';
import TextComponent from '../../components/TextComponent';

const CreatePostScreen = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const selectImagesFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        videoQuality: 'high',
        quality: 1,
        selectionLimit: 10,
      },

      response => {
        if (!response.didCancel) {
          const selectedUris = response.assets.map(asset => asset.uri);
          setSelectedImages(selectedUris);
        }
      },
    );
  };

  useEffect(() => {
    // Code to run when screen is focused
  }, []);

  return (
    <Container>
      <TextComponent value="Create Post" />
      <Button title="Select Images" onPress={selectImagesFromGallery} />
      <View style={styles.imageContainer}>
        {selectedImages.map((uri, index) => (
          <Image key={index} source={{uri}} style={styles.image} />
        ))}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
  },
});

export default CreatePostScreen;
