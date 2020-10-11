import { DataNode } from 'rc-tree/lib/interface'
import { Key } from 'react'

export interface ILeafNode extends DataNode {
  isEdit: boolean
  key: Key
  title: string
  children?: ILeafNode[]
}
