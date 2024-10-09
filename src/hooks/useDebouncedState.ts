import { useEffect, useState } from 'react'

/**
 * A custom hook that debounces a value with a specified delay.
 * @param initialValue The initial state value.
 * @param delay The debounce delay in milliseconds.
 * @returns The debounced value and a setter function to update the state.
 */
function useDebouncedState<T>(initialValue: T, delay: number) {
  const [value, setValue] = useState<T>(initialValue)
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)

  useEffect(() => {
    // Set up a debounce effect
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup the timeout if the value changes before the delay is over
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return [debouncedValue, setValue] as const
}

export default useDebouncedState
