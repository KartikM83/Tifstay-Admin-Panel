import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

export function CouponDetails({ coupon, onEdit, onBack }) {
  const [isEditing] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    offerOn: coupon?.offerOn || 'PG/Hostel',
    couponCode: coupon?.couponCode || 'HOSTEL25',
    discountRupees: coupon?.discountRupees || 'NA',
    discountPercent: coupon?.discountPercent || '10',
    startDate: coupon?.startDate || '20/09/2025',
    expireDate: coupon?.expireDate || '29/10/2025',
    description: coupon?.description || '10% Off on PG/Hostel Booking. Apply Coupon Code "HOSTEL25".',
    targetSelection: 'particular',
    showInApp: 'providers'
  });

  const handleInputChange = (field, value) => {
    if (!isEditing) return;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };



  return (
   <div className="flex flex-col gap-6 font-inter">
      {/* Title Bar */}
      <div className="w-full h-[72px] flex items-center gap-2 bg-white rounded-lg p-4 shadow-sm">
        <IoArrowBackCircleOutline className="w-[33.33px] h-[33.33px] cursor-pointer text-[#000000]" onClick={() => (onBack ? onBack() : navigate(-1))} />
        <h2 className="text-[24px] font-medium leading-none">
          Offers & Discount / Coupon / Coupon Details
        </h2>
      </div>
 {/* Form Content */}
      
        
          <div className="p-6 bg-gray-50 min-h-screen">
         <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5]">
          <div className="bg-white rounded-lg border p-4 sm:p-8">
            <div className="space-y-6 sm:space-y-8">
              {/* Row 1: Offer On & Coupon Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer On <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={formData.offerOn} 
                    onChange={(e) => handleInputChange('offerOn', e.target.value)} 
                    disabled={!isEditing}
                    className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                  >
                    <option value="PG/Hostel">PG/Hostel</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coupon Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.couponCode}
                    onChange={(e) => handleInputChange('couponCode', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Row 2: Discount Rupees & Discount Percent */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount/Cashback (₹)
                  </label>
                  <input
                    type="text"
                    value={formData.discountRupees}
                    onChange={(e) => handleInputChange('discountRupees', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount/Cashback (%)
                  </label>
                  <input
                    type="text"
                    value={formData.discountPercent}
                    onChange={(e) => handleInputChange('discountPercent', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Row 3: Start Date & Expire Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 sm:py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expire Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.expireDate}
                      onChange={(e) => handleInputChange('expireDate', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-3 py-3 sm:py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Row 4: Description & Terms Conditions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    disabled={!isEditing}
                    className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Terms & Conditions <span className="text-red-500">*</span>
                  </label>
                  <div className="p-3 bg-gray-50 border border-gray-300 rounded-md h-24 overflow-y-auto">
                    <div className="space-y-1 text-xs sm:text-sm text-gray-700">
                      <div className="flex items-start gap-2">
                        <span className="flex-shrink-0">•</span>
                        <span>Lorem ipsum dolor sit amet consectetur.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="flex-shrink-0">•</span>
                        <span>Vitae parturient in cum turpis habitant.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="flex-shrink-0">•</span>
                        <span>Sollicitudin fringilla nulla ultrices tellus facilisis nisl at lobortis.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Particular PG/Hostel Selection */}
              <div className="space-y-3">
                <div className="flex items-start sm:items-center space-x-3">
                  <input
                    type="radio"
                    id="particular"
                    name="targetSelection"
                    value="particular"
                    checked={formData.targetSelection === 'particular'}
                    onChange={(e) => handleInputChange('targetSelection', e.target.value)}
                    disabled={!isEditing}
                    className="w-4 h-4 mt-0.5 sm:mt-0 text-blue-600 border-gray-300 focus:ring-blue-500 flex-shrink-0"
                  />
                  <label htmlFor="particular" className="text-sm font-medium text-gray-700 leading-tight">
                    Particular PG/Hostel Selected by Admin
                  </label>
                </div>

                <div className="ml-7 space-y-1 text-xs sm:text-sm text-gray-700">
                  <div><span className="font-medium">1.</span> Scholar den boys Hostel</div>
                  <div><span className="font-medium">2.</span> Sam Students PG</div>
                </div>
              </div>

              {/* Show This Offer Section */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Show This Offer or Discount In<span className="text-red-500">*</span>
                </label>
                <div className="flex items-start sm:items-center space-x-3">
                  <input
                    type="radio"
                    id="providers"
                    name="showInApp"
                    value="providers"
                    checked={formData.showInApp === 'providers'}
                    onChange={(e) => handleInputChange('showInApp', e.target.value)}
                    disabled={!isEditing}
                    className="w-4 h-4 mt-0.5 sm:mt-0 text-blue-600 border-gray-300 focus:ring-blue-500 flex-shrink-0"
                  />
                  <label htmlFor="providers" className="text-sm text-gray-700 leading-tight">
                    Only The PG/Hostel Providers App
                  </label>
                </div>
              </div>
            </div>
          
          

          {/* Edit Button */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <button 
              onClick={onEdit}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-sm sm:text-base"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
    
  );
}

// Demo component
export default function CouponEditDemo() {
  const sampleCoupon = {
    offerOn: 'PG/Hostel',
    couponCode: 'HOSTEL25',
    discountRupees: 'NA',
    discountPercent: '10',
    startDate: '20/09/2025',
    expireDate: '29/10/2025',
    description: '10% Off on PG/Hostel Booking. Apply Coupon Code "HOSTEL25".',
    selectedPGHostels: ['Scholar den boys Hostel', 'Sam Students PG'],
    showInApp: 'providers'
  };

  const handleSave = (data) => {
    console.log('Saving coupon data:', data);
  };

  const handleBack = () => {
    console.log('Going back');
  };

  return (
    <CouponDetails 
      coupon={sampleCoupon} 
      onEdit={handleSave} 
      onBack={handleBack} 
    />
  );
}