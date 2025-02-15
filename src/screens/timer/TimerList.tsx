import {FlatList} from 'react-native';
import {TimerType, useBackground} from '../../context/BackgroundContext';
import TimerCard from '../components/TimerCard';
import {groupTimersByCategory} from '../../utils/function';
import {useMemo} from 'react';

const TimerList = ({list}: {list: TimerType[] | never[]}) => {
  const groupedTimers = useMemo(() => groupTimersByCategory(list), [list]);

  const {
    startTimer,
    pauseTimer,
    resetTimer,
    startAllTimersInCategory,
    pauseAllTimersInCategory,
    resetAllTimersInCategory,
  } = useBackground();
  const renderItem = ({item}: {item: TimerType}) => (
    <TimerCard
      category={item}
      groupedTimers={groupedTimers}
      startTimer={startTimer}
      pauseTimer={pauseTimer}
      resetTimer={resetTimer}
      startAllTimersInCategory={startAllTimersInCategory}
      pauseAllTimersInCategory={pauseAllTimersInCategory}
      resetAllTimersInCategory={resetAllTimersInCategory}
    />
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
