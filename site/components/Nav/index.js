import React from "react"
import Logo from '../Logo'
import styles from './nav.module.css'

export default function NavBar({ leftContent, rightContent }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContent}>
        <div className={styles.logo}>
          <Logo />
        </div>
        {leftContent}
      </div>

      <div className={styles.rightContent}>
        {rightContent}
      </div>
    </div>
  )
}
