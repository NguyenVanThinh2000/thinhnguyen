import { TGuestState } from './type'

export const initialGuestState: TGuestState = {
  isLoading: false,
  isLoadingGetGuests: false,
  error: null,
  data: [],
  filter: {
    host: [],
  },
}
