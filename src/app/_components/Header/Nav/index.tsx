'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()
  const pathname = usePathname()

  return (
    <nav className={[classes.nav].filter(Boolean).join(' ')}>
      {navItems.map(({ link }, i) => {
        const isActive =
          typeof link?.reference.value === 'object' &&
          link?.reference.value.slug &&
          pathname.startsWith(`/${link?.reference.value.slug}`)
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="none"
            className={isActive || isActive === null ? classes.activeLink : ''}
          />
        )
      })}
      <CartLink className={pathname.startsWith('/cart') ? classes.activeLink : ''} />
      {user && (
        <Link href="/account" className={pathname.startsWith('/account') ? classes.activeLink : ''}>
          Account
        </Link>
      )}
      {!user && <Button el="link" href="/login" label="Login" appearance="primary" />}
    </nav>
  )
}
