import React, { useEffect } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'
import { appInit } from '../state/actions'
import * as Constants from '../constants/constants'
import Styles from '../styles/Styles'
import Spinner from '../components/Spinner'

interface HomeScreenProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const Item = ({ item, enterNotesScreen }) => {
  return (
    <TouchableOpacity onPress={() => enterNotesScreen(item)}>
      <View style={Styles.listItem}>
        <View style={Styles.itemText}>
          <Text style={Styles.albumName}>{item['@attributes'].name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  const dispatch = useDispatch()
  const app = useSelector((state) => state.app)

  useEffect(() => {
    dispatch(appInit())
  }, [])

  const enterNotesScreen = (item) => {
    props.navigation.navigate(Constants.NOTES_SCREEN, { item })
  }

  return (
    <>
      <Spinner visible={app.pendingScreen} title="Loading States..." />
      <View style={Styles.container}>
        <FlatList
          style={Styles.itemsList}
          data={app.states?.statesInfo?.states}
          renderItem={({ item }) => (
            <Item
              item={item}
              enterNotesScreen={(item) => enterNotesScreen(item['@attributes'])}
            />
          )}
          keyExtractor={(item) => item['@attributes'].abbreviation}
        />
      </View>
    </>
  )
}

HomeScreen.navigationOptions = () => ({
  title: 'States',
  headerStyle: Styles.headerStyle,
  headerTintColor: Styles.headerTintColor,
  headerTitleStyle: Styles.headerTitleStyle,
})

export default HomeScreen
