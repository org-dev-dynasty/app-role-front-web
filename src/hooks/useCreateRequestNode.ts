import { useState } from 'react'

export const useCreateRequestNode = <T>(initialValue?: T) => {
  const [data, setData] = useState<T | undefined>(initialValue)

  return {
    data,
    setData,
    ...useSimpleRequestNode()
  }
}

export const useSimpleRequestNode = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()

  return {
    loading,
    setLoading,
    error,
    setError
  }
}

export const usePaginationNode = () => {
  const [page, setPage] = useState<{
    page: number
    nextPage: number | null
    prevPage: number | null
    totalCount: number
    totalPages: number
    isFinalPage: boolean
    isFirstPage: boolean
    loadNextPage?: () => void
    loadPrevPage?: () => void
    goToPage?: (page: number) => void
  }>({
    totalPages: 0,
    totalCount: 0,
    page: 0,
    nextPage: null,
    prevPage: null,
    isFirstPage: true,
    isFinalPage: false
  })

  return {
    page,
    setPage
  }
}
