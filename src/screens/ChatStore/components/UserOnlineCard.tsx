import React, {useCallback} from 'react';
import FastImage from 'react-native-fast-image';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {navigatePush} from '../../../utils/NavigationUtils.ts';
import {ROUTES} from '../../../navigators';
import {UserConversation} from '../../../models/User.ts';

interface UserOnlineCardProps {
  item: UserConversation;
  onItemPress: () => void;
}
const UserOnlineCard = (props: UserOnlineCardProps) => {
  const {item, onItemPress} = props;

  return (
    <ButtonComponent
      marginHorizontal={10}
      scaleAnimated={true}
      scaleInValue={0.9}
      onPress={onItemPress}>
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={{uri: item.avatar}}
        style={{height: 70, width: 70, borderRadius: 99, alignSelf: 'center'}}
      />
    </ButtonComponent>
  );
};

export default UserOnlineCard;
