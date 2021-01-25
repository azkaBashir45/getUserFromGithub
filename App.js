import { StatusBar } from 'expo-status-bar';
import React ,{useEffect,useState}from 'react';
import { Avatar,Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Text, TextInput, View ,Button} from 'react-native';

export default function App() {
 const[name,setName]=useState();
 const[login,setLogin]=useState();
 const[followers,setFollowers]=useState();
 const[following,setFollowing]=useState();
 const[repos,setRepos]=useState();
 const[avatar,setAvatar]=useState();
 const[userInput,setInput]=useState();
 const[error,setError]=useState();

useEffect(()=>{
  fetch('https://api.github.com/users/example')
  .then(res=>res.json())
  .then(data=>{
    setData(data)
    // console.log(data)
  });
},[]);
//for data set
const setData=({name,login,followers,following,public_repos,avatar_url})=>{
  setName(name)
  setLogin(login)
  setFollowers(followers)
  setFollowing(following)
  setRepos(public_repos)
  setAvatar(avatar_url)

}
//handle input
const handleInput=(text)=>{
setInput(text)
}
//handle serarch
const handleSearch=()=>{
  fetch(`https://api.github.com/users/${userInput}`)
  .then(res=>res.json())
  .then(data=>{
    //check error when not found
    if(data.message)
    {
      setError(data.message)
    }
    else
    {
      setData(data)
    }
  })
}
  return (
    <View style={styles.container}>
      <View>
        <TextInput
        placeholder="User name"
        onChangeText={text=>handleInput(text)
        }>
        </TextInput>
        <Button title="Search" icon="camera" mode="contained" onPress={() =>{handleSearch()}}>
  </Button>
      </View>
    <View>
    <Card>
    <Card.Content>
      <Title>{name}</Title>
      <Paragraph>{login}</Paragraph>
      <Paragraph>{followers} followers</Paragraph>
      <Paragraph>{following} Following</Paragraph>
      <Paragraph>{repos} public_repos</Paragraph>
    </Card.Content>
    <Card.Cover source={avatar} />
  </Card>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
