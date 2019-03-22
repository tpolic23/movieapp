import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import ListItem from "./ListItem";
type Props = {};

export default class TopRated extends Component<Props> {

    state = {movies: []}

    _onPress = (item) => {
        this.props.navigation.navigate('MovieDetail', {id: item.id, originalTitle: item.name});
    };

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=df7dcf624bfe76dee38127fa88121b87')
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
    movies: {
        paddingLeft: 10,
        alignSelf: 'center',
        fontSize: 18,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 1,
    },
});
// class MovieDetails extends React.Component{
//   render(){
//       const { navigation } = this.props;
//       const id = navigation.getParam('id', 'NO-ID');
//       const otherParam = navigation.getParam('otherParam', 'somethiing');
//       return (
//
//           );
//
//               }

// }
// class Navigation extends React.Component {
//     static propTypes = {
//         route: PropTypes.shape({
//             title: PropTypes.string.isRequied,
//         }),
//         navigator: PropTypes.object.isRequied,
//     };
//
//     constructor(props, context) {
//         super(props, context);
//         this._onFoward = this._onFoward.bind(this);
//
//     }
//
//     _onFoward() {
//         let nextIndex = ++this.props.index;
//         this.props.navigator.push({
//             component: Navigation,
//             title: 'Movie 2' + nextIndex,
//             passProps: {index: nextIndex},
//         });
//     }
//
//     render() {
//         return (
//             <View>
//                 <Text>Current Scene: {this.props.title}</Text>
//                 <Button
//                     onPress={this.onFoward}
//                     title="Next Page"
//                 />
//             </View>
//         );
//     }
// }
