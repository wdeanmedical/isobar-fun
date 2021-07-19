import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'
import FormScreen from '../screens/FormScreen'
import GameScreen from '../screens/GameScreen'
import { Colors } from '../constants/colors'
import * as Constants from '../constants/constants'

const StatesNavigator = createStackNavigator(
  {
    home: HomeScreen,
    notes: FormScreen,
  },
  {
    headerMode: 'screen',
    initialRouteName: Constants.HOME_SCREEN,
  }
)

const GamesNavigator = createStackNavigator(
  {
    game: GameScreen,
  },
  {
    headerMode: 'screen',
    initialRouteName: Constants.GAME_SCREEN,
  }
)

const AppNavigator = createBottomTabNavigator(
  {
    States: StatesNavigator,
    Game: GamesNavigator,
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.white,
      inactiveTintColor: Colors.mediumGray,
      allowFontScaling: true,
      style: {
        backgroundColor: Colors.charcoalGrey,
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  }
)

export default createAppContainer(AppNavigator)
