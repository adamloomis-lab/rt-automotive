import LegalLayout from '../components/LegalLayout'
import { company } from '../data/site'

export default function Accessibility() {
  return (
    <LegalLayout title="Accessibility Statement" updated="June 2026">
      <h2>Our commitment</h2>
      <p>
        This site is built to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, the
        standard referenced by the ADA for web accessibility. We review and update our
        accessibility practices on an ongoing basis.
      </p>

      <h2>What we have done</h2>
      <p>
        We have taken the following steps to make this site accessible to as many people as
        possible:
      </p>
      <ul>
        <li>
          Skip links allow keyboard and screen reader users to bypass navigation and get straight
          to the main content without tabbing through every menu item.
        </li>
        <li>
          A visible focus outline appears on every interactive element when navigated by keyboard,
          so you always know where you are on the page.
        </li>
        <li>
          Text colors are chosen to meet the 4.5:1 minimum contrast ratio for readability by
          people with low vision.
        </li>
        <li>
          All form fields, buttons, and interactive elements have descriptive labels so screen
          readers can accurately announce their purpose.
        </li>
        <li>
          Animations automatically reduce for users who have the Reduce Motion preference enabled
          on their device.
        </li>
      </ul>

      <h2>Report an issue</h2>
      <p>
        If you encounter any accessibility barrier on this site, please contact us and we will
        address it promptly. You can reach us by phone at{' '}
        <a href={company.phoneHref}>{company.phone}</a>.
      </p>
    </LegalLayout>
  )
}
