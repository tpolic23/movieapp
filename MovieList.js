import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import ListItem from "./ListItem";

type Props = {};

export default class MovieList extends Component<Props> {
    state = {movies: []};

    _onPress = (item) => {
        this.props.navigation.navigate('MovieDetail', {id: item.id, originalTitle: item.name});
    };

    checkUser = async () => {
        try {
            const value = await AsyncStorage.getItem('MDB_session');
            if (value !== null) {
                // We have data!!
                console.log(value);
            } else {
                this.props.navigation.navigate('Main');
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    componentDidMount() {
        this.checkUser();

        fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=df7dcf624bfe76dee38127fa88121b87')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({movies: responseJson.results});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderItem = ({item}) => (
        <ListItem
            id={item.id}
            name={item.original_title}
            avatar={'https://image.tmdb.org/t/p/w200/' + item.poster_path}
            onPress={this._onPress}

        />
    );

    render() {
        console.log("render");
        console.log(this.state.movies);

        if (this.state.movies) {
            return (
                <View style={styles.container}>

                    <FlatList
                        data={this.state.movies}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderItem}

                    /></View>
            );
        } else {
            return <Text style={styles.movies}>Empty</Text>
        }
    }
}
const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        color: 'black',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 1,
    },
});