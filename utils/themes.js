// @flow

import { Platform } from 'react-native';

export type ThemeName = 'system' | 'peter-river' | 'red' | 'ovr';

export type Theme = {
    headerBackgroundColor: string,
    headerTitleColor: string
}

export function getThemes(): Array<ThemeName> {
    return [
        'system',
        'peter-river',
        'red',
        'ovr'
    ];
}

export function getThemeByName(name: ThemeName): Theme {
    switch (name) {
        case 'system':
            return {
                headerBackgroundColor: Platform.OS === 'ios' ? '#F7F7F7' : '#FFF',
                headerTitleColor: '#000',
            };
        case 'peter-river':
            return {
                headerBackgroundColor: '#3498db',
                headerTitleColor: '#fff',
            };
        case 'red':
            return {
                headerBackgroundColor: '#e62739',
                headerTitleColor: '#fff',
            };
        case 'ovr':
            return {
                headerBackgroundColor: '#3b3a36',
                headerTitleColor: '#fff',
            };
    }
}
