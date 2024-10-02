import { Fragment, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { PageTitle } from '@/components'
import { TTaskStatus, taskStatus } from '@/context/task'
import { useTaskContext } from '@/hooks/context'

import ColumnHeaderItem from './components/column-header-item'
import TaskList from './components/task-list'
import styles from './task.module.scss'

const Task = () => {
  const {
    state: { data },
    actions: { getTasks },
  } = useTaskContext()

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className={styles.pageWrapper}>
      <PageTitle title="Task List" />

      <div className={styles.columnsWrapper}>
        <div className={styles.columnHeaders}>
          {Object.keys(taskStatus).map((status, index) => (
            <Fragment key={index}>
              <ColumnHeaderItem status={status as TTaskStatus} />
            </Fragment>
          ))}
        </div>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.columns}>
            {Object.keys(data).map((status, index) => (
              <TaskList
                key={index}
                data={data[status as TTaskStatus]}
                status={status as TTaskStatus}
              />
            ))}
          </div>
        </DndProvider>
      </div>
    </div>
  )
}

export default Task
