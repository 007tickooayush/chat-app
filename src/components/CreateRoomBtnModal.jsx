import React, { useState, useCallback, useRef } from 'react';
import {
  Button,
  Icon,
  Modal,
  Form,
  ControlLabel,
  FormGroup,
  FormControl,
  Schema,
  Alert,
} from 'rsuite';
import firebase from 'firebase/app';
import { useModalState } from '../misc/custom-hooks';
import { database } from '../misc/firebase';

const INITIAL_FORM = {
  name: '',
  description: '',
};

// getting Schema Type for model schema
const { StringType } = Schema.Types;

// creating Model Schema for the Chat room Form
const model = Schema.Model({
  name: StringType().isRequired('Chat name is required'),
  description: StringType().isRequired('Description is required'),
});

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();

  const [formValue, setFormValue] = useState(INITIAL_FORM);

  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    // validating form data
    if (!formRef.current.check()) {
      return;
    }
    setIsLoading(true);

    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };

    try {
      await database.ref('rooms').push(newRoomData);

      setIsLoading(false);
      setFormValue(INITIAL_FORM);
      close();
      
      Alert.info(`${formValue.name} has been created`, 4000);
      // log form data
      // console.log('form', newRoomData);

    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <div className="mt-1">
      <Button block color="green" onClick={open}>
        <Icon icon="creative" />
        Create New Chat Room
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title> New Chat Room </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* using formValue attribute provided by rsuite to update formValue object */}
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room name</ControlLabel>
              <FormControl name="name" placeholder="Enter chat room name..." />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter room description..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create New chat Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
