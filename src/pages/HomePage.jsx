/**
 * HomePage Component
 * Landing page with featured categories and products
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { debugLog } from "../constants/config";
import { PiHeadset } from "react-icons/pi";
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
  Zap,
  Phone,
  Search,
  SearchIcon,
  LucideSearch,
} from "lucide-react";
import enquiryImage from "../assets/images/enquiry.webp";
import { fetchProducts, fetchBlogPosts } from "../services/api";
import PopularCategories from "../components/PopularCategories";
import EnquiryForm from "../components/EnquiryForm";
import HomeEnquiryForm from "../components/HomeEnquiryForm";
import EnquiryPopup from "../components/EnquiryPopup";
import PrimaryButton from "../components/UI/PrimaryButton";
import SecondaryButton from "../components/UI/SecondaryButton";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import MobileBannerSection from "../components/MobileBannerSection";

export default function HomePage() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showEnquiryPopup, setShowEnquiryPopup] = useState(false);
  const [showNetworkTest, setShowNetworkTest] = useState(false);
  const [hasNetworkError, setHasNetworkError] = useState(false);
  const [expanded, setExpanded] = useState(false);

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

  // Handle modal opening for enquiry popup
  const handleModal = () => {
    setShowEnquiryPopup(true);
  };

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
<section className="hidden md:block relative w-full">
  <Swiper
    modules={[Autoplay, EffectFade, Navigation]}
    spaceBetween={0}
    slidesPerView={1}
    effect="fade"
    fadeEffect={{
      crossFade: true
    }}
    speed={2000} // Slower transition for better dissolve
    navigation={{
      nextEl: '.hero-swiper-button-next',
      prevEl: '.hero-swiper-button-prev',
    }}
    autoplay={{
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true, // Better UX
    }}
    loop={true}
    className="absolute inset-0 w-full h-full hero-slider"
  >
    {[
      "/images/frame_1_1.webp",
      "/images/frame_2_1.webp",
      "/images/frame_3_1.webp",
      "/images/frame_4_1.webp",
      "/images/frame_5_1.webp"
    ].map((imageSrc, index) => (
      <SwiperSlide key={index}>
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${imageSrc}')` }}
        />
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Your existing overlay content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex items-center">
      
  
    <div className="max-w-max">
      <h1
        className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6"
        style={{lineHeight:'60px'}}
      >
        Power Your
        <br />
        Project with the<br/>Right Machine
      </h1>
      <p className="text-lg md:text-xl text-white font-semibold leading-relaxed mb-8">
        From forklifts to excavators
        <br />
        Golden Sparrow delivers reliable equipment
        <br />
        backed by field experts.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        

        <button className="secondary-gradient-btn" onClick={() => navigate("/products?taxonomy=equipment-buy")}>
                    <div className="secondary-gradient-btn-content">
                    <LucideSearch className="w-4 h-4 mr-2" />
                    <span className="">
                    Browse Inventory
                    </span>
                    </div>
                  </button>

        <button className="gradient-btn" onClick={() => {window.location.href = 'tel:+971542320624'}}>
                    <div className="gradient-btn-content">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="">
                    Enquire Now
                    </span>
                    </div>
                  </button>
      </div>
    </div>
  </div>
</section>

<MobileBannerSection />

       {/* Browse by Category */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFD200] to-[#F7971E] rounded-full"></div>
            <span className="text-base font-bold tracking-wider gradient-text uppercase">
              Our Inventory
            </span>
          </div>
          <div className="mb-12">
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-neutral-600">
              Find the perfect equipment for your needs
            </p>
          </div>
 
          <div className={`browse-grid-wrapper ${expanded ? "expanded" : ""}`}>
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=skid-steer-loaders&termName=Skid Steer Loaders"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/skid_steer.webp"
                  alt="Skid Steer Loaders"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Skid Steer
              </h3>
            </Link>
 
            {/* Card 2 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=mini-excavators&termName=Mini Excavators"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/mini_excavator.webp"
                  alt="Mini Excavator"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Mini Excavators
              </h3>
            </Link>
 
            {/* Card 3 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=excavators&termName=Excavators"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/excavator_img.webp"
                  alt="Excavator"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Excavators
              </h3>
            </Link>
 
            {/* Card 4 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=backhoe-loaders&termName=Backhoe Loaders"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/backhoe_loader.webp"
                  alt="Backhoe Loaders"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Backhoe Loaders
              </h3>
            </Link>
 
            {/* Card 5 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=graders&termName=Graders"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/grader_img.webp"
                  alt="Grader"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Grader
              </h3>
            </Link>
 
            {/* Card 6 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=crawler-dozers&termName=Crawler Dozers"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/dozer_img.webp"
                  alt="Dozer"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Dozer
              </h3>
            </Link>
 
            {/* Card 7 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=compactors&termName=Compactors"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/compactor_img.webp"
                  alt="Compactors"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Compactor
              </h3>
            </Link>
 
            {/* Card 8 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=loaders&termName=Loaders"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/loader_img.webp"
                  alt="Loader"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Loader
              </h3>
            </Link>
 
            {/* Card 9 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=pavers&termName=Pavers"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/paver_img.webp"
                  alt="Paver"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Paver
              </h3>
            </Link>
 
            {/* Card 10 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=diesel-forklifts&termName=Diesel%20Forklifts"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/forklift_img.webp"
                  alt="forklift"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Forklift
              </h3>
            </Link>
 
            {/* Card 11 */}
            <Link
              to="/products?taxonomy=equipment-buy&telescopic-handlers&termName=Telescopic Handlers"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/boom_loader.webp"
                  alt="Tele Hander"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Tele Hander
              </h3>
              <p className="text-center font-medium text-sm text-[#9f9f9f]">(Boom Loader)</p>
            </Link>
 
            {/* Card 12 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=electric-forklifts&termName=Electric Forklifts"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/arial_work.webp"
                  alt="Arial Work Platform"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Arial Work Platform
              </h3>
            </Link>
          </div>
</div>
 
{/* Button OUTSIDE the wrapper */}
{!expanded && (
  <button
    className="view-more-btn block sm:hidden lg:hidden xl:hidden"
    onClick={() => setExpanded(true)}
  >
    View More
  </button>
)}
 
 
        </div>
      </section>
      <section className="hidden py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFD200] to-[#F7971E] rounded-full"></div>
            <span className="text-base font-bold tracking-wider gradient-text uppercase">
              Our Inventory
            </span>
          </div>
          <div className="mb-12">
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-neutral-600">
              Find the perfect equipment for your needs
            </p>
          </div>
 
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=skid-steer-loaders&termName=Skid Steer Loaders"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/skid_steer.webp"
                  alt="Skid Steer Loaders"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Skid Steer
              </h3>
            </Link>
 
            {/* Card 2 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=mini-excavators&termName=Mini Excavators"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/mini_excavator.webp"
                  alt="Mini Excavator"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Mini Excavators
              </h3>
            </Link>
 
            {/* Card 3 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=excavators&termName=Excavators"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/excavator_img.webp"
                  alt="Excavator"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Excavators
              </h3>
            </Link>
 
            {/* Card 4 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=backhoe-loaders&termName=Backhoe Loaders"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/backhoe_loader.webp"
                  alt="Backhoe Loaders"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Backhoe Loaders
              </h3>
            </Link>
 
            {/* Card 5 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=graders&termName=Graders"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/grader_img.webp"
                  alt="Grader"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Grader
              </h3>
            </Link>
 
            {/* Card 6 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=crawler-dozers&termName=Crawler Dozers"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/dozer_img.webp"
                  alt="Dozer"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Dozer
              </h3>
            </Link>
 
            {/* Card 7 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=compactors&termName=Compactors"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/compactor_img.webp"
                  alt="Compactors"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Compactor
              </h3>
            </Link>
 
            {/* Card 8 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=loaders&termName=Loaders"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/loader_img.webp"
                  alt="Loader"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Loader
              </h3>
            </Link>
 
            {/* Card 9 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=pavers&termName=Pavers"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/paver_img.webp"
                  alt="Paver"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Paver
              </h3>
            </Link>
 
            {/* Card 10 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=diesel-forklifts&termName=Diesel%20Forklifts"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/forklift_img.webp"
                  alt="forklift"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Forklift
              </h3>
            </Link>
 
            {/* Card 11 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=telescopic-handlers&termName=Telescopic%20Handlers"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/boom_loader.webp"
                  alt="Tele Hander"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Tele Hander
              </h3>
              <p className="text-center font-medium text-sm text-[#9f9f9f]">(Boom Loader)</p>
            </Link>
 
            {/* Card 12 */}
            <Link
              to="/products?taxonomy=equipment-buy&term=diesel-boom-lifts&termName=Diesel%20Boom%20Lifts"
              className="bg-white browse-card p-6 group aspect-square flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center mb-4 transition-transform overflow-hidden">
                <img
                  src="/images/arial_work.webp"
                  alt="Arial Work Platform"
                  className="max-w-[80%] max-h-full filter transition duration-300 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-neutral-900 mb-2 flex-shrink-0">
                Arial Work Platform
              </h3>
            </Link>
          </div>

        </div>
        <style>
          {`
          .browse-card{
    border: 2px solid #eaeaea;
    border-radius: 8px;
}

.browse-card img{
mix-blend-mode: multiply;
}
.browse-card:hover{
    border-width: 2px;
    border-color: #f90;
    background-color: #fffaeb;
    box-shadow: 0 4px 12px 0 rgb(0 0 0 / 10%);
    transition: all .3s;
}
 
.browse-card:hover img{
        transform: scale(1.05);
}
          `}
        </style>
      </section>
 

      {/* Featured Products Section */}
      <section className="hidden py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start lg:items-center mb-8 flex-wrap gap-4">
            <div className="w-full lg:w-auto">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFD200] to-[#F7971E] rounded-full"></div>
                <span className="text-base font-bold tracking-wider gradient-text uppercase">
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


      {/* Product Card Section */}
{/* Product Card Section */}

      <section className="py-12 sm:py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start lg:items-center mb-8 flex-wrap gap-4">
            <div className="w-full lg:w-auto">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFD200] to-[#F7971E] rounded-full"></div>
                <span className="text-base font-bold tracking-wider gradient-text uppercase">
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

            {/* <Link
              to="/products"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors font-semibold shadow-soft text-sm sm:text-base w-full sm:w-auto justify-center mt-4 lg:mt-0"
            >
              View All
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
            </Link> */}
          </div>

<div className="block sm:hidden">
        <Swiper
          spaceBetween={12} // spacing between slides
          slidesPerView={1.1} // show 1 full + small part of next card
        >
          <SwiperSlide>
            <div className="card">
              <div className="image-container">
                <img
                  src="./images/forklift_10_ton.png"
                  alt="10-Ton UN Diesel Forklift"
                  className="bulldozer-image"
                />
              </div>
              <div className="content">
                <div>
                  <div className="flex items-start justify-between">
                    <h2 className="title">10-Ton UN Diesel Forklift</h2>
                    <div className="logo">
                      <img src="./images/un_only.png" alt="un logo" />
                    </div>
                  </div>
                  <div className="flex items-center my-1">
                    <Calendar className="w-4 h-4 mr-2 text-[#aba7a7]" />
                    <p className="year">Year: 2025</p>
                  </div>
                </div>
                <div className="actions">
                  <Link
                    to="/product/10-ton-un-diesel-forklift/GS1365"
                    className="view-details"
                  >
                    View Details
                  </Link>
                  <button onClick={handleModal} className="submit-btn">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Repeat SwiperSlide for other cards */}
          <SwiperSlide>
            <div className="card">
              <div className="image-container">
                <img
                  src="./images/excavator_35_ton.png"
                  alt="3.5 Ton Rippa Excavator"
                  className="bulldozer-image"
                />
              </div>
              <div className="content">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="title">3.5 Ton - R32-Pro Rippa Mini Excavator</h2>
                    <div className="logo">
                      <img src="./images/rippa_only.png" alt="rippa logo" />
                    </div>
                  </div>
                  <div className="flex items-center my-1">
                    <Calendar className="w-4 h-4 mr-2 text-[#aba7a7]" />
                    <p className="year">Year: 2025</p>
                  </div>
                </div>
                <div className="actions">
                  <Link
                    to="/product/3-5-ton-r32-pro-rippa-mini-excavator/GS1366"
                    className="view-details"
                  >
                    View Details
                  </Link>
                  <button onClick={handleModal} className="submit-btn">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
              <div class="card">
                <div class="image-container">
                    <img src="./images/backhoeLoader.png" alt="10-Ton UN Diesel Forklift" class="bulldozer-image" />
                </div>
                <div class="content">
                  <div>
                    <div className=" flex items-center justify-between">
                      <div>
                        <h2 class="title">RB-29 - Backhoe Loader Rippa</h2>
                        
                      </div>
                      <div class="logo"><img src="./images/rippa_only.png" alt="un logo"/></div>
                    </div>
                    <div className="flex items-center my-1">
                    <Calendar className="w-4 h-4 mr-2 text-[#aba7a7]" />
                    <p class="year">Year: 2025</p>
                    </div>
                  </div>
                  <div class="actions">
                      <Link to='/product/rb-29-backhoe-loader-rippa/GS1372' class="view-details">View Details</Link>
                      <button onClick={handleModal} class="submit-btn">Submit</button>
                  </div>
                </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div class="card">
              <div class="image-container">
                  <img src="./images/bulldozer.png" alt="10-Ton UN Diesel Forklift" class="bulldozer-image" />
              </div>
              <div class="content">
                <div>
                  <div className=" flex items-center justify-between">
                    <div>
                      <h2 class="title">HW32D Crawler Bulldozer</h2>
                    </div>
                    <div class="logo"><img src="./images/hw_only.png" alt="un logo"/></div>
                  </div>
                  <div className="flex items-center my-2">
                  <Calendar className="w-4 h-4 mr-2 text-[#aba7a7]" />
                  <p class="year">Year: 2025</p>
                  </div>
                </div>
                <div class="actions">
                    <Link to='/product/hw32d-crawler-bulldozer/GS1368' class="view-details">View Details</Link>
                    <button onClick={handleModal} class="submit-btn">Submit</button>
                </div>
              </div>
          </div>
          </SwiperSlide>


        </Swiper>
      </div>

      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div class="card">
        <div class="image-container">
            <img src="./images/forklift_10_ton.png" alt="10-Ton UN Diesel Forklift" class="bulldozer-image" />
        </div>
        <div class="content">
          <div>
            <div className=" flex items-start justify-between">
              <div>
                <h2 class="title">10-Ton UN Diesel Forklift</h2>
              </div>
              <div class="logo"><img src="./images/un_only.png" alt="un logo"/></div>
            </div>
            <div className="flex items-center my-1">
            <Calendar className="w-4 h-4 mr-2 text-[#aba7a7]" />
            <p class="year">Year: 2025</p>
            </div>
          </div>
          <div class="actions">
              <Link to='/product/10-ton-un-diesel-forklift/GS1365' class="view-details">View Details</Link>
              <button onClick={handleModal} class="submit-btn">Submit</button>
          </div>
        </div>
    </div>
    <div class="card">
        <div class="image-container">
            <img src="./images/excavator_35_ton.png" alt="10-Ton UN Diesel Forklift" class="bulldozer-image" />
        </div>
        <div class="content">
          <div>
            <div className=" flex items-center justify-between">
              <div>
                <h2 class="title">3.5 Ton - R32-Pro Rippa Mini Excavator</h2>
                
              </div>
              <div class="logo"><img src="./images/rippa_only.png" alt="rippa logo"/></div>
            </div>
            <div className="flex items-center my-1">
            <Calendar className="w-4 h-4 mr-2 text-[#aba7a7]" />
            <p class="year">Year: 2025</p>
            </div>
          </div>
          <div class="actions">
              <Link to='/product/3-5-ton-r32-pro-rippa-mini-excavator/GS1366' class="view-details">View Details</Link>
              <button onClick={handleModal} class="submit-btn">Submit</button>
          </div>
        </div>
    </div>
    <div class="card">
        <div class="image-container">
            <img src="./images/backhoeLoader.png" alt="10-Ton UN Diesel Forklift" class="bulldozer-image" />
        </div>
        <div class="content">
          <div>
            <div className=" flex items-center justify-between">
              <div>
                <h2 class="title">RB-29 - Backhoe Loader Rippa</h2>
                
              </div>
              <div class="logo"><img src="./images/rippa_only.png" alt="un logo"/></div>
            </div>
            <div className="flex items-center my-1">
            <Calendar className="w-4 h-4 mr-2 text-[#aba7a7]" />
            <p class="year">Year: 2025</p>
            </div>
          </div>
          <div class="actions">
              <Link to='/product/rb-29-backhoe-loader-rippa/GS1372' class="view-details">View Details</Link>
              <button onClick={handleModal} class="submit-btn">Submit</button>
          </div>
        </div>
    </div>
    <div class="card">
        <div class="image-container">
            <img src="./images/bulldozer.png" alt="10-Ton UN Diesel Forklift" class="bulldozer-image" />
        </div>
        <div class="content">
          <div>
            <div className=" flex items-center justify-between">
              <div>
                <h2 class="title">HW32D Crawler Bulldozer</h2>
              </div>
              <div class="logo"><img src="./images/hw_only.png" alt="un logo"/></div>
            </div>
            <div className="flex items-center my-2">
            <Calendar className="w-4 h-4 mr-2 text-[#aba7a7]" />
            <p class="year">Year: 2025</p>
            </div>
          </div>
          <div class="actions">
              <Link to='/product/hw32d-crawler-bulldozer/GS1368' class="view-details">View Details</Link>
              <button onClick={handleModal} class="submit-btn">Submit</button>
          </div>
        </div>
    </div>
    </div>
    </div>
    <style>
      {`
      .card {
            background: #ffffff;
            border-radius: 6px;
            overflow: hidden;
            width: 100%;
            max-width: 350px;
            height: 400px;
            display: flex;
            flex-direction: column;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .image-container {
            padding: 30px 20px;
            text-align: center;
            position: relative;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .bulldozer-image {
            width: 100%;
            max-width: 280px;
            height: auto;
            object-fit: contain;
        }

        .logo {
            width: 100px;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .content {
            padding: 24px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .title {
            font-size: 16px;
            font-weight: 600;
            color: #000;
            margin-bottom: 8px;
            line-height: 1.2;
        }

        .year {
            color: #aba7a7;
            font-size: 15px;
            font-weight: 500;
            position:relative;
        }

        // .year::before {
        //     position:absolute;
        //     content: '';
        //     width:12px;
        //     height:12px;
        //     background: #D9D9D9;
        //     top:50%;
        //     left:0;
        //     transform: translateY(-50%);
        //     border:2px solid D9D9D9;
            
        // }

        .actions {
            display: flex;
            gap: 12px;
            align-items: center;
            margin-top: auto;
        }
        .submit-btn {
            background: linear-gradient(159.21deg, #FFD200 11.19%, #F7971E 101.23%);
            color: #000;
            border: none;
            padding: 8px 24px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(246, 173, 85, 0.3);
        }

        .submit-btn:hover {
        background: linear-gradient(159.21deg, #F7971E 11.19%, #FFD200 101.23%);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(246, 173, 85, 0.4);
        }

        .submit-btn:active {
            transform: translateY(0);
        }

        /* Responsive Design */
        @media (max-width: 480px) {
            body {
                padding: 10px;
            }

            .card {
                max-width: 100%;
            }

            .image-container {
                padding: 20px 15px;
                min-height: 160px;
            }

            .bulldozer-image {
                max-width: 240px;
            }

            .logo {
                width: 45px;
                height: 45px;
                font-size: 16px;
                top: 15px;
                right: 15px;
            }

            .content {
                padding: 20px;
            }

            .title {
                font-size: 20px;
            }

            .actions {
                flex-direction: column;
                gap: 16px;
            }

            .view-details {
                justify-content: center;
                order: 2;
            }

            .submit-btn {
                width: 100%;
                order: 1;
                padding: 14px 28px;
            }
        }

        @media (max-width: 320px) {
            .image-container {
                padding: 15px 10px;
                min-height: 140px;
            }

            .bulldozer-image {
                max-width: 200px;
            }

            .title {
                font-size: 18px;
            }

            .content {
                padding: 16px;
            }
        }

        /* Tablet landscape */
        @media (min-width: 481px) and (max-width: 1024px) {
            .card {
                max-width: 400px;
            }
        }

        /* Large screens */
        @media (min-width: 1025px) {
            .card {
                max-width: 380px;
            }
        }
      `}
    </style>
      </section>

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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 ">
              {/* Brand Logo Cards */}
              <div className="flex items-center justify-center border border-solid border-neutral-100 rounded-xl bg-white px-2 py-1 md:px-1 md:py-2 lg:p-2">
                <Link
                  to="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center justify-center lg:px-4 md:px-2 px-0 py-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/images/unforklift.png"
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
                  className="flex items-center justify-center lg:px-4 md:px-2 px-0 py-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/images/socma_new.png"
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
                  className="flex items-center justify-center lg:px-4 md:px-2 px-0 py-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/images/rippa_new.png"
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
                  className="flex items-center justify-center lg:px-4 md:px-2 px-0 py-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/images/hengwang_new.png"
                    width="150"
                    alt="Hengwang"
                    loading="lazy"
                    sizes="(max-width: 640px) 150px, 100px"
                    className="object-contain h-full"
                  />
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center hidden">
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



      {/* Popular Categories Section */}
      {/* <PopularCategories limit={6} showTabs={true} /> */}

      {/* Equipment Layout Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-0.5 bg-gradient-to-r from-[#FFD200] to-[#F7971E]"></div>
                  <span className="text-base font-bold tracking-wider gradient-text uppercase">
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
            {/* <div className="order-first lg:order-last">
              <div className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] rounded-sm overflow-hidden shadow-lg group">
                <img
                  src="/images/equipment.webp"
                  alt="Heavy equipment working in industrial setting"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div> */}
            <div className="order-first lg:order-last">
        <div className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] rounded-sm overflow-hidden shadow-lg">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop={false}
            className="w-full h-full"
          >
            {/* Images array */}
            {[
              {
                src: "/images/equipment.webp",
                alt: "Heavy equipment working in industrial setting"
              },
              // {
              //   src: "/images/equipment.webp", 
              //   alt: "Construction equipment on site"
              // },
              // {
              //   src: "/images/equipment.webp",
              //   alt: "Mining equipment in operation"
              // },
              // {
              //   src: "/images/equipment.webp",
              //   alt: "Oil and gas equipment"
              // }
            ].map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          {/* <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group">
            <svg 
              className="w-6 h-6 text-gray-700 group-hover:text-accent-500 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 group">
            <svg 
              className="w-6 h-6 text-gray-700 group-hover:text-accent-500 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button> */}
        </div>
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
      <section className="hidden py-12 sm:py-16 bg-neutral-50">
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
      <section
  className="py-8 sm:py-12 md:py-16 lg:py-20 bg-cover bg-center bg-no-repeat min-h-[400px] sm:min-h-[500px] lg:min-h-[400px] flex items-center"
  style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${enquiryImage})`
  }}
>
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight">
        Fast. Reliable. Ready for Your Site.
      </h2>
      
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl mb-6 sm:mb-8 lg:mb-10 leading-relaxed">
        Trusted by UAE contractors for safe and reliable rentals.
        <br className="hidden sm:block" />
        <span className="block sm:inline"> Flexible purchase & rental options, tailored to your project.</span>
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="secondary-gradient-btn" onClick={() => navigate("/products?taxonomy=equipment-buy")}>
                    <div className="secondary-gradient-btn-content">
                    <LucideSearch className="w-4 h-4 mr-2" />
                    <span className="">
                    Browse Inventory
                    </span>
                    </div>
                  </button>

        <button className="gradient-btn" onClick={() => {window.location.href = 'tel:+971542320624'}}>
                    <div className="gradient-btn-content">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="">
                    Enquire Now
                    </span>
                    </div>
                  </button>
      </div>
    </div>
  </div>
</section>

      {/* Enquiry Form Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <EnquiryForm
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
            backgroundImage="./images/homeFormImage.png"
          /> */}

          <HomeEnquiryForm
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
            backgroundImages={
              ['/images/homeFormImage.png','/images/homeFormImg_3.png', '/images/homeFormImg_2.png', '/images/homeFormImg_1.png']
            }
            
            />
        </div>
      </section>

      {/* Enquiry Popup */}
      <EnquiryPopup
        isOpen={showEnquiryPopup}
        onClose={() => setShowEnquiryPopup(false)}
      />
    </div>
  );
}
