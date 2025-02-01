import { useRef } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

import { noop } from '@/constants';
import { useEventListener } from '@/hooks';

export const DeleteFileComfirm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onComfirmRef = useRef(noop);
  useEventListener('delete-file-comfirm', onComfirm => {
    onOpen();
    onComfirmRef.current = onComfirm || noop;
  });

  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete File
            </ModalHeader>
            <ModalBody>Are you sure about deleting this file?</ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  onComfirmRef.current();
                  onClose();
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
