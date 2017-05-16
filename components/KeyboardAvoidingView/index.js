// @flow

import ReactNative, { View, Platform } from 'react-native';

export const KeyboardAvoidingView = Platform.OS === 'ios' ? ReactNative.KeyboardAvoidingView : View;
