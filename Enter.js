import React, {Component} from "react";
import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    Button,
    TouchableOpacity,
    Linking,
    Alert
} from "react-native";
import {SafeAreaView} from 'react-navigation';
import {AsyncStorage} from 'react-native';


export default class Enter extends Component {

    state = {
        username: '',
        password: '',
        isLoading: false,
    };

    alertError = (message) => {
        Alert.alert(
            'Login',
            message,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
        // TO DO napraviti alert error https://facebook.github.io/react-native/docs/alert
    };

    validate = (reqtoken) => {
        /**
         * Fetching the authentication token to validate with login for session
         */

        fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=df7dcf624bfe76dee38127fa88121b87', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                request_token: reqtoken
            }),

        })
            .then((response) => {
                this.setState({isLoading: false});
                return response.json();
            })
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson && responseJson.success) {
                    this.createSession(responseJson.request_token);
                } else {
                    this.alertError(responseJson.status_message);
                }
            })
            .catch((error) => {
                this.setState({isLoading: false});
                this.alertError(error);
            });

    };

    createSession = (reqtoken) => {
        fetch('https://api.themoviedb.org/3/authentication/session/new?api_key=df7dcf624bfe76dee38127fa88121b87', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                request_token: reqtoken,
            }),
        })
            .then((response) => {
                this.setState({isLoading: false});
                return response.json();
            })
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson && responseJson.success) {
                    console.log('success');
                    this._storeData(responseJson.session_id);
                    this.props.navigation.navigate('First');
                } else {
                    this.alertError(responseJson.status_message);
                }
            })
            .catch((error) => {
                this.alertError(error);
                this.setState({isLoading: false});
            });
    };

    login = () => {

        this.setState({isLoading: true});
        /**
         * Fetching the token to get request token number for session
         */
        fetch('https://api.themoviedb.org/3/authentication/token/new?api_key=df7dcf624bfe76dee38127fa88121b87')
            .then((response) => {
                this.setState({isLoading: false});
                return response.json();
            })
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson && responseJson.success) {
                    this.validate(responseJson.request_token)
                } else {
                    this.alertError(responseJson.status_message);
                }
            })
            .catch((error) => {
                this.setState({isLoading: false});
                this.alertError(error);
            });
    };

    skip = () => {
        this._storeData('GUEST')
        this.props.navigation.navigate('First');
    };

    _storeData = async (session) => {
        try {
            console.log('store data ' + session);
            await AsyncStorage.setItem('MDB_session', session);
        } catch (error) {
            console.log(error)
            // Error saving data
        }
    };

    static navigationOptions = {
        header: null
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>MDB</Text>

                    <View style={styles.imageContainer}>
                        <Image source={require('./img/2.png')}
                               style={{width: 250, height: 260}}/>
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            value={this.state.username}
                            textContentType="username"
                            autoCapitalize="none"
                            placeholder={"Username"}
                            placeholderTextColor={'#fff'}
                            onChangeText={(text) => this.setState({username: text})}
                        />
                        <TextInput
                            style={styles.input}
                            textContentType="password"
                            secureTextEntry
                            autoCapitalize="none"
                            placeholder={"Password"}
                            placeholderTextColor={'#fff'}
                            onChangeText={(text) => this.setState({password: text})}
                        />
                        <TouchableOpacity style={{
                            width: 200,
                            alignSelf: 'center',
                            marginBottom: 5,
                            marginTop: 15,
                            backgroundColor: 'rgba(182,182,182, 0.7)',
                            borderColor: 'rgba(182,182,182, 0.7)',
                            borderWidth: 1,
                            borderRadius: 5,
                        }}>
                            <Button
                                onPress={() => this.login()}
                                title="Log In"
                                color="#ffff"
                            />
                        </TouchableOpacity>

                        <Text style={{textAlign: 'center',}}>Or</Text>

                        <TouchableOpacity style={{
                            backgroundColor: '#f7455b',
                            width: 200,
                            alignSelf: 'center',
                            marginTop: 5,
                            borderRadius: 5,
                            color: "white"

                        }}>
                            <Button
                                onPress={this.skip}
                                title="Skip"
                                color="#ffff"
                            />
                        </TouchableOpacity>

                        <Text style={{color: 'blue', textAlign: "center", marginBottom: 10, marginTop: 20}}
                              onPress={() => Linking.openURL('https://www.themoviedb.org/')}>
                            Don't have account? Click here!
                        </Text>
                    </View>
                </View>
            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#ffc830',
        },
        title: {
            flex: 1,
            marginTop: 20,
            textAlign: 'center',
            fontSize: 60,
            fontWeight: 'bold',
        },
        imageContainer: {
            flex: 5,
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        input: {
            height: 40,
            padding: 6,
            borderRadius: 5,
            color: 'black',
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: 'rgba(182,182,182, 0.7)',
        },
        formContainer: {
            flexDirection: 'column',
        },

    });