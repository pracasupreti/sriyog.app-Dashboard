"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type GenderDropdownInputProps = {
  genders: string[];
  value: string;
  onChange: (value: string) => void;
};

const GenderDropdownInput: React.FC<GenderDropdownInputProps> = ({ genders, value, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredGenders, setFilteredGenders] = useState<string[]>(genders);
  const [notFound, setNotFound] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastSelectedGender, setLastSelectedGender] = useState(value);

  useEffect(() => {
    setFilteredGenders(genders);
  }, [genders]);

  useEffect(() => {
    if (!showDropdown) return;
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (!value) {
        setFilteredGenders(genders);
        setNotFound(false);
      } else {
        const filtered = genders.filter((g) =>
          g.toLowerCase().startsWith(value.toLowerCase())
        );
        setFilteredGenders(filtered);
        setNotFound(filtered.length === 0);
      }
    }, 300);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [value, genders, showDropdown]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        if (!genders.some(g => g.toLowerCase() === value.toLowerCase())) {
          onChange(lastSelectedGender);
        }
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showDropdown, value, lastSelectedGender, genders]);

  const handleFocus = () => {
    onChange("");
    setShowDropdown(true);
  };

  const handleSelect = (gender: string) => {
    onChange(gender);
    setLastSelectedGender(gender);
    setShowDropdown(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
      if (!genders.some(g => g.toLowerCase() === value.toLowerCase())) {
        onChange(lastSelectedGender);
      }
    }, 150);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleToggleDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
      if (!genders.some(g => g.toLowerCase() === value.toLowerCase())) {
        onChange(lastSelectedGender);
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
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const match = genders.find(g => g.toLowerCase() === value.toLowerCase());
              if (match) {
                setShowDropdown(false);
                onChange(match);
              }
            }
          }}
          placeholder="Select gender"
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
            <div className="px-4 py-2 min-h-[80px] text-sm text-gray-500">Gender not found</div>
          ) : (
            filteredGenders.map((g) => (
              <div
                key={g}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => handleSelect(g)}
              >
                {g}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default GenderDropdownInput;