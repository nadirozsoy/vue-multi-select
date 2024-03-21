export type ICheckedData<L = string, V = string> = {
  label: L
  value: V
}

export type IMultiSelect<T = string, L = string, V = string> = {
  itemIds?: T[]
  checkedItems?: ICheckedData<L, V>[]
  items?: any[]
  searchPlaceholder?: string
  pagination: {
    page?: number
    size?: number
    loader?: boolean
    hasNext?: boolean
    search?: string | null
  }
}

export type IState = {
  characters: any[]
}

export type IPagination = {
  page: number
  size: number
  loader: boolean
  hasNext: boolean
  name: string | null
}
