/**
 * ProductDetailPage - Fixed Version
 * Properly fetches product details from WooCommerce API
 */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Phone,
  Truck,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
  Settings,
  CreditCard,
  Package2,
  HomeIcon,
  Banknote,
  CalendarClock,
  Zap,
  CheckCircle,
  Calendar
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import RelatedProducts from "../components/RelatedProducts";
import EnquiryPopup from "../components/EnquiryPopup";
import { fetchProduct, ApiError } from "../services/api";
import PaymentIcons from "../assets/images/Payment_Icons.png";
import BankTransfer from "../assets/images/bank_transfer.png";
import BuyNowPayLater from "../assets/images/buy_now_pay_later.png";
import WireTransfer from "../assets/images/wire_transfer.png";

const ProductDetailPage = () => {
  const { productId, productSlug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("technical");
   const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    const handleOpenPopup = () => {
      setIsPopupOpen(true);
    };
  
    const handleClosePopup = () => {
      setIsPopupOpen(false);
    };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  // Track scroll position to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "technical",
        "product_description",
        "features",
        "payment",
        "related_products",
      ];
      const navHeight = 34 + 80;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop - navHeight - 50;
          if (window.scrollY >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Remove navItems dependency since we're using static array

  const fetchProductDetails = async () => {
    if (!productId) return;
    
    setLoading(true);
    setError(null);

    try {
      const product = await fetchProduct(productId);
      setProduct(product);
    } catch (err) {
      console.error("Failed to fetch product:", err);
      setError(err.message);

      // For development, create a mock product for testing
      // Remove this in production
      if (process.env.NODE_ENV === "development") {
        const actualProductId = productId?.startsWith('GS') ? productId.substring(2) : productId;
        setProduct({
          id: actualProductId,
          name: `Product #${actualProductId} (Mock Data)`,
          price: "999.00",
          regular_price: "1299.00",
          sale_price: "999.00",
          on_sale: true,
          description:
            "This is a mock product description. The actual product could not be loaded from the API.",
          short_description: "Mock product for testing",
          images: [
            {
              src: "https://via.placeholder.com/600x400/cccccc/666666?text=Product+Image",
            },
          ],
          stock_status: "instock",
          categories: [{ name: "Equipment" }],
          attributes: [],
          currency_symbol: "$",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Decode HTML entities
  const decodeHTML = (html) => {
    if (!html) return "";
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" message="Loading product details..." />
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Package className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-neutral-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-neutral-600 mb-2">{error}</p>
          <p className="text-sm text-neutral-500 mb-6">
            Product ID: {productId} | Slug: {productSlug || 'N/A'}
          </p>
          <button
            onClick={() => navigate("/products")}
            className="inline-flex items-center px-6 py-3 bg-accent-600 text-white rounded-xl hover:bg-accent-700"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  // Process images
  const images = product.images || [];
  const mainImage = images[selectedImage] || images[0] || {};
  const imageUrl =
    mainImage.src || mainImage.url || "https://via.placeholder.com/600x400";

  // Thumbnail slider functions
  const imagesPerSlide = 4;
  const totalSlides = Math.ceil(images.length / imagesPerSlide);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64 + 80; // navbar height + section nav height
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  // Navigation items
  const navItems = [
    { id: "technical", label: "Technical Specs", icon: Settings },
    { id: "product_description", label: "Description", icon: FileText },
    { id: "features", label: "Features", icon: Package2 },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "related_products", label: "Related Products", icon: Package },
  ];
  return (
    <div className="min-h-screen bg-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="hidden sm:flex items-center text-sm text-neutral-600 mb-2">
          <a href="/" className="inline-flex hover:text-yellow-400">
            <HomeIcon className="w-4 h-4 inline-block mr-1" />
          </a>
          <ChevronRight className="w-4 h-4 inline-block mr-1" />
          <a href="/products" className="hover:text-yellow-400">
            Products
          </a>
          <ChevronRight className="w-4 h-4 inline-block mr-1" />
          <span className="text-neutral-900">{product.name}</span>
        </nav>
        {/* Product Details */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-10">
            {/* Image Gallery */}
            <div className="p-4">
              <div className="relative">
                {product.attributes.pa_condition && (
                  <span className="absolute top-4 left-4 z-10 bg-slate-50 text-black px-3 py-1 text-sm font-bold rounded">
                    {decodeHTML(product.attributes.pa_condition)}
                  </span>
                )}

                <div className="aspect-auto bg-neutral-100 rounded-md overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Thumbnail Gallery Slider */}
              {images.length > 1 && (
                <div className="mt-4">
                  <div className="relative">
                    {/* Navigation buttons */}
                    {totalSlides > 1 && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* Thumbnail container with overflow hidden */}
                    <div className="overflow-hidden px-8">
                      <div
                        className="flex transition-transform duration-300 ease-in-out gap-2"
                        style={{
                          transform: `translateX(-${currentSlideIndex * 100}%)`,
                        }}
                      >
                        {Array.from(
                          { length: totalSlides },
                          (_, slideIndex) => (
                            <div
                              key={slideIndex}
                              className="flex-shrink-0 w-full grid grid-cols-4 gap-2"
                            >
                              {images
                                .slice(
                                  slideIndex * imagesPerSlide,
                                  (slideIndex + 1) * imagesPerSlide
                                )
                                .map((img, imgIndex) => {
                                  const globalIndex =
                                    slideIndex * imagesPerSlide + imgIndex;
                                  return (
                                    <button
                                      key={globalIndex}
                                      onClick={() =>
                                        setSelectedImage(globalIndex)
                                      }
                                      className={`aspect-square rounded-md overflow-hidden border-2 transition-all hover:scale-90 ${
                                        selectedImage === globalIndex
                                          ? "border-[#1A1A1A] shadow-lg"
                                          : "border-neutral-200 hover:border-[#1A1A1A]"
                                      }`}
                                    >
                                      <img
                                        src={img.src || img.url}
                                        alt={`${product.name} ${
                                          globalIndex + 1
                                        }`}
                                        className="w-full h-full object-cover"
                                      />
                                    </button>
                                  );
                                })}
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Slide indicators */}
                    {totalSlides > 1 && (
                      <div className="flex justify-center mt-3 gap-2">
                        {Array.from({ length: totalSlides }, (_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlideIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              currentSlideIndex === index
                                ? "bg-accent-600"
                                : "bg-neutral-300 hover:bg-neutral-400"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4 lg:p-6">
              {/* Taxonomy Badge */}
              <div className="mb-4 flex items-center gap-2">
                {product.taxonomy === "equipment-buy" ? (
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-accent-100 text-accent-800 rounded-full">
                    For Sale
                  </span>
                ) : product.taxonomy === "equipment-rent" ? (
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-accent-100 text-accent-800 rounded-full">
                    For Rent
                  </span>
                ) : null}

                <span
                  className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    product.stock_status === "instock"
                      ? "bg-accent-100 text-accent-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.stock_status === "instock"
                    ? "✓ In Stock"
                    : "Out of Stock"}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-xl font-display font-bold text-neutral-900 mb-4">
                {product.name}
              </h1>
              
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
                          <div className="my-5 flex items-center text-xs font-bold text-neutral-600">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>Year: {cleanYear}</span>
                          </div>
                        );
                      })()}
                    

              {/* Price */}
              {/* <div className="mb-6">
                {product.on_sale && product.regular_price ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-accent-600">
                      {currencySymbol}
                      {product.sale_price || product.price}
                    </span>
                    <span className="text-xl text-neutral-500 line-through">
                      {currencySymbol}
                      {product.regular_price}
                    </span>
                    <span className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium">
                      Save {currencySymbol}
                      {(
                        parseFloat(product.regular_price) -
                        parseFloat(product.sale_price || product.price)
                      ).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-neutral-900">
                    {currencySymbol}
                    {product.price || "0.00"}
                  </span>
                )}
              </div> */}
              {/* Short Description */}
              {product.short_description && (
                <div className="product_description mb-4">
                  <p
                    className="font-sm text-neutral-600"
                    dangerouslySetInnerHTML={{
                      __html: product.short_description,
                    }}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mb-4 w-full sm:w-1/2">
                {/* <button 
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  onClick={() => console.log('Add to cart:', product.id)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button> */}
                {/* <button
                  className="flex-1 bg-accent-500 text-white py-3 px-6 rounded-xl hover:bg-accent-700 transition-colors flex items-center justify-center gap-2"
                  onClick={handleOpenPopup}
                >
                  <Phone className="w-5 h-5" />
                  Request a Quote
                </button> */}

                <button
                                className="gradient-btn"
                                onClick={handleOpenPopup}
                              >
                                <div className="gradient-btn-content">
                                  <Phone className="w-4 h-4 mr-2" />
                                  <span>Request a Quote</span>
                                </div>
                              </button>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <h3 className="font-display font-semibold mb-4">
                  Features & Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-neutral-600 mt-1" />
                    <div>
                      <p className="font-medium">Fast Delivery</p>
                      <p className="text-sm text-neutral-600">
                        Ships within 2-3 business days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-neutral-600 mt-1" />
                    <div>
                      <p className="font-medium">Warranty</p>
                      <p className="text-sm text-neutral-600">
                        1 Year manufacturer warranty
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-neutral-600 mt-1" />
                    <div>
                      <p className="font-medium">Support</p>
                      <p className="text-sm text-neutral-600">
                        24/7 customer support
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200 shadow-sm my-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 overflow-x-auto py-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap relative group ${
                      isActive
                        ? "text-black bg-white rounded-lg"
                        : "text-neutral-600 hover:text-slate-600"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {item.label}
                    {/* Underline effect */}
                    <span
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-slate-600 transition-all duration-200 ${
                        isActive ? "w-3/4" : "w-0 group-hover:w-3/4"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Technical Specifications */}
        {product.acf_fields?.technical_specification?.length > 0 && (
          <section
            id="technical"
            className="bg-white rounded-xl border border-neutral-200 shadow-sm mb-8"
          >
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 font-display font-bold text-neutral-900" />
                <h2 className="text-2xl font-display font-bold text-neutral-900">
                  Technical Specifications
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-neutral-200 rounded-lg overflow-hidden">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        Specification
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    <tr
                          className="hover:bg-neutral-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm font-bold text-neutral-900">
                            Reference Number
                          </td>
                          <td className="px-6 py-4 text-sm text-neutral-600">
                            GS{product.id}
                          </td>
                        </tr>
                    {product.acf_fields.technical_specification.map(
                      (item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-neutral-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm font-bold text-neutral-900">
                            {item.technical_name}
                          </td>
                          <td className="px-6 py-4 text-sm text-neutral-600">
                            {item.technical_value}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Product Description */}
        {product.description && (
          <section
            id="product_description"
            className="bg-white rounded-xl border border-neutral-200 shadow-sm mb-8"
          >
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 font-display font-bold text-neutral-900" />
                <h2 className="text-2xl font-display font-bold text-neutral-900">
                  Product Description
                </h2>
              </div>
              <div
                className="prose max-w-none text-neutral-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          </section>
        )}

        {/* Features */}
        {product.acf_fields?.features && (
          <section
            id="features"
            className="bg-white rounded-xl border border-neutral-200 shadow-sm mb-8"
          >
            <div className="p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Package2 className="w-6 h-6 font-display font-bold text-neutral-900" />
                <h2 className="text-2xl font-display font-bold text-neutral-900">
                  Features
                </h2>
              </div>
              <div
                className="prose max-w-none text-neutral-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: product.acf_fields.features,
                }}
              />
            </div>
          </section>
        )}

        {/* Payment Methods */}
        <section
          id="payment"
          className="bg-white rounded-xl border border-neutral-200 shadow-sm mb-8"
        >
          <div className="p-6 lg:p-8">
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 font-display font-bold text-neutral-900" />
              <h2 className="text-2xl font-display font-bold text-neutral-900">
                Flexible & Secure Payments
              </h2>
              </div>
              <p className="text-lg text-neutral-600">
              From cards to bank transfers, choose the option that works for you. Safe, simple, and always secure.
            </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Credit/Debit Cards */}
                        <div className="bg-white p-8 border border-neutral-200 shadow-soft hover:shadow-elegant transition-all duration-300 group hover:-translate-y-1">
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
                          <h6 className="text-xl font-semibold text-neutral-900 mb-3">
                            Credit/Debit Cards
                          </h6>
                          <p className="text-base text-neutral-600 mb-4">
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
                        <div className="bg-white p-8 border border-neutral-200 shadow-soft hover:shadow-elegant transition-all duration-300 group hover:-translate-y-1">
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
                          <h6 className="text-xl font-semibold text-neutral-900 mb-3">
                            Bank Transfer
                          </h6>
                          <p className="text-base text-neutral-600">
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
                          <h6 className="text-xl font-semibold text-neutral-900 mb-3">
                            Buy Now, Pay Later
                          </h6>
                          <p className="text-base text-neutral-600">
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
                        <div className="bg-white p-8 border border-neutral-200 shadow-soft hover:shadow-elegant transition-all duration-300 group hover:-translate-y-1">
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
                          <h6 className="text-xl font-semibold text-neutral-900 mb-3">
                            Wire Transfer
                          </h6>
                          <p className="text-base text-neutral-600">
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

        {/* Related Products Section */}
        {product && product.related_ids && product.related_ids.length > 0 && (
          <section
            id="related_products"
            className="bg-white rounded-xl border border-neutral-200 shadow-sm mb-8"
          >
            <div className="p-6 lg:p-8">
              {/* <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 font-display font-bold text-neutral-900" />
                <h2 className="text-2xl font-display font-bold text-neutral-900">
                  Related Products
                </h2>
              </div> */}
              <RelatedProducts
                productIds={product.related_ids}
                currentProductId={productId}
                taxonomy={product.taxonomy || "equipment-buy"}
              />
            </div>
          </section>
        )}
      </div>

      {/* EnquiryPopup */}
      <EnquiryPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        product={product}
      />
    </div>
  );
};

export default ProductDetailPage;
