import React from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const CustomFlatList = ({
  data = [],
  renderItem,
  keyExtractor,
  loading = false,
  refreshing = false,
  onRefresh,
  onEndReached,
  ListHeaderComponent,
  ListFooterComponent,
  contentContainerStyle,
  ItemSeparatorComponent,
  emptyText = 'No data available',
}) => {
  const Loader = () => (
    <View style={styles.loader}>
      <ActivityIndicator size="small" />
    </View>
  );

  const EmptyState = ({ text }) => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.4}
      onEndReached={onEndReached}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={[
        styles.container,
        data.length === 0 && styles.center,
        contentContainerStyle,
      ]}
      ItemSeparatorComponent={
        ItemSeparatorComponent || (() => <View style={styles.separator} />)
      }
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={loading ? <Loader /> : ListFooterComponent}
      ListEmptyComponent={!loading && <EmptyState text={emptyText} />}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    paddingBottom: moderateScale(20),
  },

  center: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  separator: {
    height: moderateScale(10),
  },

  loader: {
    paddingVertical: moderateScale(20),
  },

  empty: {
    alignItems: 'center',
  },

  emptyText: {
    fontSize: moderateScale(14),
    color: '#9CA3AF',
  },
});

export default CustomFlatList;