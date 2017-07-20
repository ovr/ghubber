// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { Parser } from 'commonmark';
import ReactNativeRenderer from 'commonmark-react-renderer';
import { View, Text, Image } from 'react-native';

type Props = {
    content: string
}

export default class Markdown extends PureComponent<void, Props, void> {
    render() {
        const { content } = this.props;

        console.log(content);

        const parser = new Parser({});
        const rendered = new ReactNativeRenderer({
            skipHtml: true,
            allowedTypes: [
                'heading',
                'text',
                'paragraph',
                'strong',
                // 'emph',
                // 'list',
                // 'item',
                'image',
                'link',
                'code_block',
            ],
            renderers: {
                heading: View,
                paragraph: Text,
                text: Text,
                strong: Text,
                emph: Text,
                list: View,
                item: Text,
                image: Image,
                link: Text,
                code_block: Text,
            },
        })

        let ast = parser.parse(content || '');
        let children = rendered.render(ast);

        console.log(children);

        return (
            <View style={{ flex: 1 }}>
                {children}
            </View>
        )
    }
}
