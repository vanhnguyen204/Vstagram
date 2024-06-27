import React, {useCallback} from 'react';
import Container from '../../components/Container.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import {RootStackParams} from '../../navigators';
import {usePhotos} from '../../hooks/Media/usePhotos.ts';
import {FlatList} from 'react-native';
import Header from '../../components/Header.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import CloseSvg from '../../assets/svg/public/CloseSvg.tsx';
import {goBackNavigation} from '../../utils/NavigationUtils.ts';

import {appColors} from '../../assets/colors/appColors.ts';
import PhotoCard from './components/PhotoCard.tsx';
import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';

type PhotosRouteProp = RouteProp<RootStackParams, 'Photos'>;
type PhotosNavigationProp = NavigationProp<RootStackParams, 'Photos'>;
type Props = {
  route: PhotosRouteProp;
  navigation: PhotosNavigationProp;
};
const Photos = (props: Props) => {
  const {mediaType} = props.route.params;
  const {photos} = usePhotos();
  const {
    photoSelected,
    onPhotoUnSelected,
    onPhotoSelected,
    clearPhotoSelected,
  } = usePhotos();

  const isSelected = useCallback(
    (id: string) => {
      return photoSelected.some(photo => photo.id === id);
    },
    [photoSelected],
  );
  const findIndex = useCallback(
    (id: string) => {
      return photoSelected.findIndex(photo => photo.id === id);
    },
    [photoSelected],
  );
  const isOpen = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!isOpen) {
          clearPhotoSelected();
          console.log('Un focus');
        }
      };
    }, [clearPhotoSelected, isOpen]),
  );
  console.log(photoSelected.length);
  const toggleSelected = useCallback(
    (item: PhotoIdentifier) => {
      if (isSelected(item.node.id)) {
        onPhotoUnSelected(item.node.id);
        console.log('Handle Unselected');
      } else {
        onPhotoSelected({
          id: item.node.id,
          image: item.node.image.uri,
        });
        console.log('Handle selected');
      }
      console.log('Selected', findIndex(item.node.id));
    },
    [findIndex, isSelected, onPhotoSelected, onPhotoUnSelected],
  );
  const renderItem = useCallback(
    ({item, index}: {item: PhotoIdentifier; index: number}) => (
      <PhotoCard
        item={item}
        onSelected={it => {
          toggleSelected(it);
        }}
        isSelected={isSelected(item.node.id)}
        index={findIndex(item.node.id)}
      />
    ),
    [findIndex, isSelected, toggleSelected],
  );
  return (
    <Container>
      <Header
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          marginBottom: 10,
        }}
        componentLeft={
          <ButtonComponent
            onPress={() => {
              goBackNavigation();
            }}>
            <CloseSvg size={32} />
          </ButtonComponent>
        }
        componentCenter={
          mediaType === 'post' && (
            <TextComponent
              fontSize={18}
              color={appColors.white}
              value={'Bài viết mới'}
            />
          )
        }
        componentRight={
          <ButtonComponent onPress={() => {}}>
            <TextComponent
              value={'Tiếp'}
              fontWeight={'700'}
              color={appColors.blue500}
              fontSize={18}
            />
          </ButtonComponent>
        }
      />
      <FlatList
        initialNumToRender={30}
        extraData={photos}
        numColumns={3}
        data={photos}
        keyExtractor={item => item.node.id}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default Photos;
