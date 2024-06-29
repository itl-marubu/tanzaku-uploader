'use client'
import { sendGTMEvent } from '@next/third-parties/google'
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
    reset,
  } = useForm<FieldValues>()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await createTanzaku(eventId, data).catch((e) => {
      console.error(e)
      sendGTMEvent({
        event: 'click_create_tanzaku',
        category: 'click',
        status: 'fail',
      })
      alert(`作成に失敗しました`)
    })
    if (res !== undefined) {
      sendGTMEvent({
        event: 'click_create_tanzaku',
        category: 'click',
        status: 'success',
      })
      alert('作成しました')
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrap}>
      <div className={styles.inputWrap}>
        <label htmlFor="textLine1" className={styles.label}>
          テキスト1
        </label>
        <input
          {...register('textLine1', { required: true, max: 8 })}
          className={styles.input}
        />
        {errors.textLine1 && <span>テキスト1を入力してください</span>}
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="textLine2" className={styles.label}>
          テキスト2
        </label>
        <input
          {...register('textLine2', { max: 6 })}
          className={styles.input}
        />
        {errors.textLine2 && <span>テキスト2を入力してください</span>}
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="nameLine" className={styles.label}>
          名前
        </label>
        <input
          {...register('nameLine', { required: true, max: 9 })}
          className={styles.input}
        />
        {errors.nameLine && <span>名前を入力してください</span>}
      </div>

      <Button type="submit">作成</Button>
    </form>
  )
}
