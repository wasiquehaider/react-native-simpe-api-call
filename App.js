import React from "react";
import { FlatList, Text, View, StyleSheet,StatusBar, Image, ActivityIndicator, TouchableOpacity, ToastAndroid } from "react-native";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: false
    };
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{flex:1, flexDirection: 'row', marginBottom: 3}}
      onPress={() => ToastAndroid.show(item.title, ToastAndroid.SHORT)}>

        <Image style={{width: 80, height: 80, margin: 5}} 
        source={{ uri: item.thumbnailUrl }} />
        <View style={{flex:1, justifyContent: 'center', marginLeft:5}}>
          <Text style={{fontSize:18, color: 'green', marginBottom: 15}}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderSeperator = () => {
    return(
      <View style={ {height:1, width:'100%', backgroundColor:'black'}}></View>
    )
  }

  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/photos";
    fetch(url)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          dataSource: resJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      this.state.isLoading
      ?
      <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#330066"/>
      </View>
      :
      <View style={styles.container}>
        <Text style={styles.heading}>Simple Api Call</Text>
        <FlatList data={this.state.dataSource} renderItem={this.renderItem} 
        keyExtractor={(item, index) => `list-item-${index}`}
        ItemSeparatorComponent={this.renderSeperator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FcFF",
    marginTop: 30
  },
  heading: {
    fontSize: 20,
    textAlign: 'center'
  }

});
