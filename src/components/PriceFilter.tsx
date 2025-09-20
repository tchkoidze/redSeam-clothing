export default function PriceFilter() {
  return (
    <form className="absolute -right-5 w-[392px] border border-[#E1DFE1] rounded-lg p-4 bg-white">
      <h3 className="text-left text-lg mb-5">Select price</h3>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex items-center border rounded-lg px-3 py-2 border-[#E1DFE1] text-gray-600">
          <span className="flex gap-1 mr-2">
            From <span className="text-red-500">*</span>
          </span>
          <input
            type="number"
            className="w-full outline-none border-none bg-transparent"
          />
        </div>

        <div className="flex items-center border rounded-lg px-3 py-2 border-[#E1DFE1] text-gray-600">
          <span className="flex gap-1 mr-2">
            To <span className="text-[#FF4000]">*</span>
          </span>
          <input
            type="number"
            className="w-full outline-none border-none bg-transparent"
          />
        </div>
      </div>

      <div className="flex justify-end mt-2.5">
        <button className="bg-[#FF4000] text-white px-8 py-2 rounded-lg font-medium hover:bg-orange-700 transition cursor-pointer">
          Apply
        </button>
      </div>
    </form>
  );
}
