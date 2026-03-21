import MaxWidthWrapper from "./max-width-wrapper";

export const NewsSkeleton = () => {
  return (
    <>
      <MaxWidthWrapper className="pt-16">
        <div className="grid grid-cols-3 md:grid-cols-8 gap-4 justify-center mx-auto">
          {/* Category buttons skeleton */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-full h-8 w-20 animate-pulse"
            ></div>
          ))}
        </div>

        <MaxWidthWrapper className="relative w-full md:max-w-4xl mx-auto mt-8">
          <div className="relative">
            <div className="bg-gray-200 rounded-full h-12 w-full animate-pulse"></div>
            {/* <Search className="absolute top-3 left-5 md:left-18 size-6 text-gray-300" /> */}
          </div>
        </MaxWidthWrapper>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* News thumbnail skeletons matching NewsThumbnail structure */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="group relative min-h-105">
              {/* Image skeleton with category badge */}
              <div className="relative md:w-75 h-50 overflow-hidden bg-gray-200 animate-pulse">
                <div className="py-1 px-2 bg-gray-300 text-xs text-center rounded-full absolute top-5 right-5 z-20 w-16 h-6"></div>
              </div>

              {/* Content skeleton */}
              <div className="p-2 space-y-2">
                {/* Title skeleton */}
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                {/* Subtitle skeleton */}
                <div className="h-5 bg-gray-200 rounded animate-pulse w-2/3"></div>
                {/* Body skeleton */}
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                </div>
              </div>

              {/* Footer skeleton */}
              <div className="absolute bottom-0 left-0 right-0 w-full flex items-center justify-between p-2 bg-gray-300 animate-pulse">
                <div className="inline-flex items-center space-x-1">
                  {/* <User size={16} className="text-gray-400" /> */}
                  <div className="h-4 bg-gray-400 rounded w-16"></div>
                </div>

                <div className="inline-flex items-center space-x-1">
                  {/* <CalendarDays size={16} className="text-gray-400" /> */}
                  <div className="h-4 bg-gray-400 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </>
  );
};
