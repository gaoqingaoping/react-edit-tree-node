import React, { useEffect, useState, Key, useCallback } from 'react'
import { Tree, Input } from 'antd'
import { TreeProps } from 'antd/lib/tree'
import { ILeafNode } from './type/type'
import IconEdit from './assets/icon-edit.svg'
import './styles/App.css'

interface IEditableTree {
  list: ILeafNode[]
  onEdit?: (value: string, key: Key) => void
}

type ITreeProps = NeverPick<TreeProps, 'treeData'>

type NeverPick<T, U> = {
  [P in Exclude<keyof T, U>]?: T[P]
}

const INPUT_ID = 'inputId'

const EditableTree = ({
  list,
  onEdit,
  // @ts-ignore
  treeData,
  expandedKeys = [],
  selectedKeys = [],
  autoExpandParent = true,
  ...props
}: IEditableTree & ITreeProps) => {
  const [isInputShow, toggleInputShow] = useState(true)
  const [isUpdated, toggleUpdated] = useState(false)
  const [treeList, setTreeList] = useState<ILeafNode[]>([])
  const [expandKeys, setExpandKeys] = useState<Key[]>(expandedKeys)
  const [selectKeys, setSelectKeys] = useState<Key[]>(selectedKeys)
  const [autoExpand, setAutoExpand] = useState(autoExpandParent)
  const [inputValue, setInputValue] = useState<Key>('')

  useEffect(() => {
    setTreeList(list)
  }, [list])

  const inputNode = useCallback(
    (input) => {
      isInputShow && input && input.focus()
    },
    [isInputShow]
  )

  const updateEditStatus = (leaf: any[],  key: Key, isEdit: boolean): any[] => {
    for (const aLeaf of leaf) {
        if (aLeaf.key === key) {
          aLeaf.isEdit = isEdit;
        } 
        if (aLeaf.children) {
          aLeaf.children = updateEditStatus(aLeaf.children, key, isEdit);
        }
    }
    return leaf;
  }

  const toggleLeafEdit = (key: Key, isEdit: boolean) => {
    const list = updateEditStatus(treeList, key, isEdit);
    toggleUpdated(false)
    setTreeList(list)
    toggleInputShow(isEdit)
  }

  const handleLeafEdit = (value: string, key: Key) => {
    toggleLeafEdit(key, false)
    setInputValue('')
    isUpdated && onEdit && onEdit(value, key)
  }

  const handleTreeNodeSelect = (
    selectedKeys: (string | number)[],
    info?: { nativeEvent: MouseEvent }
  ) => {
    const inputId: any = (info?.nativeEvent?.target as HTMLInputElement)?.id
    if (inputId !== INPUT_ID) {
      setSelectKeys(selectedKeys)
    }
  }

  const handleExpand = (expandedKeys: Key[]) => {
    setExpandKeys([...new Set(expandedKeys)])
    setAutoExpand(false)
  }

  const renderTree: any = (list: ILeafNode[]) => {
    const tree = list.map(leaf => {
      return {
        key: leaf.key,
        isEdit: leaf.isEdit,
        title: !leaf.isEdit ? (
          <div className="tree-leaf">
            <span>{leaf.title}</span>
            <span className="action">
              <img
                className="icon"
                src={IconEdit}
                alt="update"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleLeafEdit(leaf.key, true)
                  setInputValue(leaf.key)
                }}
              />
            </span>
          </div>
        ) : (
            <Input
              id={INPUT_ID}
              maxLength={10}
              ref={inputNode}
              value={inputValue}
              onChange={({ currentTarget }) => {
                const val = currentTarget.value
                setInputValue(val)
                toggleUpdated(val !== leaf.title)
              }}
              onPressEnter={({ currentTarget }) => {
                handleLeafEdit(currentTarget.value, leaf.key)
              }}
              onBlur={({ currentTarget }) => {
                handleLeafEdit(currentTarget.value, leaf.key)
              }}
            />
          ),
        children: leaf.children
          ? renderTree(leaf.children)
          : null
      }
    })
    return tree
  }

  return (
    <div className="container-editable-tree">
      <Tree
        {...props}
        blockNode
        selectedKeys={selectKeys}
        expandedKeys={expandKeys}
        treeData={renderTree(treeList)}
        onExpand={handleExpand}
        onSelect={handleTreeNodeSelect}
        autoExpandParent={autoExpand}
      />
    </div>
  )
}

export default EditableTree
