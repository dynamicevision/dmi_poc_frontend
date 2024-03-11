export interface PagedResponse{
  content: any[]
  page?: number
  size?: number
  totalElements?: number
  totalPages?: number
  last?: number
}
