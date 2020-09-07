import React from 'react';
import { Container, Segment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const MobileContainer = ({ bool }) => {
  console.log("this is what =" + bool)
  return (
    <Container style={{ width: '100%' }}>
        <Segment inverted vertical style={{ padding: '1px', margin: '0px' }}>
          Switch To Desktop View...<br/>
          <br/>
          <Icon name="hand victory" size="huge"color='green'/>
        </Segment>
    </Container>
  )
}

MobileContainer.propTypes = {
        mobile: PropTypes.bool
}

export default MobileContainer;