'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createTanzaku } from '@/api'
import { Button } from '@/components/Button'
import styles from './index.module.scss'

type FieldValues = {
  textLine: string
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
    const textLine1 = data.textLine.slice(0, 7)
    const textLine2 = data.textLine.slice(7)
    const res = await createTanzaku(eventId, {
      textLine1,
      textLine2,
      nameLine: data.nameLine,
    }).catch((e) => {
      console.error(e)
      alert(`作成に失敗しました。`)
    })
    if (res !== undefined) {
      alert('作成しました')
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrap}>
      <div className={styles.inputWrap}>
        <label htmlFor="textLine" className={styles.label}>
          まずは短冊に書くことを教えてください。
        </label>
        <input
          {...register('textLine', { required: true, maxLength: 14 })}
          className={styles.input}
        />
        {errors.textLine && <span>最大14文字のテキストを入力してください</span>}
      </div>
      <div className={styles.inputWrap}>
        <label htmlFor="nameLine" className={styles.label}>
          名前を教えてください。
        </label>
        <input
          {...register('nameLine', { required: true, maxLength: 8 })}
          className={styles.input}
        />
        {errors.nameLine && <span>最大8文字の名前を入力してください</span>}

        <Button type="submit" className={styles.button}>
          登録
        </Button>
      </div>
    </form>
  )
}
