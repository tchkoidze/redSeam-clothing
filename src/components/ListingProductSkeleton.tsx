export default function ListingProductSkeleton() {
  return (
    <main className="mb-[216px] animate-pulse">
      <div className="grid grid-cols-1 px-[100px]">
        <div className="flex justify-between items-center">
          <div className="h-[42px] w-[220px] bg-gray-200 rounded-md"></div>
          <div className="flex items-center gap-8">
            <div className="h-[20px] w-[180px] bg-gray-200 rounded-md"></div>
            <span className="w-[1px] h-[14px] bg-[#E1DFE1]"></span>
            <div className="h-[24px] w-[80px] bg-gray-200 rounded-md"></div>
            <div className="h-[24px] w-[100px] bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(4,412px)] justify-center gap-6 mt-8">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="poppins-medium text-lg">
            <div className="w-[412px] h-[549px] bg-gray-200 rounded-lg"></div>
            <div className="h-5 w-3/4 mt-3 mb-2 bg-gray-200 rounded-md"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded-md"></div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-3">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="h-10 w-10 bg-gray-200 rounded-md"></div>
        ))}
      </div>
    </main>
  );
}
