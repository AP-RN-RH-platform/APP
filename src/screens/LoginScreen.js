import React, { memo, useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from 'react-native-dotenv';

const LoginScreen = ({ navigation }) => {

const [email,setEmail]= useState("");
const [password,setPassword]= useState("");

const login = () => {
    console.log("API : ",API_URL);
    fetch(API_URL+'/authentication_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.code){
            return alert(data.message)
        }
        AsyncStorage.setItem(
        'token',data.token
        );
        AsyncStorage
        navigation.navigate('Profile')
    }).catch((err) => {
        alert(err)
    });
};

    return (
        <Background>
            <Logo />
            <TextInput
                label="Email"
                returnKeyType="next"
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
            />

            {/*<View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text style={styles.label}>Forgot your password?</Text>
                </TouchableOpacity>
    </View> */}

            <Button mode="contained"  onPress={() => login()} >
                Se connecter
            </Button>

            <View style={styles.row}>
                <Text style={styles.label}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
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
