import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import NavigationHeader from '../components/NavigationHeader';
import {useBackground} from '../../context/BackgroundContext';
import {formatTime} from '../../utils/function';
import CustomIcon from '../components/CustomIcon';

const History = ({navigation}) => {
  const {timers} = useBackground();

  const history = timers.filter(timer => timer.status === 'Completed');

  return (
    <View style={styles.container}>
      <NavigationHeader
        title="History"
        handleBackPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={styles.title}>📜 Timer History</Text>
      <FlatList
        data={history}
        contentContainerStyle={{paddingHorizontal: '4%'}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.historyItem}>
            <CustomIcon
              type="AntDesign"
              name="clockcircleo"
              size={20}
              color="blue"
            />
            <Text style={{marginLeft: '2%', width: '90%'}}>
              Timer: {item.name} - Completion time {formatTime(item.duration)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: '5%',
    paddingHorizontal: '4%',
  },
  historyItem: {
    paddingHorizontal: '4%',
    paddingVertical: '4%',
    backgroundColor: '#fff',
    marginBottom: '2.5%',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
