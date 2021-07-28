import React from 'react'
import cx from 'classnames'

import styles from './CookiePolicyPage.module.scss'

const CookiePolicyPage = () => (
  <>
    <h1 className={cx(styles.root, styles.root__header)}>Cookie Policy</h1>
    <br />

    <span className={styles.root}>
      We use cookies and similar technologies on this website.
      <br />
      <br />
      This website uses cookies and similar technologies to collect data from your device.
      Like many other businesses we need to collect this data for the website to operate and we also use it to enable functionality that makes it easier for you when you return to the website in the future.
      <br />
      <br />
      Cookies are text files containing small amounts of information, which your computer or mobile device downloads when you visit a website.
      When you return to websites – or visit websites that use the same cookies – they recognise these cookies and therefore your browsing device.
      <br />
      <br />
      We use cookies to do lots of different jobs, like letting you navigate between pages efficiently, remembering your preferences and generally improving your browsing experience.
      <br />
      <br />
      If you visit our website, we will deploy these technologies to provide an online service more suited to the device you connect from, as well as to prevent and detect fraud, keeping you secure.
      When you visit our website from any device (mobile, tablet or PC), we collect information about your use of this site, such as information about the device or browser you use to access the site (including device type, operating system, screen resolution and more).
      You may not be able to initiate or complete some activities within our secure online services unless these cookies or similar technologies are installed.
      <br />
      <br />
      We use cookies to:
      <br />
      <br />

      <ul className={styles.root__list}>
        <li className={cx(styles.root, styles['root__list--item'])}>Ensure your security and privacy when in our secure sites</li>
        <li className={cx(styles.root, styles['root__list--item'])}>Store login details for our secure sites</li>
        <li className={cx(styles.root, styles['root__list--item'])}>We use both our own (first-party) and partner companies' (third-party) cookies to support these activities</li>
        <li className={cx(styles.root, styles['root__list--item'])}>The types of cookies used on this website fall into one of two categories – ‘strictly necessary’ and ‘functionality’.</li>
      </ul>
    </span>

    <br />

    <h2 className={cx(styles.root, styles.root__header, styles['root__header--sub-header'])}>Third Party Cookies</h2>

    <br />

    <table className={styles.root__table}>
      <tr>
        <th className={cx(styles.root, styles['root__table-cell'])}>Third Party</th>
        <th className={cx(styles.root, styles['root__table-cell'])}>Description</th>
        <th className={cx(styles.root, styles['root__table-cell'])}>Type</th>
        <th className={cx(styles.root, styles['root__table-cell'])}>Privacy Policy</th>
      </tr>

      <tr>
        <td className={cx(styles.root, styles['root__table-cell'], styles['root__table-cell--td'])}>
          Spreedly
        </td>
        <td className={cx(styles.root, styles['root__table-cell'], styles['root__table-cell--td'])}>
          Spreedly is a service that allows us to safely and securely tokenise your payment card so that it can be used to enable Payment Linked Loyalty
        </td>
        <td className={cx(styles.root, styles['root__table-cell'], styles['root__table-cell--td'])}>
          Strictly necessary
        </td>
        <td className={cx(styles['root__table-cell'], styles['root__table-cell--td'])}>
          <a className={styles.root} target="_blank" rel="noreferrer" href='https://www.spreedly.com/privacy'>https://www.spreedly.com/privacy</a>
        </td>
      </tr>
    </table>

    <br />
    <br />
    <br />

    <h2 className={cx(styles.root, styles.root__header, styles['root__header--sub-header'])}>Strictly necessary</h2>
    <br />
    <br />
    <span className={styles.root}>
      The data collected in this category is essential to provide our services to you.
      The data is necessary for the website to operate, and to maintain your security and privacy while using the website.
      It enables you to move around the website and use its features such as accessing secure areas.
      <br />
      <br />
      Although it is possible to disable cookies on websites via the browser settings this would affect the functionality of the website, causing it not to work.
      <br />
      <br />
      This data is not used for marketing purposes or for the purposes covered by the category below.
    </span>

    <br />
    <br />
    <br />

    <h2 className={cx(styles.root, styles.root__header, styles['root__header--sub-header'])}>Functionality and profile</h2>
    <br />
    <br />
    <span className={styles.root}>
      Data collected in this category enables the website to remember choices you make.
      This allows us to remember your details for next time which means you won’t have to log in again.
      Without this data the website can’t remember any information that you have entered or choices that you've previously made in order to personalise your experience in the website.
    </span>

    <br />
    <br />
    <br />

    <h2 className={cx(styles.root, styles.root__header, styles['root__header--sub-header'])}>How to remove Cookies</h2>
    <br />
    <br />
    <span className={styles.root}>
      You may elect to decline to use cookies, for example by disabling cookies through activating the setting on your browser.
      If you select this option you may be unable to access certain parts of our website.
    </span>
  </>
)

export default CookiePolicyPage
