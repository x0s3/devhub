import React, { Fragment } from 'react'
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
  static displayName = 'FlatList (react-window)'

  // tslint:disable member-ordering
  getItemKey = (index: number) => {
    return this.props.keyExtractor(this.props.data![index], index)
  }

  Row = React.forwardRef<any, { index: number; style?: any }>((row, ref) => (
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
  ))

  renderNormalScrollView = (
    <View style={sharedStyles.flex}>
      {(this.props.data || []).map((_item, index) => (
        <Fragment key={this.getItemKey(index)}>
          <this.Row index={index} />
        </Fragment>
      ))}
    </View>
  )

  renderVariableSizeList = (
    <AutoSizer>
      {({ width, height }) => (
        <VariableSizeList
          height={height}
          itemCount={(this.props.data || []).length}
          itemKey={this.getItemKey}
          itemSize={this.itemSize}
          layout={this.props.horizontal ? 'horizontal' : 'vertical'}
          width={width}
        >
          {this.Row}
        </VariableSizeList>
      )}
    </AutoSizer>
  )

  renderDynamicSizeList = (
    <AutoSizer>
      {({ width, height }) => (
        <DynamicSizeList
          height={height}
          itemCount={(this.props.data || []).length}
          itemKey={this.getItemKey}
          layout={this.props.horizontal ? 'horizontal' : 'vertical'}
          overscanCount={
            this.props.disableVirtualization ||
            this.props.removeClippedSubviews === false
              ? 9999
              : undefined
          }
          width={width}
        >
          {this.Row}
        </DynamicSizeList>
      )}
    </AutoSizer>
  )

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
    const {
      contentContainerStyle,
      getItemLayout,
      pointerEvents,
      style,
    } = this.props

    // console.log('xxx props not used yet', { ...otherProps })

    return (
      <View style={[sharedStyles.flex, style]} pointerEvents={pointerEvents}>
        <View style={[sharedStyles.flex, contentContainerStyle]}>
          {this.props.disableVirtualization ||
          this.props.removeClippedSubviews === false
            ? this.renderNormalScrollView
            : getItemLayout
            ? this.renderVariableSizeList
            : this.renderDynamicSizeList}
        </View>
      </View>
    )
  }
}
