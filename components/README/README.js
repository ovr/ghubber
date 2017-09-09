// @author Dmitry Patsura <talk@dmtry.me> https://github.com/ovr
// @flow

import React, { PureComponent } from 'react';
import HTMLView from 'react-native-htmlview';

type Props = {
    owner: string,
    repo: string,
}

type READMEState = {
    loading: boolean,
    error: boolean,
    content: ''
}

export default class README extends PureComponent<Props, READMEState> {
    state: READMEState = {
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
                        });
                    }
                );
            },
            () => {
                this.setState({
                    loading: false,
                    error: true
                });
            }
        );
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const { loading, error, content } = this.state;

        if (content) {
            return (
                <HTMLView
                    value={content}
                />
            );
        }

        return null;
    }
}

