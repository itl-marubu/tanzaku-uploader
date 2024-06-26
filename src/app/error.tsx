'use client'

import { notFound } from 'next/navigation'
import { useCallback } from 'react'
import { Button } from '@/components/Button'
import { isNotFound } from '@/lib/error'
import styles from './error.module.scss'

export default function Error({ error }: { error: Error }) {
  const handleReload = useCallback(() => {
    window.location.reload()
  }, [])

  if (isNotFound(error)) {
    notFound()
  }

  return (
    <div className={styles.wrapper}>
      <h1>問題が発生しました :(</h1>
      <p>もしサポートに問い合わせる際は、次のメッセージを添付ください。</p>
      <p>{error.message}</p>
      <Button onClick={handleReload}>再読み込みする</Button>
    </div>
  )
}
