import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { AppDispatch, AppRootStateType } from '../reducers/store'


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch() as AppDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//=================== useDebounce =============================
function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])
    return debouncedValue
}

export default useDebounce