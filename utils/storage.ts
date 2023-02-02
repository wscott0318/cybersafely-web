const Storage = {
  token: 'token',
  schoolId: 'schoolId',
}

export class StorageManager {
  static get<K extends keyof typeof Storage>(key: K) {
    if (localStorage) {
      return localStorage.getItem(Storage[key])
    }
  }

  static set<K extends keyof typeof Storage>(key: K, value: string) {
    if (localStorage) {
      localStorage.setItem(Storage[key], value)
    }
  }

  static clear() {
    if (localStorage) {
      localStorage.clear()
    }
  }
}
