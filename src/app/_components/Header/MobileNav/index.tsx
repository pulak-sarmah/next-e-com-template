'use client'
import React, { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { RxHamburgerMenu } from 'react-icons/rx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'

const HeaderMobileNav: React.FC<{ header: HeaderType }> = ({ header }: { header: HeaderType }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const Router = useRouter()
  return (
    <>
      {isOpen && <div onClick={() => setIsOpen(false)} className={classes.mobileNavBackdrop} />}
      <nav className={classes.mobileNav}>
        <CartLink />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${classes.menuButton} ${isOpen ? classes.rotate : ''}`}
        >
          {!isOpen && <RxHamburgerMenu size={25} />}
        </button>

        <div className={`${classes.menu} ${isOpen ? classes.open : ''}`}>
          <div
            style={{
              marginTop: '1rem',
            }}
          >
            <div>
              <IoCloseOutline
                size={25}
                onClick={() => setIsOpen(!isOpen)}
                className={`${classes.menuButton} ${!isOpen ? classes.rotate : ''}`}
              />
            </div>
            <div className={classes.navItemBox}>
              <span>
                {navItems.map(({ link }, i) => {
                  return (
                    <div key={i} className={classes.navItem} onClick={() => setIsOpen(false)}>
                      <CMSLink {...link} appearance="none" />
                    </div>
                  )
                })}
              </span>

              <span className={classes.accountLink}>
                {user && (
                  <Link
                    href="/account"
                    onClick={() => {
                      Router.push('/account')
                      setIsOpen(false)
                    }}
                  >
                    Account
                  </Link>
                )}
              </span>
              <span className={classes.accountLink}>
                {!user && (
                  <Button
                    el="link"
                    label="Login"
                    appearance="primary"
                    onClick={() => {
                      Router.push('/login')
                      setIsOpen(false)
                    }}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default HeaderMobileNav
