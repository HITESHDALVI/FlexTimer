import {useState, useEffect} from 'react';
import {getLocalStorage, setLocalStorage} from '../../../utils/storage';

export const useTimers = ({navigation}) => {
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    loadTimers();
  }, []);

  const loadTimers = async () => {
    const storedTimers = (await getLocalStorage('timers')) || [];
    setTimers(storedTimers);
  };

  const saveTimers = async newTimers => {
    setTimers(newTimers);
    await setLocalStorage('timers', newTimers);
  };

  const addTimer = (name, duration, category) => {
    const newTimer = {
      id: Date.now(),
      name,
      duration,
      remainingTime: duration,
      category,
      status: 'Paused',
      intervalId: null,
    };
    saveTimers([...timers, newTimer]);
    navigation.goBack();
  };

  const startTimer = id => {
    setTimers(prevTimers =>
      prevTimers.map(timer =>
        timer.id === id
          ? {
              ...timer,
              status: 'Running',
              intervalId: setInterval(() => updateTimer(id), 1000),
            }
          : timer,
      ),
    );
  };

  const pauseTimer = id => {
    setTimers(prevTimers =>
      prevTimers.map(timer => {
        if (timer.id === id) {
          clearInterval(timer.intervalId);
          return {...timer, status: 'Paused'};
        }
        return timer;
      }),
    );
  };

  const resetTimer = id => {
    setTimers(prevTimers =>
      prevTimers.map(timer =>
        timer.id === id
          ? {...timer, remainingTime: timer.duration, status: 'Paused'}
          : timer,
      ),
    );
  };

  const updateTimer = id => {
    setTimers(prevTimers =>
      prevTimers.map(timer => {
        if (timer.id === id && timer.status === 'Running') {
          if (timer.remainingTime <= 1) {
            clearInterval(timer.intervalId);
            return {...timer, remainingTime: 0, status: 'Completed'};
          }
          return {...timer, remainingTime: timer.remainingTime - 1};
        }
        return timer;
      }),
    );
  };

  return {timers, addTimer, startTimer, pauseTimer, resetTimer, setTimers};
};
