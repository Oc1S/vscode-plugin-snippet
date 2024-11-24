export const isBrowser = true

export const storage = {
  get(key: string) {
    const val = localStorage.getItem(key)
    return val && JSON.parse(val)
  },
  set(key: string, value: unknown) {
    return localStorage.setItem(key, JSON.stringify(value))
  },
}
