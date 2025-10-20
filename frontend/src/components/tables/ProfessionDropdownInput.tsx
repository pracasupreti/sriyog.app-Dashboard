"use client";
import React, { useState, useRef, useEffect } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
// import { formatProfessionTitle } from '@/utils/formatProfessionTitle';
// import { toSlug } from '@/utils/sanitizeData';
// import { FiChevronDown } from "react-icons/fi";
type ProfessionDropDownInputProps = {
    Professions: string[];
    value:string;
    onChange: (value: string) => void;
}

function formatProfessionTitle(profession: string): string {
  if (!profession) return "";

  const acronyms = ["AC", "TV", "IT", "HR", "CEO","CCTV"];

  return profession
    .split(" ")
    .map(word => {
      const upperWord = word.toUpperCase();
      if (acronyms.includes(upperWord)) {
        return upperWord;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

const ProfessionDropdownInput: React.FC<ProfessionDropDownInputProps> = ({ Professions,value,onChange }) => {
//   const router = useRouter();
//   const pathname = usePathname();

  //using pathname extracting first slug
//   const currentProfessionSlug = pathname.split('/')[1] || '';
//   const initialProfession = decodeURIComponent(currentProfessionSlug.replace(/-/g, ' '));
//   const [inputValue, onChange] = useState("select professions");
  const [showDropdown, setShowDropdown] = useState(false);
  const [professions, setProfessions] = useState<string[]>([]);
  const [filteredProfessions, setFilteredProfessions] = useState<string[]>([]);
  const [notFound, setNotFound] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Track last selected profession
  const [lastSelectedProfession, setLastSelectedProfession] = useState(value);


  useEffect(() => {
        const filtered = (Professions || []).filter(
          (p: string) => p.trim().toLowerCase() !== 'others'
        );
        setProfessions(filtered);
        setFilteredProfessions(filtered);
  }, [ Professions]);

  // Debounced filter to reduce unnecessary filter
  useEffect(() => {
    if (!showDropdown) return;
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (!value) {
        setFilteredProfessions(professions);
        setNotFound(false);
      } else {
        const filtered = professions.filter((p) =>
          p.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredProfessions(filtered);
        setNotFound(filtered.length === 0);
      }
    }, 300);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [value, professions, showDropdown]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        if (!professions.some(p => p.toLowerCase() === value.toLowerCase())) {
          onChange(lastSelectedProfession);
        }
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showDropdown, value, lastSelectedProfession, professions]);

  const handleFocus = () => {
    onChange("");
    setShowDropdown(true);
  };

  const handleSelect = (profession: string) => {
    onChange(profession);
    setLastSelectedProfession(profession);
    setShowDropdown(false);
    // router.push(`/${toSlug(profession)}`);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
      if (!professions.some(p => p.toLowerCase() === value.toLowerCase())) {
        onChange(lastSelectedProfession);
      }
    }, 150);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
    // if (professions.some(p => p.toLowerCase() === value.toLowerCase())) {
    //   setShowDropdown(false);
    // } else {
    //   setShowDropdown(true);
    // }
  };

  const handleToggleDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
      if (!professions.some(p => p.toLowerCase() === value.toLowerCase())) {
        onChange(lastSelectedProfession);
      }
    } else {
      onChange("");
      setShowDropdown(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  

  return (
    <div className="relative w-full px-1 " ref={containerRef}>
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          className="w-full p-3 pr-10 rounded-xl border dark:border-gray-300 border-primary focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 placeholder-gray-500 shadow-md"
          value={formatProfessionTitle(value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const match = professions.find(p => p.toLowerCase() === value.toLowerCase());
              if (match) {
                setShowDropdown(false);
                onChange(match);
                // router.push(`/${toSlug(match)}`);
              }
            }
          }}
          placeholder="Select profession"
          autoComplete="off"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
          tabIndex={-1}
          onClick={handleToggleDropdown}
        >
          <ChevronDown size={22} />
        </button>
      </div>
      {showDropdown && (
        <div className="absolute left-0 z-10 mt-2 w-full min-h-[80px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 max-h-80 overflow-auto">
          {notFound ? (
            <div className="px-4 py-2 min-h-[80px] text-sm text-gray-500">Profession not found</div>
          ) : (
            filteredProfessions.map((p) => (
              <div
                key={p}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleSelect(p)}
              >
                {p}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProfessionDropdownInput;
