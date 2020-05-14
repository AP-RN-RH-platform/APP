import * as React from 'react';
import { Avatar, Card, Caption, Paragraph,Text } from 'react-native-paper';


//const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const ListItem = ({ children }) => (
  <Card>
    <Card.Title title={children.title} subtitle={children.company}  />
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Content>
      <Text>{children.type}</Text>
      <Paragraph>{children.offerdesc}</Paragraph>
      <Caption>{children.place}</Caption>
    </Card.Content>
  </Card>
);

export default ListItem;