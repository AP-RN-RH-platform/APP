import React, { memo, useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { API_URL } from 'react-native-dotenv';


const LoginScreen = ({ navigation }) => {

    const [token,setToken]= useState("");

    const offer = () => {
        fetch(API_URL+'/send_invitation/'+ token, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.detail){
                return alert(data.detail)
            }
            navigation.navigate('Offer',{
                data
            });
        }).catch((err) => {
            alert(err)
        });
    };

    return (
        <Background>
            <Logo />
            <TextInput
                label="Token"
                returnKeyType="next"
                autoCapitalize="none"
                onChangeText={(text) => setToken(text)}
            />

            <Button mode="contained"  onPress={() => offer()} >
                Accéder à mon offre
            </Button>

        </Background>
    );
};

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default memo(LoginScreen);
