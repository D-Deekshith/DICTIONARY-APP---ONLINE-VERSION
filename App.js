import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

export default class App extends Component{

  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      word: '',
      lexicalCategory: '',
      example: [],
      defination: ''
    }
  }

  getWord = (word) => {
    var searchKeyWord = word.toLowerCase()
    var url = 'https://rupinwhitehatjr.github.io/dictionary/'+searchKeyWord+'.json';

      return fetch(url)
      .then((data) =>{
        if(data.status === 200){
          return data.json()
        }
      })

      .then((response) => {
       var responseObject = response

       if(responseObject){
        var wordData = responseObject.definitions[0]
        var definition = wordData.description
        var lexicalCategory = wordData.wordtype

        this.setState({
          word: this.state.text,
          defination: definition,
          lexicalCategory: lexicalCategory
        })
       } else {
        alert(" The word "+ this.state.text + " is " + undefined)
        this.setState({
          word: "Undefined",
          defination: 'Not Found',
          lexicalCategory: 'Null'
        })
      }
      })
       
    }

  render(){
    return(
      <View>
        <Text style = {styles.heading}>Pocket Dictionary</Text>
        <TextInput
        style = {styles.textInput}
        onChangeText = {(text) =>{
          this.setState({
            text: text,
            isSearchPressed: false,
            word: 'Loading...',
            lexicalCategory: '',
            example: [],
            defination: ''
          });
        }}
        value = {this.state.text}
        />

        <TouchableOpacity
          style={styles.seacrh}
          onPress={() =>{
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text)
          }
          }>
          <Text>Search</Text>
        </TouchableOpacity>

        <View>
      <View>
      <Text style = {{
        marginLeft: 100,
        color: 'orange',
        fontWeight: 'bold',
        marginTop: 50
      }}>
        Word : {""}
      </Text>
      <Text style = {{
        marginLeft: 100,
      }}>
        {this.state.word.toUpperCase()}
      </Text>
      </View>
      <View>
        <Text style = {{
        marginLeft: 100,
        color: 'orange',
        fontWeight: 'bold',
        marginTop: 10
      }}>
          Type : {""}
        </Text>
        <Text style = {{
        marginLeft: 100,
      }}>
          {this.state.lexicalCategory}
        </Text>
      </View>
      <View>
        <Text style = {{
        marginLeft: 100,
        color: 'orange',
        fontWeight: 'bold',
        marginTop: 10
      }}>
          Definition : {""}
        </Text>
        <Text style = {{
        marginLeft: 100,
        marginRight: 1000
      }}>
          {this.state.defination}
        </Text>
      </View>
    </View>

      </View>
    );
  };

};

const styles = StyleSheet.create({
  heading: {
    backgroundColor: 'purple',
    color: 'white',
    padding: 15,
    marginRight: 900,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'times new roman'
  },
  textInput: {
    backgroundColor: 'yellow',
    marginLeft: 100,
    marginRight: 1000,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 50,
    textAlign: 'center',
    height: 40,
    color: 'grey'
  },
  seacrh: {
    backgroundColor: 'cyan',
    marginTop: 30,
    marginLeft: 150,
    marginRight: 1050,
    borderWidth: 2,
    borderColor: 'black',
    textAlign: 'center',
    height: 30,
    justifyContent: 'center'
  }
})
