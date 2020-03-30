
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from 'Home'
import Detail from 'Detail'

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Saferoute - A Hoohacks 2020 Project'
          component={Home}
          options={{ title: 'Saferoute - A Hoohacks 2020 Project',
         header: null}}
        />
        <Stack.Screen
          name='Detail'
          component={Detail}
          options={{ title: 'Detail Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}