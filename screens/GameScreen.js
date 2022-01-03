import React, { useEffect, useRef, useState } from 'react';
import {View, StyleSheet, Text, Button, Alert} from 'react-native';
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import colors from '../constants/colors';

// This is the recursive game logic
const generateRandomBetween = (min, max, exclude) => {
    // The limited minimum value is rounded up and the limited maximum value is rounded down
    min = Math.ceil(min);
    max = Math.floor(max);

    // This generates the random number which the computer has guessed
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    // This checks if excluded number and the random number are equal; then the system starts again. So it doesn't get the accurate number on the first try
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}


const GameScreen = props => {

    // This sets the computer's guess
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );

    const [guessRounds, setGuessRounds] = useState(0);

    // This determines the initial current low and the current High
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(guessRounds);
        }
    }, [currentGuess, userChoice, onGameOver]);

    // This sets the computer's guess based on the direction or indicted hints given by the user
    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Referee\'s flagged', 'Don\'t Lie! You know that this is wrong...', [{
                text: 'Sorry!',
                style: 'cancel'
            }]);
            return
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setGuessRounds(curRounds => curRounds + 1);
    }


    return (
        <View style={styles.gamescreen}>
            <Text>
                Computer's Guess
            </Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={styles.cardContainer}>
                <Text style={styles.cardText}>Hint me... </Text>
                <View style={styles.buttonContainer}>
                    <Button title="Lower?" onPress={nextGuessHandler.bind(this, 'lower')} color={colors.primary} ></Button>
                    <Button title="Greater?" onPress={nextGuessHandler.bind(this, 'greater')} color={colors.primary} ></Button>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    gamescreen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    cardContainer: {
        marginTop: 20,
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        maxWidth: '80%',
        width: 300,
    }
})

export default GameScreen;
