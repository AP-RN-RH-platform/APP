import React, { memo, useState, useContext, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';

import Button from '../components/Button';

import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from 'react-native-dotenv';



const ProfileScreen = ({ navigation }) => {


const [role,setRole]= useState("");

const [user,setUser]= useState({});

    const logout = () => {
        DeleteTokenFromStorageAsync();
        navigation.navigate('Login');

    }
    const getTokenFromStorageAsync = async () => {
        var value = await AsyncStorage.getItem('token')
        return value
      }
    const DeleteTokenFromStorageAsync = async () => {
        var value = await AsyncStorage.removeItem('token')
        return value
      }

    useEffect(() => {
        fetch(API_URL+'/current_user',
            {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + getTokenFromStorageAsync(),
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setRole(data.roles)
        }).catch((err) => {
            alert(err);
        });
      }, []);

      


if(getTokenFromStorageAsync() !== null){
    return (
        <Background>
            <Image source={require('../assets/person.png')} style={styles.image} />
            <Text>Bonjour, { user.email }</Text>
            { role.includes("ROLE_RECRUITER") &&
            <Button mode="contained" onPress={() => navigation.navigate('CreateOffer')}>
                Créer une offre
            </Button>
            }
            <Button mode="contained" onPress={() => navigation.navigate('ListAnnounce')}>
                Mes annonces
            </Button>
            { !role.includes("ROLE_RECRUITER") &&
            <Button mode="contained" onPress={() => navigation.navigate('Token')}>
                Postuler a une offre
            </Button>}
            <Button style={styles.bkColor}mode="contained"  onPress={() => logout()} >
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

const styles = StyleSheet.create({

    bkColor: {
        backgroundColor:'#C90B0B'
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        marginBottom: 12,
      }
  });
  



export default memo(ProfileScreen);
