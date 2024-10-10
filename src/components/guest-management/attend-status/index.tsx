import { Badge } from '@/components/ui'

interface AttendStatusProps {
  isAttend: boolean | null
}
const AttendStatus = ({ isAttend }: AttendStatusProps) => {
  return (
    <div className="min-w-20">
      <Badge variant={isAttend === null ? 'secondary' : isAttend ? 'success' : 'warning'}>
        {isAttend === null && 'Not yet'}
        {isAttend === true && 'Yes'}
        {isAttend === false && 'No'}
      </Badge>
    </div>
  )
}

export default AttendStatus
