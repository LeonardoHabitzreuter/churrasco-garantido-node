export const saveLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data))

export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key))

export const removeLocalStorage = (key) => localStorage.removeItem(key)

export const clearLocalStorage = () => localStorage.clear()
