import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Button} from 'react-native';

type Props = {};
export default class Profile extends Component<Props> {


    render() {
        const {navigate} = this.props.navigation;
        return (

            <View style={styles.container}>
                <View style={styles.header}/>
                <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                <View style={styles.body}>
                    <Text style={styles.info}>
                        Guest</Text>
                    <Text style={styles.info2}>
                        #871530364528121</Text>
                </View>

                <View style={styles.bottom}>
                    <Text style={styles.info3}>To rate movie, tv shows and people please Log In</Text>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => navigate('Main')}>
                        <Button
                            onPress={() => navigate('Main')}
                            title="Log In"
                            color="#ffff"
                        />
                    </TouchableOpacity>
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
        marginTop: 40,
    },


    info: {

        marginTop: 70,
        textAlign: 'center',
        // marginLeft: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',

    },

    info2: {

        marginTop: 10,
        textAlign: 'center',
        // marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',

    },
    info3: {
        marginTop: 10,
        textAlign: 'center',
        // marginLeft: 20,
        fontSize: 10,
        fontWeight: 'bold',
        color: 'black',
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
