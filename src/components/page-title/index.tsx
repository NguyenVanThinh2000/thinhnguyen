import styles from './page-title.module.scss'

interface IPageTitleProps {
  title: string
}

export const PageTitle = ({ title }: IPageTitleProps) => {
  return <div className={styles.pageTitle}>{title}</div>
}
