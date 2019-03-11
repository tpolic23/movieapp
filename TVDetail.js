import React, {Component} from "react";
import {Text, View, Button, FlatList, Image, ScrollView, StyleSheet} from "react-native";
import TVShows from "./TVShows";
import {createStackNavigator} from 'react-navigation';


const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    name: {
        marginTop: 20,
        marginLeft: 16,
        fontSize: 30,
        fontWeight: 'bold',
    },
    popularity: {
        margin: 10,
        alignSelf: 'center'
    },
    overview: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        alignSelf: 'center'

    },
    vote_average: {
        marginRight: 50,
        fontSize: 20

    }

});

export default class TVDetail extends React.Component {

    state = {
        movie: null,
    };

    componentDidMount() {
        const {navigation} = this.props;
        const id = navigation.getParam('id');
        console.log('id');
        console.log(id);

        fetch('https://api.themoviedb.org/3/tv/' + id + '?api_key=df7dcf624bfe76dee38127fa88121b87&language=en-US')
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({movie: responseJson});
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        const {navigation} = this.props;
        const id = navigation.getParam('id');

        const {movie} = this.state;

        if (movie) {
            const {name, first_air_date, original_language,
                overview, status, vote_average, vote_count, popularity, poster_path} = movie;

            return (
                <ScrollView>
                    <View style={{flex: 1, flexDirection: 'column'}}>

                        <Text style={[styles.name]}>{name} </Text>
                        <View style={{flexDirection: 'column'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{
                                    flex: 100,
                                    fontSize: 20,
                                    alignSelf: 'flex-start',
                                    marginLeft: 16
                                }}> {status}</Text>

                                <Text style={{
                                    flex: 100,
                                    alignSelf: 'flex-end',
                                    fontSize: 20,
                                    marginLeft: 190
                                }}>{vote_average}/10</Text>
                            </View>
                            <Text style={{
                                flex: 100,
                                alignSelf: 'flex-end',
                                fontSize: 15,
                                marginRight: 30
                            }}>{vote_count}</Text>
                        </View>


                        <Image source={{uri: 'https://image.tmdb.org/t/p/w780/' + poster_path + ''}}
                               style={{width: 300, height: 420, marginTop: 10, alignItem: 'center',marginLeft: 35}}/>
                        <View style={{flexDirection: 'row', justifyContent: 'center',marginTop:10}}>


                            <Text style={{
                                flex: 1,
                                alignSelf: 'flex-start',
                                fontSize: 20,
                                marginLeft: 100
                            }}> {first_air_date}</Text>
                            <Text style={{
                                flex: 1,
                                marginLeft: 10,
                                alignSelf: 'flex-end',
                                fontSize: 20
                            }}> {original_language}</Text>
                        </View>


                        <Text style={[styles.overview]}> {overview}</Text>

                        <Text style={[styles.popularity]}>Popularity: {popularity}</Text>



                    </View>
                </ScrollView>
            );
        } else {
            return <Text>Sorry, there is no selected movie</Text>
        }


    }
}
