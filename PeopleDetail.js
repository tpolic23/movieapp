import React, {Component} from "react";
import {Text, View, Image, ScrollView, StyleSheet} from "react-native";


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

    overview: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,


    },
    popular:{
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom:20,
        fontSize: 20

    },
    vote_average: {
        marginRight: 50,
        fontSize: 20

    },

    bio:{
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        fontSize: 20

    }

});

export default class PeopleDetail extends Component {

    state = {
        people: null,
        isLoading: false,
    };

    componentDidMount() {
        const {navigation} = this.props;
        const id = navigation.getParam('id');

        this.setState({isLoading: true});

        fetch('https://api.themoviedb.org/3/person/' + id + '?api_key=df7dcf624bfe76dee38127fa88121b87&language=en-US')
            .then((response) => {
                this.setState({isLoading: false});
                return response.json();
            })
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({people: responseJson});
            })
            .catch((error) => {
                this.setState({isLoading: false});
                console.error(error);
            });
    }


    render() {
        const {navigation} = this.props;
        const id = navigation.getParam('id');

        const {people, isLoading} = this.state;

        if (isLoading) {
            return <Text>Loading</Text>
        }

        if (people) {
            const {name,  popularity, profile_path,biography,known_for_department,birthday,place_of_birth} = people;

            return (
                <ScrollView>
                    <View style={{flex: 1, flexDirection: 'column'}}>

                        <Text style={[styles.title]}>{name} </Text>
                        <Text style={[styles.bio]}>{known_for_department}</Text>


                        <Image source={{uri: 'https://image.tmdb.org/t/p/w780/' + profile_path + ''}}
                               style={{width: 300, height: 420, marginTop: 10, alignItem: 'center',marginLeft: 35}}/>

                        <Text style={[styles.bio]}>Birthday: {birthday}</Text>
                        <Text style={[styles.bio]}>Born: {place_of_birth}</Text>
                        <Text style={[styles.bio]}>Biography: </Text>
                        <Text style={[styles.overview]}> {biography}</Text>



                        <Text style={[styles.popular]}>Popularity: {popularity}</Text>



                    </View>
                </ScrollView>
            );
        }
        return <Text>Sorry, there is no selected person</Text>
    }
}