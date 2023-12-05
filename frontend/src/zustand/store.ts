import { create } from 'zustand'
import { UserSlice } from './userSlice'

export const useMainStore = create((...a) => ({
    ...UserSlice(a)
}))