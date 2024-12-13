import {StyleSheet} from 'react-native';
import {rem} from 'src/theme/rn-units';

export const useStyles = () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        text: {
            fontSize: rem(18),
            lineHeight: rem(24),
        },
    })
};