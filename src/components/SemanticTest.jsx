import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default class SemanticTest extends Component {
    render() {
        return (
            <div>
                <Button primary>Primary</Button>
                <Button secondary>Secondary</Button>
                <Button content='Primary123' primary />
            </div>
        );
    }
}

module.exports = SemanticTest;