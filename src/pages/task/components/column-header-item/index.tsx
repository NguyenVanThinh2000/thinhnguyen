import { Plus } from 'lucide-react'

import { TTaskStatus, taskStatus } from '@/context/task'
import { useTaskContext } from '@/hooks/context'
import { TTaskCreate } from '@/types'

import styles from './column-header-item.module.scss'

interface IColumnHeaderItemProps {
  status: TTaskStatus
}

const ColumnHeaderItem = ({ status }: IColumnHeaderItemProps) => {
  const {
    state: { data },
    actions: { addTask },
  } = useTaskContext()

  const handleAddTask = () => {
    const newTask: TTaskCreate = {
      title: `Task ${data[status].length + 1}`,
      description: `Description ${data[status].length + 1}`,
      status,
    }
    addTask(newTask, data)
  }

  return (
    <div className={styles.itemWrapper}>
      <span className={styles.title}>
        {taskStatus[status]} ({data[status].length})
      </span>

      <div className={styles.buttonAddTask} onClick={handleAddTask}>
        <Plus size={14} />
      </div>
    </div>
  )
}

export default ColumnHeaderItem
