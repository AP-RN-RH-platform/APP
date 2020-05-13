import React, { memo, useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';



const LoginScreen = ({ navigation }) => {
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
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                secureTextEntry
            />

            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text style={styles.label}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>

            <Button mode="contained" >
                Login
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
