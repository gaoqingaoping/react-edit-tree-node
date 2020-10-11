import React, { useState, Key } from 'react'
import ReactDOM from 'react-dom'
import EditableTree from './EditableTree'
import { message } from 'antd'
import { updateTreeNodeData } from './utils/utils';

import './styles/index.css'

const App = () => {
  const [dataList, setDataList] = useState(
    [
      {
        isEdit: false,
        title: '0-0',
        key: '0-0',
        children: [
          {
            isEdit: false,
            title: '0-0-0',
            key: '0-0-0',
            children: [
              {
                isEdit: false,
                title: '0-0-0-0',
                key: '0-0-0-0'
              },
              {
                isEdit: false,
                title: '0-0-0-1',
                key: '0-0-0-1'
              },
              {
                isEdit: false,
                title: '0-0-0-2',
                key: '0-0-0-2'
              },
            ],
          },
          {
            isEdit: false,
            title: '0-0-1',
            key: '0-0-1',
            children: [
              {
                isEdit: false,
                title: '0-0-1-0',
                key: '0-0-1-0'
              },
              {
                isEdit: false,
                title: '0-0-1-1',
                key: '0-0-1-1'
              },
              {
                isEdit: false,
                title: '0-0-1-2',
                key: '0-0-1-2'
              },
            ],
          },
          {
            isEdit: false,
            title: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        isEdit: false,
        title: '0-1',
        key: '0-1',
        children: [
          {
            isEdit: false,
            title: '0-1-0-0',
            key: '0-1-0-0'
          },
          {
            isEdit: false,
            title: '0-1-0-1',
            key: '0-1-0-1'
          },
          {
            isEdit: false,
            title: '0-1-0-2',
            key: '0-1-0-2'
          },
        ],
      },
      {
        isEdit: false,
        title: '0-2',
        key: '0-2',
      },
    ]
  )

  const handleEdit = (value: string, key: Key) => {
    const list = updateTreeNodeData(dataList, key, 'title', value);
    setDataList(list)
  }

  return (
    <div className="container-demo">
      <EditableTree
        list={dataList}
        onEdit={(value, key) => {
          value && handleEdit(value, key)
          value
            ? message.success(`value:${value}, id:${key}`)
            : message.warn(`value为空`)
        }}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
