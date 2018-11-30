import React, { Component } from 'react';
import {
    Input
} from 'antd';
import '@stylesheets/testModule/testModule.css';
import 'antd/dist/antd.css';

export default class AntdTest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form">
                <h1>Title123</h1>
                <div>
                    <Input />
                </div>
            </div>
        );
    }
}

module.exports = AntdTest;