"use client";

import { NewsType } from "@/types";
import MaxWidthWrapper from "./max-width-wrapper";
import { Button } from "./ui/button";
import { categories } from "@/lib/constants";
import NewsThumbnail from "./news-thumbnail";
import { useEffect, useState } from "react";
import { cn, lc } from "@/lib/utils";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { getNewsByCategory } from "@/lib/actions/news.actions";
import { NewsSkeleton } from "./skeletons";

const NewsComp = () => {
  const [news, setNews] = useState<NewsType[]>([]);

  const [isActive, setisActive] = useState("General");
  const [searchTerm, setSearchTerm] = useState("");

  const [foundNews, setFoundNews] = useState<NewsType[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  

  useEffect(() => {
    function getNews() {
      const selectedCat =
        isActive === "General" && !searchTerm
          ? news
          : isActive && !searchTerm
            ? news.filter((n) => lc(n.category) === lc(isActive))
            : news.filter(
                (n) =>
                  lc(n.title).includes(lc(searchTerm)) ||
                  lc(n.excerpt).includes(lc(searchTerm)) ||
                  lc(n.content).includes(lc(searchTerm)) ||
                  lc(n.author).includes(lc(searchTerm)) ||
                  lc(n.category).includes(lc(searchTerm)),
              );

      setFoundNews(selectedCat);
    }
    getNews();
  }, [isActive, news, searchTerm]);

  // Fetch paginated news by category
  useEffect(() => {
    async function loadPaginatedNews() {
      try {
        setLoading(true);
        setError(null);

        // Fetch paginated news for current category and page
        const result = await getNewsByCategory(isActive, currentPage, 10);

        if (result.error) {
          setError(result.error);
        } else {
          setNews(result.news || []);
          setTotalPages(result.totalPages || 1);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadPaginatedNews();
  }, [currentPage, isActive]); // Re-fetch when page OR category changes

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setisActive(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 10;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages are less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("ellipsis-start");
      }

      // Add pages around current page
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (loading) {
    return <NewsSkeleton />;
  }

  if (error) {
    return (
      <div className="col-span-full flex justify-center items-center py-12">
        <div className="text-center bg-red-50 p-6 rounded-xl max-w-md">
          <h3 className="text-lg font-semibold text-red-700 mb-2">
            Error Loading News
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-app-blue hover:bg-app-blue/90"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <MaxWidthWrapper className="pt-16">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 justify-center mx-auto">
          {categories.map((c) => (
            <Button
              onClick={() => handleCategoryChange(c)}
              variant={"ghost"}
              key={c}
              className={cn(
                "bg-gray-200 hover:bg-blue-800 rounded-full  hover:text-white text-xs",
                lc(isActive) === lc(c) && "bg-app-blue text-white",
              )}
            >
              {c}
            </Button>
          ))}
        </div>

        <MaxWidthWrapper className="relative w-full md:max-w-4xl mx-auto mt-8">
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a news"
            className="pl-12 rounded-full"
          />

          <Search className="absolute top-2 left-5 md:left-18 size-6" />
        </MaxWidthWrapper>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="p-y">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <NewsThumbnail news={foundNews} />
        </div>
      </MaxWidthWrapper>

      {/* PAGINATION */}
      <div className="my-12">
        {totalPages > 1 && (
          <div className="mt-16">
            <Pagination>
              <PaginationContent>
                {/* Previous button */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {/* Page numbers */}
                {getPageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === "ellipsis-start" || page === "ellipsis-end" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page as number);
                        }}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                {/* Next button */}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
};

export default NewsComp;
