import React, {useState} from 'react';
import { StyleSheet, Text,ViewComponent,StatusBar,Platform, TouchableOpacity, TouchableNativeFeedback, View, Button, SafeAreaView, Image, Alert, SectionList } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator, HeaderHeightContext, HeaderTitle} from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';
import { Value } from 'react-native-reanimated';


class Kategoria{
    constructor(nazwa:String){  
        this.nazwa=nazwa;
    }
    nazwa:String;
}
class Wydatek{
    constructor(nazwa:String,kategoria:Kategoria,koszt:Number){
        this.nazwa=nazwa;
        this.kategoria=kategoria;
        this.koszt=koszt;
    }
    nazwa:String;
    kategoria:Kategoria;
    koszt:number;
}


class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.kategorie.push(new Kategoria('Konieczne'));
    this.kategorie.push(new Kategoria('Przyjemności'));
    this.kategorie.push(new Kategoria('Niespodziewane'));
    }
    kategorie = Array<Kategoria>();
    wydatki = Array<Wydatek>();
    
    Stack = createStackNavigator();
    
    StartScreen = ({ navigation }: any) => {
        return (
            <View style={styles.Startscreen}>
                <Text>
                    Witam, co chcesz dziś zrobić?
                </Text>
                <Button title='Przejdź do moich wydatków' onPress={() => navigation.navigate('current')}></Button>
                <Button title='Dodaj nowy wydatek' onPress={() => navigation.navigate('AddNewSpendings')}></Button>

            </View>
        )
    }
    
    current = ({ navigation }: any) => {
        let num = 0;
        return (
            <View style={{
                flex: 1,
                alignItems: 'stretch'
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                }}>
                    <View style={{
                        backgroundColor: '#fff',
                        width: '40%',
                    }}>
                        <Text style={styles.currenttext}>Nazwa</Text>
                        {this.wydatki.map((prop, key) => {
                            return (
                                <Text key={key} style={styles.currenttext}>{prop.nazwa} </Text>);
                        })}
                    </View>
                    <View style={{
                        backgroundColor: '#ddd',
                        width: '40%'
                    }}>
                        <Text style={styles.currenttext} >Kategoria</Text>
                        {this.wydatki.map((prop, key) => {
                            return (
                                <Text numberOfLines={1} key={key} style={styles.currenttext}>{prop.kategoria.nazwa} </Text>);
                        })}
                    </View>
                    <View style={{
                        backgroundColor: '#aaa',
                        width: '20%'
                    }}>
                        <Text style={styles.currenttext}>Koszt</Text>
                        {this.wydatki.map((prop, key) => {
                            return (
                                <Text key={key} style={styles.currenttext}>{String(prop.koszt)} </Text>);
                        })}
                    </View>
                </View>
                <View>{this.wydatki.map((prop, key) => {
                    
                    num += prop.koszt;
                    return <Text style={{ textAlign:'right' }} key={key}>{num} </Text>
                })}
                </View>
                <View>
                    <Button title='Dodaj nowy wydatek' onPress={() => navigation.navigate('AddNewSpendings')}></Button>
                </View>
            </View>
        );
    }
  
     x=new Wydatek('',new Kategoria(''),0);  
    
    AddNewSpendings = ({ navigation }: any) => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}>
                    <Text style={{ fontSize: 30, textAlign:'center' }}> Nazwa</Text>
                    <TextInput style={styles.input}
                        placeholder='np.Paliwo'
                        onChangeText={text => { this.x.nazwa = String(text) }}
                    ></TextInput>
                </View>
                <View style={{
                    height: 140,
                    backgroundColor: 'ddd'
                }}>
                    <Text style={{ fontSize: 30, textAlign: 'center' }}>Kategorie</Text>
                    {this.kategorie.map((prop, key) => {
                        return (
                            <Button title={String(prop.nazwa)} key={key} onPress={() => {
                                this.x.kategoria = prop
                            }}>
                            </Button>
                        );
                    })}
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: '#aaa'
                }}>
                    <Text style={{ fontSize: 30, textAlign:'center' }}>Koszt</Text>
                    <TextInput keyboardType={"numeric"} style={styles.input}
                        placeholder='np.300'
                        onChangeText={text => this.x.koszt = parseInt(text)}></TextInput>
                </View>
                <View>
                    <Button title='Dodaj' onPress={() => {
                        this.wydatki.push(new Wydatek(this.x.nazwa, this.x.kategoria, this.x.koszt)); navigation.navigate('current')
                    }}></Button>
                </View>

            </View>
        )
    };
  
  
    
  render() {
    return (
      <NavigationContainer>
        <this.Stack.Navigator initialRouteName='StartScreen'>
          <this.Stack.Screen name='StartScreen' component={this.StartScreen} options={{headerTitle:'Zarządzanie wydatkami'}}></this.Stack.Screen>
          <this.Stack.Screen name='current' component={this.current} options={{headerTitle:'Twoje wydatki'}}></this.Stack.Screen>
          <this.Stack.Screen name='AddNewSpendings' component={this.AddNewSpendings} options={{headerTitle:'Dodaj nowy wydatek'}}></this.Stack.Screen>
        </this.Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
    Startscreen: {
        backgroundColor: '#aaa',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 30,

    },
    current: {
        flex: 1,
        backgroundColor: '#ae21',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    AddNewSpendings: {
        flex: 1,
        backgroundColor: '#f321',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    input: {
        padding: 10,
    },
    currenttext: {
        fontSize: 20,
        borderColor: 'black',
        borderWidth: 1,
        textAlign: 'center',
    }
})

export default () => {
    return (
        <App />
    )
};