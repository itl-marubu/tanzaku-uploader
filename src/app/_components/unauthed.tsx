'use client'

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

const authedAtom = atomWithStorage('loggedIn', true)
export const Unauthed: React.FC = () => {
  const [authed, _] = useAtom(authedAtom)

  useEffect(() => {
    if (authed) {
      console.log(authed)
      redirect('/events')
    }
  }, [authed])

  return <></>
}
