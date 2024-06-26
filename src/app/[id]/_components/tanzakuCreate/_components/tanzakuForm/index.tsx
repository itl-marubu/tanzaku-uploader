'use client'
import { redirect } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createTanzaku } from '@/api'
import { Button } from '@/components/Button'
import styles from './index.module.scss'

type FieldValues = {
  textLine1: string
  textLine2?: string
  nameLine: string
}

type Props = {
  eventId: string
}

export const TanzakuForm: React.FC<Props> = ({ eventId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await createTanzaku(eventId, data).catch((e) => {
      console.error(e)
      alert(`作成に失敗しました`)
    })
    if (res !== undefined) {
      alert('作成しました')
      redirect('/events')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrap}>
      <div className={styles.inputWrap}>
        <label htmlFor="textLine1" className={styles.label}>
          テキスト1
        </label>
        <input
          {...register('textLine1', { required: true })}
          className={styles.input}
        />
        {errors.textLine1 && <span>テキスト1を入力してください</span>}
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="textLine2" className={styles.label}>
          テキスト2
        </label>
        <input {...register('textLine2')} className={styles.input} />
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="nameLine" className={styles.label}>
          名前
        </label>
        <input
          {...register('nameLine', { required: true })}
          className={styles.input}
        />
        {errors.nameLine && <span>名前を入力してください</span>}
      </div>

      <Button type="submit">作成</Button>
    </form>
  )
}
