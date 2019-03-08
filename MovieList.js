import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
type Props = {};

export default class MovieList extends Component<Props> {
    
    state = { movies:[]}

    _onPress = (id, originalTitle) => {
        this.props.navigation.navigate('MovieDetail',{id:id, originalTitle: originalTitle});
    };

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=df7dcf624bfe76dee38127fa88121b87')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({movies: responseJson.results});
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        console.log("render");
        console.log(this.state.movies);

        if (this.state.movies) {
            return (
                <View style={styles.container}>

                    <FlatList
                        data={this.state.movies}
                        keyExtractor={(item, index) => index}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity onPress={() => this._onPress(item.id, item.original_title)}>
                                    <View>
                                        <Text style={styles.movies}>{item.original_title}</Text>
                                    </View>
                                </TouchableOpacity>
                            );



                        }
                        }
                    /></View>
            );
        } else {
            return <Text style={styles.movies}>Empty</Text>
        }
    }
}
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        color:'black',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    movies: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 1,
    },
});