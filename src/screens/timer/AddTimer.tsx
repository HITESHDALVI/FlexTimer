import React from 'react';
import {
  View,
  TextInput,
  KeyboardType,
  Text,
  TouchableOpacity,
} from 'react-native';
import {inputFields} from '../../utils/helpers';
import {useTimer} from './hooks/useTimer';
import {timerStyles} from './styles/timerStyles';
import NavigationHeader from '../components/NavigationHeader';

const AddTimer = ({navigation}: {navigation: any}) => {
  const {state, handleChange, handleTimer} = useTimer({navigation});

  return (
    <>
      <NavigationHeader
        title="Add Timer"
        handleBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[timerStyles.container, timerStyles.addContainer]}>
        {inputFields.map(field => (
          <React.Fragment key={field.key}>
            <Text style={[timerStyles.label]}>{field.placeholder}</Text>
            <TextInput
              key={field.key}
              placeholder={`Enter ${field.placeholder}`}
              value={state?.[field?.key as 'name' | 'duration' | 'category']}
              onChangeText={handleChange(field.key)}
              keyboardType={(field.keyboardType as KeyboardType) || 'default'}
              style={timerStyles.input}
              placeholderTextColor={'grey'}
            />
          </React.Fragment>
        ))}
        {Boolean(state?.error) && (
          <Text style={{color: 'red', fontSize: 12}}>{state?.error}</Text>
        )}
        <TouchableOpacity
          style={[timerStyles.saveTimerWrapper]}
          onPress={() => {
            handleTimer();
          }}>
          <Text style={[timerStyles.saveTimer]}>Save Timer</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddTimer;
