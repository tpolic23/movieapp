/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {createAppContainer, createStackNavigator, createBottomTabNavigator,} from 'react-navigation';
import MovieList from './MovieList';
import MovieDetail from "./MovieDetail";
import Profile from './Profile';
import TopRated from './TopRated';
import People from './People';
import TVShows from './TVShows';
import TVDetail from './TVDetail';
import PeopleDetail from './PeopleDetail';
import Icon from 'react-native-vector-icons/FontAwesome';
import Search from "./Search";
import Enter from "./Enter";

class App extends Component<Props> {
    render() {
        return <Stack/>;
    }
}

/**
 * Needs to go before the list, because Stack is using Tab Navigator
 */
const TabNavigator = createBottomTabNavigator({

        Trending: {
            screen: MovieList,
            navigationOptions: {
                tabBarLabel: 'Trending',
                tabBarIcon: ({tintColor, activeTintColor}) => (
                    <Icon name="film" size={20} color={tintColor}/>
                )
            },
        },
        TopRated: {
            screen: TopRated,
            navigationOptions: {
                tabBarLabel: 'Top Rated',
                tabBarIcon: ({tintColor, activeTintColor}) => (
                    <Icon name="star" size={20} color={tintColor}/>
                )
            },
        },
        TVShows: {
            screen: TVShows,
            navigationOptions: {
                tabBarLabel: 'TV Shows',
                tabBarIcon: ({tintColor, activeTintColor}) => (
                    <Icon name="tv" size={20} color={tintColor}/>
                )
            },
        },
        Stars: {
            screen: People,
            navigationOptions: {
                tabBarLabel: 'Stars',
                tabBarIcon: ({tintColor, activeTintColor}) => (
                    <Icon name="users" size={20} color={tintColor}/>
                )
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({tintColor, activeTintColor}) => (
                    <Icon name="user-o" size={20} color={tintColor}/>
                )
            },

        },
    },

    {

        tabBarOptions: {
            activeTintColor: '#fb9800',
            inactiveTintColor: '#7e7b7b',
            showIcon: true,

            style: {height: 54, backgroundColor: '#fff', borderTopWidth: 0.5, borderTopColor: '#fb9800'},
            showLabel: true,
            labelStyle: {
                fontSize: 10,

            }
        }
    });

TabNavigator.navigationOptions = ({navigation}) => {
    const index = navigation.state.index;
    const title = navigation.state.routes[index].routeName;
    return {
        title: title,
        headerRight: (
            /**
             * Search icon (button) instead real button added
             */
            <Icon name="search" size={23}
                  style={{flex: 1, alignSelf: 'center', marginRight: 20}}
                  onPress={() => navigation.navigate('Search')} color="gray"/>
        ),
    };
};

const Stack = createStackNavigator({
    Main: {screen: Enter},
    First: {screen: TabNavigator},
    MovieDetail: {screen: MovieDetail},
    PeopleDetail: {screen: PeopleDetail},
    TVDetail: {screen: TVDetail},
    Search: {screen: Search}
}, {
    initialRouteName: 'First',
});

export default createAppContainer(Stack, TabNavigator);
