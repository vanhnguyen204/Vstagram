import React, {useCallback, useState} from 'react';
import Container from '../../components/Container.tsx';
import {usePhotos} from '../../hooks/Media/usePhotos.ts';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {RootStackParams} from '../../navigators';
import Header from '../../components/Header.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {goBackNavigation} from '../../utils/NavigationUtils.ts';
import CloseSvg from '../../assets/svg/public/CloseSvg.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {FlatList, StyleSheet, View} from 'react-native';
import {globalStyle} from '../../styles/globalStyle.ts';
import ImageComponent from '../../components/ImageComponent.tsx';
import {AppInfor} from '../../constants/AppInfor.ts';
import Box from '../../components/Box.tsx';
import FastImage from 'react-native-fast-image';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ModalMusic from '../PostEditorScreen/components/ModalMusic.tsx';

type NewPostRouteProp = RouteProp<RootStackParams, 'NewPost'>;
type NewPostNavigationProp = NavigationProp<RootStackParams, 'NewPost'>;
type Props = {
  route: NewPostRouteProp;
  navigation: NewPostNavigationProp;
};

const NewPost = (props: Props) => {
  const {} = props;
  const {imageSelected, images} = usePhotos();
  const [visibleModalMusic, setVisibleModalMusic] = useState<boolean>(false);
  const toggleModalMusic = useCallback(() => {
    setVisibleModalMusic(prevState => !prevState);
  }, []);
  return (
    <GestureHandlerRootView>
      <Container>
        <ModalMusic
          onMusicSelected={music => {}}
          visible={visibleModalMusic}
          onClose={toggleModalMusic}
        />
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
              <ImageComponent
                src={require('../../assets/icons/musical-note.png')}
                height={25}
                width={25}
                tintColor={appColors.white}
              />
            </ButtonComponent>
          }
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={imageSelected}
          keyExtractor={item => item.id}
          horizontal
          renderItem={({item, index}) => {
            return (
              // <Box marginHorizontal={10}>
              //
              //   {/*<Draggable  snapTo={'vertical'} spring={true}>*/}
              //   {/* */}
              //   {/*</Draggable>*/}
              // </Box>
              <ButtonComponent
                activeOpacity={1}
                onPress={() => {}}
                marginHorizontal={10}>
                <ImageComponent
                  style={{
                    aspectRatio: 0.8,
                    height: AppInfor.width,
                    borderRadius: 10,
                  }}
                  src={{uri: item.uri}}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </ButtonComponent>
            );
          }}
        />
        <Box flexDirection={'row'} paddingHorizontal={10}>
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
              <View
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                }}>
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
        </Box>
      </Container>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  buttonSelectImage: {
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: appColors.white,
  },
  imageButtonFooter: {
    opacity: 0.7,
    height: 30,
    width: 30,
  },
});
export default NewPost;
