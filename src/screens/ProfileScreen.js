import React, { memo, useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';

import Button from '../components/Button';

import { AsyncStorage } from 'react-native';



const ProfileScreen = ({ navigation }) => {


const value = AsyncStorage.getItem('token');

    const logout = () => {
        AsyncStorage.removeItem('token', (err) => console.log('userId', err));

    }


if(value !== null){
    return (
        <Background>
            <Logo />
            <Text>Mon profil</Text>
            <Button mode="contained"  onPress={() => logout()} >
        Déconnexion
      </Button>
        </Background>
    )
} else {
    return (
        <Background>
            <Logo />
            <Text>Non connecté</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Login')}>
        Connexion
      </Button>
        </Background>
    )
}

};



export default memo(ProfileScreen);
