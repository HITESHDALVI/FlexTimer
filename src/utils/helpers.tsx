import {KeyboardType} from 'react-native';

export interface InputFieldsTypes {
  placeholder: string;
  key: string;
  keyboardType?: KeyboardType;
}

export const inputFields: InputFieldsTypes[] = [
  {
    placeholder: 'Timer Name',
    key: 'name',
  },
  {
    placeholder: 'Duration (seconds)',
    key: 'duration',
    keyboardType: 'numeric',
  },
  {
    placeholder: 'Category',
    key: 'category',
  },
];
