import React, { useState } from 'react';
// import DynamicTest from './dynamicTest.js';
import createLoadable from './createLoadable.js';

// 占位符组件
const Loading = ({ isLoading, error }) => {
  if (isLoading) return <div>正在异步加载</div>;
  if (error) return <div>加载发生了错误</div>;
  return <div> 加载成功啦</div>;
};

const DynamicTest = createLoadable({
    loader: () => import(/* webpackChunkName: "DynamicTest" */ './DynamicTest'),
    loading: Loading,
    delay: 1500,
});

export default () => {
    const [isClicked, set] = useState(false);
    const onClick = () => {
        if (!isClicked) {
            set(true);
        }
    };

  return (
    <div>
      <h6>Webpack动态导入的一个实践</h6>
      <div style={{ width: '100%', height: '100px', border: '1px solid #eee' }}>
        {isClicked && <DynamicTest />}
      </div>

      <div
        onClick={onClick}
        style={{ width: 240, margin: '24px auto', display: 'block' }}
      >
        点我，延迟1.5s后开始加载异步组件。
      </div>

    </div>
  );
};
