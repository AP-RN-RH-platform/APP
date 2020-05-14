import React, { memo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native';
import Background from '../components/Background';
import Button from '../components/Button';

import TextInput from "../components/TextInput";
import ImagePicker from "react-native-image-picker";
import AsyncStorage from "@react-native-community/async-storage";
import RNFetchBlob from 'rn-fetch-blob';


const FormCandidateScreen = ({ route,navigation }) => {

    const [role,setRole]= useState("");
    const [user,setUser]= useState("");
    const [age,setAge]= useState("");

    const [motivation,setMotivation]= useState("");
    const [salary,setSalary]= useState("");
    const [cv,setCV]= useState(null);

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
                setUser(data)
            }).catch((err) => {
                alert(err.message)
            });
    }, []);

    const candidate = () => {
        RNFetchBlob.fetch('POST', 'https://localhost:8443/media_objects', {
            Authorization : 'Bearer ' + getTokenFromStorageAsync(),
            'Content-Type' : 'multipart/form-data',
        }, [{ name : 'file', filename : cv.fileName, type: cv.type, data:RNFetchBlob.wrap(cv.uri)},
        ])
        .then((response) => {
            const res = response.json();
            const body = JSON.stringify({
                lastname: user.lastname,
                firstname: user.firstname,
                sex: user.genre,
                email: user.email,
                age: parseInt(age),
                address: user.address,
                city: user.city,
                motives: motivation,
                expectedSalary: parseInt(salary),
                offer: "/offers/"+route.params.id,
                CV: res["@id"],
                photo: user.photo
            }, null, 2);
            console.log("BODY : ",body);

            //candidat
            fetch('https://localhost:8443/applications', {
                method: 'POST',
                headers: {
                    Authorization : 'Bearer ' + getTokenFromStorageAsync(),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body
            })
            .then((response) => {
                const http_code = response.status
                //console.log("HTTP CODE : ",http_code);
                if(http_code == 201){
                    navigation.navigate('ListAnnounce')
                } else {
                    response.json().then(function(data) {
                        console.log("HTTP CODE : ",http_code);
                        console.log("JSON DATA : ",data);
                        console.log(data);
                    });
                }
            }).catch((err) => {
                console.log(err)
                alert(err.message)
            });
        }).catch((err) => {
            console.log(err)
            alert(err.message)
        })
    };

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
            label="Âge"
            returnKeyType="next"
            keyboardType={'numeric'}
            onChangeText={(text) => setAge(text)}
        />
        <TextInput
            label="Prétention salariale"
            returnKeyType="next"
            keyboardType={'numeric'}
            onChangeText={(text) => setSalary(text)}
        />
        <Button mode="contained" onPress={() => handleChooseCV()} >  Chargez votre CV </Button>

        <Button mode="contained" onPress={() => candidate()}>
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
