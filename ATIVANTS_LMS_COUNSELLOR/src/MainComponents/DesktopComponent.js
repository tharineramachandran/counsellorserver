import GetWidthOfComponent from './GetWidthOfComponent'
import React, { useState, useEffect } from 'react'
import _NavigationItems from '../SecondaryComponents/Desktop/_NavigationItems'
import _Promos from '../SecondaryComponents/Desktop/_Promos'
import axios from 'axios'
import { Responsive } from 'semantic-ui-react'

const DesktopComponent = ({ children }) => {

  return (
    <Responsive getWidth={GetWidthOfComponent} minWidth={Responsive.onlyTablet.minWidth}>

      <_NavigationItems />

      <_Promos/>

      {children}

    </Responsive >
  )

}


export default DesktopComponent;