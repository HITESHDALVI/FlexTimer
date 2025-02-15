import {FlatList} from 'react-native';
import {TimerType} from '../../context/BackgroundContext';
import TimerCard from '../components/TimerCard';
import {groupTimersByCategory} from '../../utils/function';

const TimerList = ({list}: {list: TimerType[] | never[]}) => {
  const groupedTimers = groupTimersByCategory(list);
  const renderItem = ({item}: {item: TimerType}) => (
    <TimerCard category={item} groupedTimers={groupedTimers} />
  );

  return (
    <FlatList
      data={Object.keys(groupedTimers)}
      keyExtractor={item => item?.id?.toString()}
      contentContainerStyle={{paddingHorizontal: '4%'}}
      renderItem={renderItem}
    />
  );
};

export default TimerList;
