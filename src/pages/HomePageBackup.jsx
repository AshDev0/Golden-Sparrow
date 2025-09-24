/**
 * HomePage Component
 * Landing page with featured categories and products
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { debugLog } from "../constants/config";
import {
  Package,
  TrendingUp,
  Shield,
  Truck,
  ChevronRight,
  ShoppingCart,
  Wrench,
  DollarSign,
  Calendar,
  ArrowRight,
  CreditCard,
  Banknote,
  CalendarClock,
  Zap,
  CheckCircle,
  Phone,
  Search,
  HeartHandshake,
  Currency,
} from "lucide-react";
import PaymentIcons from "../assets/images/Payment_Icons.png";
import BankTransfer from "../assets/images/bank_transfer.png";
import BuyNowPayLater from "../assets/images/buy_now_pay_later.png";
import WireTransfer from "../assets/images/wire_transfer.png";
import bannerImage from "../assets/images/Hero_Image_Org.webp";
import enquiryImage from "../assets/images/enquiry.webp";
import { fetchProducts, fetchBlogPosts } from "../services/api";
import PopularCategories from "../components/PopularCategories";
import EnquiryForm from "../components/EnquiryForm";
import EnquiryFormModal from "../components/EnquiryFormModal";
import NetworkTest from "../components/NetworkTest";
import PrimaryButton from "../components/UI/PrimaryButton";
import SecondaryButton from "../components/UI/SecondaryButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/slider.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showNetworkTest, setShowNetworkTest] = useState(false);
  const [hasNetworkError, setHasNetworkError] = useState(false);

  // Load featured products
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        debugLog("Starting to load featured products...");
        const data = await fetchProducts({
          taxonomy: "equipment-buy",
          per_page: 4,
          orderby: "modified",
          order: "desc",
        });
        debugLog("Featured products loaded:", data);
        setFeaturedProducts(data.products || []);
      } catch (err) {
        console.error("Failed to load featured products:", err);
        debugLog("Failed to load featured products:", err);
        // Check if it's a network error
        if (
          err.message &&
          (err.message.includes("Failed to fetch") ||
            err.message.includes("Network error"))
        ) {
          setHasNetworkError(true);
        }
        // Set empty array on error to show "No Products Found" message
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  // Load featured blog posts
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const data = await fetchBlogPosts({
          per_page: 3,
          orderby: "date",
          order: "desc",
        });
        setBlogPosts(data.posts);
      } catch (err) {
        debugLog("Failed to load blog posts:", err);
      } finally {
        setBlogLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // Slick slider settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const categoriesData = [
    {
      title: "Equipment for Sale",
      description: "Browse our extensive collection of equipment for purchase",
      icon: <ShoppingCart className="w-8 h-8" />,
      color: "bg-accent-600",
      link: "/products?taxonomy=equipment-buy",
      stats: "500+ Items",
    },
    {
      title: "Equipment for Rent",
      description: "Flexible rental options for all your project needs",
      icon: <Truck className="w-8 h-8" />,
      color: "bg-neutral-600",
      link: "/products?taxonomy=equipment-rent",
      stats: "300+ Items",
    },
    {
      title: "New Equipment",
      description: "Latest models with full warranty",
      icon: <Package className="w-8 h-8" />,
      color: "bg-neutral-600",
      link: "/products?taxonomy=equipment-buy&page=1&pa_condition=new",
      stats: "Factory New",
    },
    {
      title: "Used Equipment",
      description: "Quality pre-owned equipment at great prices",
      icon: <DollarSign className="w-8 h-8" />,
      color: "bg-accent-700",
      link: "/products?taxonomy=equipment-buy&page=1&pa_condition=used",
      stats: "Best Value",
    },
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality Guaranteed",
      description: "All equipment thoroughly inspected",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Nationwide shipping available",
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Expert Support",
      description: "24/7 technical assistance",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Best Prices",
      description: "Competitive pricing guaranteed",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        class="relative w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bannerImage}')` }}
      >
        
        <div
          class="absolute inset-y-0 w-full md:w-1/2 h-full flex items-center"
          style={{background: "linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 56.44%, rgba(0, 0, 0, 0) 100%)"
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 h-full flex items-center">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Power Your
              <br />
              Project with the<br/>Right Machine
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white font-semibold leading-relaxed mb-6 sm:mb-8">
              From forklifts to excavators
              <br />
              Golden Sparrow delivers reliable equipment
              <br />
              backed by field experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <SecondaryButton
                onClick={() => navigate("/products?taxonomy=equipment-buy")}
                style={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}
              >
                Browse Inventory
              </SecondaryButton>

              <PrimaryButton
                // onClick={() => navigate("/products?taxonomy=equipment-rent")}
                onClick={() => window.location.href = 'tel:+971542320624'}
                icon={Phone}
                style={{ boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}
              >
                Enquire Now
              </PrimaryButton>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0  w-0 sm:w-[10%] h-full pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)",
          }}
        ></div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full"></div>
            <span className="text-sm font-bold tracking-wider text-accent-600 uppercase">
              Our Inventory
            </span>
          </div>
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
              Browse by Category
            </h2>
            <p className="text-base sm:text-lg text-neutral-600">
              Find the perfect equipment for your needs
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=skid-steer-loaders&termName=Skid Steer Loaders"
              className="bg-white border border-[#E5E5E5] shadow-soft hover:shadow-elegant transition-all duration-300 p-3 sm:p-4 lg:p-6 group hover:-translate-y-1 aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img
                  src="/images/skid_steer.webp"
                  alt="Skid Steer Loaders"
                  className="max-w-[80%] max-h-full filter grayscale group-hover:grayscale-0 transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Skid Steer
              </h3>
            </Link>

            {/* Card 2 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=mini-excavators&termName=Mini Excavators"
              className="bg-white border border-[#E5E5E5] shadow-soft hover:shadow-elegant transition-all duration-300 p-3 sm:p-4 lg:p-6 group hover:-translate-y-1 aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img
                  src="/images/mini_excavator.webp"
                  alt="Mini Excavator"
                  className="max-w-[80%] max-h-full filter grayscale group-hover:grayscale-0 transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Mini Excavators
              </h3>
            </Link>

            {/* Card 3 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=excavators&termName=Excavators"
              className="bg-white border border-[#E5E5E5] shadow-soft hover:shadow-elegant transition-all duration-300 p-3 sm:p-4 lg:p-6 group hover:-translate-y-1 aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img
                  src="/images/excavator_img.webp"
                  alt="Excavator"
                  className="max-w-[80%] max-h-full filter grayscale group-hover:grayscale-0 transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Excavators
              </h3>
            </Link>

            {/* Card 4 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=backhoe-loaders&termName=Backhoe Loaders"
              className="bg-white border border-[#E5E5E5] shadow-soft hover:shadow-elegant transition-all duration-300 p-3 sm:p-4 lg:p-6 group hover:-translate-y-1 aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img
                  src="/images/backhoe_loader.webp"
                  alt="Backhoe Loaders"
                  className="max-w-[80%] max-h-full filter grayscale group-hover:grayscale-0 transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Backhoe Loaders
              </h3>
            </Link>

            {/* Card 5 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=graders&termName=Graders"
              className="bg-white border border-[#E5E5E5] shadow-soft hover:shadow-elegant transition-all duration-300 p-3 sm:p-4 lg:p-6 group hover:-translate-y-1 aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img
                  src="/images/grader_img.webp"
                  alt="Grader"
                  className="max-w-[80%] max-h-full filter grayscale group-hover:grayscale-0 transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Grader
              </h3>
            </Link>

            {/* Card 6 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=crawler-dozers&termName=Crawler Dozers"
              className="bg-white border border-[#E5E5E5] shadow-soft hover:shadow-elegant transition-all duration-300 p-3 sm:p-4 lg:p-6 group hover:-translate-y-1 aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img
                  src="/images/dozer_img.webp"
                  alt="Dozer"
                  className="max-w-[80%] max-h-full filter grayscale group-hover:grayscale-0 transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Dozer
              </h3>
            </Link>

            {/* Card 7 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=compactors&termName=Compactors"
              className="bg-white border border-[#E5E5E5] shadow-soft hover:shadow-elegant transition-all duration-300 p-3 sm:p-4 lg:p-6 group hover:-translate-y-1 aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img
                  src="/images/compactor_img.webp"
                  alt="Compactors"
                  className="max-w-[80%] max-h-full filter grayscale group-hover:grayscale-0 transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Compactor
              </h3>
            </Link>

            {/* Card 8 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=loaders&termName=Loaders"
              className="bg-white border border-[#E5E5E5] shadow-soft hover:shadow-elegant transition-all duration-300 p-3 sm:p-4 lg:p-6 group hover:-translate-y-1 aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img
                  src="/images/loader_img.webp"
                  alt="Loader"
                  className="max-w-[80%] max-h-full filter grayscale group-hover:grayscale-0 transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Loader
              </h3>
            </Link>

            {/* Card 9 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=pavers&termName=Pavers"
              className="bg-white border border-[#E5E5E5] shadow-soft hover:shadow-elegant transition-all duration-300 p-3 sm:p-4 lg:p-6 group hover:-translate-y-1 aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img
                  src="/images/paver_img.webp"
                  alt="Paver"
                  className="max-w-[80%] max-h-full filter grayscale group-hover:grayscale-0 transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Paver
              </h3>
            </Link>

            {/* Card 10 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=diesel-forklifts&termName=Diesel%20Forklifts"
              className="bg-white border border-[#E5E5E5] shadow-soft hover:shadow-elegant transition-all duration-300 p-3 sm:p-4 lg:p-6 group hover:-translate-y-1 aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img
                  src="/images/forklift_img.webp"
                  alt="forklift"
                  className="max-w-[80%] max-h-full filter grayscale group-hover:grayscale-0 transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Forklift
              </h3>
            </Link>

            {/* Card 11 */}
            <Link
              to="/products?taxonomy=equipment-buy&telescopic-handlers&termName=Telescopic Handlers"
              className="bg-white border border-[#E5E5E5] shadow-soft hover:shadow-elegant transition-all duration-300 p-3 sm:p-4 lg:p-6 group hover:-translate-y-1 aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img
                  src="/images/boom_loader.webp"
                  alt="Tele Hander"
                  className="max-w-[80%] max-h-full filter grayscale group-hover:grayscale-0 transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Tele Hander
              </h3>
              <p className="text-center font-medium text-sm text-[#9f9f9f]">(Boom Loader)</p>
            </Link>

            {/* Card 12 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=electric-forklifts&termName=Electric Forklifts"
              className="bg-white border border-[#E5E5E5] shadow-soft hover:shadow-elegant transition-all duration-300 p-3 sm:p-4 lg:p-6 group hover:-translate-y-1 aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img
                  src="/images/arial_work.webp"
                  alt="Arial Work Platform"
                  className="max-w-[80%] max-h-full filter grayscale group-hover:grayscale-0 transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Arial Work Platform
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start lg:items-center mb-8 flex-wrap gap-4">
            <div className="w-full lg:w-auto">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-0.5 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full"></div>
                <span className="text-sm font-bold tracking-wider text-accent-600 uppercase">
                  Golden Sparrow Select
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-2">
                This week's top Machines
              </h2>
              <p className="text-base sm:text-lg text-neutral-600">
                Handpicked for performance and reliability
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold shadow-soft text-sm sm:text-base w-full sm:w-auto justify-center mt-4 lg:mt-0"
            >
              View All
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-md shadow-soft overflow-hidden"
                  style={{ height: "320px" }}
                >
                  <div className="h-48 bg-neutral-200 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-neutral-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                No Products Found
              </h3>
              <p className="text-neutral-600 mb-4">
                Unable to load featured products at the moment. This could be
                due to network issues or API problems.
              </p>
              <div className="flex space-x-3 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold shadow-soft"
                >
                  Retry
                </button>
                {hasNetworkError && (
                  <button
                    onClick={() => setShowNetworkTest(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-soft"
                  >
                    Test Network
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-soft hover:shadow-elegant transition-all duration-300 overflow-hidden group hover:-translate-y-1"
                  style={{ height: "350px" }}
                >
                  {/* Image Container with fixed height */}
                  <div className="relative h-48 bg-neutral-200 overflow-hidden">
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
                        <Package className="w-12 h-12 text-neutral-400" />
                      </div>
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>

                  {/* Content Container with fixed height */}
                  <div className="p-4 h-[calc(100%-12rem)] flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-neutral-900 line-clamp-2 text-sm leading-5 group-hover:text-accent-600 transition-colors">
                        {product.name}
                      </h3>
                      {/* Year of Manufacture - Extract from Attributes */}
                      {(() => {
                        // Debug logging for development
                        // if (process.env.NODE_ENV === 'development') {
                        //   console.log('Product data for year extraction:', {
                        //     id: product.id,
                        //     name: product.name,
                        //     attributes: product.attributes || null
                        //   });
                        // }
                        let year = null;
                        // Extract year from pa_year-of-manufacture attribute
                        if (product.attributes && 
                            product.attributes['pa_year-of-manufacture'] && 
                            Array.isArray(product.attributes['pa_year-of-manufacture']) &&
                            product.attributes['pa_year-of-manufacture'].length > 0) {
                          year = product.attributes['pa_year-of-manufacture'][0];
                        }

                        // Validate year exists and is not empty
                        if (!year || year.toString().trim() === '') {
                          return null;
                        }

                        // Clean the year value
                        const cleanYear = year.toString().trim();

                        // If the year exists, render it
                        return (
                          <div className="mt-2 flex items-center text-xs text-neutral-600">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>Year: {cleanYear}</span>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Action area */}
                    <div className="mt-3 flex items-center justify-between">
                      <button
                        className="inline-flex items-center text-xs text-accent-600 font-medium hover:text-accent-700 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product.slug || 'product'}/GS${product.id}`);
                        }}
                      >
                        View Details
                        <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = 'tel:+971542320624';
                        }}
                        className="bg-accent-600 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-accent-700 transition-colors shadow-soft flex items-center"
                      >
                        <Phone className="w-4 h-4 mr-1"/>Enquire Now
                      </button>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EnquiryForm
            title={
              <>
                Need the
                <br />
                <span className="font-semibold">Right Machinery</span>
              </>
            }
            content={
              <>
                <p className="text-lg lg:text-xl mb-8 text-white leading-relaxed">
                  Get expert advice, quick quotes, and the best deals — all in
                  one place.
                </p>
                <p className="text-base lg:text-lg text-white">
                  Enquire now and let{" "}
                  <span className="font-semibold">Golden Sparrow</span>
                  <br />
                  lift your business higher.
                </p>
              </>
            }
            backgroundImage="./images/EnquiryForm.jpg"
          />
        </div>
      </section>

      {/* Popular Categories Section */}
      <PopularCategories limit={6} showTabs={true} />

      {/* Why Choose Us Section */}
      <section
        className="py-12 sm:py-16 bg-white"
        aria-labelledby="why-choose-us-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column - Image */}
            <div className="order-2 lg:order-1">
              <div className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] rounded-sm overflow-hidden group ">
                <img
                  src="/images/choose.webp"
                  alt="Why Choose Us"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div> */}
                {/* <div className="absolute inset-0 bg-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> */}
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="order-1 lg:order-2 space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Header */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full"></div>
                  <span className="text-sm font-bold tracking-wider text-accent-600 uppercase">
                    WHY CHOOSE US
                  </span>
                </div>

                <h2
                  id="why-choose-us-heading"
                  className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight font-display"
                >
                  Trusted Equipment. Proven Support.
                </h2>

                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
                  From forklifts to excavators, we ensure every project runs
                  smoothly with top-tier equipment.
                </p>
              </div>

              {/* Key Benefits */}
              <div
                className="space-y-4 sm:space-y-6"
                role="list"
                aria-label="Key benefits and features"
              >
                <div
                  className="flex items-start space-x-3 sm:space-x-4"
                  role="listitem"
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-accent-100 rounded-lg flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                      Quality Guaranteed
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      Every machine is inspected, tested, and ready to perform
                      safely on-site.
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start space-x-3 sm:space-x-4"
                  role="listitem"
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-accent-100 rounded-lg flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                      Expert Support
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      24/7 service, maintenance, and guidance from our skilled
                      technicians.
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start space-x-3 sm:space-x-4"
                  role="listitem"
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-accent-100 rounded-lg flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Currency className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                      Best Value
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      Competitive prices, flexible rentals, and warranties that
                      save you money.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              {/* <div className="pt-4 sm:pt-6">
                <button
                  onClick={() => navigate("/products")}
                  className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-accent-500 text-white rounded-lg hover:bg-accent-600 focus:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                  aria-label="Explore our equipment catalog"
                >
                  <span>Explore Our Equipment</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Layout Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-0.5 bg-black"></div>
                  <span className="text-sm font-bold tracking-wider text-gray-600 uppercase">
                    INDUSTRIES WE SERVE
                  </span>
                </div>

                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                  Built for Construction, Mining & Beyond
                </h2>
              </div>

              {/* Industries List */}
              <div className="space-y-6 lg:space-y-8">
                {[
                  {
                    title: "Construction",
                    description:
                      "Dozers, loaders, among other earthmoving equipment.",
                  },
                  {
                    title: "Mining",
                    description:
                      "Excavators, drills, trucks & mining attachments.",
                  },
                  {
                    title: "Oil & Gas",
                    description:
                      "From pumping & mixing trucks to skids & trailers.",
                  },
                  {
                    title: "Quarry & Aggregate",
                    description:
                      "Off-highway dump trucks & heavy-duty front-shovels.",
                  },
                ].map((industry, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8"
                  >
                    <div className="sm:w-32 lg:w-40 flex-shrink-0">
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                        {industry.title}
                      </h3>
                    </div>

                    <div className="flex-1 sm:border-l-2 sm:border-black sm:pl-6">
                      <p className="text-gray-500 text-base font-medium lg:text-lg leading-relaxed">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="order-first lg:order-last">
              <div className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] rounded-sm overflow-hidden shadow-lg group">
                <img
                  src="/images/equipment.webp"
                  alt="Heavy equipment working in industrial setting"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Brands Section */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Our Brands
            </h2>
            <p className="text-neutral-600">
              Trusted by industry-leading equipment manufacturers
            </p>
          </div> */}

      {/* Brand Slider using React Slick */}
      {/* <div className="brand-slider">
            <Slider {...sliderSettings}>
              {brands.map((brand, index) => (
                <div key={`brand-${brand.name}-${index}`} className="px-2">
                  <div className="bg-white flex items-center justify-center mx-2">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-24 h-24 bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center hidden">
                      <Building2 className="w-12 h-12 text-accent-600" />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div> */}

      {/* Optional: View All Brands Button */}
      {/* <div className="text-center mt-8">
            <button
              onClick={() => navigate('/brands')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-medium"
            >
              View All Brands
              <ChevronRight className="w-4 h-4" />
            </button>
          </div> */}
      {/* </div>
      </section> */}

      {/*New Brands Section */}
      <section className="section brands bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="brands-col">
            <div className="col trusted-brands">
              <div className="mb-5">
                <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
                  Authorized Dealer of Leading Heavy Equipment
                </h2>
              </div>
              <p className="text-lg font-medium text-neutral-600">
                Golden Sparrow is an authorized distributor of brand-new heavy
                equipment from global leaders
              </p>
            </div>
            {/* <div className="col authorized desktop-only">
        <img src="/images/authorized.png" alt="authorized dealers" loading="lazy" />
      </div> */}
          </div>

          <div className="home-brands">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 lg:gap-4.5 ">
              {/* Brand Logo Cards */}
              <div className="flex items-center justify-center border border-solid border-neutral-100 rounded-xl bg-white px-2 py-1 md:px-1 md:py-2 lg:p-2">
                <Link
                  to="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center justify-center lg:w-[175px] md:w-[100px] w-[150px] lg:h-[65px] h-[50px] lg:px-4 md:px-2 px-0 py-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/images/un_forklift.png"
                    width="150"
                    alt="UN"
                    loading="lazy"
                    sizes="(max-width: 640px) 150px, 100px"
                    className="object-contain h-full"
                  />
                </Link>
              </div>

              <div className="flex items-center justify-center border border-solid border-neutral-100 rounded-xl bg-white px-2 py-1 md:px-1 md:py-2 lg:p-2">
                <Link
                  to="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center justify-center lg:w-[175px] md:w-[100px] w-[150px] lg:h-[65px] h-[50px] lg:px-4 md:px-2 px-0 py-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/images/socma-dealership_1_.jpeg"
                    width="150"
                    alt="Socma"
                    loading="lazy"
                    sizes="(max-width: 640px) 150px, 100px"
                    className="object-contain h-full"
                  />
                </Link>
              </div>

              <div className="flex items-center justify-center border border-solid border-neutral-100 rounded-xl bg-white px-2 py-1 md:px-1 md:py-2 lg:p-2">
                <Link
                  to="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center justify-center lg:w-[175px] md:w-[100px] w-[150px] lg:h-[65px] h-[50px] lg:px-4 md:px-2 px-0 py-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/images/sany_logo.png"
                    width="150"
                    alt="Socma"
                    loading="lazy"
                    sizes="(max-width: 640px) 150px, 100px"
                    className="object-contain h-full"
                  />
                </Link>
              </div>

              <div className="flex items-center justify-center border border-solid border-neutral-100 rounded-xl bg-white px-2 py-1 md:px-1 md:py-2 lg:p-2">
                <Link
                  to="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center justify-center lg:w-[175px] md:w-[100px] w-[150px] lg:h-[65px] h-[50px] lg:px-4 md:px-2 px-0 py-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/images/rippa_logo.png"
                    width="150"
                    alt="Rippa"
                    loading="lazy"
                    sizes="(max-width: 640px) 150px, 100px"
                    className="object-contain h-full"
                  />
                </Link>
              </div>

              <div className="flex items-center justify-center border border-solid border-neutral-100 rounded-xl bg-white px-2 py-1 md:px-1 md:py-2 lg:p-2">
                <Link
                  to="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center justify-center lg:w-[175px] md:w-[100px] w-[150px] lg:h-[65px] h-[50px] lg:px-4 md:px-2 px-0 py-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/images/hengwang_logo.png"
                    width="150"
                    alt="Hengwang"
                    loading="lazy"
                    sizes="(max-width: 640px) 150px, 100px"
                    className="object-contain h-full"
                  />
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Link
                to="/brands"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold mt-8 shadow-soft"
              >
                View More
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-accent-100 text-accent-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-8 sm:w-12 h-0.5 bg-accent-500 rounded-full mr-3 sm:mr-4"></div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-accent-600">
                EASY PROCESS
              </span>
              <div className="w-8 sm:w-12 h-0.5 bg-accent-500 rounded-full ml-3 sm:ml-4"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-neutral-900 mb-4 sm:mb-6">
              Fast & Simple Equipment Booking
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              Find it, book it, and get working ⇾ All in just a few clicks.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {/* Step 1: Search */}
            <div className="relative group">
              {/* Connection Line - Hidden on mobile, visible on xl and up */}
              <div className="hidden xl:block absolute top-20 left-full w-12 h-0.5 bg-gradient-to-r from-accent-300 to-neutral-200 z-0"></div>

              <div className="relative z-10 text-center">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-elegant group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Search className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-soft border-2 border-accent-100">
                    <span className="text-sm font-bold text-accent-600">1</span>
                  </div>
                </div>
                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900">
                    Search
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                    Browse our full inventory and filter by need.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Compare */}
            <div className="relative group">
              {/* Connection Line */}
              <div className="hidden xl:block absolute top-20 left-full w-12 h-0.5 bg-gradient-to-r from-accent-300 to-neutral-200 z-0"></div>

              <div className="relative z-10 text-center">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-elegant group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Package className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-soft border-2 border-blue-100">
                    <span className="text-sm font-bold text-blue-600">2</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900">
                    Compare
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                    Check specs, prices, and availability.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Book */}
            <div className="relative group">
              {/* Connection Line */}
              <div className="hidden xl:block absolute top-20 left-full w-12 h-0.5 bg-gradient-to-r from-accent-300 to-neutral-200 z-0"></div>

              <div className="relative z-10 text-center">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-elegant group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Calendar className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-soft border-2 border-green-100">
                    <span className="text-sm font-bold text-green-600">3</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900">
                    Book
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                    Place your order and we’ll confirm right away.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4: Start Project */}
            <div className="relative group">
              <div className="relative z-10 text-center">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-elegant group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-soft border-2 border-purple-100">
                    <span className="text-sm font-bold text-purple-600">4</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900">
                    Get to Work
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                    Receive your machine on time, ready to go.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          {/* <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 shadow-soft border border-neutral-100">
              <h3 className="text-2xl font-display font-bold text-neutral-900 mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                Join thousands of satisfied customers who trust us for their equipment needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate("/products?taxonomy=equipment-buy")}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-all duration-300 font-semibold shadow-soft hover:shadow-elegant transform hover:-translate-y-0.5"
                >
                  <Search className="w-5 h-5" />
                  Browse Equipment
                </button>
                <button
                  onClick={() => navigate("/products?taxonomy=equipment-rent")}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-700 border-2 border-neutral-200 rounded-lg hover:border-accent-300 hover:text-accent-600 transition-all duration-300 font-semibold"
                >
                  <Calendar className="w-5 h-5" />
                  View Rentals
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* View Our Stocks Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-[#bbebeb] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="mb-6 sm:mb-8 lg:mb-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-3 sm:mb-4">
                Fast. Reliable. Ready for Your Site.
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mb-4 sm:mb-6">
                Trusted by UAE contractors for safe and reliable rentals.
                <br />
                Flexible purchase & rental options, tailored to your project.
              </p>
              <Link
                to=""
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold shadow-soft text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                Explore Inventory <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
            <div className="order-first lg:order-last">
              <div className="w-full h-64 sm:h-80 lg:h-72 xl:h-80 overflow-hidden">
                <img
                  src="/images/our_stocks.webp"
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Easy Payment Section */}
      <section className="py-12 sm:py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4 sm:flex-row flex-col">
              <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-neutral-900">
                Flexible & Secure Payments
              </h2>
            </div>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              From cards to bank transfers, choose the option that works for
              you. Safe, simple, and always secure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Credit/Debit Cards */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 border border-neutral-200 shadow-soft hover:shadow-elegant transition-all duration-300 group hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <CreditCard className="w-8 h-8 text-accent-500" />
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    Instant
                  </span>
                </div>
              </div>
              <h6 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">
                Credit/Debit Cards
              </h6>
              <p className="text-sm sm:text-base text-neutral-600 mb-3 sm:mb-4">
                Visa, Mastercard, American Express
              </p>
              <div className="mt-4 flex">
                <img
                  src={PaymentIcons}
                  alt="Accepted payment cards"
                  className="w-20 h-12 object-contain"
                />
              </div>
            </div>

            {/* Manual Transfer */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 border border-neutral-200 shadow-soft hover:shadow-elegant transition-all duration-300 group hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Banknote className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                    1-2 Days
                  </span>
                </div>
              </div>
              <h6 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">
                Bank Transfer
              </h6>
              <p className="text-sm sm:text-base text-neutral-600">
                Direct bank deposit with detailed instructions
              </p>
              <div className="mt-4 flex">
                <img
                  src={BankTransfer}
                  alt="Bank transfer"
                  className="w-20 h-12 object-contain"
                />
              </div>
            </div>

            {/* Buy Now, Pay Later */}
            <div className="bg-white p-8 border border-neutral-200 shadow-soft hover:shadow-elegant transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-accent-500 to-accent-400 text-white px-3 py-1 text-xs font-medium">
                Popular
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <CalendarClock className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    0% Interest
                  </span>
                </div>
              </div>
              <h6 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">
                Buy Now, Pay Later
              </h6>
              <p className="text-sm sm:text-base text-neutral-600">
                4 easy installments, 0% interest
              </p>
              <div className="mt-4 flex">
                <img
                  src={BuyNowPayLater}
                  alt="Buy now pay later"
                  className="w-20 h-12 object-contain"
                />
              </div>
            </div>

            {/* Wire Transfer */}
            <div className="bg-white p-4 sm:p-6 lg:p-8 border border-neutral-200 shadow-soft hover:shadow-elegant transition-all duration-300 group hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                  <Zap className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                    Secure
                  </span>
                </div>
              </div>
              <h6 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 sm:mb-3">
                Wire Transfer
              </h6>
              <p className="text-sm sm:text-base text-neutral-600">
                Fast & secure bank-to-bank
              </p>
              <div className="mt-4 flex">
                <img
                  src={WireTransfer}
                  alt="Wire transfer"
                  className="w-20 h-12 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-16 flex-wrap">
              <div className="flex items-center gap-2 text-lg text-neutral-600">
                <Shield className="w-6 h-6 text-green-600" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-lg text-neutral-600">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span>PCI Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-lg text-neutral-600">
                <Shield className="w-6 h-6 text-green-600" />
                <span>100% Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12 flex-wrap gap-6">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-0.5 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full"></div>
                <span className="text-sm font-bold tracking-wider text-accent-600 uppercase">
                  FROM THE FIELD
                </span>
              </div>
              <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
                Latest News & Insights
              </h2>
              <p className="text-lg text-neutral-600">
                Stay ahead with insights on machinery, rentals, and project best
                practices.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold shadow-soft"
            >
              View All Articles
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          {blogLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white shadow-soft overflow-hidden">
                  <div className="h-48 bg-neutral-200 animate-pulse"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-neutral-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post) => (
                <article
                  key={post.id}
                  className="bg-white shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer overflow-hidden group hover:-translate-y-1"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  {/* Featured Image */}
                  <div className="relative h-48 bg-neutral-200 overflow-hidden">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
                        <Package className="w-12 h-12 text-neutral-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    <div className="flex items-center text-sm text-neutral-500 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-display font-semibold text-neutral-900 mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {/* <div 
                      className="text-neutral-600 text-sm line-clamp-3 mb-4"
                      dangerouslySetInnerHTML={{ 
                        __html: post.excerpt.replace(/<[^>]*>/g, '').slice(0, 150) + '...' 
                      }}
                    />

                    {/* Read More */}
                    {/* <div className="flex items-center justify-between">
                      <span className="inline-flex items-center text-sm text-accent-600 font-medium">
                        Read More
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                      
                    </div> */}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative h-auto py-12 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${enquiryImage})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content Container */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight font-display">
              Get the Machine That Gets It Done.
            </h2>

            {/* Subtext */}
            <p className="text-xl md:text-2xl mb-6 text-gray-200 max-w-2xl mx-auto font-medium">
              From forklifts to excavators — power up your project with Golden
              Sparrow.
            </p>
            <p className="text-xl md:text-2xl mb-6 text-gray-200 max-w-2xl mx-auto font-medium">
              Fast delivery | Trusted machines | Expert support.
            </p>

            {/* Button Container */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Primary Button - Enquire Now */}
              <button
                //onClick={() => setShowEnquiryForm(true)}
                onClick={() => window.location.href = 'tel:+971542320624'}
                className="bg-white text-black font-semibold py-4 px-8 rounded-lg transition duration-300 ease-in-out transform min-w-[180px] shadow-elegant hover:bg-accent-500 hover:text-white"
              >
                <Phone className="inline-block w-5 h-5 mr-2" />
                Enquire Now
              </button>

              {/* Secondary Button - Browse Inventory*/}
              <button
                onClick={() => navigate("/products?taxonomy=equipment-buy")}
                className="bg-neutral-800 text-white font-semibold py-4 px-8 rounded-lg transition duration-300 ease-in-out min-w-[180px] shadow-elegant hover:bg-accent-600 hover:text-white"
              >
                <Search className="inline-block w-5 h-5 mr-2" />
                Browse Inventory
              </button>
            </div>
          </div>
        </div>

        {/* Enquiry Form Modal */}
        {showEnquiryForm && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="relative max-w-md w-full">
              <button
                onClick={() => setShowEnquiryForm(false)}
                className="absolute -top-12 right-0 text-white hover:text-accent-400 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <EnquiryFormModal onClose={() => setShowEnquiryForm(false)} />
            </div>
          </div>
        )}

        {/* Network Test Modal */}
        {showNetworkTest && (
          <NetworkTest onClose={() => setShowNetworkTest(false)} />
        )}
      </section>
    </div>
  );
}
