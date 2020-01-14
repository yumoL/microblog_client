import '@testing-library/jest-dom/extend-expect'

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => {
    return savedItems[key]
  },
  clear: savedItems = {}
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

export { localStorageMock }