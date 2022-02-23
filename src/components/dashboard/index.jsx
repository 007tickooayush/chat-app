import React from 'react';
import { Drawer, Button, Divider, Alert } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import EditableInput from '../EditableInput';

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();

  // console.log('profile', profile);

  const onSave = async newData => {
    // log newDataq
    // console.log('newData', newData);

    const usernameNickNameRef = database
      .ref(`/profiles/${profile.uid}`)
      .child('name');
    try {
      await usernameNickNameRef.set(newData);

      Alert.info('Nickname is updated', 4300);
    } catch (error) {
      Alert.error(error.message, 4300);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3> Hey, {profile.name}</h3>
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
