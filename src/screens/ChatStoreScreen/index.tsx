import React, {useCallback, useEffect} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import {goBackNavigation, navigatePush} from '../../utils/NavigationUtils.ts';
import {appColors} from '../../assets/colors/appColors.ts';

import {globalStyle} from '../../styles/globalStyle.ts';
import {FlatList, StyleSheet} from 'react-native';
import {useChatStore} from '../../hooks/useChatStore.ts';
import UserOnlineCard from './components/UserOnlineCard.tsx';
import {UserConversation} from '../../models/User.ts';
import {ROUTES} from '../../navigators';

import {Observer, observer} from 'mobx-react-lite';
import Box from '../../components/Box.tsx';
import chatStore from '../../stores/ChatStore.ts';
import {TextComponent} from '../../components';

const ChatStoreScreen = () => {
  const {onlineUsers, allUser} = useChatStore();

  useEffect(() => {
    chatStore.fetchConversation(10, 1);
  }, []);
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
      <Box>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={allUser}
          renderItem={renderOnlineUsers}
          horizontal={true}
        />
      </Box>
      <Observer>
        {() => (
          <FlatList
            data={chatStore.store}
            renderItem={({item, index}) => (
              <ButtonComponent
                onPress={() => {
                  navigatePush(ROUTES.ConversationDetails, {
                    userInfor: {
                      _id: item.userId,
                      avatar: item.avatar,
                      name: item.fullName,
                    },
                  });
                }}
                marginTop={20}
                marginHorizontal={10}
                flexDirection={'row'}>
                <ImageComponent
                  borderRadius={99}
                  resizeMode={'cover'}
                  width={50}
                  height={50}
                  src={{uri: item.avatar}}
                />
                <Box marginLeft={20} flex={1} justifyContent={'center'}>
                  <TextComponent fontSize={15} value={item.fullName} />
                  <TextComponent
                    fontSize={14}
                    color={appColors.placeholderTextColor}
                    value={item.messageLatest}
                  />
                </Box>
              </ButtonComponent>
            )}
          />
        )}
      </Observer>
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
export default ChatStoreScreen;
