import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {formatTime, getStatusStyle} from '../../utils/function';
import {TimerType, useBackground} from '../../context/BackgroundContext';
import CustomIcon, {CustomIconTypes} from './CustomIcon';
import React, {useState, useCallback, useMemo, memo, useEffect} from 'react';
import {timerCardstyles} from '../timer/styles/timerCardstyles';
import LinearGradient from 'react-native-linear-gradient';
type Props = {category: TimerType};

const TimerCardComponent = ({category, groupedTimers}: Props) => {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  const {
    startTimer,
    pauseTimer,
    resetTimer,
    startAllTimersInCategory,
    pauseAllTimersInCategory,
    resetAllTimersInCategory,
  } = useBackground();
  const toggleCategory = useCallback((category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  }, []);

  const buttonData = useMemo(
    () => [
      {
        icon: 'play',
        iconType: 'Ionicons',
        onPress: () => startAllTimersInCategory(category),
      },
      {
        icon: 'pause',
        iconType: 'Ionicons',
        onPress: () => pauseAllTimersInCategory(category),
      },
      {
        icon: 'clock-rotate-left',
        iconType: 'FontAwesome6',
        onPress: () => resetAllTimersInCategory(category),
      },
    ],
    [
      category,
      startAllTimersInCategory,
      pauseAllTimersInCategory,
      resetAllTimersInCategory,
    ],
  );

  return (
    <View style={timerCardstyles.categoryContainer}>
      <TouchableOpacity
        onPress={() => toggleCategory(category)}
        style={timerCardstyles.categoryHeader}>
        <CustomIcon
          name={expandedCategories[category] ? 'chevron-down' : 'chevron-right'}
          type="Feather"
          size={20}
          color="black"
        />
        <Text style={timerCardstyles.categoryText}> {category}</Text>
      </TouchableOpacity>

      <View style={timerCardstyles.container}>
        {buttonData.map(button => (
          <TouchableOpacity
            key={button.icon}
            onPress={button.onPress}
            style={timerCardstyles.button}>
            <CustomIcon
              type={button.iconType as CustomIconTypes}
              name={button.icon}
              color="#7149C6"
              size={18}
            />
          </TouchableOpacity>
        ))}
      </View>

      {expandedCategories[category] &&
        groupedTimers[category]?.map(item => (
          <MemoizedTimerItem
            key={item.id}
            item={item}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            resetTimer={resetTimer}
          />
        ))}
    </View>
  );
};

const TimerItem = ({item, startTimer, pauseTimer, resetTimer}) => {
  const progressAnim = new Animated.Value(item.remainingTime / item.duration);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: item.remainingTime / item.duration,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [item.remainingTime]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  return (
    <View style={timerCardstyles.timerCard}>
      <Text style={timerCardstyles.timerName}>{item.name}</Text>
      <Text>{formatTime(item?.duration)}</Text>
      <Text style={timerCardstyles.timerInfo}>
        Time Left: {formatTime(item.remainingTime ?? item?.duration)}
      </Text>
      <Text style={[timerCardstyles.timerStatus, getStatusStyle(item.status)]}>
        {item.status}
      </Text>

      <View style={timerCardstyles.progressBarContainer}>
        <Animated.View
          style={[timerCardstyles.progressBar, {width: progressWidth}]}>
          <LinearGradient
            colors={['#7149C6', '#A46BF5']}
            style={{width: '100%', height: '100%'}}
          />
        </Animated.View>
      </View>

      <View style={timerCardstyles.buttonRow}>
        {item.status !== 'Running' && (
          <TouchableOpacity
            disabled={item.status === 'Completed'}
            onPress={() => startTimer(item.id)}
            style={[
              timerCardstyles.button,
              timerCardstyles.startButton,
              {
                backgroundColor:
                  item.status === 'Completed' ? 'lightgrey' : 'green',
              },
            ]}>
            <Text style={timerCardstyles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
        {item.status === 'Running' && (
          <TouchableOpacity
            onPress={() => pauseTimer(item.id)}
            style={[timerCardstyles.button, timerCardstyles.pauseButton]}>
            <Text style={timerCardstyles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => resetTimer(item.id)}
          style={[timerCardstyles.button, timerCardstyles.resetButton]}>
          <Text style={timerCardstyles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MemoizedTimerItem = memo(TimerItem);

const TimerCard = memo(TimerCardComponent);
export default TimerCard;
