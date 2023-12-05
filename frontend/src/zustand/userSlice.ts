export const UserSlice = (set:any) => ({
    user: 0,
    setUser: (user:string) => set(() => ({ user:user })),
  })