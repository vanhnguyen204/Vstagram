import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../components/Container.tsx';
import {ImageType, usePhotos} from '../../hooks/Media/usePhotos.ts';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {RootStackParams, ROUTES} from '../../navigators';
import Header from '../../components/Header.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {
  goBackNavigation,
  navigateAndReset,
  navigatePush,
} from '../../utils/NavigationUtils.ts';
import CloseSvg from '../../assets/svg/public/CloseSvg.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {globalStyle} from '../../styles/globalStyle.ts';
import ImageComponent from '../../components/ImageComponent.tsx';
import Box from '../../components/Box.tsx';
import ModalMusic from '../ImageEditorScreen/components/ModalMusic.tsx';
import {Music} from '../../models';
import LinearGradient from 'react-native-linear-gradient';
import ImageCard from './components/ImageCard.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import {createPost} from '../../services/apis/postServices.ts';
import {useMediaEditor} from '../../hooks/Media/useMediaEditor.ts';
import {usePostStore} from '../../hooks/usePostStore.ts';

type NewPostRouteProp = RouteProp<RootStackParams, 'NewPost'>;
type NewPostNavigationProp = NavigationProp<RootStackParams, 'NewPost'>;
type Props = {
  route: NewPostRouteProp;
  navigation: NewPostNavigationProp;
};

interface MusicSelect {
  visible: boolean;
  music: Music;
}
const PostEditorScreen = (props: Props) => {
  const {mediaType} = props.route.params;
  const {images} = usePhotos();
  const {imageSelected, onImageUnSelected} = useMediaEditor();
  const {addNewPost} = usePostStore();
  const [musicSelected, setMusicSelected] = useState<MusicSelect>({
    visible: false,
    music: {
      _id: '',
      image: '',
      artist: '',
      title: '',
      urlMedia: '',
    },
  });
  const handleMusicSelected = useCallback(
    (music: Music) => {
      setMusicSelected({
        visible: !musicSelected.visible,
        music,
      });
    },
    [musicSelected.visible],
  );
  const toggleModalMusic = useCallback(() => {
    setMusicSelected(prevState => ({
      ...prevState,
      visible: !prevState.visible,
    }));
  }, []);
  const onRemoveImage = useCallback(
    (id: string) => {
      Alert.alert('Gỡ ảnh ?', '', [
        {
          text: 'Huỷ',
        },
        {
          text: 'Gỡ',
          onPress: () => {
            onImageUnSelected(id);
          },
          style: 'destructive',
        },
      ]);
    },
    [onImageUnSelected],
  );
  const handleCreatePost = useCallback(() => {
    const formData = new FormData();
    musicSelected && formData.append('music', musicSelected.music.urlMedia);
    formData.append('description', 'description');
    formData.append('type', 'PHOTO');
    for (const value of imageSelected) {
      formData.append('file', {
        uri: value.uri,
        type: value.type,
        name: value.name,
      });
    }
    createPost(formData)
      .then(res => {
        console.log(res);
        if (res?.code === 201) {
          addNewPost(res.data);
          navigateAndReset([{name: ROUTES.BottomTab}]);
        }
      })
      .catch(e => {
        console.log(e);
        Alert.alert(
          'Thông báo',
          'Tạo bài viết thất bại, vui lòng thử lại sau.',
        );
      });
  }, [addNewPost, imageSelected, musicSelected]);
  const handleImagePress = useCallback((it: ImageType) => {
    navigatePush(ROUTES.ImageEditorScreen, {image: it, type: 'EDIT_IMAGE'});
  }, []);
  useEffect(() => {
    if (imageSelected.length === 0) {
      goBackNavigation();
    }
  }, [imageSelected.length]);
  return (
    <Container justifyContent={'space-between'}>
      <ModalMusic
        onMusicSelected={handleMusicSelected}
        visible={musicSelected.visible}
        onClose={toggleModalMusic}
      />
      <Box>
        <Header
          style={globalStyle.headerStyle}
          componentLeft={
            <ButtonComponent
              onPress={() => {
                goBackNavigation();
              }}>
              <CloseSvg size={32} />
            </ButtonComponent>
          }
          componentRight={
            <ButtonComponent onPress={toggleModalMusic}>
              {musicSelected.music.image ? (
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    borderWidth: 2,
                    padding: 2,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                  colors={['#FD1D1D', '#E1306C', '#F77737', '#FCAF45']}>
                  <ImageComponent
                    src={{uri: musicSelected.music.image}}
                    height={25}
                    width={25}
                    borderRadius={5}
                    resizeMode={'cover'}
                  />
                </LinearGradient>
              ) : (
                <ImageComponent
                  src={require('../../assets/icons/musical-note.png')}
                  height={25}
                  width={25}
                  tintColor={appColors.white}
                />
              )}
            </ButtonComponent>
          }
        />
        <Box>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={imageSelected}
            keyExtractor={item => item.id}
            horizontal
            renderItem={({item}) => {
              return (
                <ImageCard
                  item={item}
                  onPress={handleImagePress}
                  onRemove={onRemoveImage}
                />
              );
            }}
          />
        </Box>
      </Box>
      <Box
        flexDirection={'row'}
        paddingHorizontal={10}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <ButtonComponent
          scaleInValue={0.8}
          activeOpacity={1}
          scaleAnimated={true}
          onPress={goBackNavigation}>
          <View style={styles.buttonSelectImage}>
            <ImageComponent
              resizeMode={'cover'}
              src={{uri: images[0].node.image.uri}}
              style={styles.imageButtonFooter}
            />
            <View style={styles.containerButtonSelectImage}>
              <ImageComponent
                alignSelf={'center'}
                src={require('../../assets/icons/plus.png')}
                height={15}
                width={15}
                tintColor={appColors.white}
              />
            </View>
          </View>
        </ButtonComponent>
        <ButtonComponent
          scaleInValue={0.8}
          activeOpacity={1}
          scaleAnimated={true}
          onPress={handleCreatePost}>
          <TextComponent
            value={'Chia sẻ'}
            color={appColors.blue500}
            fontSize={16}
          />
        </ButtonComponent>
      </Box>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonSelectImage: {
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: appColors.white,
  },
  containerButtonSelectImage: {
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  imageButtonFooter: {
    opacity: 0.7,
    height: 30,
    width: 30,
  },
});
export default PostEditorScreen;
