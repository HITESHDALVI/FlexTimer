import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

type IconType =
  | typeof FontAwesome
  | typeof MaterialIcons
  | typeof Ionicons
  | typeof Feather
  | typeof AntDesign
  | typeof Entypo
  | typeof EvilIcons
  | typeof Foundation
  | typeof MaterialCommunityIcons
  | typeof Octicons
  | typeof SimpleLineIcons
  | typeof Zocial
  | typeof FontAwesome6;

export type CustomIconTypes =
  | 'FontAwesome'
  | 'MaterialIcons'
  | 'Ionicons'
  | 'Feather'
  | 'AntDesign'
  | 'Entypo'
  | 'EvilIcons'
  | 'Foundation'
  | 'MaterialCommunityIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial'
  | 'FontAwesome6';
type CustomIconProps = {
  name: string;
  type: CustomIconTypes;
  color: string;
  size: number;
  [key: string]: any;
};

const iconTypes: {[key in CustomIconProps['type']]: IconType} = {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Feather,
  AntDesign,
  Entypo,
  EvilIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
  FontAwesome6,
};

const CustomIcon: React.FC<CustomIconProps> = ({
  name,
  type,
  color,
  size,
  ...props
}) => {
  const IconComponent = iconTypes[type];
  return <IconComponent name={name} size={size} color={color} {...props} />;
};

export default CustomIcon;
