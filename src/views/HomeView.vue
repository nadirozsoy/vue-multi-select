<script setup lang="ts">
import MultiSelect from '@/components/shared/MultiSelectList/MultiSelect.vue'
import { useCharacters } from '@/composables/useCharacters'
import { ref } from 'vue'

const { characters, pagination, handleLoadMore, handleSearch } = useCharacters()

const form = ref({
  customItemIds: [] as string[]
})

const checkedCompanies = ref([])
</script>

<template>
  <div class="containerSmall pt-20">
    <MultiSelect
      :pagination="pagination"
      :items="characters"
      :itemIds="form.customItemIds"
      :checkedItems="checkedCompanies"
      class="mb-4"
      search-placeholder="Search for characters"
      @loadItems="handleLoadMore"
      @search="handleSearch"
      @itemIds="form.customItemIds = $event"
      @checkedItems="checkedCompanies = $event"
    />
  </div>
</template>
