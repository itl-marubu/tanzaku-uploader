'use client'
import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '@/lib/storageHelper'
import styles from './style.module.scss'
import { Button } from '../Button'

type DataObj = Record<string, string | number>

type WindowWithDataLayer = Window & {
  dataLayer: DataObj[]
}

declare const window: WindowWithDataLayer

export const GoogleTagManager = () => {
  return (
    <>
      <noscript>
        <iframe
          title="GTM"
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
          `,
        }}
      />
    </>
  )
}

export const event = (obj: DataObj) => {
  if (
    typeof window !== 'undefined' &&
    typeof window.dataLayer !== 'undefined'
  ) {
    window.dataLayer.push(obj)
  }
}

export const withEvent = (obj: DataObj) => {
  return <Args extends unknown[], Return, F extends (...args: Args) => Return>(
    fn: F,
  ) => {
    return (...args: Args) => {
      event(obj)
      return fn(...args)
    }
  }
}

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

      event({
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
