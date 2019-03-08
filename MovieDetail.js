import React, {Component} from "react";
import {Text, View, Button, FlatList, Image, ScrollView, StyleSheet} from "react-native";
import MovieList from "./MovieList";
import {createStackNavigator} from 'react-navigation';


const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    title: {
        marginTop: 20,
        marginLeft: 20,
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

export default class MovieDetail extends React.Component {

    state = {
        movie: null,
    };

    componentDidMount() {
        const {navigation} = this.props;
        const id = navigation.getParam('id');
        console.log('id');
        console.log(id);

        fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=df7dcf624bfe76dee38127fa88121b87&language=en-US')
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
            const {title, release_date, original_language, runtime, overview, status, vote_average, vote_count, popularity, poster_path} = movie;

            return (
                <ScrollView>
                    <View style={{flex: 1, flexDirection: 'column'}}>

                        <Text style={[styles.title]}>{title} </Text>
                        <View style={{flexDirection: 'column'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{
                                    flex: 100,
                                    fontSize: 20,
                                    alignSelf: 'flex-start',
                                    marginLeft: 20
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
                                flex: 100,
                                marginLeft: 25,
                                fontSize: 20
                            }}> {runtime} min</Text>
                            <Text style={{
                                flex: 100,
                                fontSize: 20
                            }}> {release_date}</Text>
                            <Text style={{
                                flex: 100,
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
// const RootStack = createStackNavigator(
//     {
//         MovieList: { screen: MovieList},
//         MovieDetail: { screen: MovieDetail }
//     },
//     {
//         initialRouteName: 'MovieList',
//     }
// );
// export default class App extends React.Component {
//     render() {
//         return <RootStack />;
//     }
// }