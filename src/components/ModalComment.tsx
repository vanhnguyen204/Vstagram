import React, { useState } from "react";
import ModalScrollable from "./ModalScrollable.tsx";
import { useComment } from "../hooks/useComment.ts";
import { Comment } from "../models/Comment.ts";
import Box from "./Box.tsx";
import ImageComponent from "./ImageComponent.tsx";
import { StyleSheet } from "react-native";
import { appColors } from "../assets/colors/appColors.ts";
import TextComponent from "./TextComponent.tsx";
import InputChatMessage from "./InputChatMessage.tsx";


const ModalComment = () => {
  const {comments, visible, setVisible, addNewComment} = useComment();

  return (
    <ModalScrollable<Comment>
      buttonCloseColor={appColors.black900}
      containerStyle={styles.containerModal}
      data={comments.reverse()}
      renderItem={({item, index}) => {
        return (
          <Box
            marginVertical={10}
            flexDirection={'row'}
            marginHorizontal={10}>
            <ImageComponent
              borderRadius={99}
              resizeMode={'cover'}
              src={{uri: item.userAvatar}}
              height={30}
              width={30}
            />
            <Box marginLeft={10}>
              <TextComponent value={item.name} color={appColors.black900} />
              <TextComponent value={item.comment} color={appColors.black900} />
            </Box>
          </Box>
        );
      }}
      keyExtractor={item => item._id}
      visible={visible}
      onClose={setVisible}
      onEndReached={() => {}}
      footer={
        <InputChatMessage
          onConfirm={(text) => {
            const newComment: Comment = {
              comment: text,
              userAvatar: 'https://s.widget-club.com/images/YyiR86zpwIMIfrCZoSs4ulVD9RF3/83cbec25f8e2a0602ae1ed04069775a1/c1d222fd605d13dc83f639cea4a71b3a.jpg?q=70&w=500',
              _id: '1',
              name: 'vanh',
              userId:'1',
              timeCreate: '2024',
              like: 999,
            }
            addNewComment(newComment)
          }}
        />
      }
    />
  );
};
const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: appColors.grays.gray700,
  },
});
export default ModalComment;
