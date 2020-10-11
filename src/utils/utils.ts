import { Key } from 'react'

export const updateTreeNodeData = (data: any[],  key: Key, propName: string, newValue: any): any[] => {
    for (const item of data) {
        if (item.key === key) {
          item[propName] = newValue;
        } 
        if (item.children) {
          item.children = updateTreeNodeData(item.children, key, 'title', newValue);
        }
    }
    return data;
  }
  