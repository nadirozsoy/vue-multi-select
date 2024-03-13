<script setup lang="ts">
import type { ICheckedData } from '@/types'

type Props = {
  checkedItem: ICheckedData
}

const emit = defineEmits(['handleCheckedItems'])

function handleCheckedItems(item: ICheckedData) {
  emit('handleCheckedItems', item)
}

defineProps<Props>()
</script>

<template>
  <button
    class="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-slate-600 active:shadow-none shadow-lg bg-gradient-to-tr from-slate-600 to-slate-500 border-slate-700 text-white"
    size="small"
    @click="handleCheckedItems(checkedItem)"
  >
    <span
      class="absolute w-0 h-0 transition-all duration-300 ease-out bg-white group-hover:w-full group-hover:h-full opacity-10"
    />
    <span class="relative text-sm">
      {{ checkedItem?.label }}
    </span>
  </button>
</template>
