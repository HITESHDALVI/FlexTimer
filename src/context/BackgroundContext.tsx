import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';
import {getLocalStorage, setLocalStorage} from '../utils/storage';
import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';

export interface BackgroundContextType {
  loadLocalData: () => Promise<void>;
  timers: TimerType[] | never[];
  startTimer: (id: string | number) => void;
  pauseTimer: (id: string | number) => void;
  resetTimer: (id: string | number) => void;
  updateTimer: (id: string | number) => void;
  addTimer: (name: string, duration: string, category: string) => void;
  startAllTimersInCategory: (category: any) => void;
  pauseAllTimersInCategory: (category: any) => void;
  resetAllTimersInCategory: (category: any) => void;
}
const BackgroundContext = createContext<BackgroundContextType | null>(null);
export type TimerStatus = 'Running' | 'Paused' | 'Completed';
export interface TimerType {
  id: number;
  name: string;
  duration: string;
  remainingTime: string;
  category: string;
  status: TimerStatus;
  intervalId: null;
  remaining: string;
}

const BackgroundProvider: React.FC<{
  children: ReactNode;
}> = ({children}) => {
  const [timers, setTimers] = useState<TimerType[] | never[]>([]);
  const [intervals, setIntervals] = useState({});

  const loadLocalData = async () => {
    const storedTimers: TimerType[] | never[] =
      (await getLocalStorage('timers')) || [];
    setTimers(storedTimers);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [completedTimer, setCompletedTimer] = useState(null);

  const addTimer = async (name: string, duration: string, category: string) => {
    const newTimer = {
      id: Date.now(),
      name,
      duration,
      remainingTime: duration,
      category,
      status: 'Paused' as keyof TimerStatus,
      intervalId: null,
      remaining: duration,
    };

    setTimers(prev => {
      const result = [...prev, newTimer];
      setLocalStorage('timers', result);
      return result;
    });
  };
  const intervalIdRef = useRef(null);

  const startTimer = (id: string | number) => {
    setTimers(prevTimers =>
      prevTimers.map(timer =>
        timer.id === id ? {...timer, status: 'Running'} : timer,
      ),
    );

    intervalIdRef.current = setInterval(() => {
      setTimers(prevTimers => {
        return prevTimers.map(timer => {
          if (timer.id === id) {
            if (timer.remainingTime > 1) {
              const newTime = timer.remainingTime - 1;
              if (
                newTime === Math.floor(timer.duration / 2) &&
                !timer.halfwayAlert
              ) {
                Toast.show({
                  type: 'info',
                  text1: '⏳ Halfway Alert!',
                  text2: `${timer.name} is at 50% completion.`,
                });
                return {...timer, remainingTime: newTime, halfwayAlert: true};
              }
              return {...timer, remainingTime: newTime};
            } else if (timer?.remainingTime === 1) {
              clearInterval(intervalIdRef?.current);
              handleTimerCompletion(timer);

              return {...timer, remainingTime: 0, status: 'Completed'};
            }
          }
          return timer;
        });
      });
    }, 1000);

    setIntervals(prevIntervals => ({
      ...prevIntervals,
      [id]: intervalIdRef.current,
    }));
  };
  const handleTimerCompletion = async timer => {
    setCompletedTimer(timer);
    setModalVisible(true);

    const completedAt = new Date().toLocaleTimeString();
    const newEntry = {name: timer.name, completedAt};

    try {
      const history = await getLocalStorage('timerHistory');
      const historyArray = history ? JSON.parse(history) : [];
      historyArray.push(newEntry);
      await setLocalStorage('timerHistory', JSON.stringify(historyArray));

      setTimers(prevTimers =>
        prevTimers.map(t =>
          t.id === timer.id ? {...t, status: 'Completed'} : t,
        ),
      );
    } catch (error) {
      console.error('Error saving timer history:', error);
    }
  };

  const pauseTimer = (id: string | number) => {
    setTimers(prevTimers =>
      prevTimers.map(timer => {
        if (timer.id === id) {
          clearInterval(intervals[id]);
          return {...timer, status: 'Paused'};
        }
        return timer;
      }),
    );
  };

  const resetTimer = (id: string | number) => {
    setTimers(prevTimers =>
      prevTimers.map(timer => {
        if (timer.id === id) {
          clearInterval(intervals[id]);
          return {...timer, remainingTime: timer.duration, status: 'Paused'};
        }
        return timer;
      }),
    );
  };

  const updateTimer = (id: string | number) => {
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
  const startAllTimersInCategory = category => {
    timers
      .filter(
        timer => timer.category === category && timer.status !== 'Running',
      )
      .forEach(timer => startTimer(timer.id));
  };

  const pauseAllTimersInCategory = category => {
    timers
      .filter(
        timer => timer.category === category && timer.status === 'Running',
      )
      .forEach(timer => pauseTimer(timer.id));
  };

  const resetAllTimersInCategory = category => {
    timers
      .filter(timer => timer.category === category)
      .forEach(timer => resetTimer(timer.id));
  };

  return (
    <BackgroundContext.Provider
      value={{
        timers,
        addTimer,
        startTimer,
        pauseTimer,
        resetTimer,
        updateTimer,
        loadLocalData,
        startAllTimersInCategory,
        pauseAllTimersInCategory,
        resetAllTimersInCategory,
      }}>
      <>{children}</>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>🎉 Timer Completed! 🎉</Text>
            <Text style={styles.modalText}>
              {completedTimer?.name} has finished.
            </Text>
            <Button
              title="OK"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <Toast position="bottom" />
    </BackgroundContext.Provider>
  );
};

export {BackgroundProvider, BackgroundContext};

export const useBackground = (): BackgroundContextType => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within an BackgroundProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f5f5f5'},
  timerItem: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  timerText: {fontSize: 16, marginBottom: 5},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
});
