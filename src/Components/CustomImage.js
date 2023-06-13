import React from 'react';
import { Image} from 'react-native';
const CustomImage = ({source, style, resizeMode}) => {
  return <Image source={{uri: source}} resizeMode={resizeMode} style={style} />;
};

export default CustomImage;
