import {useEffect} from 'react';
import {useBackground} from '../../../context/BackgroundContext';

export const useHome = ({navigation}: any) => {
  const {timers, setTimers, loadLocalData} = useBackground();

  const handleAddTimer = () => {
    navigation.navigate('AddTimer');
  };
  useEffect(() => {
    loadLocalData();
  }, []);

  return {
    handleAddTimer,
    timers,
    setTimers,
  };
};
