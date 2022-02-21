import React from 'react';
import { Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite';

const SignIn = () => {
  return (
    <Container>
      <Grid className='mt-page'>
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat</h2>
                <p>Progressive Chat platform for neophytes</p>
              </div>
              <div className='mt-3'>
                <Button  color="blue" block>
                  <Icon icon="facebook" /> Continue with facebook
                </Button>

                <Button color="green" block >
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
