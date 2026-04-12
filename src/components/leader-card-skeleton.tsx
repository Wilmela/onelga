
export function LeaderCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Image Placeholder */}
      <div className="relative w-full h-75 bg-gray-200 dark:bg-gray-800" />

      {/* Content Placeholders */}
      <div className="space-y-4 mt-4 min-h-55">
        {/* Name */}
        <div className="h-8 md:h-9 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />

        {/* Position/Ward */}
        <div className="h-6 md:h-7 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />

        {/* Bio (Multiple lines if showExtra is usually true) */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
        </div>

        {/* Tenure */}
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
      </div>

      {/* EditTab Placeholder */}
      <div className="mt-4 h-10 bg-gray-100 dark:bg-gray-900 rounded-md w-full" />
    </div>
  );
}
