
export interface UserfollowResponse {
  success: boolean
  message: string
  data: Userfollow
}

export interface Userfollow {
  following: boolean
  followersCount: number
}
