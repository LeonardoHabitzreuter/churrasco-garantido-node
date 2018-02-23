import React from 'react'
import styles from './Link.css'
import classnames from 'classnames'

export const Link = ({
  children,
  color,
  className
}) => {
  console.log(children)
  console.log(color)
  console.log(className)
  console.log(styles.link)
  console.log(styles[color])
  return (
    <a
      className={
        classnames(
          styles.link,
          styles[color],
          className
        )
      }
      href='#'
    >
      { children }
    </a>
  )
}

export default Link
