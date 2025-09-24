import React from 'react';
import { Mail, Phone } from 'lucide-react';
const ThankYouPage = () => {
  const contactNumber = "+971 676 82824"
  const contactEmail = "admin@goldensparrowuae.com"
  return (
    <div className="min-h-screen bg-white">
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-black mb-6">Your request has been successfully received.</p>
            <h1 className="text-3xl md:text-4xl font-semibold text-[#FFC400] mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Our team will contact you shortly to confirm the details and
              ensure a smooth process. <br />
              We appreciate your trust in us for your forklift needs.
            </p>
          </div>
          <div className="mt-8">
            <img
              className="w-full h-auto rounded-lg shadow-lg"
              src="/images/thankyou.jpg"
              alt="Thank you banner"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </section>
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="lg:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Have Questions?
              </h3>
              <p className="text-gray-700 mb-6">
                If you have any immediate questions, do not hesitate to contact
                us at:
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 mr-2"/>
                  <strong className="text-gray-800">{contactNumber}</strong>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 mr-2"/>
                  <strong className="text-gray-800">{contactEmail}</strong>
                </div>
              </div>
              <p className="text-gray-700">
                Thank you for choosing Golden Sparrow UAE! We are excited to
                connect with you.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                className="w-full h-auto"
                src="/images/logistics.png"
                alt="Thank you illustration"
                width={646}
                height={646}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default ThankYouPage;