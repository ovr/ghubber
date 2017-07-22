// @flow

import { PixelRatio } from 'react-native';
import { isTablet } from 'react-native-device-info';

export function platform(mobile: any, tablet: any): any {
    if (isTablet()) {
        return tablet;
    }

    return mobile;
}

export function normalizeFont(fontSize: number): number {
    return PixelRatio.roundToNearestPixel(fontSize);
}
