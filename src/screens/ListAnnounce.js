import React, { memo } from 'react';
import  ListItem  from '../components/ListItem';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { AsyncStorage } from 'react-native';


const ListAnnounce = ({ navigation }) => {
  
  
  const value = AsyncStorage.getItem('token');
  console.log(value);
  
  fetch('https://localhost:8443/offer', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + value,
        },
      
      })

  return(
    <ListItem children={{'title':"test", 'company':"test2", 'offerdesc':"test3", 'place':"test","type":"testtest"}}>

    </ListItem>)
  
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default memo(ListAnnounce);
