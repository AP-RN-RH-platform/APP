import * as React from 'react';
import { Avatar, Card, Caption, Paragraph,Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';


//const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const ListItem = ({ children }) => (
  <Card style={styles.card}>
    <Card.Title title={children.title} subtitle={children.company}  />
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Content>
      <Text>{children.type}</Text>
      <Paragraph style={styles.sectionDescription}>{children.offerdesc}</Paragraph>
      <Caption>{children.place}</Caption>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  card: {
    fontSize: 12,
    padding: 30,
  },
});
export default ListItem;
