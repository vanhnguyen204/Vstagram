import React, {useState} from 'react';
import Box from '../../../components/Box.tsx';
import {Chat} from '../../../models/Chat.ts';
import FastImage from 'react-native-fast-image';
import TextComponent from '../../../components/TextComponent.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import {StyleProp, ViewStyle} from 'react-native';
import Spacer from '../../../components/Spacer.tsx';
interface ConversationItemProps {
  item: Chat;
  image: string;
  containerStyle: ViewStyle;
  positionShowTimestamp: 'flex-start' | 'flex-end'
}
const ConversationItem = (props: ConversationItemProps) => {
  const {item, image, containerStyle, positionShowTimestamp} = props;
  const [showTimeChat, setShowTimeChat] = useState(false);
  return (
    <Box  alignItems={positionShowTimestamp}>
      <Box marginVertical={10} flexDirection={'row'} >
        {image !== '' && (
          <>
            <FastImage
              source={{uri: image}}
              style={{width: 30, height: 30, borderRadius: 99}}
            />
            <Spacer width={10} />
          </>
        )}

        <ButtonComponent
          style={containerStyle}
          onPress={() => setShowTimeChat(prevState => !prevState)}>
          <Box>
            {typeof item.message === 'string' ? (
              <TextComponent value={item.message} />
            ) : undefined}
          </Box>
        </ButtonComponent>
      </Box>
      {showTimeChat && (
        <TextComponent value={item.timeChat} color={appColors.grays.gray400} />
      )}
    </Box>
  );
};

export default ConversationItem;
