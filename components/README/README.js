// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import { View, WebView, StyleSheet, Dimensions } from 'react-native';
// import { Markdown } from 'components';

type Props = {
    owner: string,
    repo: string,
}

type State = {
    loading: boolean,
    error: boolean,
    content: ''
}

const { height, width } = Dimensions.get('window');

export default class README extends PureComponent<void, Props, State> {
    state: State = {
        loading: true,
        error: false,
        content: ''
    };

    componentWillMount() {
        const { owner, repo } = this.props;

        fetch(
            `https://api.github.com/repos/${owner}/${repo}/readme`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.github.v3.html'
                }
            }
        ).then(
            (response) => {

                response.clone().text().then(
                    (text) => {
                        this.setState({
                            loading: false,
                            content: text
                        })
                    }
                )
            },
            (error) => {
                this.setState({
                    loading: false,
                    error: true
                })
            }
        )
    }

    render() {
        const { loading, error, content } = this.state;

        if (content) {
            return (
                <WebView
                    style={{ width, height }}
                    source={{ html: content }}
                />
            )

            // return (
            //     <Markdown style={markdownStyles} blacklist={['image']}>
            //         {content}
            //     </Markdown>
            // )

            // return (
            //     <Markdown content={content} />
            // )
        }

        return (
            <View />
        );
    }
}

const markdownStyles = {
    heading1: {
        fontSize: 24,
        color: 'purple',
    },
    link: {
        color: 'pink',
    },
    mailTo: {
        color: 'orange',
    },
    text: {
        color: '#555555',
    },
}
