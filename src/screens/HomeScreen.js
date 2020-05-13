import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';


const testAPI = () => {
  fetch('https://localhost:8443/users')
    .then((response) => response.json())
    .then((data) => console.log(data));
};

const HomeScreen = ({ navigation }) => (
  
  <Background>
    <Logo />
    <Paragraph>
        RH-APP est une application  ✅
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('Login')}>
      Connexion
    </Button>
    <Button
      mode="outlined"
      onPress={() => testAPI()}
    >
      Inscription
    </Button>
  </Background>
);

export default memo(HomeScreen);
