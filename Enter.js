import React, {Component} from "react";
import {Text, View, Image, ScrollView, StyleSheet} from "react-native";




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


            </View> );
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

        }

});