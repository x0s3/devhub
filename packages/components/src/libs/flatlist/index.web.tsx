import React from 'react'
import { View } from 'react-native'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'

import { sharedStyles } from '../../styles/shared'
import { CrossPlatformFlatList, CrossPlatformFlatListProps } from './types'

export interface FlatListProps<ItemT>
  extends CrossPlatformFlatListProps<ItemT> {
  keyExtractor: (item: ItemT, index: number) => string
}

export class FlatList<ItemT> extends React.Component<FlatListProps<ItemT>>
  implements CrossPlatformFlatList<ItemT> {
  renderRow = React.forwardRef<any, { index: number; style: any }>(
    (row, ref) => (
      // console.log('xxx row', row.index, row.style),
      <div ref={ref} style={row.style}>
        {this.props.renderItem({
          item: this.props.data![row.index],
          index: row.index,
          separators: {
            highlight: () => undefined,
            unhighlight: () => undefined,
            updateProps: () => undefined,
          },
        })}
      </div>
    ),
  )

  ListComponent = (
    <AutoSizer>
      {({ width, height }) => (
        // console.log('xxx AutoSizer VariableSizeList', width, height),
        <FixedSizeList
          height={height}
          itemCount={(this.props.data || []).length}
          itemKey={this.getItemKey}
          itemSize={50}
          layout={this.props.horizontal ? 'horizontal' : 'vertical'}
          width={width}
        >
          {this.renderRow}
        </FixedSizeList>
      )}
    </AutoSizer>
  )

  // getItemLayout ? (
  //   <AutoSizer>
  //     {({ width, height }) => (
  //       // console.log('xxx AutoSizer VariableSizeList', width, height),
  //       <VariableSizeList
  //         height={height}
  //         itemCount={data.length}
  //         itemKey={this.getItemKey}
  //         itemSize={this.itemSize}
  //         layout={horizontal ? 'horizontal' : 'vertical'}
  //         width={width}
  //       >
  //         {this.renderRow}
  //       </VariableSizeList>
  //     )}
  //   </AutoSizer>
  // ) : (
  //   <AutoSizer>
  //     {({ width, height }) => (
  //       // console.log('xxx AutoSizer DynamicSizeList', width, height),
  //       <DynamicSizeList
  //         height={height}
  //         itemCount={data.length}
  //         itemKey={this.getItemKey}
  //         layout={horizontal ? 'horizontal' : 'vertical'}
  //         width={width}
  //       >
  //         {this.renderRow}
  //       </DynamicSizeList>
  //     )}
  //   </AutoSizer>
  // )

  getItemKey = (index: number) => {
    return this.props.keyExtractor(this.props.data![index], index)
  }

  itemSize = (index: number) => {
    return this.props.getItemLayout!(this.props.data! as ItemT[], index).length
  }

  scrollToItem = (_params: {
    animated?: boolean
    item: ItemT
    viewPosition?: number
  }) => {
    //
  }

  render() {
    const { contentContainerStyle, pointerEvents, style } = this.props

    // console.log('xxx props not used yet', { ...otherProps })

    return (
      <View style={[sharedStyles.flex, style]} pointerEvents={pointerEvents}>
        <View style={[sharedStyles.flex, contentContainerStyle]}>
          {this.ListComponent}
        </View>
      </View>
    )
  }
}
