import { StyleSheet, Text, SafeAreaView, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from "./screens/GameScreen";
import { useState } from 'react';
import Gameoverscreen from './screens/GameOverScreen';

export default function App() {

  // User number is the input number that the user has typed
  const [userNumber, setUserNumber] = useState();

  // This sets the number of rounds the computer took to get to this point
  const [rounds, setRounds] = useState(0);

  // This function starts the game
  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setRounds(0);
  }

  // Configure a new game
  const configureNewGame = () => {
    setRounds(0);
    setUserNumber(null);
  }

  // This function sets the number of rounds or times it took the computer to guess the accurate number
  const gameOverHandler = numOfRounds => {
    setRounds(numOfRounds);
  }

  // This is sets the default screen for the game and passes the start game function to the screen
  let content = <StartGameScreen onStartGame={startGameHandler}></StartGameScreen>;

  // This sets the game screen that to shows the game has started and passes the number the user has typed or chosen
  if (userNumber && rounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}></GameScreen>;
  }
  else if (rounds > 0) {
    content = <Gameoverscreen rounds={rounds} userNumber={userNumber} newGame={configureNewGame}></Gameoverscreen>;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
      <SafeAreaView style={styles.container}>
        <Header title='Computer Guessing Game'></Header>
        {content}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
