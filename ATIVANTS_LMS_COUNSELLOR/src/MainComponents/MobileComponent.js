import MobileContainer from '../SecondaryComponents/Mobile/MobileContainer';
import React, { useState } from 'react'
import { Container, Icon, Menu, Responsive, Segment, Sidebar } from 'semantic-ui-react';
import GetWidthOfComponent from './GetWidthOfComponent'


const MobileComponent = ({ children }) => {

  const [sidebarOpened, setSidebarOpened] = useState(false);

  const handleToggle = () => {
    setSidebarOpened(!sidebarOpened) 
  }

  return (

    <Responsive as={Sidebar.Pushable} getWidth={GetWidthOfComponent} maxWidth={Responsive.onlyMobile.maxWidth}>

      <Sidebar vertical as={Menu} animation='overlay' inverted onHide={() => handleToggle()} visible={sidebarOpened}>
        <Menu.Item as='a'>Home</Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment inverted textAlign='center' style={{ minHeight: 300, padding: '0em' }} vertical>
          <Container>
            <Menu inverted pointing secondary size='small'>
              <Menu.Item onClick={() => handleToggle()}>
                <Icon name='sidebar' />
              </Menu.Item>
            </Menu>
          </Container>
          <MobileContainer bool />
        </Segment>
      </Sidebar.Pusher>
      {children}
    </Responsive >

  )
}

export default MobileComponent;