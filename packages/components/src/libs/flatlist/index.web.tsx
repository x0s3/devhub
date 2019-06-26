import React from 'react'
import { View } from 'react-native'
import AutoSizer from 'react-virtualized-auto-sizer'
import { DynamicSizeList, VariableSizeList } from 'react-window'

import { sharedStyles } from '../../styles/shared'
import { CrossPlatformFlatList, CrossPlatformFlatListProps } from './types'

export interface FlatListProps<ItemT>
  extends CrossPlatformFlatListProps<ItemT> {
  keyExtractor: (item: ItemT, index: number) => string
}

export class FlatList<ItemT> extends React.Component<FlatListProps<ItemT>>
  implements CrossPlatformFlatList<ItemT> {
  scrollToItem(_params: {
    animated?: boolean
    item: ItemT
    viewPosition?: number
  }) {
    //
  }

  render() {
    const {
      contentContainerStyle,
      data: _data,
      getItemLayout,
      horizontal,
      keyExtractor,
      pointerEvents,
      renderItem,
      style,
      ...otherProps
    } = this.props

    // console.log('xxx props not used yet', { ...otherProps })

    const data = _data || []

    const Row = (row: { index: number; style: any }) => (
      // console.log('xxx row', row.index, row.style),
      <div style={row.style}>
        {renderItem({
          item: data[row.index],
          index: row.index,
          separators: {
            highlight: () => undefined,
            unhighlight: () => undefined,
            updateProps: () => undefined,
          },
        })}
      </div>
    )

    const ListComponent = getItemLayout ? (
      <AutoSizer>
        {({ width, height }) => (
          // console.log('xxx AutoSizer VariableSizeList', width, height),
          <VariableSizeList
            height={height}
            itemCount={data.length}
            itemKey={index => keyExtractor(data[index], index)}
            itemSize={index => getItemLayout(data as ItemT[], index).length}
            layout={horizontal ? 'horizontal' : 'vertical'}
            width={width}
          >
            {Row}
          </VariableSizeList>
        )}
      </AutoSizer>
    ) : (
      <AutoSizer>
        {({ width, height }) => (
          // console.log('xxx AutoSizer DynamicSizeList', width, height),
          <DynamicSizeList
            height={height}
            itemCount={data.length}
            itemKey={index => keyExtractor(data[index], index)}
            layout={horizontal ? 'horizontal' : 'vertical'}
            width={width}
          >
            {Row}
          </DynamicSizeList>
        )}
      </AutoSizer>
    )

    return (
      <View style={[sharedStyles.flex, style]} pointerEvents={pointerEvents}>
        <View style={[sharedStyles.flex, contentContainerStyle]}>
          {ListComponent}
        </View>
      </View>
    )
  }
}
