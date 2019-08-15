import React from 'react';
import ReactDom from 'react-dom';
import indexStyle from './index.less';

ReactDom.render(
    <h1 className={indexStyle.main}>hellow, world!</h1>,
    document.getElementById("root")
)