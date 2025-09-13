import { useState } from 'react';
import { Eye, Edit, Trash2, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export function CouponTable({ coupons, onView, onEdit, onDelete, filters, onFiltersChange }) {
  const [selectedCoupons, setSelectedCoupons] = useState([]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Upcoming</Badge>;
      case 'ongoing':
        return <Badge variant="secondary" className="bg-success text-success-foreground">Ongoing</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-GB');
  const formatDiscount = (discount, type) => (type === 'percentage' ? `${discount}%` : `₹${discount}`);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCoupons(coupons.map(c => c.id));
    } else {
      setSelectedCoupons([]);
    }
  };

  const handleSelectCoupon = (couponId, checked) => {
    if (checked) {
      setSelectedCoupons([...selectedCoupons, couponId]);
    } else {
      setSelectedCoupons(selectedCoupons.filter(id => id !== couponId));
    }
  };

  return (
    <Card className="w-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            Showing {coupons.length} of {coupons.length} Entries
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 border-gray-300">
                <Filter className="h-4 w-4" />
                Offer Filter
                {(filters.offerOn.length > 0 || filters.status.length > 0) && (
                  <Badge variant="secondary" className="ml-1 bg-orange-100 text-orange-600">
                    {filters.offerOn.length + filters.status.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 z-50 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Offer Filter</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => onFiltersChange({ offerOn: [], status: [] })}
                  >
                    ✕
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Offer On</h5>
                    {['PG/Hostel Booking', 'Tiffin/Restaurant Order'].map((option) => (
                      <div key={option} className="flex items-center space-x-2 py-1">
                        <Checkbox
                          checked={filters.offerOn.includes(option)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              onFiltersChange({
                                ...filters,
                                offerOn: [...filters.offerOn, option]
                              });
                            } else {
                              onFiltersChange({
                                ...filters,
                                offerOn: filters.offerOn.filter(item => item !== option)
                              });
                            }
                          }}
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <label className="text-sm text-gray-700 cursor-pointer">{option}</label>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Status</h5>
                    {[
                      { value: 'upcoming', label: 'Upcoming', color: 'text-orange-600' },
                      { value: 'ongoing', label: 'Ongoing', color: 'text-green-600' },
                      { value: 'expired', label: 'Expired', color: 'text-gray-600' }
                    ].map((status) => (
                      <div key={status.value} className="flex items-center space-x-2 py-1">
                        <Checkbox
                          checked={filters.status.includes(status.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              onFiltersChange({
                                ...filters,
                                status: [...filters.status, status.value]
                              });
                            } else {
                              onFiltersChange({
                                ...filters,
                                status: filters.status.filter(item => item !== status.value)
                              });
                            }
                          }}
                          className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <label className={`text-sm cursor-pointer ${status.color}`}>{status.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">
                  <Checkbox
                    checked={selectedCoupons.length === coupons.length}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="text-left p-3 font-medium">Sr.No.</th>
                <th className="text-left p-3 font-medium">Offer On</th>
                <th className="text-left p-3 font-medium">Coupon Code</th>
                <th className="text-left p-3 font-medium">Discount</th>
                <th className="text-left p-3 font-medium">Start Date</th>
                <th className="text-left p-3 font-medium">Expire Date</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, index) => (
                <tr key={coupon.id} className="border-b hover:bg-muted/50">
                  <td className="p-3">
                    <Checkbox
                      checked={selectedCoupons.includes(coupon.id)}
                      onCheckedChange={(checked) => handleSelectCoupon(coupon.id, checked)}
                    />
                  </td>
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{coupon.offerOn}</td>
                  <td className="p-3 font-mono text-primary">{coupon.couponCode}</td>
                  <td className="p-3">{formatDiscount(coupon.discount, coupon.discountType)}</td>
                  <td className="p-3">{formatDate(coupon.startDate)}</td>
                  <td className="p-3">{formatDate(coupon.expireDate)}</td>
                  <td className="p-3">{getStatusBadge(coupon.status)}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(coupon)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(coupon)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(coupon.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {coupons.map((coupon, index) => (
            <Card key={coupon.id} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedCoupons.includes(coupon.id)}
                    onCheckedChange={(checked) => handleSelectCoupon(coupon.id, checked)}
                  />
                  <span className="text-sm text-muted-foreground">#{index + 1}</span>
                </div>
                {getStatusBadge(coupon.status)}
              </div>
              
              <div className="space-y-2 mb-4">
                <div>
                  <span className="text-sm text-muted-foreground">Offer On:</span>
                  <p className="font-medium">{coupon.offerOn}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Coupon Code:</span>
                  <p className="font-mono text-primary">{coupon.couponCode}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Discount:</span>
                    <p className="font-medium">{formatDiscount(coupon.discount, coupon.discountType)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Valid Till:</span>
                    <p className="font-medium">{formatDate(coupon.expireDate)}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(coupon)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(coupon)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(coupon.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-muted-foreground">
            Showing 1 to {coupons.length} of {coupons.length} Entries
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}


