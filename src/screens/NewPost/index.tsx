import React, {useCallback, useState} from 'react';
import Container from '../../components/Container.tsx';
import {ImageType, usePhotos} from '../../hooks/Media/usePhotos.ts';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {RootStackParams, ROUTES} from '../../navigators';
import Header from '../../components/Header.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {
  goBackNavigation,
  navigateAndReset,
} from '../../utils/NavigationUtils.ts';
import CloseSvg from '../../assets/svg/public/CloseSvg.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {globalStyle} from '../../styles/globalStyle.ts';
import ImageComponent from '../../components/ImageComponent.tsx';
import {AppInfor} from '../../constants/AppInfor.ts';
import Box from '../../components/Box.tsx';
import FastImage from 'react-native-fast-image';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ModalMusic from '../PostEditorScreen/components/ModalMusic.tsx';
import {Music} from '../../models';
import LinearGradient from 'react-native-linear-gradient';
import ImageCard from './components/ImageCard.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import {Post} from '../../models/Post.ts';
import {createPost} from '../../services/apis/postServices.ts';

type NewPostRouteProp = RouteProp<RootStackParams, 'NewPost'>;
type NewPostNavigationProp = NavigationProp<RootStackParams, 'NewPost'>;
type Props = {
  route: NewPostRouteProp;
  navigation: NewPostNavigationProp;
};

const NewPost = (props: Props) => {
  const {} = props;
  const {imageSelected, images, onImageUnSelected} = usePhotos();
  const [visibleModalMusic, setVisibleModalMusic] = useState<boolean>(false);
  const toggleModalMusic = useCallback(() => {
    setVisibleModalMusic(prevState => !prevState);
  }, []);
  const [musicSelected, setMusicSelected] = useState<Music>();
  const handleMusicSelected = useCallback(
    (music: Music) => {
      setMusicSelected(music);
      toggleModalMusic();
    },
    [toggleModalMusic],
  );
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
    formData.append('music', musicSelected);
    formData.append('description', 'description');
    formData.append('type', 'POST');
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
        if (res.code === 201) {
          navigateAndReset([{name: ROUTES.BottomTab}]);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [imageSelected, musicSelected]);
  return (
    <Container justifyContent={'space-between'}>
      <ModalMusic
        onMusicSelected={handleMusicSelected}
        visible={visibleModalMusic}
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
              {musicSelected ? (
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
                    src={{uri: musicSelected.image}}
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
            renderItem={({item, index}) => {
              return (
                <ImageCard
                  item={item}
                  onPress={it => {}}
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
          onPress={() => {
            goBackNavigation();
          }}>
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
export default NewPost;
