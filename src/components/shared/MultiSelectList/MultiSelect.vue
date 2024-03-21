<script setup lang="ts">
import type { IMultiSelect, ICheckedData } from '@/types'
import { ref } from 'vue'
import CustomSearchBar from '../CustomSearchBar.vue'
import InfiniteScroll from '../InfiniteScroll.vue'
import ListItem from './ListItem.vue'
import SelectItem from './SelectItem.vue'
import { handleCheckedItems as handleCheckedItemsUtil } from '@/helpers/handleCheckedItems'
import { useScrollTop } from '@/composables/useScrollTop'

const props = withDefaults(defineProps<IMultiSelect>(), {
  itemIds: () => [],
  checkedItems: () => [],
  items: () => [],
  pagination: () => ({
    loader: false,
    hasNext: true
  }),
  searchPlaceholder: 'Search'
})

const searchTerm = ref('')

const { handleScrollTop, scrollContainerRef } = useScrollTop()

const emit = defineEmits(['search', 'loadItems', 'itemIds', 'checkedItems'])

const handleSearch = (search: string) => {
  handleScrollTop()
  searchTerm.value = search
  emit('search', search)
}

const handleCheckedItems = (customItem: ICheckedData<string, string>) => {
  handleCheckedItemsUtil(
    customItem,
    ref(props.checkedItems),
    ref(props.itemIds),
    emit as (event: string, ...args: any[]) => void
  )
}

const handlePageItems = () => {
  emit('loadItems')
}
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <CustomSearchBar @search="handleSearch" :placeholder="props.searchPlaceholder" class-name="max-w-full" />
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div ref="scrollContainerRef" class="h-[29rem] overflow-y-auto rounded-xl border-2 bg-slate-100">
        <InfiniteScroll
          :loader="props.pagination?.loader"
          :has-next="props.pagination?.hasNext"
          @loadMore="handlePageItems"
        >
          <template v-if="props.items.length > 0">
            <ul class="grid gap-4 p-4">
              <ListItem
                v-for="item in props.items"
                :key="item?.value"
                :items="props.items"
                :searchTerm="searchTerm"
                :item="item"
                :checkedItems="props.checkedItems"
                @handleCheckedItems="handleCheckedItems"
              />
            </ul>
          </template>
          <template v-else>
            <div class="flex h-[29rem] flex-col items-center justify-center gap-4">
              <p class="text-sm text-[--secondary-color]">No items found</p>
              <Loader2 class="animate-spin" :size="16" />
            </div>
          </template>
        </InfiniteScroll>
      </div>
      <div class="flex h-[29rem] flex-col gap-2 overflow-y-auto rounded-xl border-2 bg-slate-100 p-4">
        <span class="text-sm text-[--secondary-color]">{{ itemIds?.length }} item selected</span>
        <div class="flex flex-wrap gap-2">
          <SelectItem
            v-for="checkedItem in props.checkedItems"
            :key="checkedItem?.value"
            :checkedItem="checkedItem"
            @handleCheckedItems="handleCheckedItems"
          />
        </div>
      </div>
    </div>
  </div>
</template>
