import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';


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
      onPress={() => navigation.navigate('Register')}
    >
      Inscription
    </Button>
  </Background>
);

export default memo(HomeScreen);
