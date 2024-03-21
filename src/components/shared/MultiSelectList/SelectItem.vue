<script setup lang="ts">
import type { ICheckedData } from '@/types'

type Props = {
  checkedItem: ICheckedData<string, string>
}

const emit = defineEmits(['handleCheckedItems'])

function handleCheckedItems(item: ICheckedData<string, string>) {
  emit('handleCheckedItems', item)
}

defineProps<Props>()
</script>

<template>
  <button
    class="group relative m-1 inline-flex cursor-pointer items-center justify-center rounded border-b-4 border-l-2 border-slate-700 bg-gradient-to-tr from-slate-600 to-slate-500 px-3.5 py-2 text-white shadow-lg active:border-slate-600 active:shadow-none"
    size="small"
    @click="handleCheckedItems(checkedItem)"
  >
    <span
      class="absolute h-0 w-0 bg-white opacity-10 transition-all duration-300 ease-out group-hover:h-full group-hover:w-full"
    />
    <span class="relative text-sm">
      {{ checkedItem?.label }}
    </span>
  </button>
</template>
