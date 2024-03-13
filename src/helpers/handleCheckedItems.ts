// utils.ts
import type { ICheckedData } from '@/types'
import { ref, type Ref } from 'vue'

export const handleCheckedItems = (
  customItem: { label: string; value: string },
  propsCheckedItems: Ref<ICheckedData[]>,
  propsItemIds: Ref<string[]>,
  emit: (event: string, ...args: any[]) => void
) => {
  const localCheckedItems: Ref<ICheckedData[]> = ref([...propsCheckedItems.value])
  const localItemIds: Ref<string[]> = ref([...propsItemIds.value])

  if (localCheckedItems.value?.find((item: { label: string; value: string }) => item?.value === customItem.value)) {
    localCheckedItems.value = localCheckedItems.value?.filter(
      (item: { label: string; value: string }) => item.value !== customItem.value
    )
    localItemIds.value = localItemIds.value?.filter((id: string) => id !== customItem.value)
  } else {
    if (!localCheckedItems.value?.includes(customItem)) localCheckedItems.value?.push(customItem)
    if (!localItemIds.value?.includes(customItem.value)) localItemIds.value?.push(customItem.value)
  }

  emit('itemIds', localItemIds.value)
  emit('checkedItems', localCheckedItems.value)
}
