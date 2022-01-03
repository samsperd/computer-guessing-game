import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import colors from '../constants/colors';

const NumberContainer = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>
                {props.children}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.secondary,
        padding: 10,
        borderRadius: 10,
        color: 'white',
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        fontSize: 23,
        color: colors.secondary
    }
})

export default NumberContainer;
