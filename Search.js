import React, {Component} from "react";
import {View, TextInput, StyleSheet, FlatList, Button} from 'react-native'
import ListItem from "./ListItem";
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAppContainer, createStackNavigator, createBottomTabNavigator,} from 'react-navigation';
export default class Search extends Component<Props> {
    state = {results: []}

    _onPress = (item) => {
        this.props.navigation.navigate('ListItem', {
            id: item.id,
            name: item.name,
            avatar: item.avatar,
            media: item.media
        });
    };

    /**
     *
     * Fetching through API key to get multiple search which is searching by name and which media_type is it
     */
    search = () => {
        const {term} = this.state;
        const {navigation} = this.props;
        if (term) {
            fetch('https://api.themoviedb.org/3/search/multi?api_key=df7dcf624bfe76dee38127fa88121b87&language=en-US&page=1&include_adult=false&query=' + this.state.term)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({results: responseJson.results});
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    /**
     * search will search through renderItem media_type so see if person is searching for tv,person(star) or movie
     * @param item
     * @returns {*}
     */

    /**
     * onPress is going to navigate by id to TVDetail page
     * when clicking it will open TVDetail screen with details
     */
    onTVDetailPress = (item) => {
        this.props.navigation.navigate('TVDetail', { id: item.id});
    };
    /**
     * onPress is going to navigate by id to MovieDetail page
     * when clicking it will open MovieDetail screen with details
     */
    onMovieDetailPress=(item)=>{
        this.props.navigation.navigate('MovieDetail', { id: item.id});
    };
    /**
     * onPress is going to navigate by id to PersonDetail page
     * when clicking it will open PersonDetail screen with details
     */
    onPersonDetailPress=(item)=>{
         this.props.navigation.navigate('PeopleDetail', { id: item.id});
    };



    renderItem = ({item}) => {
        if (item.media_type === 'tv') {
            return (
                <ListItem
                    id={item.id}
                    name={item.original_name}
                    avatar={'https://image.tmdb.org/t/p/w200/' + item.poster_path}
                    media={item.media_type}
                    onPress={this.onTVDetailPress}//this is navigating to line 48 onTvDetailPress
                />


            );

        } else if (item.media_type === 'person') {
            return (
                <ListItem
                    id={item.id}
                    name={item.name}
                    avatar={'https://image.tmdb.org/t/p/w200/' + item.profile_path}
                    media={item.media_type}
                    onPress={this.onPersonDetailPress}//this is navigating to line 63 onPersonDetailPress
                />
            );

        } else if (item.media_type === 'movie') {
            return (
                <ListItem
                    id={item.id}
                    name={item.original_title}
                    avatar={'https://image.tmdb.org/t/p/w200/' + item.poster_path}
                    media={item.media_type}
                    onPress={this.onMovieDetailPress}//this is navigating to line 55 onMovieDetailPress

                />
            );

        }


    };


    render(){
        if (this.state.results) {
            return (
                <View style={styles.container}>
                    <View
                        style={{flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', padding: 5}}
                    >
                        <TextInput
                            style={{
                                flex: 7,
                                fontSize: 18,
                                padding: 6,
                                textAlign: 'center',
                                backgroundColor: 'lightgray',
                                borderRadius: 5,
                                margin: 10,

                            }}
                            placeholder="Search here"
                            onChangeText={(term) => this.setState({term})}
                            value={this.state.text}
                        />
                        <Icon name="search" size={23}
                              style={{flex: 1}} onPress={this.search}  color="gray"/>



                    </View>
                    <FlatList
                        data={this.state.results}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderItem}
                    />
                </View>

            )
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
        flexDirection: 'column',
        color: 'black',
    }
});
