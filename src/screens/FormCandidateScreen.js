import React, { memo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native';
import Background from '../components/Background';
import Button from '../components/Button';

import { List } from 'react-native-paper';
import TextInput from "../components/TextInput";
import ImagePicker from "react-native-image-picker";
import AsyncStorage from "@react-native-community/async-storage";



const FormCandidateScreen = ({ route,navigation }) => {

    const [role,setRole]= useState("");

    const [motivation,setMotivation]= useState("");
    const [salary,setSalary]= useState("");
    const [picture,setCV]= useState(null);

    const getTokenFromStorageAsync = async () => {
        var value = await AsyncStorage.getItem('token')
        return value
    }

    const handleChooseCV = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                setCV(response)
            }
        })
    }

    useEffect(() => {
        fetch('https://localhost:8443/current_user',
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
                setRole(data.roles[0])
            });
    }, []);

    return (
    <ScrollView>
    <Background>
        <TextInput
            multiline={true}
            numberOfLines = {4}
            label="Lettre de motivation"
            returnKeyType="next"
            onChangeText={(text) => setMotivation(text)}
        />
        <TextInput
            label="Prétention salariale"
            returnKeyType="next"
            keyboardType={'numeric'}
            onChangeText={(text) => setSalary(text)}
        />
        <Button mode="contained" onPress={() => handleChooseCV()} >  Chargez votre CV </Button>

        <Button mode="contained" onPress={() => navigation.navigate('FormCandidate')}>
              Envoyer ma candidature
      </Button>
    </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    taille: {
      width:300,
    }
  });


export default memo(FormCandidateScreen);
