import React, { useState } from 'react'
import { Image, Text, View, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'
import { submitNotes } from '../state/actions'
import * as Constants from '../constants/constants'
import Styles from '../styles/Styles'
import Spinner from '../components/Spinner'

interface FormScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const FormScreen: React.FC<FormScreenProps> = (props) => {
  const [notes, setNotes] = useState('')
  const dispatch = useDispatch()
  const app = useSelector((state) => state.app)
  const { item } = props.navigation?.state.params

  return (
    <>
      <Spinner visible={app.pendingScreen} />
      <View style={Styles.stateDetailContainer}>
        <View style={Styles.notesForm}>
          <View style={Styles.stateTitleHeader}>
            <Text style={Styles.stateTitleText}>{item.name}</Text>
            <Image
              source={{
                uri:
                  'https://www.50states.com/no/0' +
                  item.abbreviation.toLowerCase() +
                  'f.gif',
              }}
              style={Styles.itemImage}
            />
          </View>
          <Text style={Styles.stateText}>
            Abbreviation: {item.abbreviation}
          </Text>
          <Text style={Styles.stateText}>Captital: {item.capital}</Text>
          <Text style={Styles.stateText}>
            Most Populous City: {item['most-populous-city']}
          </Text>
          <Text style={Styles.stateText}>Population: {item.population}</Text>
          <Text style={Styles.stateText}>
            Square Miles: {item['square-miles']}
          </Text>
          <Text style={Styles.stateText}>
            Time Zone 1: {item['time-zone-1']}
          </Text>
          <Text style={Styles.stateText}>
            Time Zone 2: {item['time-zone-2']}
          </Text>
        </View>
      </View>
    </>
  )
}

FormScreen.navigationOptions = () => ({
  title: 'State Detail',
  headerStyle: Styles.headerStyle,
  headerTintColor: Styles.headerTintColor,
  headerTitleStyle: Styles.headerTitleStyle,
})

export default FormScreen
