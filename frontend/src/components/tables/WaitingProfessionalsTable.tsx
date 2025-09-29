import React from "react";
// Simple, ACTUALLY bulletproof pagination helper
function getPageNumbers(current: number, total: number) {
  const pages: (number | string)[] = [];
  
  if (total <= 7) {
    // If total pages <= 7, show all pages
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }

  // For more than 7 pages, use a simple, reliable pattern
  if (current <= 3) {
    // Near the beginning: 1 2 3 4 5 ... total
    pages.push(1, 2, 3, 4, 5, '...', total);
  } else if (current >= total - 2) {
    // Near the end: 1 ... (total-4) (total-3) (total-2) (total-1) total
    pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
  } else {
    // In the middle: 1 ... (current-1) current (current+1) ... total
    pages.push(1, '...', current - 1, current, current + 1, '...', total);
  }

  return pages;
}
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Example data type
type Professional = {
  id: number;
  name: string;
  city: string;
  profession: string;
  submittedDate: string;
  gender: string;
  headshot: string;
};

// Example data (replace with your API data) - Each entry must have unique ID
const data: Professional[] = [
  {
    id: 1,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 2,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 3,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 4,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 5,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 6,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 7,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 8,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 9,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 10,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 11,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 12,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 13,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 14,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 15,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 16,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 17,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 18,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 19,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 20,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 21,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 22,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 23,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 24,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 25,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 26,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 27,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 28,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 29,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 30,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 31,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 32,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 33,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 34,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 35,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 36,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 37,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 38,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 39,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 40,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 41,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 42,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 43,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 44,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 45,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 46,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 47,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 48,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 49,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 50,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 51,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 52,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 53,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 54,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 55,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 56,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 57,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 58,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 59,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 60,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 61,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 62,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 63,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 64,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 65,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 66,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 67,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 68,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 69,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 70,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 71,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 72,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 73,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 74,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 75,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 76,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 77,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 78,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 79,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 80,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 81,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 82,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 83,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 84,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 85,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 86,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 87,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 88,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 89,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 90,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 91,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 92,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 93,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 94,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 95,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 96,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 97,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 98,
    name: "Prajwol Shrestha",
    city: "Kathmandu",
    profession: "Designer",
    submittedDate: "11 Sept 2057",
    gender: "Male",
    headshot: "/images/defaultlogo.png",
  },
  {
    id: 99,
    name: "Lasta Pudasaini",
    city: "Bhaktapur",
    profession: "Photographer",
    submittedDate: "11 Sept 2025",
    gender: "Female",
    headshot: "/images/logo.svg",
  },
  {
    id: 100,
    name: "Yamuna Ghimire",
    city: "Kathmandu",
    profession: "Devotee Singer",
    submittedDate: "11 Sept 2067",
    gender: "Female",
    headshot: "/images/defaultlogo.png",
  }
];

// Column definitions
const columns: ColumnDef<Professional>[] = [
  { accessorKey: "id", header: "Waiting ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "profession", header: "Profession" },
  { accessorKey: "submittedDate", header: "Submitted Date" },
  { accessorKey: "gender", header: "Gender" },
  {
    accessorKey: "headshot",
    header: "Headshot",
    cell: info => (
      <img
        src={info.getValue() as string}
        alt="headshot"
        className="w-8 h-8 rounded-full mx-auto"
      />
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: () => (
      <button className="text-red-500 hover:text-red-700">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 6l8 8M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    ),
  },
];

export default function WaitingProfessionalsTable() {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-2 ">
      {/* Search bar */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <input
          value={globalFilter ?? ""}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search"
          className="border rounded px-3 py-2 w-full sm:w-1/3 dark:text-white"
        />
        {/* Add dropdowns for filters here if needed */}
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 text-sm md:text-base">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-red-900 text-white">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-2 md:px-3 py-2 text-left whitespace-nowrap">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium">No data found</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                      {globalFilter ? 'No results match your search criteria.' : 'No professionals are currently waiting for approval.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="bg-red-100  dark:bg-gray-600 dark:text-white">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-2 md:px-3 py-2 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Custom Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-2">
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border border-red-800 rounded-lg w-8 h-8 flex items-center justify-center text-red-800 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-all duration-150"
            aria-label="Previous page"
          >
           <ChevronLeft className="w-3 h-3"/>
          </button>
          {getPageNumbers(pageIndex + 1, pageCount).map((num, idx) =>
            typeof num === "number" ? (
              <button
                key={`page-${idx}-${num}`}
                onClick={() => table.setPageIndex(num - 1)}
                className={`border rounded-lg w-8 h-8 flex items-center justify-center text-sm font-medium transition-colors duration-150 ${
                  pageIndex + 1 === num
                    ? "bg-red-800 text-white border-red-800 dark:bg-red-700 dark:border-red-600"
                    : "bg-white text-red-800 border-red-800 hover:bg-red-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                }`}
                aria-current={pageIndex + 1 === num ? "page" : undefined}
              >
                {num}
              </button>
            ) : (
              <span key={`ellipsis-${idx}`} className="px-2 py-1 text-sm text-red-800 dark:text-gray-400 select-none">
                ...
              </span>
            )
          )}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border border-red-800 text-red-800 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 rounded-lg w-8 h-8 flex items-center justify-center text-sm font-medium hover:bg-red-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-all duration-150"
            aria-label="Next page"
          >
            <ChevronRight className="w-3 h-3"/>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2 md:mt-0">
          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            Results: {pageIndex * pageSize + 1}-{Math.min((pageIndex + 1) * pageSize, totalRows)} of {totalRows}
          </span>
          <div className="relative">
            <select
              value={pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className="appearance-none border border-red-800 bg-red-100 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200 rounded px-3 py-1 text-sm font-medium pr-6 cursor-pointer hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            >
              {[10, 20, 30, 40, 50].map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-red-800 dark:text-red-200 text-xs">&#9660;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
