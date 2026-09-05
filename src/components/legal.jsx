import { brand } from "@/content"
import { LegalOverlayShell } from "@/components/legal-shell"

function DocSection({ head, children }) {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-black tracking-[0.2em]">{head}</h3>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-black/70 md:text-[15px]">{children}</div>
    </div>
  )
}

export function PrivacyPolicy() {
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.3em] text-black/50">FIRST PRINCIPLES</p>
      <h2 className="mt-3 text-3xl font-black tracking-tighter md:text-5xl">Privacy Policy</h2>
      <p className="mt-3 text-xs text-black/45">Last updated: September 2026</p>

      <DocSection head="1. WHO WE ARE">
        <p>
          First Principles is a one-to-one STEM tutoring service based in Nairobi, Kenya, run by
          Gregory Kimemiah. For the purposes of Kenya's Data Protection Act, 2019, Gregory is the
          data controller. Contact: {brand.email}.
        </p>
      </DocSection>

      <DocSection head="2. WHAT WE COLLECT">
        <p>We collect only what booking and teaching require:</p>
        <p>
          — Contact details you share (name, phone number, email address).
          <br />
          — School information (student's form, subjects, school, current performance).
          <br />
          — Session records (topics covered, problem sets, progress notes, feedback reports).
          <br />
          — Messages you send us via WhatsApp or email.
        </p>
        <p>
          This website itself sets no advertising or tracking cookies. The only thing stored in
          your browser is your cookie-banner choice.
        </p>
      </DocSection>

      <DocSection head="3. WHY WE USE IT">
        <p>
          To schedule sessions, deliver tutoring, track progress, send feedback reports and parent
          updates, and respond to enquiries. We do not sell personal data, and we do not use it
          for advertising.
        </p>
      </DocSection>

      <DocSection head="4. WHO SEES IT">
        <p>
          Only Gregory. Where you contact us through WhatsApp, Google Meet or Zoom, those
          platforms process your messages and call data under their own privacy policies.
        </p>
      </DocSection>

      <DocSection head="5. HOW LONG WE KEEP IT">
        <p>
          Enquiry messages are kept for up to 12 months. Student progress records are kept while
          tutoring is active and for up to 12 months afterwards, then deleted on request or
          routinely.
        </p>
      </DocSection>

      <DocSection head="6. YOUR RIGHTS">
        <p>
          Under the Data Protection Act, 2019 you may request access to, correction of, or
          deletion of personal data we hold about you or your child, and you may object to or
          restrict how we process it. Email {brand.email} and we will respond within 14 days.
          You may also complain to the Office of the Data Protection Commissioner of Kenya.
        </p>
      </DocSection>

      <DocSection head="7. CHILDREN'S DATA">
        <p>
          Students are minors. We collect a student's school information only from a parent or
          guardian, use it only for tutoring purposes, and never publish a student's name,
          photo, school or results without explicit written parental consent.
        </p>
      </DocSection>

      <DocSection head="8. CHANGES">
        <p>
          If this policy changes materially, the updated version will be posted here with a new
          date. Continued use of the service after changes means you accept them.
        </p>
      </DocSection>
    </div>
  )
}

export function TermsOfService() {
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.3em] text-black/50">FIRST PRINCIPLES</p>
      <h2 className="mt-3 text-3xl font-black tracking-tighter md:text-5xl">Terms of Service</h2>
      <p className="mt-3 text-xs text-black/45">Last updated: September 2026</p>

      <DocSection head="1. THE SERVICE">
        <p>
          First Principles provides one-to-one tutoring in Mathematics, Physics and Chemistry for
          Form 2–4 students, delivered online via Google Meet/Zoom or in person at the student's
          home around Kahawa Sukari, Ruiru and the Thika Road corridor. Sessions are booked per
          session; there is no term contract.
        </p>
      </DocSection>

      <DocSection head="2. FEES & PAYMENT">
        <p>
          The diagnostic session is free. Online sessions are KES 1,500 each. In-person two-hour
          sessions are KES 2,500 each. Fees are confirmed over WhatsApp before booking and are
          payable in advance via the mobile-money details provided at booking. Prices may change
          with notice; confirmed bookings keep the agreed price.
        </p>
      </DocSection>

      <DocSection head="3. SCHEDULING & CANCELLATION">
        <p>
          Sessions are scheduled around school hours, evenings and weekends included.
          Rescheduling is free with at least 24 hours' notice. Sessions cancelled with less than
          24 hours' notice, or missed without notice, are charged in full. If the tutor must
          cancel, the session is rescheduled at no cost to you.
        </p>
      </DocSection>

      <DocSection head="4. NO GRADE GUARANTEE">
        <p>
          We guarantee a serious, structured process built around understanding, reasoning and
          measurable progress. We do not guarantee any particular grade, exam outcome,
          scholarship or university admission.
        </p>
      </DocSection>

      <DocSection head="5. PARENT & STUDENT RESPONSIBILITIES">
        <p>
          A parent or guardian must make the booking and remain reachable during sessions
          involving minors. Students are expected to attend on time, attempt assigned problem
          sets, and behave respectfully. For in-person sessions, a parent or guardian must be
          present at the home.
        </p>
      </DocSection>

      <DocSection head="6. CONDUCT & SAFETY">
        <p>
          Sessions may be recorded for revision purposes only with mutual agreement, and
          recordings are never shared publicly. Either party may end the tutoring arrangement at
          any time with notice; prepaid unused sessions are refunded.
        </p>
      </DocSection>

      <DocSection head="7. LIABILITY">
        <p>
          To the maximum extent permitted by law, liability is limited to the fees paid for the
          session giving rise to the claim. Nothing here limits liability that cannot be limited
          under Kenyan law.
        </p>
      </DocSection>

      <DocSection head="8. GOVERNING LAW">
        <p>
          These terms are governed by the laws of Kenya. Disputes will first be addressed
          through good-faith discussion, failing which the courts of Kenya shall have
          jurisdiction.
        </p>
      </DocSection>

      <DocSection head="9. CONTACT">
        <p>
          Questions about these terms: WhatsApp {brand.whatsappShort} or {brand.email}.
        </p>
      </DocSection>
    </div>
  )
}

export function LegalOverlay({ page, onClose }) {
  if (!page) return null
  return (
    <LegalOverlayShell onClose={onClose} label={page === "privacy" ? "Privacy Policy" : "Terms of Service"}>
      {page === "privacy" ? <PrivacyPolicy /> : <TermsOfService />}
    </LegalOverlayShell>
  )
}
