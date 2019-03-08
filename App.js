/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {createAppContainer, createStackNavigator, createBottomTabNavigator,} from 'react-navigation';
import MovieList from './MovieList'
import MovieDetail from "./MovieDetail";

class App extends Component<Props> {
    render() {
        return <Stack/>;
    }
}
class Profile extends Component<Props>  {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Profile!</Text>
            </View>
        );
    }
}

/**
 * Needs to go before the list, because Stack is using Tab Navigator
 */
const TabNavigator = createBottomTabNavigator({
    Home: { screen: MovieList },
    Profile: { screen: Profile },
});

const Stack = createStackNavigator({
    Main: { screen: TabNavigator},
    MovieDetail: { screen: MovieDetail }
}, {
    initialRouteName: 'Main',
});

export default createAppContainer(Stack,TabNavigator);

// export default class App extends Component<Props> {
//     state = { movies:[] };
//
//     componentDidMount() {
//       fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=df7dcf624bfe76dee38127fa88121b87')
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 this.setState({movies: responseJson.results});
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }
//   render() {
//     console.log("render");
//     console.log(this.state.movies);
//
//     if (this.state.movies) {
//         return (
//             <View style={styles.container}>
//             <NavigatorIOS
//              initialRoute={{component: Navigation,
//               title: 'Movie Title',
//               passProps:{index: 1},
//              }}
//               style={{flex: 1}}
//             />
//
//                 <FlatList
//                     data={this.state.movies}
//                     keyExtractor={(item, index) => index}
//                     renderItem={({item}) => {
//                         return <Text style={styles.movies}>{item.original_title}</Text>;
//                      }
//                     }
//                 /></View>
//         );
//     } else {
//       return <Text style={styles.movies}>Empty</Text>
//     }
//   }
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
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//       color:'black',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//     movies: {
//         padding: 10,
//         fontSize: 18,
//         height: 44,
//     },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 1,
//   },
// });