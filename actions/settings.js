// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import { SETTINGS_THEME_CHANGE } from 'constants';

import { ThemeName } from 'utils/themes';

export function themeChange(name: ThemeName): Action {
    return {
        type: SETTINGS_THEME_CHANGE,
        payload: name
    };
}
