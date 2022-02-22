import React from 'react';
import firebase from 'firebase/app';
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite';
import { auth, database } from '../misc/firebase';

const SignIn = () => {
  const signInwithProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      // console.log(result);

      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success('Signed In', 4300);
    } catch (err) {
      Alert.error(err.message, 4300);
    }
  };

  const onFacebookSignIn = () => {
    signInwithProvider(new firebase.auth.FacebookAuthProvider());
  };
  const onGoogleSignIn = () => {
    signInwithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat</h2>
                <p>Progressive Chat platform for neophytes</p>
              </div>
              <div className="mt-3">
                <Button color="blue" block onClick={onFacebookSignIn}>
                  <Icon icon="facebook" /> Continue with facebook
                </Button>

                <Button color="green" block onClick={onGoogleSignIn}>
                  <Icon icon="google" /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
