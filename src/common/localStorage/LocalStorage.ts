
export function setToLocalStorage<T>(keyName: string, value: T) {
    localStorage.setItem(keyName, JSON.stringify(value))
}

export function getToLocalStorage(keyName: string) {
    let newValue_todoLists = localStorage.getItem(keyName);
    if (newValue_todoLists) {
        let new_start_value = JSON.parse(newValue_todoLists);
        return new_start_value
    }
}