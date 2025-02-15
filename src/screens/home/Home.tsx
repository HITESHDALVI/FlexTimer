import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {homeStyles} from './styles/homeStyles';
import {useHome} from './hooks/useHome';
import CustomIcon from '../components/CustomIcon';
import TimerList from '../timer/TimerList';

const Home = ({navigation}: {navigation: any}) => {
  const {handleAddTimer, timers} = useHome({navigation});
  const history = timers.filter(timer => timer.status === 'Completed');

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>FlexTimer</Text>
      {history.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('History');
          }}
          style={homeStyles.history}>
          <Text style={homeStyles.historyText}>History</Text>
          <CustomIcon
            type="Octicons"
            name="checklist"
            size={24}
            color="green"
          />
        </TouchableOpacity>
      )}
      {timers?.length > 0 ? (
        <TimerList list={timers} />
      ) : (
        <View style={homeStyles.emptyCon}>
          <CustomIcon
            type="SimpleLineIcons"
            name="list"
            size={100}
            color="#FFBA5A"
          />
          <Text style={homeStyles.empty}>No Timer</Text>
          <Text style={homeStyles.desc}>Add Timer to list</Text>
        </View>
      )}
      <TouchableOpacity
        style={[homeStyles.addTimer]}
        onPress={() => {
          handleAddTimer();
        }}>
        <CustomIcon type="Octicons" name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
