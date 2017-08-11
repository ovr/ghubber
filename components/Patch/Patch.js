// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { UIText } from 'components';
import { parse } from 'utils/patch-parse';
import { captureException } from 'utils/errors'

import type { PatchType } from 'utils/patch-parse';

type Props = {
    patch: string
}

type PatchState = {
    patch: PatchType|null,
    exception: boolean
}

export default class Patch extends PureComponent<void, Props, PatchState> {
    state = {
        patch: null,
        exception: false
    };

    componentWillMount() {
        try {
            const patch = parse(this.props.patch);

            this.setState({
                patch
            });
        } catch (e) {
            this.setState({
                exception: true
            });

            captureException(e);
        }
    }

    render() {
        const { patch, exception } = this.state;

        if (exception) {
            return (
                <View>
                    <UIText>We are having an exception on parsing, We cannot display it.</UIText>
                </View>
            )
        }

        if (!patch) {
            return (
                <View>
                    <UIText>We cannot extract diff from this patch, nothing changed?.</UIText>
                </View>
            );
        }

        return (
            <View>
                {
                    patch.diff.map(
                        (line, index) => {
                            let lineNumberBackgroundColor: string = 'rgba(27,31,35,0.3)';
                            let lineBackgroundColor: string;

                            if (line.type === 'add') {
                                lineNumberBackgroundColor = 'rgb(190, 245, 203)';
                                lineBackgroundColor = '#e6ffed';
                            } else if (line.type === 'delete') {
                                lineNumberBackgroundColor = 'rgb(253, 174, 183)';
                                lineBackgroundColor = '#ffeef0';
                            }

                            return (
                                <UIText style={{ backgroundColor: lineBackgroundColor }} key={"line" + index}>
                                    <UIText style={{ backgroundColor: lineNumberBackgroundColor, width: 60 }}>
                                        {patch.newStart + index}
                                    </UIText>
                                    {line.text}
                                </UIText>
                            )
                        }
                    )
                }
            </View>
        )
    }
}
