import {Responsive} from 'semantic-ui-react';

const GetWidthOfComponent = () => {
    const isSSR = typeof window === 'undefined'
  
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
  }

  export default GetWidthOfComponent;