"use client";
import React, { useState, useRef, useEffect } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
// import { toSlug } from '@/utils/sanitizeData';
// import { formatCityTitle } from '@/utils/formatCityTitle';
// import { FiChevronDown } from "react-icons/fi";

interface CityDropdownInputProps {
  cities: string[];
  inputValue:string;
  setInputValue:React.Dispatch<React.SetStateAction<string>>;
}

//  function formatCityTitle(city: string): string {
//   if (!city) return "";

//   return city
//     .split(" ")
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//     .join(" ");
// }

const CityDropdownInput: React.FC<CityDropdownInputProps> = ({ cities, inputValue, setInputValue }) => {
//   const router = useRouter();
//   const pathname = usePathname();
  
  // here city slug extraction occuring
//   const pathParts = pathname.split('/');
//   const currentCitySlug = pathParts.length > 2 ? pathParts[2] : '';
//   const initialCity = currentCitySlug ? decodeURIComponent(currentCitySlug.replace(/-/g, ' ')) : '';
//    const capatalizedInput= formatCityTitle('')
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
//   const [inputValue, setInputValue] = useState(capatalizedInput || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>(cities);
  const [notFound, setNotFound] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!showDropdown) return;
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (!inputValue) {
        setFilteredCities(cities);
        setNotFound(false);
      } else {
        const filtered = cities.filter((c) =>
          c.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        setFilteredCities(filtered);
        setNotFound(filtered.length === 0);
      }
    }, 300);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [inputValue, cities, showDropdown]);

  // Keep filteredCities in sync with inputValue and cities
  useEffect(() => {
    if (!showDropdown) return;
    if (!inputValue ) {
      setFilteredCities(cities);
      setNotFound(false);
    } else {
      const filtered = cities.filter((c) =>
        c.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setFilteredCities(filtered);
      setNotFound(filtered.length === 0);
    }
  }, [inputValue, cities, showDropdown]);

  const [lastSelectedCity, setLastSelectedCity] = useState(inputValue);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        if (!cities.some(c => c.toLowerCase() === inputValue.toLowerCase())) {
          setInputValue(lastSelectedCity);
        }
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showDropdown, inputValue, lastSelectedCity, cities]);

  const handleFocus = () => {
    setInputValue("");
    setFilteredCities(cities);
    setShowDropdown(true);
  };

  const handleSelect = (city: string) => {
    setInputValue(city);
    setLastSelectedCity(city);
    setShowDropdown(false);
    // router.push(`/${professionSlug}/${toSlug(city)}`);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
      if (!cities.some(c => c.toLowerCase() === inputValue.toLowerCase())) {
        setInputValue(lastSelectedCity);
      }
    }, 150); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (cities.some(c => c.toLowerCase() === value.toLowerCase())) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };


  return (
    <div className="relative w-full px-1 " ref={containerRef}>
      <div className="flex items-center ">
        <input
          ref={inputRef}
          type="text"
          className="w-full p-3 pr-10 rounded-xl border dark:border-gray-300 border-primary focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 placeholder-gray-500 shadow-md"
          value={inputValue}
          // onChange={e => setInputValue(e.target.value)}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Select City"
          autoComplete="off"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
          tabIndex={-1}
          onClick={() => {
            if (showDropdown) {
              setShowDropdown(false);
              if (!cities.some(c => c.toLowerCase() === inputValue.toLowerCase())) {
                setInputValue(lastSelectedCity);
              }
            } else {
              setInputValue("");
              setFilteredCities(cities);
              setShowDropdown(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }
          }}
        >
          <ChevronDown size={22} />
        </button>
      </div>
      {showDropdown && (
        <div className="absolute left-0 z-10 mt-2 w-full  min-h-[80px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 max-h-80 overflow-auto">
          {notFound ? (
            <div className="px-4 py-2 min-h-[80px] text-sm text-gray-500">City not found</div>
          ) : (
            filteredCities.map((c) => (
              <div
                key={c}
                className="px-4 py-2  text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleSelect(c)}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CityDropdownInput;
