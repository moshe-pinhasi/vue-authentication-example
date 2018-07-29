class StorageService {
    save(name, value) {
        localStorage.setItem(name, JSON.stringify(value))
    }

    get(name) {
        const val = localStorage.getItem(name)
        if (!val) return null

        return JSON.parse(val)
    }

    remove(name) {
        localStorage.removeItem(name)
    }
}

export default new StorageService()