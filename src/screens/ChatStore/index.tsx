import React, {useCallback} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import {goBackNavigation, navigatePush} from '../../utils/NavigationUtils.ts';
import {appColors} from '../../assets/colors/appColors.ts';
import TextComponent from '../../components/TextComponent.tsx';
import {globalStyle} from '../../styles/globalStyle.ts';
import {FlatList, StyleSheet} from 'react-native';
import {useChatStore} from '../../hooks/useChatStore.ts';
import UserOnlineCard from './components/UserOnlineCard.tsx';
import {UserConversation} from '../../models/User.ts';
import {ROUTES} from '../../navigators';

const ChatStore = () => {
  const {onlineUsers, conversations, allUser} = useChatStore();

  const renderOnlineUsers = useCallback(
    ({item, index}: {item: UserConversation; index: number}) => {
      const navigateToConversationDetails = async () => {
        navigatePush(ROUTES.ConversationDetails, {
          userInfor: item,
        });
      };
      return (
        <UserOnlineCard
          item={item}
          onItemPress={navigateToConversationDetails}
        />
      );
    },
    [],
  );
  return (
    <Container>
      <Header
        style={globalStyle.headerStyle}
        componentLeft={
          <ButtonComponent onPress={goBackNavigation}>
            <ImageComponent
              style={styles.iconHeader}
              src={require('../../assets/icons/left.png')}
            />
          </ButtonComponent>
        }
        componentCenter={<TextComponent fontSize={18} value={'Đoạn chat'} />}
        componentRight={
          <ButtonComponent onPress={() => {}}>
            <ImageComponent
              style={styles.iconHeader}
              src={require('../../assets/icons/new_chat.png')}
            />
          </ButtonComponent>
        }
      />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={allUser}
        renderItem={renderOnlineUsers}
        horizontal={true}
      />
    </Container>
  );
};
const styles = StyleSheet.create({
  iconHeader: {
    height: 30,
    tintColor: appColors.white,
    width: 30,
  },
});
export default ChatStore;
