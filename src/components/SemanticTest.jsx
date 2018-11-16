import React, { Component } from 'react';
import { Button, Icon, Image } from 'semantic-ui-react';
import 'semantic-ui/dist/semantic.css';

export default class SemanticTest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Button primary>Primary</Button>
                <Button secondary>Secondary</Button>
                <Button content='Primary123' primary />
                <Image src='/images/flags.png' size='small' />
            </div>
        );
    }
}

module.exports = SemanticTest;