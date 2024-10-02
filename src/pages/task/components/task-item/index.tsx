import { useDrag } from 'react-dnd'

import clsx from 'clsx'

import { TTask } from '@/context/task'

import styles from './task-item.module.scss'

interface ITaskItemProps {
  data: TTask
}

const TaskItem = ({ data }: ITaskItemProps) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: data.status,
      item: data,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [data],
  )

  return (
    <div
      ref={drag}
      className={clsx(styles.taskItem, {
        [styles.isDragging]: isDragging,
      })}
    >
      <span className={clsx(styles.title, styles[data.status])}>{data.title}</span>
    </div>
  )
}

export default TaskItem
