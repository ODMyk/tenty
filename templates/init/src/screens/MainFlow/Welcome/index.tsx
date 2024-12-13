import React from 'react';
import {Text, View} from 'react-native';
import { useStyles } from './styles';

export function Welcome() {
    const styles = useStyles();
    return (<View style={styles.container}>
        <Text>Welcome to Tenty!</Text>
    </View>);
}