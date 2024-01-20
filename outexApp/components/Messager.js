import * as React from 'react';
import { Dialog, Portal, Text } from 'react-native-paper';

const Messager = ({ message, visible }) => {
  const [isVisible, setVisible] = React.useState(visible);

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default Messager;
