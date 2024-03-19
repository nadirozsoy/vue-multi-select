<script setup lang="ts">
type Props = {
  items: any[]
  checkedItems: any[]
  item: any
  searchTerm: string
}

const emit = defineEmits(['handleCheckedItems'])

function handleCheckedItems(item: any) {
  emit('handleCheckedItems', item)
}

defineProps<Props>()

const highlightSearchTerm = (text: string, searchTerm: string): string => {
  const lowerCaseText = text.toLowerCase().trim()
  const lowerCaseSearchTerm = searchTerm?.toLowerCase().trim()
  const startIndex = lowerCaseText.indexOf(lowerCaseSearchTerm)
  const endIndex = startIndex + lowerCaseSearchTerm?.length
  if (startIndex === -1 || searchTerm === '') return text
  return `${text.slice(0, startIndex)}<span style="font-weight: bold;">${text.slice(startIndex, endIndex)}</span>${text.slice(endIndex)}`
}
</script>

<template>
  <li class="group flex cursor-pointer items-center gap-4" @click="handleCheckedItems(item)">
    <label class="relative">
      <input
        class="custom-checkbox"
        :id="item?.value"
        type="checkbox"
        :value="item?.value"
        :checked="checkedItems?.some(i => i?.value === item?.value)"
        @change="handleCheckedItems(item)"
      />
      <span
        class="checkmark cursor-pointer border border-[#e0e0e6] transition-all duration-200 group-hover:border group-hover:border-primary"
      />
    </label>
    <span
      :for="item?.value"
      class="ml-8 text-[1.4rem]"
      v-dompurify-html="highlightSearchTerm(item.label, searchTerm)"
    ></span>
  </li>
</template>
<style lang="scss">
.custom-checkbox {
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  height: 2rem;
  width: 2rem;
  background-color: #fff;
  border-radius: 0.4rem;
}

.checkmark:after {
  content: '';
  position: absolute;
  display: none;
  left: 0.7rem;
  top: 0.3rem;
  width: 0.5rem;
  height: 1rem;
  border: solid white;
  border-width: 0 0.3rem 0.3rem 0;
  transform: rotate(45deg);
}

.custom-checkbox:checked ~ .checkmark {
  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);
  box-shadow: 0 0.3rem 0.7rem rgba(33, 150, 243, 0.3);
}

.custom-checkbox:checked ~ .checkmark:after {
  display: block;
}

@keyframes checkAnim {
  0% {
    height: 0;
  }

  100% {
    height: 1rem;
  }
}

.custom-checkbox:checked ~ .checkmark:after {
  animation: checkAnim 0.2s forwards;
}
</style>
