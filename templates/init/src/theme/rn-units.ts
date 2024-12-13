import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const isLandscape = width > height;
const base = isLandscape ? height : width;

const magicNumber = 375;

export const rem = (size = 0) => Math.floor((base / magicNumber) * size);
