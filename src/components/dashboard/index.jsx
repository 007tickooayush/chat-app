import React from 'react';
import { Drawer, Button } from 'rsuite';
import { useProfile } from '../../context/profile.context';

const Dashboard = ({onSignOut}) => {
  const {profile} = useProfile();

  // console.log('profile', profile);
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3> Hey, {profile.name}</h3>
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
