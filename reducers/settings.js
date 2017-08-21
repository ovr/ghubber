// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { Platform } from 'react-native';

type Theme = {
    headerBackgroundColor: string,
    headerTitleColor: string
}

type ThemeName = 'system' | 'peter-river' | 'red' | 'ovr';

export type SettingsState = {
    theme: ThemeName,
    ...Theme
}

function getThemeByName(name: ThemeName): Theme {
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

const DEFAULT_THEME = 'system';

const initialState: SettingsState = {
    theme: DEFAULT_THEME,
    ...getThemeByName(DEFAULT_THEME)
};

export default (state: SettingsState = initialState, action: Action): SettingsState => {
    switch (action.type) {
        default:
            return state;
    }
};
