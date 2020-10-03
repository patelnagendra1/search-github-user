import React from 'react';
import styled from 'styled-components';
import { MdFavorite } from "react-icons/md";
import { useAuth0 } from '@auth0/auth0-react';

const Footer = () => {
  const style={
    marginLeft:'55rem',
    marginTop:'100rem'
  }
  return  <a style={style} href="patelnagendra1.github.io">Built with <MdFavorite /> by Nagendra</a>
    
   
}


export default Footer;
