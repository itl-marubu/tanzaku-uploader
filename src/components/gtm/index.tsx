'use client'
import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '@/lib/storageHelper'
import styles from './style.module.scss'
import { Button } from '../Button'
import { sendGTMEvent } from '@next/third-parties/google'

type DataObj = Record<string, string | number>

type WindowWithDataLayer = Window & {
  dataLayer: DataObj[]
}

declare const window: WindowWithDataLayer

export const CookieBanner = () => {
  const [_, setCookieConsent] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const storedCookieConsent = getLocalStorage('cookie_consent', null)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setCookieConsent(storedCookieConsent)

    if (storedCookieConsent == null || storedCookieConsent == false) {
      setShowPopup(true)
    }
  }, [setCookieConsent])

  const setConsent = (cookieConsent: boolean) => {
    return () => {
      const newValue = cookieConsent ? 'granted' : 'denied'

      sendGTMEvent({
        event: 'consent',
        analytics_storage: newValue,
      })

      setLocalStorage('cookie_consent', cookieConsent)

      //For Testing
      console.log('Cookie Consent: ', cookieConsent)

      if (cookieConsent) {
        setShowPopup(false)
      }
    }
  }

  return (
    showPopup && (
      <div className={styles.gtagPopup}>
        <div className="text-center">
          <p>
            このウェブサイトではサードパーティCookieを使用します。詳細は
            <Link href="/info/gtm" className={styles.linkUl}>
              こちら
            </Link>
            をご参照ください。
          </p>
        </div>

        <div className={styles.buttons}>
          <Button size="sm" onClick={setConsent(true)}>
            許可する
          </Button>
          <Button
            size="sm"
            className={styles.buttonDecline}
            onClick={setConsent(false)}
          >
            拒否する
          </Button>
        </div>
      </div>
    )
  )
}
