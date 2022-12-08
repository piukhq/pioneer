/* eslint-disable no-import-assign */

import React from 'react'
import { render, screen } from '@testing-library/react'
import * as device from 'react-device-detect'

import AppLinks from 'components/AppLinks'

jest.mock('react-device-detect', () => ({
  __esModule: true,
  isMobile: false,
  osName: null,
}))

describe('Test AppLinks', () => {
  global.Config = {
    urls: {
      iosStore: 'mockIosStoreUrl',
      androidStore: 'mockAndroidStoreUrl',
    },
  }

  describe('Test desktop', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should render the iOS app link', () => {
      render(<AppLinks />)

      expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', 'mockIosStoreUrl')
    })

    it('should render the Android app link', () => {
      render(<AppLinks />)

      expect(screen.getAllByRole('link')[1]).toHaveAttribute('href', 'mockAndroidStoreUrl')
    })
  })

  describe('Test mobile', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      device.isMobile = true
    })

    it('should only render the iOS app link on an iOS device', () => {
      device.osName = 'iOS'
      render(<AppLinks />)
      const appLinks = screen.getAllByRole('link')

      expect(appLinks.length).toBe(1)
      expect(appLinks[0]).toHaveAttribute('href', 'mockIosStoreUrl')
    })

    it('should only render the Android app link on an Android device', () => {
      device.osName = 'Android'
      render(<AppLinks />)
      const appLinks = screen.getAllByRole('link')

      expect(appLinks.length).toBe(1)
      expect(appLinks[0]).toHaveAttribute('href', 'mockAndroidStoreUrl')
    })
  })
})
