import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, Alert, Keyboard } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';

const StartGameScreen = ({onStartGame}) => {
    
    // This stores the entered value of the input or this is the storage of the user's input number
    const [enteredValue, setEnteredValue] = useState('');

    // This checks if the value of the input is accurate or not
    const [confirmed, setConfirmed] = useState(false);

    // This is the user's input value after validation
    const [selectedNumber, setSelectedNumber] = useState('');

    // This validates the user input to make sure the input is a number
    const theInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g), '');
    }

    // This resets the game and invalidates any number already in the system
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false)
    }

    // This is the function that determines if the value is valid or if the process should continue or not
    const confirmInputHandler = () => {

        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number', 'Number has to be between 1 and 99.');
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(parseInt(chosenNumber));
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <Button title="START GAME" color={colors.primary} onPress={() => onStartGame(selectedNumber)}></Button>
            </Card>

        );
    }

    return ( 
    <View style={ styles.screen }>
        <Text style={styles.title}>
            Start a New Game
        </Text>

        <Card style={styles.inputContainer} >
            <Text>
                Select a Number
            </Text>
            
            <Input 
                style={styles.input}
                onChangeText={theInputHandler}
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='numeric'
                maxLength={2}
                value={enteredValue}
            ></Input>

            <View style={styles.buttonContainer} >
                <View style={styles.button}>
                    <Button title="Reset" color={colors.secondary} onPress={resetInputHandler} ></Button>
                </View>
                <View style={styles.button}>
                    <Button title='Confirm' color={colors.primary} onPress={confirmInputHandler}></Button>
                </View>
            </View>
            </Card>
            {confirmedOutput}
    </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5,
        padding: 20,
        borderRadius: 10,
    },
    input: {
        width: 50
    },
    button: {
        width: 100,
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})

export default StartGameScreen;