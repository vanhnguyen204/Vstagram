import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Container from '../../components/Container.tsx';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParams} from '../../navigators';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Header from '../../components/Header.tsx';
import {globalStyle} from '../../styles/globalStyle.ts';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {goBackNavigation} from '../../utils/NavigationUtils.ts';
import ImageComponent from '../../components/ImageComponent.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import Box from '../../components/Box.tsx';
import FastImage from 'react-native-fast-image';
import Spacer from '../../components/Spacer.tsx';
import InputComponentV2 from '../../components/InputComponentV2.tsx';
import {AppInfor} from '../../constants/AppInfor.ts';
import {Chat} from '../../models/Chat.ts';
import ConversationItem from './components/ConversationItem.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_USER_ID} from '../../constants/AsyncStorage.ts';
import {ConversationType, useChatStore} from '../../hooks/useChatStore.ts';
import {getDataAsyncStorage} from '../../utils/AsyncStorage.ts';
import Console from '../../utils/Console.ts';
import {getConversationDetails} from '../../services/apis/chatServices.ts';

type ConversationDetailsProps = RouteProp<
  RootStackParams,
  'ConversationDetails'
>;
type ConversationDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'ConversationDetails'
>;

type Props = {
  route: ConversationDetailsProps;
  navigation: ConversationDetailsNavigationProp;
};
const ConversationDetails = (props: Props) => {
  const {userInfor} = props.route.params;
  const {conversationDetails,addNewConversation, setConversationDetails} = useChatStore();
  const {sendMessage, socket} = useChatStore();
  const listConversationRef = useRef<FlatList>(null);
  const [message, setMessage] = useState<string>('');

  const handleGetConversationDetails = useCallback(async () => {
    try {
      const userId = await getDataAsyncStorage(ACCESS_USER_ID);
      const response = await getConversationDetails(userId, userInfor._id);
      setConversationDetails(response);
    } catch (e) {
      console.log('HandleGetInitialChat error: ', e);
    }
  }, []);
  const handleSendMessage = () => {
    if (message.trim().length > 0) {
      const newMessage = {
        userIdReceived: userInfor._id,
        message: message.trim(),
        userIdSent: '',
        timeChat: '',
        _id: '',
      };
      sendMessage(newMessage, socket);
      setMessage('');
    }
  };
  const reversedData = useMemo(() => [...conversationDetails.data].reverse(), [conversationDetails.data]);

  useEffect(() => {
    handleGetConversationDetails().then(() => {});
  }, [userInfor._id]);
  console.log(conversationDetails.data.length);
  const renderConversationItem = useCallback(
    ({item, index}: {item: Chat; index: number}) => {
      return (
        <Box
          flexDirection={'row'}
          alignSelf={
            item.userIdSent === userInfor._id ? 'flex-start' : 'flex-end'
          }>
          <ConversationItem
            positionShowTimestamp={
              item.userIdSent === userInfor._id ? 'flex-start' : 'flex-end'
            }
            containerStyle={{
              flexShrink: 1,
              maxWidth: AppInfor.width / 2,
              backgroundColor:
                item.userIdSent === userInfor._id
                  ? appColors.grays.gray700
                  : appColors.red,
              padding: 7,
              borderRadius: 20,
            }}
            item={item}
            image={
              item.userIdSent === userInfor._id && userInfor.avatar
                ? userInfor.avatar
                : ''
            }
          />
        </Box>
      );
    },
    [],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container justifyContent={'space-between'} flex={1}>
          <Header
            style={globalStyle.headerStyle}
            componentLeft={
              <Box flexDirection={'row'}>
                <ButtonComponent onPress={goBackNavigation}>
                  <ImageComponent
                    style={styles.iconHeader}
                    src={require('../../assets/icons/left.png')}
                  />
                </ButtonComponent>
                <Spacer width={10} />
                <ButtonComponent
                  justifyContent={'center'}
                  flexDirection={'row'}
                  alignItems={'center'}
                  onPress={goBackNavigation}>
                  <FastImage
                    style={{width: 40, height: 40, borderRadius: 99}}
                    source={{uri: userInfor.avatar}}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <Spacer width={5} />
                  <TextComponent value={userInfor.name} />
                </ButtonComponent>
              </Box>
            }
            componentRight={
              <ButtonComponent onPress={() => {}}>
                <ImageComponent
                  style={styles.iconHeader}
                  src={require('../../assets/icons/new_chat.png')}
                />
              </ButtonComponent>
            }
          />
          <View style={{flex: 1}}>
            <FlatList
              inverted={true}
              keyExtractor={(item, index) => index.toString()}
              ref={listConversationRef}
              data={reversedData}
              renderItem={renderConversationItem}
            />
            <Spacer height={20} />
            <InputComponentV2
              value={message}
              multiline={true}
              onChangeText={setMessage}
              containerStyle={{backgroundColor: 'green'}}
              placeholder={'Soạn tin nhắn'}
              placeholderTextColor={appColors.placeholderTextColor}
              trailingIcon={
                message.trim().length > 0 && (
                  <ButtonComponent
                    marginHorizontal={5}
                    onPress={handleSendMessage}>
                    <ImageComponent
                      tintColor={appColors.white}
                      src={require('../../assets/icons/share-2.png')}
                    />
                  </ButtonComponent>
                )
              }
            />
          </View>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  iconHeader: {
    height: 30,
    tintColor: appColors.white,
    width: 30,
  },
});
export default ConversationDetails;
