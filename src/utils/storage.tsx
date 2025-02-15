import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalStorage = async <T,>(
  key: string,
  value: T,
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('error while setting local storage', e);
  }
};

export const getLocalStorage = async <T,>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error while getting local storage:', e);
    return null;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing value:', e);
  }
};

export const clearLocalStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Error clearing data:', e);
  }
};
