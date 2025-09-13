import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
// Replaced Radix Select/Radio with native controls to avoid invalid hook errors

export function CouponForm({ mode, coupon, onSubmit }) {
  const [formData, setFormData] = useState({
    offerOn: '',
    couponCode: '',
    discount: 0,
    discountType: 'percentage',
    startDate: '',
    expireDate: '',
    description: '',
    termsAndConditions: '',
    selectedPGHostels: [],
    showInApp: 'providers'
  });

  const [selectType, setSelectType] = useState('all');

  useEffect(() => {
    if (mode === 'edit' && coupon) {
      setFormData({
        offerOn: coupon.offerOn,
        couponCode: coupon.couponCode,
        discount: coupon.discount,
        discountType: coupon.discountType,
        startDate: coupon.startDate,
        expireDate: coupon.expireDate,
        description: coupon.description || '',
        termsAndConditions: coupon.termsAndConditions || '',
        selectedPGHostels: coupon.selectedPGHostels || [],
        showInApp: coupon.showInApp
      });
      setSelectType(coupon.selectedPGHostels && coupon.selectedPGHostels.length > 0 ? 'particular' : 'all');
    }
  }, [mode, coupon]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const pgHostelOptions = [
    'Scholar den boys Hostel',
    'Sam Students PG',
    'Green Valley PG',
    'Sunrise Hostel',
    'Elite Boys Hostel'
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
       <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5]">
      <Card className="w-full mx-auto bg-white shadow-sm border border-gray-200 rounded-xl">
        <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="offerOn" className="text-sm font-medium text-gray-700">Offer On *</Label>
              <select
                id="offerOn"
                value={formData.offerOn}
                onChange={(e) => handleInputChange('offerOn', e.target.value)}
                className="h-11 w-full border border-gray-300 rounded-md px-3 focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="PG/Hostel">PG/Hostel</option>
                <option value="Tiffin">Tiffin</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="couponCode" className="text-sm font-medium text-gray-700">Coupon Code *</Label>
              <Input
                id="couponCode"
                value={formData.couponCode}
                onChange={(e) => handleInputChange('couponCode', e.target.value)}
                placeholder="Example: FIRSTORDER25"
                className="h-11 border-gray-300 focus:border-blue-500 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountAmount" className="text-sm font-medium text-gray-700">Discount (₹)</Label>
              <Input
                id="discountAmount"
                type="number"
                value={formData.discountType === 'amount' ? formData.discount : ''}
                onChange={(e) => {
                  handleInputChange('discount', Number(e.target.value));
                  handleInputChange('discountType', 'amount');
                }}
                placeholder="Enter Discount Amount"
                className="h-11 border-gray-300 focus:border-blue-500 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountPercent" className="text-sm font-medium text-gray-700">Discount (%)</Label>
              <Input
                id="discountPercent"
                type="number"
                value={formData.discountType === 'percentage' ? formData.discount : ''}
                onChange={(e) => {
                  handleInputChange('discount', Number(e.target.value));
                  handleInputChange('discountType', 'percentage');
                }}
                placeholder="Enter Discount Percentage"
                className="h-11 border-gray-300 focus:border-blue-500 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">Start Date *</Label>
              <div className="relative">
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="h-11 border-gray-300 focus:border-blue-500 placeholder:text-gray-400"
                />
                <Calendar className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expireDate" className="text-sm font-medium text-gray-700">Expire Date *</Label>
              <div className="relative">
                <Input
                  id="expireDate"
                  type="date"
                  value={formData.expireDate}
                  onChange={(e) => handleInputChange('expireDate', e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="h-11 border-gray-300 focus:border-blue-500 placeholder:text-gray-400"
                />
                <Calendar className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter offer description..."
                rows={4}
                className="border-gray-300 focus:border-blue-500 placeholder:text-gray-400 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="termsAndConditions" className="text-sm font-medium text-gray-700">Terms & Conditions *</Label>
              <Textarea
                id="termsAndConditions"
                value={formData.termsAndConditions}
                onChange={(e) => handleInputChange('termsAndConditions', e.target.value)}
                placeholder="Enter offer description..."
                rows={4}
                className="border-gray-300 focus:border-blue-500 placeholder:text-gray-400 resize-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">Select *</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input type="radio" id="all" name="selectType" value="all" checked={selectType==='all'} onChange={(e)=>setSelectType(e.target.value)} className="w-4 h-4" />
                <Label htmlFor="all" className="text-sm text-gray-700 font-normal">For All PG/Hostel</Label>
              </div>
              <div className="flex items-center space-x-3">
                <input type="radio" id="particular" name="selectType" value="particular" checked={selectType==='particular'} onChange={(e)=>setSelectType(e.target.value)} className="w-4 h-4" />
                <Label htmlFor="particular" className="text-sm text-gray-700 font-normal">Particular PG/Hostel Selected by Admin</Label>
              </div>
            </div>

            {selectType === 'particular' && (
              <div className="space-y-3 ml-6 mt-4">
                <Label className="text-sm font-medium text-gray-700">Select PG/Hostel *</Label>
                <select
                  value={formData.selectedPGHostels?.[0] || ''}
                  onChange={(e)=>handleInputChange('selectedPGHostels',[e.target.value])}
                  className="h-11 w-full border border-gray-300 rounded-md px-3 focus:border-blue-500"
                >
                  <option value="">Select</option>
                  {pgHostelOptions.map((option)=> (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Show This Offer or Discount In*</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input type="radio" id="users" name="showInApp" value="users" checked={formData.showInApp==='users'} onChange={(e)=>handleInputChange('showInApp', e.target.value)} className="w-4 h-4" />
                <Label htmlFor="users" className="text-sm text-gray-700 font-normal">Users App with PG/Hostel Provider App</Label>
              </div>
              <div className="flex items-center space-x-3">
                <input type="radio" id="providers" name="showInApp" value="providers" checked={formData.showInApp==='providers'} onChange={(e)=>handleInputChange('showInApp', e.target.value)} className="w-4 h-4" />
                <Label htmlFor="providers" className="text-sm text-gray-700 font-normal">Only The PG/Hostel Providers App</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-lg font-medium text-base h-auto"
            >
              {mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </div>
        </form>
        </div>
      </Card>
      </div>
    </div>
  );
}


