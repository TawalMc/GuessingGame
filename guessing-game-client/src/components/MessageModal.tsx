import React from "react";
import { Box, Text } from "grommet";
import Modal from "./containers/Modal";

interface MessageModalProps {
  showMessageModal: boolean;
  okClickAction: () => void;
  from: string;
  message: string;
}

const MessageModal = ({
  showMessageModal = true,
  okClickAction,
  from,
  message
}: MessageModalProps): JSX.Element | null => {
  

  const MessageBox = () => (
    <Modal okButton handleOkClick={okClickAction}>
      <Box flex direction="row" align="center">
        <Text color="blue" weight="bold" style={{ marginRight: "10px" }}>
          From:
        </Text>
        <Text>{from}</Text>
      </Box>
      <Box
        flex
        direction="row"
        align="center"
        justify="between"
      >
        <Text color="blue" style={{ marginRight: "10px" }} weight="bold">
          Message:
        </Text>
        <Text>{message}</Text>
      </Box>
    </Modal>
  );

  return showMessageModal ? <MessageBox /> : null;
};

export default MessageModal;
