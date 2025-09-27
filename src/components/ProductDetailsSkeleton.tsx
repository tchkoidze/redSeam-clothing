export default function ProductDetailsSkeleton() {
  return (
    <main className="flex flex-col items-center mb-[110px] animate-pulse">
      <div className="w-[1920px] px-[100px] mb-[49px]">
        <div className="h-4 w-40 bg-gray-200 rounded-md"></div>
      </div>

      <div className="flex gap-[168px]">
        <div className="w-[848px] flex gap-6">
          <div className="w-[121px] space-y-2.5 shrink-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-[121px] h-[161px] bg-gray-200 rounded-lg"
              ></div>
            ))}
          </div>

          <div className="w-[703px] h-[900px] bg-gray-200 rounded-lg shadow-lg"></div>
        </div>

        <div className="flex-none w-[704px] space-y-14">
          <div>
            <div className="h-8 w-2/3 bg-gray-200 rounded-md mb-[21px]"></div>
            <div className="h-6 w-24 bg-gray-200 rounded-md"></div>
          </div>

          <div className="space-y-12">
            <div>
              <div className="h-5 w-24 bg-gray-200 rounded-md mb-4"></div>
              <div className="flex gap-[18px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[38px] h-[38px] rounded-full bg-gray-200"
                  ></div>
                ))}
              </div>
            </div>

            <div>
              <div className="h-5 w-20 bg-gray-200 rounded-md mb-4"></div>
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[70px] h-10 bg-gray-200 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>

            <div>
              <div className="h-5 w-28 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-10 w-[100px] bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          <div className="w-full h-12 bg-gray-200 rounded-lg"></div>

          <div className="w-full h-[1px] bg-[#E1DFE1]"></div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
              <div className="h-[61px] w-[100px] bg-gray-200 rounded-md"></div>
            </div>
            <div className="h-4 w-40 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-24 w-full bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
