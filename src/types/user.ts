export type TGetMeResponse = {
  id: string
  username: string
  name: string
}

export type TLoginResponse = {
  access_token: string
  user: TGetMeResponse
}
