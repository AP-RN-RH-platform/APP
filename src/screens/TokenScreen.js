import React, { memo, useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';

import { AsyncStorage } from 'react-native';

const LoginScreen = ({ navigation }) => {

    const [token,setToken]= useState("");

    const offer = () => {
        fetch('https://localhost:8443/send_invitation{token}', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            })
        })
            .then((response) => response.json())
            .then((data) => {
                AsyncStorage.setItem(
                    'token',data.token
                );
                navigation.navigate('Offre')
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