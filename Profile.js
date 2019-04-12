import React, {Component} from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Button,
    AsyncStorage
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

type Props = {};
export default class Profile extends Component<Props> {

    state = {
        username: '',
        name: '',
        id: null,
    };

    checkUser = async () => {
        try {
            const value = await AsyncStorage.getItem('MDB_session');
            if (value !== null) {
                if (value === 'GUEST') {
                    this.setState({username: 'Guest'})
                } else {
                    fetch('https://api.themoviedb.org/3/account?api_key=df7dcf624bfe76dee38127fa88121b87&session_id=' + value)
                        .then((response) => {
                            console.log(response);
                            this.setState({isLoading: false});
                            return response.json();

                        })
                        .then((responseJson) => {
                            console.log(responseJson);
                            const {name, username, id} = responseJson;
                            this.setState({name, username, id});
                        })
                        .catch((error) => {
                            this.setState({isLoading: false});
                            console.error(error);
                        });
                }
                // We have data!!
                console.log(value);
            }
        } catch (error) {
            console.log(error);
            // Error retrieving data
        }
    };

    componentDidMount(){
        this.checkUser();
    }

    logout = () => {
        AsyncStorage.removeItem('MDB_session');
        this.setState({name: '', username: '', id: null, initialLoad: false});
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Main' })],
        });
        this.props.navigation.dispatch(resetAction);
    };

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.header}/>
                <Image style={styles.avatar} source={require('./img/pop.jpg')}/>
                <View style={styles.body}>
                    <Text style={styles.info}>{this.state.username}</Text>
                    <Text style={[styles.id]}>{'Id: ' + this.state.id} </Text>
                    <Text style={[styles.info3]}>{'Name: ' + this.state.name} </Text>
                    <View style={[styles.info2]}>
                        <TouchableOpacity onPress={this.logout} style={styles.buttonContainer}>
                            <Text style={{color: 'white'}}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ffc830',
        height: 100,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 50
    },

    body: {
        height: 530,
        marginTop: 40,
        flexDirection: 'column',

    },

    info3: {

        marginTop: 30,
        marginLeft: 15,
        textAlign: 'left',
        // marginLeft: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',


    },
    id: {

        marginTop: 20,
        marginLeft: 15,
        textAlign: 'left',
        // marginLeft: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',


    },
    info: {

        marginTop: 50,
        justifyContent: 'flex-start',
        textAlign: 'center',
        // marginLeft: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',


    },
    info2: {

        marginTop: 130,
        textAlign: 'center',
        // marginLeft: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'flex-end',


    },


    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 250,
        borderRadius: 5,
        backgroundColor: '#ffc830',

    },

    // bottom: {
    //     alignSelf: 'flex-end'
    // },
    // container: {
    //     backgroundColor: 'red',
    //     flex: 1,
    // }

});
