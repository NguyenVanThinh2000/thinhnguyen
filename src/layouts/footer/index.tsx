import { Copyright } from 'lucide-react'

import styles from './footer.module.scss'

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <Copyright size={16} />
      <span>nguyenvanthinh2701@gmail.com</span>
    </div>
  )
}

export default Footer
