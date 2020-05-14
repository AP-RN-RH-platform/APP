import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';

import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import  ListItem  from '../components/ListItem';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';




const ListAnnounce = ({ navigation }) => {
  
  
   /* try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  */
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
