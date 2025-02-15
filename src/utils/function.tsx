import {TimerType} from '../context/BackgroundContext';

export const formatTime = (seconds: string) => {
  const minutes = Math.floor(parseFloat(seconds) / 60);
  const sec = parseFloat(seconds) % 60;
  return `${minutes}:${sec < 10 ? '0' : ''}${sec.toFixed(2)}`;
};

export const getStatusStyle = (status: 'Running' | 'Paused' | 'Completed') => {
  switch (status) {
    case 'Running':
      return {color: 'orange'};
    case 'Paused':
      return {color: 'red'};
    case 'Completed':
      return {color: 'green'};
    default:
      return {};
  }
};

export const groupTimersByCategory = (timers: TimerType[]) => {
  return timers.reduce((acc, timer) => {
    acc[timer.category] = acc[timer.category] || [];
    acc[timer.category].push(timer);
    return acc;
  }, {});
};
