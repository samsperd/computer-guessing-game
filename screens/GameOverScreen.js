import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import colors from '../constants/colors';

const Gameoverscreen = props => {
    return (
        <View style={styles.container}>
            <View style={styles.txts}>
                <Text style={styles.bigText}>
                    Game Over!
                </Text>
                {/* <Text>
                    Succeeded in guessing {props.userNumber} after {props.rounds} rounds.
                </Text> */}
                <Text>
                    Number guessed:  
                    <Text style={{fontWeight: 'bold'}}>
                        {props.userNumber}
                    </Text>
                </Text>
                <Text>
                    Rounds played:  
                    <Text style={{fontWeight: 'bold'}}>
                        {props.rounds}
                    </Text>
                </Text>
            </View>
            <View>
                <Button title='New Game' onPress={props.newGame} color={colors.primary}></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigText: {
        fontSize: 50
    },
    txts: {
        paddingBottom: 20,
        alignItems: 'center'
    }
})

export default Gameoverscreen;
