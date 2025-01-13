import React from 'react';
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from 'react-window';

const LazyloadLayout = ({ itemCount, itemSize, children }) => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List height={height} itemCount={itemCount} itemSize={itemSize} width={width}>
          {children}
        </List>
      )}
    </AutoSizer>
  );
};

export default LazyloadLayout;