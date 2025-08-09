function isJsonString(str) {
  try {
    // We use JSON.parse str to check if a string is JSON
    // Because it is the only reliable built-in way to check, regex cannot because JSON is too complex
    JSON.parse(str)
  } catch (error) {
    console.log(error)
    return false
  }
  return true
}

// perform a health check on localStorage
// Prevents app crashes caused by malformed data in localStorage
// Keep localStorage clean by removing unused or broken data
// reduce memory usage
export const localStorageHealthCheck = async () => {
  for (let i = 0; i < localStorage.length; i++) {
    try {
      const result = window.localStorage.getItem(localStorage.key(i))

      if (!isJsonString(result)) {
        window.localStorage.removeItem(localStorage.key(i))
      }
      if (result && Object.keys(localStorage.key(i).length === 0)) {
        window.localStorage.removeItem(localStorage.key(i))
      }
    } catch (error) {
      window.localStorage.clear()

      console.log('window.localStorage Exception occured:', error)
    }
  }
}

export const storePersist = {
  set: (key, state) => {
    window.localStorage.setItem(key, JSON.stringify(state))
  },
  get: (key) => {
    const result = window.localStorage.getItem(key)
    if (!result) {
      return false
    } else if (!isJsonString(result)) {
      return false
    } else {
      return JSON.parse(result)
    }
  },
  remove: (key) => {
    window.localStorage.removeItem(key)
  },
  getAll: () => {
    window.localStorage
  },
  clear: () => {
    window.localStorage.clear()
  },
}

export default storePersist
