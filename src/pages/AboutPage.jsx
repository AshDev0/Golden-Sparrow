import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRightIcon } from 'lucide-react'

const AboutPage = () => {
  const navigate = useNavigate()

  return (
    <>
      {/* Hero Section */}
      <section className="about-banner py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:py-12">
          <div className="text-white">
            <div className="md:w-2/3">
              <h4 className="font-semibold text-4xl md:text-5xl lg:text-6xl mb-4">Who We Are</h4>
              <p className="text-base leading-relaxed">
                Dedicated experts in providing high-quality new and used
                forklifts for businesses across UAE.
              </p>
            </div>
          </div>
        </div>
        <style>
          {`
            .about-banner {
              background: linear-gradient(rgba(0, 0, 0, 0.35) 100%, rgba(0, 0, 0, 0.35) 100%), url(/images/about_banner.webp);
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center;
            }
          `}
        </style>
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
                About Us
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-semibold text-3xl md:text-4xl mb-8">About Us</h1>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Boasting the thousands of privately owned Elevated Working
                Platform (EWP) machines. We facilitate the hiring,
                selling, servicing and transporting of world leading brands in
                some of the world's most remote locations. Proud to
                work with market leaders such as Genie, JLG and Merlo, our
                robust fleet has an average age of just 3.2 years to ensure
                total reliability and quality. We are also the leading
                re-sellers of new and used access equipment.
              </p>
              <p>
                Specializing in a huge range of elevating work platforms,
                telehandlers, forklifts, reach stackers, generators, lighting
                towers, air compressors and more, here at Golden Sparrow UAE we are
                able to deliver on jobs of any size, no matter how big or
                remote. In addition to our extensive fleet, we also have
                our own service department which is operational 24 hours a day,
                7 days a week. Our specialized factory-trained service
                technicians and service vans allow us to perform repairs and
                maintenance with ease and efficiency, minimizing costly
                downtime.
              </p>
              <p>
                Add value and a lift to your business by choosing Golden Sparrow
                and be assured every time of receiving professional industry
                experience, quality equipment and outstanding service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage