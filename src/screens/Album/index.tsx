import React, {memo, useCallback, useState} from 'react';
import Container from '../../components/Container.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import {RootStackParams, ROUTES} from '../../navigators';
import {usePhotos} from '../../hooks/Media/usePhotos.ts';
import {FlatList, View} from 'react-native';
import Header from '../../components/Header.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import CloseSvg from '../../assets/svg/public/CloseSvg.tsx';
import {goBackNavigation, navigatePush} from '../../utils/NavigationUtils.ts';

import {appColors} from '../../assets/colors/appColors.ts';
import AlbumImageCard from './components/AlbumImageCard.tsx';
import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';
import Box from '../../components/Box.tsx';
import Spacer from '../../components/Spacer.tsx';
import AlbumVideoCard from './components/AlbumVideoCard.tsx';
import {globalStyle} from '../../styles/globalStyle.ts';

type AlbumRouteProp = RouteProp<RootStackParams, 'Album'>;
type AlbumNavigationProp = NavigationProp<RootStackParams, 'Album'>;
type Props = {
  route: AlbumRouteProp;
  navigation: AlbumNavigationProp;
};
interface Category {
  id: number;
  name: string;
  type: string;
}
const Album = (props: Props) => {
  const {mediaType} = props.route.params ?? 'post';
  const {images, videos} = usePhotos();
  const [categoryOpened, setCategoryOpened] = useState('image');

  const [categories, _] = useState<Category[]>([
    {
      id: 1,
      name: 'Ảnh',
      type: 'image',
    },
    {
      id: 2,
      name: 'Video',
      type: 'video',
    },
  ]);
  const {
    imageSelected,
    onImageSelected,
    onImageUnSelected,
    clearImageSelected,
    videoSelected,
    onVideoSelected,
    clearVideoSelected,
  } = usePhotos();
  const isOpen = useIsFocused();
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!isOpen) {
          clearImageSelected();
          console.log('Un focus');
        }
      };
    }, [clearImageSelected, isOpen]),
  );
  const isImageSelected = useCallback(
    (id: string) => {
      return imageSelected.some(photo => photo.id === id);
    },
    [imageSelected],
  );
  const findIndex = useCallback(
    (id: string) => {
      return imageSelected.findIndex(photo => photo.id === id);
    },
    [imageSelected],
  );

  const toggleSelected = useCallback(
    (item: PhotoIdentifier) => {
      if (isImageSelected(item.node.id)) {
        onImageUnSelected(item.node.id);
      } else {
        onImageSelected({
          id: item.node.id,
          uri: item.node.image.uri,
          type: item.node.type,
          name: item.node.image.filename ?? '',
        });
      }
    },
    [isImageSelected, onImageSelected, onImageUnSelected],
  );
  const onCategoryPress = useCallback((type: string) => {
    setCategoryOpened(type);
  }, []);
  const isVideoSelected = useCallback(
    (id: string) => {
      return videoSelected.id === id;
    },
    [videoSelected.id],
  );
  const toggleVideoSelected = useCallback(
    (item: PhotoIdentifier) => {
      if (isVideoSelected(item.node.id)) {
        clearVideoSelected();
      } else {
        onVideoSelected({
          id: item.node.id,
          uri: item.node.image.uri,
          type: item.node.type,
          name: item.node.image.filename ?? '',
          duration: item.node.image.playableDuration,
        });
      }
    },
    [clearVideoSelected, isVideoSelected, onVideoSelected],
  );
  const renderImageItem = useCallback(
    ({item}: {item: PhotoIdentifier}) => (
      <AlbumImageCard
        item={item}
        onSelected={it => {
          toggleSelected(it);
        }}
        isSelected={isImageSelected(item.node.id)}
        index={findIndex(item.node.id)}
      />
    ),
    [findIndex, isImageSelected, toggleSelected],
  );
  const renderVideoItem = useCallback(
    ({item, index}: {item: PhotoIdentifier; index: number}) => (
      <AlbumVideoCard
        item={item}
        onSelected={it => {
          toggleVideoSelected(it);
        }}
        isSelected={isVideoSelected(item.node.id)}
        index={index}
      />
    ),
    [isVideoSelected, toggleVideoSelected],
  );
  console.log('Video selected: ', videoSelected);
  return (
    <Container>
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
          <ButtonComponent
            onPress={() => {
              navigatePush(ROUTES.NewPost, {mediaType});
            }}>
            <TextComponent
              value={'Tiếp'}
              fontWeight={'700'}
              color={appColors.blue500}
              fontSize={18}
            />
          </ButtonComponent>
        }
      />
      <Box flexDirection={'row'}>
        {categories.map(item => {
          return (
            <Category
              key={item.id}
              categoryOpened={categoryOpened}
              onCategoryPress={onCategoryPress}
              item={item}
            />
          );
        })}
      </Box>
      <Spacer height={10} />
      {categoryOpened === 'image' ? (
        <FlatList
          initialNumToRender={30}
          extraData={images}
          numColumns={3}
          data={images}
          keyExtractor={item => item.node.id}
          renderItem={renderImageItem}
        />
      ) : (
        <FlatList
          initialNumToRender={30}
          extraData={videos}
          numColumns={3}
          data={videos}
          keyExtractor={item => item.node.id}
          renderItem={renderVideoItem}
        />
      )}
    </Container>
  );
};
interface CategoryProps {
  item: Category;
  categoryOpened: string;
  onCategoryPress: (type: string) => void;
}
export const Category = memo(
  (props: CategoryProps) => {
    const {item, onCategoryPress, categoryOpened} = props;
    const handleCategoryPress = useCallback(() => {
      onCategoryPress(item.type);
    }, [item.type, onCategoryPress]);
    console.log('Open: ', categoryOpened);
    return (
      <Box flex={1} key={item.id}>
        <ButtonComponent
          flexDirection={'row'}
          activeOpacity={1}
          scaleAnimated={true}
          scaleInValue={0.9}
          borderWidth={2}
          radius={10}
          alignSelf={'stretch'}
          marginHorizontal={3}
          padding={3}
          justifyContent={'center'}
          alignItems={'center'}
          onPress={handleCategoryPress}>
          <TextComponent value={item.name} />
          <Box
            padding={5}
            marginLeft={5}
            borderWidth={1}
            borderColor={appColors.white}
            radius={20}
            backgroundColor={
              categoryOpened === item.type
                ? appColors.blue500
                : appColors.transparent
            }>
            <View />
          </Box>
        </ButtonComponent>
      </Box>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.categoryOpened === nextProps.categoryOpened &&
      prevProps.item.id === nextProps.item.id
    );
  },
);
export default Album;
