import { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, Eye, Edit, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PiFunnel } from 'react-icons/pi';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { Button } from '../../../Component/ui/button';
import { Input } from '../../../Component/ui/input';
import { useToast } from '../../../hooks/use-toast';
import { CouponForm } from '../../../Component/CouponForm';
import { CouponDetails } from '../../../Component/CouponDetails';
import { DeleteConfirmDialog } from '../../../Component/DeleteConfirmDialog';


export default function CouponsPage() {
  const CheckboxItem = ({ label, checked, onChange, highlight }) => (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-3 select-none">
      <span className={`w-5 h-5 rounded-md border border-gray-400 flex items-center justify-center shrink-0 ${checked ? 'bg-[#FF6B00] border-[#FF6B00]' : 'bg-white'}`}>
        {checked && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#fff" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </span>
      <span className={`text-[18px] leading-6 ${highlight ? 'text-[#FF6B00] font-semibold' : 'text-gray-600'}`}>{label}</span>
    </button>
  );
  const { toast } = useToast();
  const [view, setView] = useState('list');
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false
  });
  
  const [filters, setFilters] = useState({
    offerOn: ['PG/Hostel Booking'],
    status: ['Upcoming']
  });

  const [coupons, setCoupons] = useState([
    {
      id: '1',
      offerOn: 'PG/Hostel',
      couponCode: 'HOSTEL25',
      discount: 10,
      discountType: 'percentage',
      startDate: '2025-09-20',
      expireDate: '2025-10-20',
      status: 'upcoming',
      description: '10% Off on PG/Hostel Booking. Apply Coupon Code "HOSTEL25".',
      termsAndConditions: '• Lorem ipsum dolor sit amet consectetur.\n• Vitae parturient in cum turpis habitant.\n• Sollicitudin fringilla nulla ultrices tellus facilisis nisl at lobortis.',
      selectedPGHostels: [],
      showInApp: 'providers'
    },
    {
      id: '2',
      offerOn: 'PG/Hostel',
      couponCode: 'HOSTEL25',
      discount: 25,
      discountType: 'percentage',
      startDate: '2025-08-10',
      expireDate: '2025-08-25',
      status: 'ongoing',
      description: '25% Off on PG/Hostel Booking. Apply Coupon Code "HOSTEL25".',
      termsAndConditions: '• Valid for new bookings only\n• Cannot be combined with other offers',
      selectedPGHostels: [],
      showInApp: 'providers'
    },
    {
      id: '3',
      offerOn: 'Tiffin/Restaurant',
      couponCode: 'TIFFIN25',
      discount: 100,
      discountType: 'amount',
      startDate: '2025-08-10',
      expireDate: '2025-08-25',
      status: 'ongoing',
      description: '₹100 Off on Tiffin/Restaurant Order.',
      termsAndConditions: '• Minimum order value ₹500\n• Valid once per user',
      selectedPGHostels: [],
      showInApp: 'providers'
    },
    {
      id: '4',
      offerOn: 'PG/Hostel',
      couponCode: 'HOSTEL25',
      discount: 25,
      discountType: 'percentage',
      startDate: '2025-01-01',
      expireDate: '2025-01-01',
      status: 'expired',
      description: '25% Off on PG/Hostel Booking.',
      termsAndConditions: '• Expired offer',
      selectedPGHostels: [],
      showInApp: 'providers'
    },
    {
      id: '5',
      offerOn: 'Tiffin/Restaurant',
      couponCode: 'TIFFIN25',
      discount: 100,
      discountType: 'amount',
      startDate: '2025-01-01',
      expireDate: '2025-10-01',
      status: 'expired',
      description: '₹100 Off on Tiffin/Restaurant Order.',
      termsAndConditions: '• Expired offer',
      selectedPGHostels: [],
      showInApp: 'providers'
    }
  ]);

  // Get active filters for display
  const activeFilters = [...filters.offerOn, ...filters.status];

  const filteredCoupons = useMemo(() => {
    let filtered = coupons;
    
    if (searchQuery) {
      filtered = filtered.filter(coupon =>
        coupon.couponCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coupon.offerOn.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply offer filters
    if (filters.offerOn.length > 0) {
      filtered = filtered.filter(coupon => {
        if (filters.offerOn.includes('PG/Hostel Booking') && coupon.offerOn === 'PG/Hostel') {
          return true;
        }
        if (filters.offerOn.includes('Tiffin/Restaurant Order') && coupon.offerOn === 'Tiffin/Restaurant') {
          return true;
        }
        return false;
      });
    }

    // Apply status filters
    if (filters.status.length > 0) {
      filtered = filtered.filter(coupon => {
        return filters.status.some(status => 
          coupon.status === status.toLowerCase()
        );
      });
    }

    return filtered;
  }, [coupons, searchQuery, filters]);

  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
  const paginatedCoupons = filteredCoupons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (category, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }));
  };

  const removeFilter = (filter) => {
    setFilters(prev => {
      if (prev.offerOn.includes(filter)) {
        return {
          ...prev,
          offerOn: prev.offerOn.filter(f => f !== filter)
        };
      } else {
        return {
          ...prev,
          status: prev.status.filter(f => f !== filter)
        };
      }
    });
  };

  const handleCreateCoupon = (data) => {
    const newCoupon = {
      ...data,
      id: Date.now().toString(),
      status: new Date(data.startDate) > new Date() ? 'upcoming' : 'ongoing'
    };
    setCoupons(prev => [newCoupon, ...prev]);
    setView('list');
    toast({
      title: 'Offer Created!',
      description: 'New offer has been created.',
    });
  };

  const handleEditCoupon = (data) => {
    if (!selectedCoupon) return;
    const updatedCoupon = {
      ...selectedCoupon,
      ...data,
      status: new Date(data.startDate) > new Date() ? 'upcoming' : 'ongoing'
    };
    setCoupons(prev => prev.map(c => c.id === selectedCoupon.id ? updatedCoupon : c));
    setView('list');
    setSelectedCoupon(null);
    toast({
      title: 'Offer Updated!',
      description: 'Offer details has been updated now.',
    });
  };

  const handleDeleteCoupon = (couponId) => {
    const coupon = coupons.find(c => c.id === couponId);
    setDeleteDialog({
      open: true,
      couponId,
      couponCode: coupon?.couponCode
    });
  };

  const confirmDelete = () => {
    if (deleteDialog.couponId) {
      setCoupons(prev => prev.filter(c => c.id !== deleteDialog.couponId));
      toast({
        title: 'Success',
        description: 'Coupon deleted successfully',
      });
    }
    setDeleteDialog({ open: false });
  };

  const handleViewCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setView('details');
  };

  const handleEditClick = (coupon) => {
    setSelectedCoupon(coupon);
    setView('edit');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'text-yellow-600 bg-yellow-50';
      case 'ongoing':
        return 'text-green-600 bg-green-50';
      case 'expired':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '/');
  };

  if (view === 'create') {
    return (
      <div className="flex flex-col gap-6 font-inter">
      {/* Title Bar */}
      <div className="w-full h-[72px] flex items-center gap-2 bg-white rounded-lg p-4 shadow-sm">
        <IoArrowBackCircleOutline className="w-[33.33px] h-[33.33px] cursor-pointer text-[#000000]" onClick={() => setView('list')} />
        <h2 className="text-[24px] font-medium leading-none">
          Offers & Discount / Coupon / Create Coupon
        </h2>
      </div>
        
        <CouponForm
          mode="create"
          onSubmit={handleCreateCoupon}
          onCancel={() => setView('list')}
        />
      </div>
    );
  }

  if (view === 'edit' && selectedCoupon) {
    return (
      <div className="flex flex-col gap-6 font-inter">
      {/* Title Bar */}
      <div className="w-full h-[72px] flex items-center gap-2 bg-white rounded-lg p-4 shadow-sm">
        <IoArrowBackCircleOutline className="w-[33.33px] h-[33.33px] cursor-pointer text-[#000000]" onClick={() => setView('list')} />
        <h2 className="text-[24px] font-medium leading-none">
          Offers & Discount / Coupon / Edit Coupon
        </h2>
      </div>
        
        <CouponForm
          mode="edit"
          coupon={selectedCoupon}
          onSubmit={handleEditCoupon}
          onCancel={() => {
            setView('list');
            setSelectedCoupon(null);
          }}
        />
      </div>
    );
  }

  if (view === 'details' && selectedCoupon) {
    return (
      <CouponDetails
        coupon={selectedCoupon}
        onEdit={() => setView('edit')}
        onBack={() => {
          setView('list');
          setSelectedCoupon(null);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Header Bar */}
      <div className="w-full h-[72px] flex items-center justify-between gap-2 bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-[24px] font-medium leading-none">Offers & Discount / Coupon</h2>
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="flex items-center gap-2 w-[300px] h-[40px] border rounded-full px-4">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
                placeholder="Search by coupon code"
                value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 outline-none text-[16px] font-medium placeholder-gray-400"
              />
            </div>
          {/* Create Button */}
          <div
            className="w-[200px] h-[40px] bg-[#FF6B00] flex items-center justify-center rounded-[8px] text-white cursor-pointer hover:bg-orange-600 transition"
              onClick={() => setView('create')}
            >
              Create Coupon
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[8px] shadow border border-[#D9D9D9]">
        {/* Top bar inside the table container with filter + chips */}
        <div className="px-4 py-3 border-b border-[#E6E8ED] flex items-center gap-3">
            <div className="relative">
            <button onClick={() => setShowFilterModal(!showFilterModal)} title="Offer Filter" className="w-10 h-10 flex items-center justify-center rounded-[10px] bg-[#F8F5FF] text-[#004AAD] border border-[#E0E3EB]">
              <PiFunnel className="w-5 h-5" />
              </button>
              {showFilterModal && (
              <div className="absolute top-12 left-0 w-[300px] bg-white border rounded-md shadow-lg p-3 z-10">
                    <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[22px] font-semibold text-[#0E3B2E]">Offer On</h3>
                  <button onClick={() => setShowFilterModal(false)} className="text-gray-500">✕</button>
                    </div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <CheckboxItem label="PG/Hostel Booking" checked={filters.offerOn.includes('PG/Hostel Booking')} onChange={(next)=>handleFilterChange('offerOn','PG/Hostel Booking', next)} highlight />
                    <CheckboxItem label="Tiffin/Restaurant Order" checked={filters.offerOn.includes('Tiffin/Restaurant Order')} onChange={(next)=>handleFilterChange('offerOn','Tiffin/Restaurant Order', next)} />
                        </div>
                  <div className="pt-2">
                    <h4 className="text-[22px] font-semibold text-[#07021C] mb-3">Status</h4>
                    <div className="space-y-3">
                      <CheckboxItem label="Upcoming" checked={filters.status.includes('Upcoming')} onChange={(next)=>handleFilterChange('status','Upcoming', next)} highlight />
                      <CheckboxItem label="Ongoing" checked={filters.status.includes('Ongoing')} onChange={(next)=>handleFilterChange('status','Ongoing', next)} />
                      <CheckboxItem label="Expired" checked={filters.status.includes('Expired')} onChange={(next)=>handleFilterChange('status','Expired', next)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          {activeFilters.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {activeFilters.map((filter) => (
                <div key={filter} className="flex items-center gap-1 rounded-[40px] px-4 py-2 bg-[#EEF2FF] text-[#0A051F]">
                  {filter}
                  <button onClick={() => removeFilter(filter)} className="ml-1"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Table Container */}
        <div className="">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-center border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-[80px] p-4 text-left">Sr.No.</th>
                  <th className="px-4 py-2 text-left">Offer On</th>
                  <th className="px-4 py-2 text-left">Coupon Code</th>
                  <th className="px-4 py-2 text-left">Discount</th>
                  <th className="px-4 py-2 text-left">Start Date</th>
                  <th className="px-4 py-2 text-left">Expire Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCoupons.map((coupon, index) => (
                  <tr key={coupon.id} className="bg-white shadow-sm rounded-lg">
                    <td className="px-4 py-3 align-middle text-left">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-4 py-3 align-middle text-left">{coupon.offerOn}</td>
                    <td className="px-4 py-3 align-middle text-left font-medium">{coupon.couponCode}</td>
                    <td className="px-4 py-3 align-middle text-left">
                      {coupon.discountType === 'percentage' ? `${coupon.discount}%` : `₹${coupon.discount}`}
                    </td>
                    <td className="px-4 py-3 align-middle text-left">{formatDate(coupon.startDate)}</td>
                    <td className="px-4 py-3 align-middle text-left">{formatDate(coupon.expireDate)}</td>
                    <td className="px-4 py-3 align-middle text-left">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(coupon.status)}`}>
                        {coupon.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-middle text-left">
                      <div className="flex gap-3">
                        <button
                          className="text-orange-500 hover:text-orange-600"
                          title="View"
                          onClick={() => handleViewCoupon(coupon)}
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          className="text-orange-500 hover:text-orange-600"
                          title="Edit"
                          onClick={() => handleEditClick(coupon)}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          className="text-orange-500 hover:text-orange-600"
                          title="Delete"
                          onClick={() => handleDeleteCoupon(coupon.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden">
            <div className="divide-y divide-gray-200">
              {paginatedCoupons.map((coupon, index) => (
                <div key={coupon.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">#{(currentPage - 1) * itemsPerPage + index + 1}</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(coupon.status)}`}>
                        {coupon.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleViewCoupon(coupon)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditClick(coupon)}
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-full"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(coupon.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">{coupon.couponCode}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {coupon.discountType === 'percentage' 
                          ? `${coupon.discount}%` 
                          : `₹${coupon.discount}`
                        }
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Offer:</span>
                        <span>{coupon.offerOn}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex justify-between">
                        <span>Start:</span>
                        <span>{formatDate(coupon.startDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expire:</span>
                        <span>{formatDate(coupon.expireDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center text-sm text-gray-600 rounded-[8px] px-4 py-2 bg-[#F5F5F5]">
            <p>
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCoupons.length)} of {filteredCoupons.length} Entries
            </p>
            <div className="flex gap-2 items-center">
                <button
                disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="w-6 h-6 p-4 text-[#004AAD] bg-white rounded-[8px] flex items-center justify-center font-bold disabled:opacity-50"
                >
                &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  className={`w-6 h-6 p-4 rounded-[8px] flex items-center justify-center ${
                    currentPage === page ? 'bg-[#004AAD] text-white font-bold' : 'bg-white text-[#004AAD] font-bold'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="w-6 h-6 p-4 text-[#004AAD] bg-white rounded-[8px] flex items-center justify-center font-bold disabled:opacity-50"
                >
                &gt;
                </button>
            </div>
          </div>
        </div>

        <DeleteConfirmDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ open })}
          onConfirm={confirmDelete}
          couponCode={deleteDialog.couponCode}
        />
      </div>
    </div>
  );
}