import clsx from 'clsx'
import * as React from 'react'
import { forwardRef } from 'react'
import styles from './index.module.scss'

export type Variant = 'fill' | 'outline' | 'text' | 'error' | 'accent'

export type Props = {
  variant?: Variant
  block?: boolean
  rounded?: boolean
  size?: 'xsm' | 'sm' | 'lg'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = 'fill', block, size = 'lg', rounded, className, ...btnProps },
  ref,
) {
  return (
    <button
      ref={ref}
      className={clsx(
        className,
        styles.button,
        styles.buttonBase,
        styles[size],
        styles[variant],
        {
          [styles.rounded]: rounded,
          [styles.block]: block,
        },
      )}
      {...btnProps}
    />
  )
})
