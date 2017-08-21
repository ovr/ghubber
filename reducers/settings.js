// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { SETTINGS_THEME_CHANGE } from 'constants';
import { getThemeByName } from 'utils/themes';

import type { ThemeName, Theme } from 'utils/themes';

export type SettingsState = {
    theme: ThemeName,
    ...Theme
}

const DEFAULT_THEME = 'system';

const initialState: SettingsState = {
    theme: DEFAULT_THEME,
    ...getThemeByName(DEFAULT_THEME)
};

export default (state: SettingsState = initialState, action: Action): SettingsState => {
    switch (action.type) {
        case SETTINGS_THEME_CHANGE:
            return {
                theme: action.payload,
                ...getThemeByName(action.payload)
            };
        default:
            return state;
    }
};
