import React, {Component} from "react";
import {Text, View, Image, ScrollView, StyleSheet, TextInput, Button, TouchableOpacity, Linking} from "react-native";
import MovieList from './MovieList';

export default class Enter extends Component {

    state = {
        movie: null,
        isLoading: false,
    };

    componentDidMount() {
        const {navigation} = this.props;
        const id = navigation.getParam('id');

        this.setState({isLoading: true});

        fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=df7dcf624bfe76dee38127fa88121b87&language=en-US')
            .then((response) => {
                this.setState({isLoading: false});
                return response.json();
            })
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({movie: responseJson});
            })
            .catch((error) => {
                this.setState({isLoading: false});
                console.error(error);
            });
    }


    static navigationOptions = {
        header: null
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>MDB</Text>
                <Image source={require('./img/2.png')}
                       style={{width: 300, height: 320, alignItem: 'center',marginLeft: 50}}/>
                <TextInput
                    style={styles.input}
                    placeholder={"Username"}
                    placeholderTextColor={'#fff'}
                    onChangeText={(text) => this.setState({input: text})}
                />
                <TextInput
                    style={styles.input}
                    placeholder={"Password"}
                    placeholderTextColor={'#fff'}
                    onChangeText={(text) => this.setState({input: text})}
                />
                <TouchableOpacity style={{

                    width:200,
                    alignSelf: 'center',
                    marginBottom: 15,
                    marginTop: 10,
                    backgroundColor: 'rgba(182,182,182, 0.7)',
                    borderColor: 'rgba(182,182,182, 0.7)',
                    borderWidth: 1,
                    borderRadius: 5,


                }}>
                <Button

                    onPress={() => navigate('')}
                    title="Log In"
                />
                </TouchableOpacity>



                <Text style={{textAlign:'center',}}>Or</Text>



                <TouchableOpacity style={{
                    backgroundColor: '#f7455b',
                    borderColor: '#f7455b',
                    width:200,
                    alignSelf: 'center',
                    marginTop: 15,
                    borderWidth: 1,
                    borderRadius: 5,
                    color: "white"

                }}>
                <Button
                    onPress={() => navigate('First')}
                    title="Skip"
                />
                </TouchableOpacity>




                <Text style={{color: 'blue',textAlign:"center",marginTop:60}}
                      onPress={() => Linking.openURL('https://www.themoviedb.org/')}>
                    Don't have account? Click here!
                </Text>

            </View>
        );
    }


}
const styles = StyleSheet.create(
    {
        container: {
        flex: 1,
        backgroundColor:'#ffc830',
},
        title:{
            // fontSize:30,

            marginTop: 70,
            textAlign:'center',
            marginLeft: 20,
            fontSize: 60,
            fontWeight: 'bold',

        },
        input:{
            height: 40,
            padding: 6,
            borderRadius: 5,
            color:'black',
            margin: 10,
            backgroundColor: 'rgba(182,182,182, 0.7)',

        }
});