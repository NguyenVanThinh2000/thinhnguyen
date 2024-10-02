export const generateCalendar = (month: number, year: number) => {
  const daysInMonth = new Date(year, month, 0).getDate()
  const firstDay = new Date(year, month - 1, 1).getDay()
  const lastDay = new Date(year, month - 1, daysInMonth).getDay()
  const calendar = []

  for (let i = 0; i < firstDay - 1; i++) {
    calendar.push(0)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendar.push(i)
  }

  for (let i = 0; i < 6 - lastDay + 1; i++) {
    calendar.push(0)
  }

  const weeks = []
  for (let i = 0; i < calendar.length; i += 7) {
    weeks.push(calendar.slice(i, i + 7))
  }
  return weeks
}
