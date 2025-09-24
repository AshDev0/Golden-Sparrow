import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRightIcon } from 'lucide-react'

const TermsAndConditions = () => {
  const navigate = useNavigate()

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#ffc400] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-white">
            <div className="md:w-2/3">
              <h4 className="font-semibold text-4xl md:text-5xl lg:text-6xl mb-4">Terms and Conditions</h4>
              <p className="text-base leading-relaxed">
                By accessing and using this service, you agree to comply with our
                terms and conditions.
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
                  onClick={() => navigate('/')}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <ChevronRightIcon className="w-4 h-4 text-white" />
              </li>
              <li className="text-white" aria-current="page">
                Terms and Conditions
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
              <p className="mb-4">
                Supply Terms and Conditions for Golden Sparrow UAE UAE Pty Ltd
                Credit Accounts Commencing January 1, 2014 Golden Sparrow UAE UAE
                Pty. Ltd. (ABN 746 839 763 56) is referred to as "FFA" and the
                Owner. "The Customer" refers to the individual or entity whose name
                is on this application and will be listed as the buyer of products
                and services from FFA on our invoice. This includes any successors
                or assigns of that person or corporation.
              </p>
              <p className="mb-4">
                By applying for and maintaining a credit account with FFA, you are
                acknowledging that FFA is a subscriber to the Veda Advantage credit
                bureau. You are also acknowledging that by accepting credit from
                FFA, you are consenting to the periodic retrieval of your credit
                history and transaction details from various credit providers and
                associations. Additionally, the customer is aware and agrees that,
                unless otherwise instructed in writing by FFA, any payment defaults
                on the customer's part may be reported to the credit bureau at FFA's
                discretion. This listing could affect the customer's ability to get
                credit from other lenders in the future.
              </p>

              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Direct Advertisement</h4>
              <p className="mb-4">
                The deadline for thirty (30) day accounts is the last day of the
                month after the invoice date.
              </p>
              <p className="mb-4">
                Seven (7) days following the invoice date is the due date for seven
                (7) day accounts.
                <br />
                Payment for C.O.D. / Cash Sale accounts is due upon supply or
                delivery.
              </p>

              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Cancellation of Credit</h4>

              <ul className="list-disc pl-6 space-y-2 leading-relaxed mb-4">
                <li>
                  At any moment and without prior warning or obligation to the
                  Customer, FFA may assess, terminate, or modify this credit
                  arrangement. In particular:
                </li>
                <li>
                  accounts will be immediately placed on STOP SUPPLY without extra
                  notification if in the case of thirty day accounts they become
                  overdue by 30 days and in the case of seven day accounts, overdue
                  by 7 days. Where agreed credit limits have been achieved,
                  Customers will be urged to immediately bring the account within
                  terms.
                </li>
                <li>
                  If an account is kept inactive for twelve months or longer or if
                  it is consistently maintained outside of the agreed rules, it may
                  be closed.
                </li>
                <li>
                  If a payment default occurs, FFA has the right to notify the
                  credit bureau and the listing will remain there until the debt is
                  paid in full or until FFA receives written confirmation that the
                  settlement is satisfactory.
                </li>
              </ul>
              <p className="mb-4">
                A full payment is due on all accounts without demand as soon as:
              </p>
              <p className="mb-4">
                In the case of an individual, certain events can occur, such as
                declaring bankruptcy, distributing assets to creditors, going
                insane, or passing away. As for companies, they can be placed under
                external management or face a winding up petition.
              </p>
              <p className="mb-4">
                a judgement for more than $1000 is entered and remains unsatisfied
                after 14 days
              </p>
              <p className="mb-4">
                if the guarantor passes away, becomes bankrupt, gets insane, or
                decides to withdraw their guarantee,
              </p>

              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Product Returns</h4>
              <p className="mb-4">
                Returns made within 30 days of delivery will incur a 10% handling
                fee; after that period, goods cannot be returned for credit.
                <br />
                In any case, in order for a credit return application to be taken
                into consideration:-
              </p>
              <p className="mb-4">
                When returning goods, make sure to include either the original
                invoice or packing slip.
                <br />
                Please ensure that the items are returned to the original retailer
                with the freight pre-paid.
              </p>
              <p className="mb-4">
                Items must be resealed and in a saleable condition, with all
                original packaging intact.
              </p>
              <p className="mb-4">Exceptions to the rule of no credit include:</p>
              <ul className="list-disc pl-6 space-y-2 leading-relaxed mb-4">
                <li>The items were ordered specifically by the customer.</li>
                <li>
                  The customer has reported that the goods were either missing or
                  damaged during shipment.
                </li>
              </ul>

              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Performance and Delivery</h4>
              <p className="mb-4">
                Please note that the availability of the goods is not guaranteed by
                FFA. In the event that the goods are not available, or if delays or
                non-performance occur due to factors beyond FFA's control, such as
                force majeure, the customer agrees that FFA will not be held liable
                for damages.
              </p>
              <p className="mb-4">
                The customer is fully responsible for any loss, damage, delay, or
                other cause once the goods leave FFA' premises, regardless of
                whether the company is obligated to deliver them or not. FFA will
                not be held liable in any way for any such event thereafter.
              </p>
              <p className="mb-4">
                The cost of transporting the items to the location specified by the
                client for FFA to deliver them to is entirely the responsibility of
                the consumer.
              </p>
              <p className="mb-4">
                In the event that no Customer representative is present at the
                delivery site, the FFA records will provide as prima facie evidence
                that the items were delivered and received in accordance with the
                specified quality and description.
              </p>
              <p className="mb-4">
                Within twenty-four (24) hours of delivery or the defect becomes
                obvious, you must notify FFA in writing of any defects in the items.
                Please include the original invoice or delivery docket when
                returning the damaged goods freight prepaid to FFA. When it comes to
                the refund of return freight expenses and the approval of goods
                credit, FFA's decision is final.
              </p>
              <p className="mb-4">
                The Customer understands and agrees, with the exception of Clause
                10, that FFA is not liable to it or any third party for any loss or
                damage that may result from a defect in the parts that FFA supplied.
              </p>

              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Ownership Maintenance</h4>
              <p className="mb-4">
                Without prejudice to any prior credit agreement between the parties,
                FFA shall retain full ownership of any items sold to the Customer
                and the risk of loss or damage thereto until the Customer has paid
                FFA in full. The following will be in effect while all amounts owed
                to FFA are being paid:
              </p>
              <p className="mb-4">
                As trustee for FFA, the customer is obligated to hold the products.
              </p>
              <p className="mb-4">
                The Buyer must not lend, sell, or otherwise transfer ownership of
                the Products to any third party.
              </p>
              <p className="mb-4">
                By entering any property where the goods may be, the customer gives
                FFA permission to take possession of the items by force if
                necessary. The customer also agrees to indemnify FFA against any
                damages, fees, losses, or expenditures that may arise from or be
                related to this entry.
              </p>

              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">
                Credit Report Disclosure Requirements of the Privacy Act of 1990
                (and subsequent amendments)
              </h4>
              <p className="mb-4">
                With this agreement, both the customer and the guarantor give FFA
                permission to collect and use any credit information that FFA deems
                relevant for evaluating the customer's application for:-
              </p>
              <p className="mb-4">
                private information on the customer's business dealings or
                creditworthiness that is kept by a credit bureau related to personal
                credit provision.
              </p>
              <p className="mb-4">
                business credit offering—information gathered from a credit bureau
                that pertains to both individuals and businesses.
              </p>
              <p className="mb-4">
                any kind of credit—individual or business——data regarding the
                Customer's credit arrangements, including but not limited to:
                creditworthiness, credit standing, credit history, and credit
                capacity—from any of the listed suppliers and/or any lawfully
                obtained credit reporting agency
              </p>
              <p className="mb-4">
                The customer also gives FFA permission to share the information
                specified in clause 6.1.3 with any of the listed suppliers in this
                credit application or in any business or consumer credit report that
                is issued by a credit reporting agency.
              </p>
              <p className="mb-4">
                The following uses of the information are acknowledged by the
                Customer:-
              </p>
              <p className="mb-4">
                to determine whether the customer is credit worthy, to inform other
                suppliers when the customer defaults, to share information about the
                customer's consumer or business credit when the customer is in
                default with other suppliers, and to evaluate the customer's credit
                application.
              </p>
              <p className="mb-4">
                Additionally, the customer acknowledges and agrees that FFA has the
                right, in its sole discretion, to obtain a credit report from a
                credit reporting agency that includes personal information about the
                customer in connection with the collection of overdue payments for
                any commercial credit extended to the customer.
              </p>
              <p className="mb-4">
                In addition, the Customer is notified that FFA may share personal
                information about the Customer and the credit application with a
                credit reporting agency.
              </p>
              <p className="mb-4">
                The customer acknowledges and agrees that FFA has the right to list
                "payment defaults" on the credit bureau at its discretion and after
                receiving written notice from FFA. The listing will remain in effect
                until the full amount owed is settled or, as FFA specifies in
                writing, until FFA deems it satisfactory.
              </p>

              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">
                Customer accepts general conditions
              </h4>
              <p className="mb-4">
                No contract for products shall arise between the Customer and FFA
                except upon these terms and conditions.
              </p>
              <p className="mb-4">
                Any Customer order for goods with terms inconsistent with these
                terms and conditions will only bind FFA if FFA accepts it in
                writing.
              </p>
              <p className="mb-4">
                If FFA must recover amounts owed under this credit facility, FFA may
                apply any costs, including legal fees, to this account. FFA may
                assess interest on overdue payments at the highest legal rate. In
                all credit facility matters, Queensland law applies.
              </p>
              <p className="mb-4">
                The Customer shall pay FFA dishonour fees for accepting cheques or
                direct deposits to fulfil this credit facility.
              </p>
              <p className="mb-4">
                The Customer must notify FFA of any ownership changes, provide new
                names and addresses, and/or provide other information that may
                affect trading terms and conditions.
              </p>
              <p className="mb-4">
                All Customer payments are due to Golden Sparrow UAE UAE P/L., 1/16
                Parker Street, Carrington NSW 2294, UAE.
              </p>
              <p className="mb-4">
                FFA may update these Hire Contract Conditions for customers. Whether
                or not received, FFA gives notice when it does any of the following:
              </p>
              <ol className="list-decimal pl-6 space-y-2 leading-relaxed mb-4">
                <li>
                  sends notice of revision to the Customer at any address (including
                  the email address) submitted by the customer;
                </li>
                <li>
                  publishes revised terms on its website forkforceau3.wpengine.com;
                  or
                </li>
                <li>displays the amended terms at FFA business premises.</li>
              </ol>

              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">PPS legislation</h4>
              <p className="mb-4">
                If the Customer hires equipment for this credit account, FFA must
                register a "Security Interest" under the Personal Property
                Securities Act 2009 (Cth) ("PPS Law").
              </p>
              <p className="mb-4">
                PPS Law references in this Agreement include revised, replacement,
                and successor legislation.
              </p>
              <p className="mb-4">
                FFA can register PMSI security interests. The Hirer must get
                consents and sign documents as needed by the Owner for:
              </p>
              <p className="mb-4">
                assuring the Owner's security interest is enforceable, perfected,
                and effective under PPS Law.
              </p>
              <p className="mb-4">
                allowing the Owner to receive first priority (or any other written
                priority) for its security interest;
              </p>
              <p className="mb-4">letting the Owner exercise security interest rights.</p>
              <p className="mb-4">
                The Owner may collect registration fees and other costs from the
                Hirer under this condition.
              </p>
              <p className="mb-4">
                The Owner's rights under this document are in addition to and not in
                substitution for those under other law (including PPS Law), and the
                Owner may choose to exercise either.
              </p>
              <p className="mb-4">
                The Owner has rights under PPS Law sections 123 (seizing
                collateral), 126 (apparent possession), 128 (secured party may
                dispose of collateral), 129 (disposal by purchase), and 134(1)
                (retention of collateral). The Hirer agrees that the Owner shall, if
                the Hirer defaults, have the right to seize, purchase, take
                possession or apparent possession, retain, deal with, or dispose of
                any goods, not only under those sections but also, as additional and
                independent rights, under this document. The Owner may do so in any
                manner it sees fit, including by private or public sale, lease, or license.
              </p>
              <p className="mb-4">
                The Hirer waives its right to a verification statement for
                commercial property registration events under section 157 of the PPS
                Law.
              </p>
              <p className="mb-4">
                Neither the Owner nor the Hirer will reveal information requested
                under PPS Law 275(1). The Hirer must take all steps to maintain
                section 275(6)(a) of the PPS Law. This Agreement is purely for the
                purpose of allowing the Owner to benefit from section 275(6)(a). If
                the Owner breaches this sub-clause, the Owner shall not be liable
                for damages or injunction.
              </p>
              <p className="mb-4">
                The Hire Period (including any extension or the aggregate of
                consecutive Hire Periods during which the Customer has substantially
                uninterrupted possession) may not be longer than 90 days if FFA does
                not have a PPS Law registration ensuring a perfected first priority
                security interest in the Equipment at Commencement.
              </p>

              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">
                The Seller's Liability and Limited Warranty
              </h4>
              <p className="mb-4">
                placing defective goods or paying to have them repaired or replaced,
                or by re-supplying services or paying to have them re-supplied,
                Golden Sparrow UAE UAE Pty Ltd (FFA) can limit its liability to the
                extent that the UAEn Consumer Law (ACL) permits such
                limitation. The ACL does not allow us to eliminate the assurances
                that come with our products and services. If there is a serious
                malfunction, you can get your money back or get a new one. If
                anything else goes wrong, you can get compensation for it too. If
                the goods are not up to par and the problem is not serious enough,
                you can get them fixed or replaced.
              </p>
              <p className="mb-4">
                Within ninety (90) days from the date of billing or such other the
                period as may be probable given the nature of the goods, including
                factors such as their age, engine hours, and relative price in the
                case of used equipment supplied, FFA will repair or replace any
                items sold that prove defective in material or workmanship under
                normal use, unless products are specifically excluded elsewhere in
                the Seller's Terms and Conditions of Trade or specific contractual
                conditions.
              </p>
              <p className="mb-4">
                In the event that the Buyer finds a flaw in the Seller's goods, they
                are obligated to inform the Seller in writing as soon as possible.
                Once the Seller gives their consent, the Buyer is to return the item
                with the flaw, freight prepaid, to their designated address together
                with proof of purchase and a brief description of the problem.
                Before doing any repair work on allegedly damaged items, the Buyer
                must obtain the written consent mentioned earlier.
              </p>
              <p className="mb-4">
                The Customer acknowledges and agrees to abide by all terms and
                conditions set forth herein by using FFA's services or goods, paying
                FFA's bills, and otherwise dealing with FFA.
              </p>

              <h4 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900">Program for Referral Sales</h4>
              <p className="mb-4">
                For the Referrer to be eligible for the incentive, they need to fill
                out the referral program form completely. Incorrect details
                submitted do not constitute responsibility on the part of Forklifts
                Force. The authority to ratify any referral is reserved by Forklifts
                Force. No referrals can be accepted for an ongoing contract. An
                incentive grant can only be given to the Referrer if the Referred
                Customer actually makes a purchase. There is a six-month window from
                the time of referral to the time the referred consumer signs the
                contract. Payment for the referral incentive will be made upon
                delivery. The total transaction value (rather than the value of
                individual products) determines the minimum contract value, which is
                $3,000. Personnel of the Golden Sparrow UAE are not eligible to
                participate in the recommendation program. Any changes to these
                terms and conditions will be effective immediately. Errors and
                omissions can be rectified by Golden Sparrow UAE at any time. You are
                consenting to receive marketing offers and updates from Forklifts
                Force via email after providing your personal information. On every
                email, subscribers will have the option to unsubscribe.
              </p>
            </div>
          </div>
        </div>
      </div>
      </>
  )
}

export default TermsAndConditions;