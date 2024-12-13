import {getErrorMessage} from '@store/utils/errors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {rem} from 'src/theme/rn-units';

export type FallbackIE = {
  children: React.ReactNode;
};

export type FallbackState = {
  hasError: boolean;
  text?: string;
};

export class Fallback extends React.Component<FallbackIE, FallbackState> {
  state: FallbackState = {hasError: false};

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>
            An unexpected error occured:
          </Text>
          <Text style={styles.description}>
            {this.state.text ?? ''}
            {'\n'}
            Please restart application
          </Text>
        </View>
      );
    }
    return this.props.children;
  }

  componentDidCatch(error: Error): void {
    this.setState({hasError: true, text: getErrorMessage(error)});
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: rem(12),
    flex: 1,
  },
  header: {
    fontWeight: 600,
    fontSize: rem(16),
  },
  description: {
    fontSize: rem(12),
  },
});
