import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";

const styles = {
    movies: {
        paddingLeft: 10,
        alignSelf: 'center',
        fontSize: 18,
    },
};

class ListItem extends Component {
    onItemPress = () => {
        const {onPress, id, name} = this.props;
        if (onPress) {
            onPress({id, name});
        }
    };

    render() {
        const {id, avatar, name, onPress} = this.props;

        return (
            <TouchableOpacity onPress={this.onItemPress}>
                <View style={{flexDirection: 'row', alignItems: 'flex-start', padding: 5}}>
                    <Image
                        source={{uri: avatar}}
                        style={{width: 70, height: 70, borderRadius: 35}}/>
                    <Text style={styles.movies}>{name}</Text>
                </View>
            </TouchableOpacity>

        );
    }
}

export default ListItem;