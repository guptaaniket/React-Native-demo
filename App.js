import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Linking} from 'react-native';
import {Icon, Right, Left, Col, Row} from 'native-base';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        setLoading(false);
        setPosts(res.data);
        setError('');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setPosts({});
        setError('Something went wrong!');
      });
  }, []);

  const deletePost = (id) => {
    console.log(id);
    posts.filter((item)=>item.id!== id)
    // setPosts({data})
  };
  const postDataRender = () => {
    return (
      <FlatList
        style={styles.flatcontainer}
        data={posts}
        renderItem={({item}) => (
          <View style={item.id % 2 === 0 ? styles.rightaln : styles.leftaln}>
            <Row>
              <Col size={90}>
                <Left>
                  <Text style={styles.itemName}>Name: {item.name}</Text>
                  <Text style={styles.itemEmail}>Email: {item.email}</Text>
                  <Text style={styles.itemAdd}>
                    {item.address.suite},{item.address.city},{item.address.city}
                    -{item.address.zipcode}
                  </Text>
                  <Text style={styles.itemPhone}>Phone: {item.phone}</Text>
                  <Text
                    style={styles.itemStatic}
                    onPress={() => Linking.openURL('/')}>
                    anastasia.net
                  </Text>
                </Left>
              </Col>
              <Col size={10}>
                <Right>
                  <Icon
                    style={styles.icon}
                    type="FontAwesome"
                    name="trash-o"
                    onPress={() => deletePost(item.id)}
                  />
                </Right>
              </Col>
            </Row>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    );
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>loading...</Text>
      ) : (
        postDataRender()
      )}
      {error ? <Text>{error}</Text> : null}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  flatcontainer: {},
  loadingText: {
    margin:'auto',
    textAlign:'center',
    height:'100%'
  
    // justifyContent: 'center',
    // alignSelf: 'center',

  },
  container: {
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  icon: {
    color: 'red',
    fontSize: 20,
  },
  itemStatic: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
    fontSize: 14,
  },
  leftaln: {
    backgroundColor: '#fcfcfc',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    margin: 5,
    width: '85%',
    alignContent:'flex-start'
  },
  rightaln: {
    backgroundColor: '#fcfcfc',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    margin: 5,
    width: '85%',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignContent:'flex-start'
  },
});
