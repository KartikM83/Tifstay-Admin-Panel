import { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
// Replace Radix Select/Radio with native controls to avoid invalid hook errors in client

export function DiscountForm({ mode, discount, onSubmit,  }) {
  const [formData, setFormData] = useState({
    offerOn: 'PG/Hostel',
    discount: 0,
    discountType: 'percentage',
    startDate: '',
    expireDate: '',
    description: '',
    termsAndConditions: '',
    selectedPGHostels: [],
    showInApp: 'providers',
    selectType: 'all'
  });

  useEffect(() => {
    if (mode === 'edit' && discount) {
      setFormData({
        offerOn: discount.offerOn,
        discount: discount.discount,
        discountType: discount.discountType,
        startDate: discount.startDate,
        expireDate: discount.expireDate,
        description: discount.description || '',
        termsAndConditions: discount.termsAndConditions || '',
        selectedPGHostels: discount.selectedPGHostels || [],
        showInApp: discount.showInApp || 'providers',
        selectType: discount.selectedPGHostels?.length ? 'particular' : 'all'
      });
    }
  }, [mode, discount]);

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };

  const pgHostelOptions = ['Scholar den boys Hostel', 'Sam Students PG', 'Green Valley PG'];

  return (
    
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="w-full min-h-[600px] p-6 rounded-[8px] bg-white shadow flex flex-col gap-6 border border-[#A5A5A5]">
      <Card className="w-full mx-auto bg-white shadow-sm border border-gray-200 rounded-xl">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Offer On *</Label>
                <select value={formData.offerOn} onChange={(e)=>handleChange('offerOn', e.target.value)} className="h-11 w-full border border-gray-300 rounded-md px-3 focus:border-blue-500">
                  <option value="PG/Hostel">PG/Hostel</option>
                  <option value="Tiffin/Restaurant">Tiffin/Restaurant</option>
                  <option value="Both">Both</option>
                  
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Discount (₹)</Label>
                <Input type="number" value={formData.discountType === 'amount' ? formData.discount : ''} onChange={(e) => { handleChange('discount', Number(e.target.value)); handleChange('discountType', 'amount'); }} placeholder="Enter Discount Amount" className="h-11 border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Discount (%)</Label>
                <Input type="number" value={formData.discountType === 'percentage' ? formData.discount : ''} onChange={(e) => { handleChange('discount', Number(e.target.value)); handleChange('discountType', 'percentage'); }} placeholder="Enter Discount Percentage" className="h-11 border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Start Date *</Label>
                <div className="relative">
                  <Input type="date" value={formData.startDate} onChange={(e) => handleChange('startDate', e.target.value)} className="h-11 border-gray-300" />
                  <Calendar className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Expire Date *</Label>
                <div className="relative">
                  <Input type="date" value={formData.expireDate} onChange={(e) => handleChange('expireDate', e.target.value)} className="h-11 border-gray-300" />
                  <Calendar className="absolute right-3 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Description *</Label>
                <Textarea value={formData.description} onChange={(e) => handleChange('description', e.target.value)} rows={4} className="border-gray-300 resize-none" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Terms & Conditions *</Label>
                <Textarea value={formData.termsAndConditions} onChange={(e) => handleChange('termsAndConditions', e.target.value)} rows={4} className="border-gray-300 resize-none" />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-medium text-gray-700">Select *</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input type="radio" id="all" name="selectType" value="all" checked={formData.selectType==='all'} onChange={(e)=>handleChange('selectType', e.target.value)} className="w-4 h-4" />
                  <Label htmlFor="all" className="text-sm text-gray-700 font-normal">For All PG/Hostel</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="radio" id="particular" name="selectType" value="particular" checked={formData.selectType==='particular'} onChange={(e)=>handleChange('selectType', e.target.value)} className="w-4 h-4" />
                  <Label htmlFor="particular" className="text-sm text-gray-700 font-normal">Particular PG/Hostel Selected by Admin</Label>
                </div>
              </div>
              {formData.selectType === 'particular' && (
                <div className="space-y-3 ml-6 mt-4">
                  <Label className="text-sm font-medium text-gray-700">Select PG/Hostel *</Label>
                  <select value={formData.selectedPGHostels?.[0] || ''} onChange={(e)=>handleChange('selectedPGHostels',[e.target.value])} className="h-11 w-full border border-gray-300 rounded-md px-3 focus:border-blue-500">
                    <option value="">Select</option>
                    {pgHostelOptions.map((o)=> (<option key={o} value={o}>{o}</option>))}
                  </select>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Show This Offer or Discount In*</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input type="radio" id="users" name="showInApp" value="users" checked={formData.showInApp==='users'} onChange={(e)=>handleChange('showInApp', e.target.value)} className="w-4 h-4" />
                  <Label htmlFor="users" className="text-sm text-gray-700 font-normal">Users App with PG/Hostel Provider App</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="radio" id="providers" name="showInApp" value="providers" checked={formData.showInApp==='providers'} onChange={(e)=>handleChange('showInApp', e.target.value)} className="w-4 h-4" />
                  <Label htmlFor="providers" className="text-sm text-gray-700 font-normal">Only The PG/Hostel Providers App</Label>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6 gap-4">
              
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-lg font-medium text-base h-auto">{mode === 'create' ? 'Create' : 'Update'}</button>
            </div>
          </form>
        </div>
      </Card>
      </div>
    </div>
  );
}


