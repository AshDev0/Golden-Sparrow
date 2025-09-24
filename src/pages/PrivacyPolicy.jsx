import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRightIcon } from 'lucide-react'

const PrivacyPolicy = () => {
  const navigate = useNavigate()

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#ffc400] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-white">
            <div className="md:w-2/3">
              <h4 className="font-semibold text-4xl md:text-5xl lg:text-6xl mb-4">Privacy Policy</h4>
              <p className="text-base leading-relaxed">
                At Golden Sparrow UAE we're totally committed to protecting your
                personal information and will look after the information you
                entrust to us and keep it safely and securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb Section */}
      <div className="bg-[#1a1a1a] py-3">
        <div className="max-w-7xl mx-auto px-4">
          <nav aria-label="breadcrumb">
            <ol className="flex items-center space-x-2 text-sm mb-0">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <ChevronRightIcon className="w-4 h-4 text-white" />
              </li>
              <li className="text-white" aria-current="page">
                Privacy Policy
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <div>
              <h4 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900">Background</h4>
              <p className="mb-4">The following is acknowledged and esteemed:</p>
              <p className="mb-4">the security of your private data; and</p>
              <p className="mb-4">
                (b) You are interested in how we gather and use your personal data.
              </p>
              <p className="mb-4">
                To ensure that we are being open and upfront about the collection,
                storage, use, and disclosure/transfer of your personal information,
                we have established this Privacy Policy in compliance with the
                UAEn Privacy Principles (APP) and other data protection
                regulations.
              </p>
              <p className="mb-4">
                This Privacy Policy is an integral aspect of the agreements between
                you and Golden Sparrow UAE UAE Pty Ltd ABN 746 839 763 56
                (hereinafter referred to as "Golden Sparrow UAE," "we," "our," or "us").
                This policy is also in effect when you use the website's
                self-subscribe feature to enroll in our newsletter.
              </p>
            </div>

            <div>
              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Collection</h4>
              <p className="mb-4">Individual details are gathered by us:</p>
              <p className="mb-4">
                (a) in all of your communications with us, whether they be online,
                via phone, email, in person, or any other medium;
              </p>
              <p className="mb-4">(b) when you join our email list;</p>
              <p className="mb-4">
                (c) in situations where you or the event organizer may give us
                personal information, such as during tradeshows or similar marketing
                events; and
              </p>
              <p className="mb-4">
                (d) in response to your request for assistance with product
                delivery, service provision, or any other matter outlined in such
                correspondence.
              </p>
              <p className="mb-4">
                You should expect us to gather details like your name, address,
                phone number, email, Internet Protocol (IP) address, device ID, and
                whatever else you choose to divulge. Certain employment information
                is gathered when you contact us on behalf of your employer. The
                information you supply may include facts about your job, position,
                and employer-related contact information.
              </p>
              <p className="mb-4">
                Additionally, we track who visits our website and what information
                they provide, including the identities of our key workers.
              </p>
              <p className="mb-4">
                The data collected by Golden Sparrow UAE does not fall within the
                category of "sensitive information" as defined by the Privacy Act.
              </p>
            </div>

            <div>
              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">
                Cookies, Pixels, and Web Beacons: How We Use Them
              </h4>
              <p className="mb-4">
                We use "cookies" to make our site easier to use, improve the quality
                of our service, and track user activity for advertising and other
                purposes.
              </p>
              <p className="mb-4">
                The information gathered by log files includes details like your IP
                address, browser type, ISP, referring/exit pages, date/time stamps,
                and actions that take place on the websites.
              </p>
              <p className="mb-4">
                Digital files that track your online activities are known as web
                beacons, tags, or pixels.
              </p>
              <p className="mb-4">
                On a regular basis, we examine digital data stored in logfiles and
                cookies to find entities, and by extension, important employees, who
                are interested in our products. Data acquired by web beacons,
                pixels, log files, and cookies may be linked to other personally
                identifiable information we have in our possession as a result of
                this procedure.
              </p>
            </div>

            <div>
              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Use</h4>
              <p className="mb-4">
                Our main business is selling, renting, and servicing fork lifts as
                well as providing spares and accessories. Any personal information
                you give us is utilized for these purposes.
              </p>
              <p className="mb-4">Some possible uses of your information include:</p>
              <p className="mb-4">(a) providing you with information regarding our offerings;</p>
              <p className="mb-4">(b) honoring your orders for goods and services;</p>
              <p className="mb-4">
                (c) administrative demands related to managing your account and
                supplying you with products and services;
              </p>
              <p className="mb-4">
                (d) responding to consumer inquiries, complaints, and requests,
                among other tasks pertaining to customer service;
              </p>
              <p className="mb-4">(e) advertising all of our goods and services; and</p>
              <p className="mb-4">
                (f) engaging in any action related to preempting, detecting, or
                prosecuting criminal or fraudulent activities; or
              </p>
              <p className="mb-4">
                (g) complying with any governmental or regulatory mandate placed on
                us.
              </p>
              <p className="mb-4">
                Furthermore, in relation to the aforementioned activities, we may
                use your personal information for reasons that you would fairly
                anticipate.
              </p>
              <p className="mb-4">
                With your permission or in response to exigent legal requirements,
                public health concerns, or safety concerns, we will not disclose
                your information for any reason not explicitly stated in this
                privacy policy.
              </p>
            </div>

            <div>
              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Being in Touch with Us</h4>
              <p className="mb-4">
                We can interact with you using identities or remain anonymous if you
                send us a generic inquiry. But when you request for items or
                services, you have to be honest and give accurate information. By
                checking this box, you confirm that you will submit correct
                information when asked.
              </p>
            </div>

            <div>
              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Direct Advertisement</h4>
              <p className="mb-4">
                We reserve the right to send you promotional materials on occasion.
                Unless you specifically request it, we will not send you any
                marketing or promotional materials. On occasion, we (or a designated
                third party) may contact you to inquire about your opinions or
                gather data for market research. With the data collected from these
                surveys, we can enhance the variety, quality, and delivery of these
                items and services to you.
              </p>
              <p className="mb-4">
                Get in touch with us or click the "unsubscribe" button on any of our
                emails if you'd like to stop receiving certain types of marketing
                messages.
              </p>
            </div>

            <div>
              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Disclosure of Private Data</h4>
              <p className="mb-4">Some parties to whom we may share your personal data include:</p>
              <ul className="list-disc pl-6 space-y-2 leading-relaxed mb-4">
                <li>
                  (a) our workers, any affiliated business (including parent,
                  subsidiary, and sibling companies), and any experts we consult,
                  including attorneys;
                </li>
                <li>
                  (b) authorities charged with enforcing the law to aid in the
                  detection and avoidance of unlawful acts; and
                </li>
                <li>
                  (c) outside vendors and service providers with whom we do
                  business, such as:
                </li>
              </ul>
              <ol className="list-none pl-12 space-y-2 leading-relaxed mb-4" style={{ listStyleType: "upper-roman" }}>
                <li>I. companies managing transportation and delivery;</li>
                <li>II. the companies that offer marketing services;</li>
                <li>III. businesses serving as accountants; and</li>
                <li>
                  IV. Companies that specialize in providing IT services, such as
                  those that build cloud applications.
                </li>
              </ol>
              <p className="mb-4">
                Unless you give us permission to do so, we will not share any
                information about you with third parties.
              </p>
            </div>

            <div>
              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Overseas Disclosure</h4>
              <p className="mb-4">
                When you do business with us, we may share your personal information
                with other parties, such as contractors, service providers, or
                customers. Operators in the Philippines and/or India, for instance,
                may be able to access our systems and help with your enquiries as
                part of our customer service. Cloud data services and other service
                providers may have data centres and disaster recovery locations
                located in other countries. However, we will not knowingly reveal
                your personal information to these companies. As a result, these
                service providers might be able to access your data. When it comes
                to these kinds of cloud services, we only work with trustworthy
                companies. Data disclosure by Golden Sparrow UAE may occur in the
                following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2 leading-relaxed mb-4">
                <li>
                  (a) delivering business reports to our parent firms, one of which
                  is based in Japan; or
                </li>
                <li>
                  (b) Our systems are used by representative of our parent
                  businesses to conduct audits or analyses of our performance.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">
                Google Analytics and its use to Golden Sparrow UAE
              </h4>
              <p className="mb-4">
                The online analytics service Google Analytics, developed and
                maintained by Google, Inc. ("Google"), is utilised on our website.
                The website uses "cookies," which are little text files stored on
                your computer, to assist in analysing your site usage.
              </p>
              <p className="mb-4">
                Among the data stored by cookies is the time and date of your
                current visit, whether or not you have been to our site previously,
                and the URL of the page that led you to ours.
              </p>
              <p className="mb-4">
                Google will transfer and retain the data produced by the cookie on
                its servers in the US. This data includes your IP address and how
                you use the website. Search engine giant Google will save the data
                it collects about your actions on the site, analyse it to determine
                how users interact with it, and share the results with website
                owners and administrators.
              </p>
              <p className="mb-4">
                If Google is compelled by law or if a third party processes your
                data on its behalf, Google may share your information with them.
                There is a setting on most browsers that allows you to disable
                cookies; however, if you do so, you might not have access to all of
                this site's features. In accordance with Google's Privacy Policy and
                for the reasons stated above, your use of this website constitutes
                your consent to Google's processing of data about you. If you would
                want to disable or deny the cookie, disable JavaScript, or use
                Google's opt-out service, you can disable Google Analytics.
              </p>
            </div>

            <div>
              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Data Privacy and Protection</h4>
              <p className="mb-4">
                Protected from unauthorised access, modification, or disclosure, our
                secure servers hold your personal information.
              </p>
              <p className="mb-4">
                Please let us know if any of your personal information changes so
                that we can update or remove it from our records. We strive to keep
                all information correct, comprehensive, and up-to-date.
              </p>
            </div>

            <div>
              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">
                How sensitive data gets disposed of
              </h4>
              <p className="mb-4">
                If we have personal information about you and we no longer require
                it, we will delete or de-identify it as soon as possible following
                the guidelines set out in the APP, unless we are legally unable to
                do so.
              </p>
              <p className="mb-4">
                Send us a letter requesting that we delete your personal data, and
                we will comply with your request if we are allowed to do so by the
                APP.
              </p>
              <p className="mb-4">
                Financial records, including those pertaining to financial
                transactions, are required by law in UAE to be kept for a
                period of seven years following the completion of the transactions
                that the records relate to.
              </p>
            </div>

            <div>
              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">
                Understand Your Rights to Access Your Personal Data
              </h4>
              <p className="mb-4">
                With the exception of the following situations, we will grant you
                access to your personal information that we have on file once we
                verify your identity:
              </p>
              <p className="mb-4">
                Our assessment is that granting access would endanger the well-being
                of the general population, as well as the lives of specific
                individuals;
              </p>
              <p className="mb-4">(permitting you entry would be against the law;</p>
              <p className="mb-4">
                would unreasonably invade the privacy of other people if they were
                granted that access;
              </p>
              <p className="mb-4">the subject of the request is not serious or is malicious; or</p>
              <p className="mb-4">There will likely be judicial processes.</p>
            </div>

            <div>
              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Process for Handling Complaints</h4>
              <p className="mb-4">
                Our top priority is protecting your privacy. The following is a list
                of contact details for our privacy officer; please use this list if
                you have any complaints or issues regarding our information handling
                procedures as they pertain to your personal information.
              </p>
              <p className="mb-4">
                If you are still dissatisfied after we have investigated, we ask
                that you speak with:
              </p>
              <p className="mb-4">
                Data Protection Commissioner's Office in UAE
                <br />
                postal code 5218
                <br />
                Sydney NSW 2001
                <br />
                Call: 1300 363 992
                <br />
                Email: enquiries@oaic.gov.au
              </p>
            </div>

            <div>
              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Our Contact Information</h4>
              <p className="mb-4">
                Please get in touch with us at the following addresses if you have
                any issues, questions, or complaints about the way we handle your
                personal information:
              </p>
              <p className="mb-4">
                Data Protection Officer
                <br />
                <b>
                  1/16th Street Parker,
                  <br />
                  The address is Carrington, New South Wales 2294.
                </b>
                <br />
                The nation of UAE
                <br />
                Contact number: <b>+971 54 232 0624</b>
                <br />
                Send an email to admin@goldensparrowuae.com.
              </p>
              <p className="mb-4">
                <b>Amended Privacy Statement</b>
                <br />
                It is our responsibility to examine and revise this policy on a
                frequent basis. So, this Privacy Policy is subject to change
                whenever we see fit. If there are any major changes, you will be
                notified by publishing them on the website 14 days before they are
                implemented, unless the circumstances justify not giving that much
                notice. Your continued use beyond the expiration of the notification
                period signifies that you agree to be legally bound by the revised
                Privacy Policy. The website of the UAEn Information
                Commissioner (http://www.oaic.gov.au) is a good resource for anyone
                seeking more general information regarding privacy.
              </p>
              <p className="mb-4">
                Alternatively, you can use the aforementioned information to get in
                touch with our Privacy Officer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy