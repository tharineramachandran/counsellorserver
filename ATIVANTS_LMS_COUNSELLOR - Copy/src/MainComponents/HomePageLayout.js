import React from 'react';
import MobileContainer from './MobileComponent';
import DesktopComponent from './DesktopComponent';
import Footer from './Footer'


const HomepageLayout = () => {
  return (
    <div>
      <DesktopComponent></DesktopComponent>
      <MobileContainer><Footer /></MobileContainer>
    </div>
  )
}

export default HomepageLayout