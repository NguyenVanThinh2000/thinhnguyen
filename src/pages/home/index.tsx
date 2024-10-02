import { useEffect } from 'react'

import { generateCalendar } from '@/utils/calendar'

const Home = () => {
  useEffect(() => {
    generateCalendar(11, 2024)
  }, [])

  return <div>Home Page</div>
}

export default Home
