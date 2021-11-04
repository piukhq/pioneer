//packages/mobile/App.js

import React from 'react';
import {View, Text} from 'react-native';
import {getWelcomeString} from 'common/src/main';
import {getMobileString} from './src/getValues';

const App = () => {
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#33b3a6',
      }}>
      <Text style={{fontSize: 30, color: 'white'}}>
        {getWelcomeString('This is Native')}
      </Text>

      <Text style={{fontSize: 20, color: 'white', marginTop: 20}}>
        {getMobileString()}
      </Text>
    </View>
  );
};
export default App;
