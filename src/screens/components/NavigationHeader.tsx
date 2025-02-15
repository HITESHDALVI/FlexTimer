import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';

export interface NavigationHeaderProps {
  title: string;
  handleBackPress: () => void;
}
const NavigationHeader = ({title, handleBackPress}: NavigationHeaderProps) => {
  return (
    <View style={[NavigationHeaderStyles.navigationContainer]}>
      <TouchableOpacity
        onPressIn={() => {
          handleBackPress();
        }}
        style={[NavigationHeaderStyles.backArrow]}>
        <View style={[{marginRight: '5%', width: 10}]}>
          <CustomIcon
            name="angle-left"
            type={'FontAwesome'}
            size={24}
            color={'black'}
          />
        </View>
        <Text style={[NavigationHeaderStyles.title]}>{title || ''}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationHeader;

export const NavigationHeaderStyles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: '4%',
    paddingVertical: '2.5%',
    alignItems: 'center',
    borderBottomColor: 'blue',
    borderBottomWidth: 4,
    height: 60,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    color: 'black',
    lineHeight: 24.2,
  },

  backArrow: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
});
