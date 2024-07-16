import React from 'react';
import ModalBottomSheet from '../../../components/ModalBottomSheet.tsx';
import TextComponent from '../../../components/TextComponent.tsx';
interface ModalReelEditorProps {
  visible: boolean;
  onToggle: () => void;
  onConfirm: () => void;
}
const ModalReelEditor = (props: ModalReelEditorProps) => {
  const {onConfirm, onToggle, visible} = props;
  return (
    <ModalBottomSheet isVisible={visible} toggle={onToggle} transparent>
      <TextComponent value={'Hello'} />
    </ModalBottomSheet>
  );
};

export default ModalReelEditor;
