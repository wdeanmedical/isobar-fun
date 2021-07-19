import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { withNavigationFocus } from 'react-navigation'
import { useDispatch, useSelector } from 'react-redux'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'
import { Colors } from '../constants/colors'
import NumberPlease from 'react-native-number-please'
import Styles from '../styles/Styles'
import Spinner from '../components/Spinner'

interface GameScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const GameScreen: React.FC<GameScreenProps> = (props) => {
  const [answer, setAnswer] = useState(0)
  const [guess, setGuess] = useState(0)
  const [numGuesses, setNumGuesses] = useState(0)
  const [victory, setVictory] = useState(false)
  const [response, setResponse] = useState('')
  const [guessesText, setGuessesText] = useState('')
  const app = useSelector((state) => state.app)
  const isFocused = props.navigation.isFocused()

  const initialValues = [{ id: 'pizza', value: 1 }]
  const [pizzas, setPizzas] = useState(initialValues)
  const pizzaNumbers = [{ id: 'pizza', label: '🍕', min: 1, max: 100 }]

  useEffect(() => {
    resetGame()
  }, [isFocused])

  const checkGuess = (values) => {
    setNumGuesses(numGuesses + 1)
    const guess = values[0]?.value
    setPizzas(values)
    if (guess === answer) {
      setResponse('You Guessed IT!')
      setGuessesText(`In only ${numGuesses} guesses`)
      setVictory(true)
    } else {
      setResponse(`Too ${guess > answer ? 'High' : 'Low'}!`)
    }
  }

  const resetGame = () => {
    setPizzas(initialValues)
    setAnswer(getRandomIntInclusive(1, 100))
    setResponse('')
    setVictory(false)
    setGuess(0)
    setNumGuesses(0)
  }

  return (
    <>
      <Spinner visible={app.pendingScreen} title="Loading Game..." />
      <View style={Styles.gameDetailContainer}>
        <Text style={Styles.gameTitleText}>
          Pick A Number Between 1 and 100
        </Text>
        <NumberPlease
          itemStyle={{ color: Colors.white }}
          digits={pizzaNumbers}
          values={pizzas}
          onChange={(values) => checkGuess(values)}
        />
        <Text style={Styles.responseText}>{response}</Text>
        {victory && (
          <>
            <Text style={Styles.responseText}>{guessesText}</Text>
            <TouchableOpacity
              style={Styles.gameSubmitButton}
              onPress={() => resetGame()}
            >
              <Text style={Styles.gameSubmitButtonText}>Try Again!</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </>
  )
}

GameScreen.navigationOptions = () => ({
  title: 'Pick A Number!',
  headerStyle: Styles.headerStyle,
  headerTintColor: Styles.headerTintColor,
  headerTitleStyle: Styles.headerTitleStyle,
})

export default withNavigationFocus(GameScreen)
