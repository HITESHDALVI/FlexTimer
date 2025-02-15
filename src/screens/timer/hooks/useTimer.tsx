import {useState} from 'react';
import {useBackground} from '../../../context/BackgroundContext';

const initialState = {
  name: '',
  duration: '',
  category: '',
  name_error: '',
  duration_error: '',
  category_error: '',
  error: '',
};
export const useTimer = ({navigation}: {navigation: any}) => {
  const {addTimer} = useBackground();

  const [state, setState] = useState(initialState);

  const handleTimer = () => {
    const checkDuration = /\s/.test(state?.duration);
    console.log({checkDuration});
    if (
      state?.name === '' ||
      state?.duration === '' ||
      state?.category === '' ||
      checkDuration
    ) {
      setState(prev => ({
        ...prev,
        error: checkDuration
          ? 'Duration can have only numbers'
          : 'Please enter above fields',
      }));
    } else {
      addTimer(state?.name, state?.duration, state?.category);
      setState(initialState);
      navigation?.goBack();
    }
  };
  const handleChange = (field: string) => (text: string) => {
    setState(prev => ({...prev, [field]: text}));
  };

  return {
    handleChange,
    state,
    handleTimer,
  };
};
