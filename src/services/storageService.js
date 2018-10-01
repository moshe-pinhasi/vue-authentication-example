const save = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
}

const get = (name) => {
    const val = localStorage.getItem(name)
    if (!val) return null

    return JSON.parse(val)
}

const remove = (name) => {
    localStorage.removeItem(name)
}

export default {
    save,
    get,
    remove
}