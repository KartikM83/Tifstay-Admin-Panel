import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

export function DiscountDetails({ discount, onEdit, onBack }) {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Header Bar */}
      <div className="w-full h-[72px] flex items-center gap-2 bg-white rounded-lg p-4 shadow-sm">
        <IoArrowBackCircleOutline 
          className="w-[33.33px] h-[33.33px] cursor-pointer text-[#000000]" 
          onClick={() => (onBack ? onBack() : navigate(-1))}
        />
        <h2 className="text-[24px] font-medium leading-none">
          Offers & Discount / Discount / Discount Details
        </h2>
      </div>

      {/* Main Content */}
      <div className="p-6 bg-gray-50 min-h-screen">
         <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5]">
        <div className="w-full mx-auto bg-white shadow-sm border border-gray-200 rounded-xl">
          <div className="p-8">
            <div className="space-y-8">
              
              {/* Offer On */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Offer On *</label>
                  <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-gray-50 text-gray-900">
                    {discount.offerOn}
                  </div>
                </div>
              </div>

              {/* Discount Amount and Percentage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Discount/Cashback (₹)</label>
                  <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-gray-50 text-gray-900">
                    {discount.discountType === 'amount' ? `₹${discount.discount}` : '-'}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Discount/Cashback (%)</label>
                  <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-gray-50 text-gray-900">
                    {discount.discountType === 'percentage' ? `${discount.discount}%` : '-'}
                  </div>
                </div>
              </div>

              {/* Start Date and Expire Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Start Date *</label>
                  <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-gray-50 text-gray-900">
                    {new Date(discount.startDate).toLocaleDateString('en-GB')}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Expire Date *</label>
                  <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-gray-50 text-gray-900">
                    {new Date(discount.expireDate).toLocaleDateString('en-GB')}
                  </div>
                </div>
              </div>

              {/* Description and Terms & Conditions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Description *</label>
                  <div className="min-h-[100px] w-full border border-gray-300 rounded-md px-3 py-3 bg-gray-50 text-gray-900 whitespace-pre-wrap">
                    {discount.description}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Terms & Conditions *</label>
                  <div className="min-h-[100px] w-full border border-gray-300 rounded-md px-3 py-3 bg-gray-50 text-gray-900 whitespace-pre-wrap">
                    {discount.termsAndConditions}
                  </div>
                </div>
              </div>

              {/* Selected PG/Hostels */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Selected PG/Hostels</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      checked={!discount.selectedPGHostels || discount.selectedPGHostels.length === 0}
                      readOnly
                      className="w-4 h-4" 
                    />
                    <label className="text-sm text-gray-700 font-normal">For All PG/Hostel</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      checked={discount.selectedPGHostels && discount.selectedPGHostels.length > 0}
                      readOnly
                      className="w-4 h-4" 
                    />
                    <label className="text-sm text-gray-700 font-normal">Particular PG/Hostel Selected by Admin</label>
                  </div>
                </div>

                {discount.selectedPGHostels && discount.selectedPGHostels.length > 0 && (
                  <div className="ml-6 mt-4 space-y-3">
                    <label className="text-sm font-medium text-gray-700">Selected PG/Hostel</label>
                    <div className="h-11 w-full border border-gray-300 rounded-md px-3 py-3 bg-gray-50 text-gray-900">
                      {discount.selectedPGHostels.join(', ')}
                    </div>
                  </div>
                )}
              </div>

              {/* Show In App */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Show This Discount In *</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      checked={discount.showInApp === 'users'}
                      readOnly
                      className="w-4 h-4" 
                    />
                    <label className="text-sm text-gray-700 font-normal">Users App with PG/Hostel Provider App</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      checked={discount.showInApp === 'providers'}
                      readOnly
                      className="w-4 h-4" 
                    />
                    <label className="text-sm text-gray-700 font-normal">Only The PG/Hostel Providers App</label>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <div className="flex justify-center pt-6">
                <button 
                  onClick={onEdit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-lg font-medium text-base h-auto transition-colors"
                >
                  Edit
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}