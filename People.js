import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ListItem from "./ListItem";

type Props = {};

export default class People extends Component<Props> {

    state = {people: []}

    _onPress = (item) => {
        this.props.navigation.navigate('People', {id: item.id, name: item.name});
    };

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/person/popular?api_key=df7dcf624bfe76dee38127fa88121b87')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({people: responseJson.results});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderItem = ({item}) => (
        <ListItem
            id={item.id}
            name={item.name}
            avatar={'https://image.tmdb.org/t/p/w200/' + item.profile_path}
            onPress={this._onPress}
        />
    );

    render() {
        console.log("render");
        console.log(this.state.people);

        if (this.state.people) {
            return (
                <View style={styles.container}>

                    <FlatList
                        data={this.state.people}
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
        justifyContent: 'center',
        alignItems: 'center',
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