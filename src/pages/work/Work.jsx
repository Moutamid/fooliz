import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import brokenImage from "../../assets/brokenimage.png";
import { ClipLoader } from 'react-spinners';

import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import IC_TALKTOGATHER_1 from "../../assets/ic_talkTogather_1.svg";
import IC_TALKTOGATHER_2 from "../../assets/ic_talkTogather_2.svg";
import IC_AIRBNB_1 from "../../assets/ic_airbnb_1.jpg";
import IC_CALENDARTASK_1 from "../../assets/ic_calendartask_1.jpg";
import IC_CHAMA_1 from "../../assets/ic_chama_1.jpg";
import IC_DAIPTV_1 from "../../assets/ic_daiptv_1.jpg";
import IC_INTUITIONBUILDER_1 from "../../assets/ic_intuitionbuilder_1.jpg";
import IC_LONGSTATUSPRO_1 from "../../assets/ic_longstatuspro_1.jpg";
import IC_MISSCADDIE_1 from "../../assets/ic_misscaddie_1.jpg";
import IC_QRSCANNER_1 from "../../assets/ic_qrscanner_1.jpg";
import IC_ROUTINEFLOW_1 from "../../assets/ic_routineflow_1.jpg";
import IC_TRIP4PET_1 from "../../assets/ic_trip4pet_1.jpg";
import IC_TYPEKING_1 from "../../assets/ic_typeking_1.jpg";
import IC_WHATZBOOST_1 from "../../assets/ic_whatzboost_1.jpg";

import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(
    "https://firebasestorage.googleapis.com/v0/b/foolee-inc.appspot.com/o/fooliz.-website-assets%2Fwork-page-video.gif?alt=media&token=2d7469a5-4f7d-4ed1-a3ee-e797e6bda9b5"
    // "https://s3-alpha-sig.figma.com/img/dd4f/9d43/80fbdbdcfb9e32c6aa893ccf48e17ab7?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hM0j71Ag3zLOcuf96uHUVKrTOK5FT2T2FJF5tgI9PUw6nnLzdOzj7jqU8KwxbXLN2uuHGFQTLi2uwGHbIriUOZ5tGL9LkC9nEdrOY60j8APQmlW07YErej5A0~2a05x7LgvTUvl1EpeXMliZmdSkFfMzNYu13ITOs316cW2hWxH5dQoyw9W0wOS2mSibs6CfjA4tt1dgcrs6rRMhYpMib8SY7UkhRjnd~JNQzQ8yTD0RjhpGWnZ3BTjy8788RwF1jKK2~kXQiywfsOl7i4mYkTyRPqgSN3n-ZF3jE9-Hgv0wbEHcUk~B6u1T6c5pwABzMKyFxyD44M4YjObN~Z~sCg__"
  );
  
  // Create refs for scrolling
  const filterSectionRef = useRef(null);
  const contentSectionRef = useRef(null);
  
  // create a category constant of all values in imageData array for reuse in the imageData array
  const CATEGORY_ALL = "All";
  const CATEGORY_APP = "App";
  const CATEGORY_WEB = "Web";
  const CATEGORY_UI_UX = "UI/UX";
  const CATEGORY_CREATIVE = "Creative";
  
  // { 
  //   id: 2, 
  //   primary: Pic2, 
  //   secondary: Mobile2, 
  //   text: "Multi Search Engine", 
  //   icon: Pic21, 
  //   link: "secondaryimg",
  //   category: CATEGORY_WEB
  // },

  // Add category property to each item
  const imageData = [
    { 
      id: 1, 
      primary: IC_TALKTOGATHER_2, 
      secondary: IC_TALKTOGATHER_2, 
      text: "Talk ToGather", 
      link: "TalkTogather",
      category: CATEGORY_APP
    },
    { 
      id: 2, 
      primary: IC_AIRBNB_1, 
      secondary: IC_AIRBNB_1, 
      text: "Airbnb", 
      link: "Airbnb",
      category: CATEGORY_APP
    },
    { 
      id: 3, 
      primary: IC_CALENDARTASK_1, 
      secondary: IC_CALENDARTASK_1, 
      text: "Calendar Task", 
      link: "CalendarTask",
      category: CATEGORY_APP
    },
    { 
      id: 4, 
      primary: IC_CHAMA_1, 
      secondary: IC_CHAMA_1, 
      text: "Chama", 
      link: "Chama",
      category: CATEGORY_APP
    },
    { 
      id: 5, 
      primary: IC_DAIPTV_1, 
      secondary: IC_DAIPTV_1, 
      text: "Da Iptv", 
      link: "Daiptv",
      category: CATEGORY_APP
    },
    { 
      id: 6, 
      primary: IC_INTUITIONBUILDER_1, 
      secondary: IC_INTUITIONBUILDER_1, 
      text: "Intuition Builder", 
      link: "IntuitionBuilder",
      category: CATEGORY_APP
    },
    { 
      id: 7, 
      primary: IC_LONGSTATUSPRO_1, 
      secondary: IC_LONGSTATUSPRO_1, 
      text: "Long Status Pro", 
      link: "LongStatusPro",
      category: CATEGORY_APP
    },
    { 
      id: 8, 
      primary: IC_MISSCADDIE_1, 
      secondary: IC_MISSCADDIE_1, 
      text: "Miss Caddie", 
      link: "MissCaddie",
      category: CATEGORY_APP
    },
    { 
      id: 9, 
      primary: IC_QRSCANNER_1, 
      secondary: IC_QRSCANNER_1, 
      text: "QR Scanner", 
      link: "QrScanner",
      category: CATEGORY_APP
    },
    { 
      id: 10, 
      primary: IC_ROUTINEFLOW_1, 
      secondary: IC_ROUTINEFLOW_1, 
      text: "Routine Flow", 
      link: "RoutineFlow",
      category: CATEGORY_APP
    },
    { 
      id: 11, 
      primary: IC_TRIP4PET_1, 
      secondary: IC_TRIP4PET_1, 
      text: "Trip4Pet", 
      link: "Trip4Pet",
      category: CATEGORY_APP
    },
    { 
      id: 12, 
      primary: IC_TYPEKING_1, 
      secondary: IC_TYPEKING_1, 
      text: "Type King", 
      link: "TypeKing",
      category: CATEGORY_APP
    },
    { 
      id: 13, 
      primary: IC_WHATZBOOST_1, 
      secondary: IC_WHATZBOOST_1, 
      text: "WhatzBoost", 
      link: "WhatzBoost",
      category: CATEGORY_APP
    },
  ];
  
  // Use location to get URL parameters
  const location = useLocation();
  
  // State for active filter
  const [activeFilter, setActiveFilter] = useState(CATEGORY_ALL);
  
  // Function to scroll to content section with smooth behavior
  const scrollToContent = () => {
    if (contentSectionRef.current) {
      // Add a small delay to ensure the DOM is ready
      setTimeout(() => {
        contentSectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    }
  };
  
  // Effect to check for category in URL query params when component mounts
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    
    // Set active filter if category parameter exists and is valid
    if (categoryParam && [CATEGORY_ALL, CATEGORY_APP, CATEGORY_WEB, CATEGORY_UI_UX, CATEGORY_CREATIVE].includes(categoryParam)) {
      setActiveFilter(categoryParam);
      
      // Scroll to the content section after state update
      // Need setTimeout to ensure state has updated
      setTimeout(() => {
        scrollToContent();
      }, 100);
    }
  }, [location]);
  
  // New effect to update URL when filter changes
  useEffect(() => {
    // Update URL when filter changes without full page reload
    const url = new URL(window.location);
    if (activeFilter === CATEGORY_ALL) {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', activeFilter);
    }
    window.history.pushState({}, '', url);
  }, [activeFilter]);
  
  // Handle filter click
  const handleFilterClick = (category) => {
    setActiveFilter(category);
    // When user clicks filter, also scroll them to content section
    setTimeout(() => {
      scrollToContent();
    }, 100);
  };
  
  // Get filtered images based on active filter
  const getFilteredImages = () => {
    if (activeFilter === CATEGORY_ALL) {
      return imageData;
    }
    return imageData.filter(item => item.category === activeFilter);
  };
  
  return (
    <div className="relative min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Background Image */}
      <div className="w-full">
        {loading && (
          <div className="w-full h-[440.5px] md:h-[881px] flex items-center justify-center bg-gray-100">
            <ClipLoader color="#3B82F6" size={50} />
          </div>
        )}
        <img
          src={imageSrc}
          alt="Main Image"
          className={`w-full h-auto max-h-[440.5px] md:max-h-[881px] object-cover ${loading ? 'hidden' : 'block'}`}
          onError={() => setImageSrc(brokenImage)}
          onLoad={() => setLoading(false)}
        />
      </div>

      {/* Filter Section - Now Positioned After the GIF and Before Footer */}
      <div 
        ref={filterSectionRef} 
        className="relative w-full flex justify-center px-4 md:ml-[-60px]"
      >
        {/* Background container */}
        <div ref={contentSectionRef} 
        id="filtered-content" className="w-full max-w-[1588px] py-6 md:h-[185px] flex flex-wrap items-center justify-start">
          <p className="font-poppins font-normal text-lg md:text-[25px] leading-[37.5px] text-black">
            Filter by:
            <span 
              className={`ml-2 md:ml-4 cursor-pointer hover:underline ${activeFilter === CATEGORY_ALL ? "underline font-semibold" : ""}`}
              onClick={() => handleFilterClick(CATEGORY_ALL)}
            >
              All
            </span>
            <span 
              className={`ml-2 md:ml-4 cursor-pointer hover:underline ${activeFilter === CATEGORY_APP ? "underline font-semibold" : ""}`}
              onClick={() => handleFilterClick(CATEGORY_APP)}
            >
              App
            </span>
            <span 
              className={`ml-2 md:ml-4 cursor-pointer hover:underline ${activeFilter === CATEGORY_WEB ? "underline font-semibold" : ""}`}
              onClick={() => handleFilterClick(CATEGORY_WEB)}
            >
              Web
            </span>
            <span 
              className={`ml-2 md:ml-4 cursor-pointer hover:underline ${activeFilter === CATEGORY_UI_UX ? "underline font-semibold" : ""}`}
              onClick={() => handleFilterClick(CATEGORY_UI_UX)}
            >
              UI/UX
            </span>
            <span 
              className={`ml-2 md:ml-4 cursor-pointer hover:underline ${activeFilter === CATEGORY_CREATIVE ? "underline font-semibold" : ""}`}
              onClick={() => handleFilterClick(CATEGORY_CREATIVE)}
            >
              Creative
            </span>
          </p>
        </div>
      </div>
      
      {/* Responsive Card Grid with 3 cards per row on mobile */}
      <div 
        
        className="relative flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-8 lg:gap-16 px-2 md:px-4 mt-6 md:mt-10"
      >
        {getFilteredImages().map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="w-[calc(33.33%-8px)] sm:w-[calc(33.33%-12px)] md:w-[calc(50%-16px)] lg:w-[487.76px] h-[120px] sm:h-[180px] md:h-[280px] lg:h-[332.09px] rounded-[10px] bg-white shadow-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
            style={{ boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)" }}
          >
            {item.secondary ? (
              <>
                <img
                  src={item.primary}
                  alt="Primary"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-800 opacity-100 group-hover:opacity-0"
                />
                <img
                  src={item.secondary}
                  alt="Secondary"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              </>
            ) : (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <img 
                  src={item.primary} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            )}
            
            {/* Bottom left text - hidden on smallest screens, visible on hover for larger */}
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-white text-[10px] sm:text-xs md:text-sm lg:text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {item.text}
            </div>

            {/* Category badge - hidden on smallest screens, visible on hover for larger */}
            <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-black bg-opacity-70 text-white text-[8px] sm:text-xs px-1 py-0.5 md:px-2 md:py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              {item.category}
            </div>

            {/* Bottom right icon */}
            {item.icon && (
              <div className="absolute bottom-2 right-2 md:bottom-8 md:right-4 w-3 h-3 md:w-6 md:h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <img src={item.icon} alt="icon" className="w-full h-full" />
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="flex flex-col items-center justify-center text-center font-[Just_Another_Hand,cursive] px-4 my-12 md:mb-[180px] md:mt-[180px]">
        <p className="text-[26px] sm:text-[36px] md:text-[20px] lg:text-[75px] leading-tight md:leading-[121px] font-normal text-black">
          Want to see what can Fooliz do for you?
        </p>
        <div className="flex flex-row md:flex-row items-center gap-2 mt-[-5px] md:mt-[-13px] lg:mt-[-13px]">
          <Link
            to="/contact"
            className="bg-[#D9E021] font-semi-bold px-8 py-2 sm:px-6 sm:py-3 md:px-8 md:py-2 rounded-full text-[16px] sm:text-[20px] md:text-[65px] font-handwritten transition-all duration-300 ease-out hover:opacity-80"
          >
            Fill out a project
          </Link>
          <p className="text-[30px] md:text-[50px] lg:text-[80px] text-black">
            brief and get the ball rolling!
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;