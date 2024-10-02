import { useDrop } from 'react-dnd'

import clsx from 'clsx'

import { TTask, TTaskStatus, taskStatus } from '@/context/task'
import { useTaskContext } from '@/hooks/context'

import TaskItem from '../task-item'
import styles from './task-list.module.scss'

interface ITaskListProps {
  data: TTask[]
  status: TTaskStatus
}
const TaskList = ({ data, status }: ITaskListProps) => {
  const {
    state: { data: tasks },
    actions: { moveTask },
  } = useTaskContext()

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: Object.keys(taskStatus).filter((key) => key !== status),
    drop: (item) => moveTask(item as TTask, status, tasks),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver

  return (
    <div
      ref={drop}
      className={clsx(styles.taskList, {
        [styles.isActive]: isActive,
        [styles.canDrop]: canDrop,
      })}
    >
      {data.map((task, index) => (
        <TaskItem key={index} data={task} />
      ))}
    </div>
  )
}

export default TaskList
