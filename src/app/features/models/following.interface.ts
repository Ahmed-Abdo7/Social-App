
export interface FollowingResponse {
  success: boolean
  message: string
  data: Following
  meta: Meta
}

export interface Following {
  suggestions: Suggestion[]
}

export interface Suggestion {
  _id: string
  name: string
  username: string
  photo: string
  mutualFollowersCount: number
  followersCount: number
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  currentPage: number
  limit: number
  total: number
  numberOfPages: number
  nextPage: number
}
