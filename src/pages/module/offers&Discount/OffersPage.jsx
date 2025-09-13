import { useMemo, useState } from 'react';
import { Search, Eye, Edit, Trash2, X } from 'lucide-react';
import { PiFunnel } from 'react-icons/pi';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { DeleteConfirmDialog } from '../../../Component/DeleteConfirmDialog';
import { OfferForm } from '../../../Component/OfferForm';
import { OfferDetails } from '../../../Component/OfferDetails';
import { useToast } from '../../../hooks/use-toast';

export default function OffersPage() {
  const { toast } = useToast();
  const [view, setView] = useState('list');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showFilter, setShowFilter] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ open: false });

  const [filters, setFilters] = useState({
    offerOn: ['PG/Hostel Booking'],
    status: ['Upcoming']
  });

  const CheckboxItem = ({ label, checked, onChange, highlight }) => (
    <button 
      type="button" 
      onClick={() => onChange(!checked)} 
      className="flex items-center gap-3 select-none"
    >
      <span className={`w-5 h-5 rounded-md border border-gray-400 flex items-center justify-center shrink-0 ${
        checked ? 'bg-[#FF6B00] border-[#FF6B00]' : 'bg-white'
      }`}>
        {checked && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#fff" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </span>
      <span className={`text-[18px] leading-6 ${
        highlight ? 'text-[#FF6B00] font-semibold' : 'text-gray-600'
      }`}>
        {label}
      </span>
    </button>
  );

  const [offers, setOffers] = useState([
    {
      id: 'o1',
      title: 'Flat 10% Off on PG/Hostel',
      offerOn: 'PG/Hostel',
      discount: 10,
      discountType: 'percentage',
      startDate: '2025-09-20',
      expireDate: '2025-10-20',
      status: 'upcoming',
      description: 'Enjoy 10% off on your next PG/Hostel booking.',
      termsAndConditions: '• Valid on participating hostels only',
      selectedPGHostels: [],
      showInApp: 'providers'
    },
    {
      id: 'o2',
      title: '₹100 Cashback on Tiffin',
      offerOn: 'Tiffin/Restaurant',
      discount: 100,
      discountType: 'amount',
      startDate: '2025-08-10',
      expireDate: '2025-08-25',
      status: 'ongoing',
      description: 'Get ₹100 back on tiffin orders above ₹500.',
      termsAndConditions: '• Minimum order ₹500',
      selectedPGHostels: [],
      showInApp: 'users'
    }
  ]);

  const activeFilters = [...filters.offerOn, ...filters.status];

  const filteredOffers = useMemo(() => {
    let data = offers;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(o => 
        o.title.toLowerCase().includes(q) || 
        o.offerOn.toLowerCase().includes(q)
      );
    }
    
    if (filters.offerOn.length > 0) {
      data = data.filter(o => {
        if (filters.offerOn.includes('PG/Hostel Booking') && o.offerOn === 'PG/Hostel') return true;
        if (filters.offerOn.includes('Tiffin/Restaurant Order') && o.offerOn === 'Tiffin/Restaurant') return true;
        return false;
      });
    }
    
    if (filters.status.length > 0) {
      data = data.filter(o => 
        filters.status.some(s => o.status === s.toLowerCase())
      );
    }
    
    return data;
  }, [offers, searchQuery, filters]);

  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage) || 1;
  const paginatedOffers = filteredOffers.slice(
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
    setCurrentPage(1);
  };

  const removeFilter = (filter) => {
    setFilters(prev => {
      if (prev.offerOn.includes(filter)) {
        return { ...prev, offerOn: prev.offerOn.filter(f => f !== filter) };
      }
      return { ...prev, status: prev.status.filter(f => f !== filter) };
    });
    setCurrentPage(1);
  };

  const formatDate = (date) => new Date(date).toLocaleDateString('en-GB');
  
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

  const handleCreateOffer = (data) => {
    const newOffer = {
      ...data,
      id: Date.now().toString(),
      status: new Date(data.startDate) > new Date() ? 'upcoming' : 'ongoing'
    };
    setOffers(prev => [newOffer, ...prev]);
    setView('list');
    toast({
      title: 'Offer Created!',
      description: 'New offer has been created.',
    });
  };

  const handleUpdateOffer = (data) => {
    if (!selectedOffer) return;
    const updated = { ...selectedOffer, ...data };
    setOffers(prev => prev.map(o => o.id === selectedOffer.id ? updated : o));
    setSelectedOffer(null);
    setView('list');
    toast({
      title: 'Offer Updated!',
      description: 'Offer details has been updated now.',
    });
  };

  const requestDelete = (id) => {
    const off = offers.find(o => o.id === id);
    setDeleteDialog({ open: true, offerId: id, title: off?.title });
  };

  const confirmDelete = () => {
    if (deleteDialog.offerId) {
      setOffers(prev => prev.filter(o => o.id !== deleteDialog.offerId));
      toast({
        title: 'Success',
        description: 'Offer deleted successfully',
      });
    }
    setDeleteDialog({ open: false });
  };

  if (view === 'create') {
    return (
      <div className="flex flex-col gap-6 font-inter">
        <div className="w-full h-[72px] flex items-center gap-2 bg-white rounded-lg p-4 shadow-sm">
          <IoArrowBackCircleOutline 
            className="w-[33.33px] h-[33.33px] cursor-pointer text-[#000000]" 
            onClick={() => setView('list')} 
          />
          <h2 className="text-[24px] font-medium leading-none">
            Offers & Discount / Offers / Create Offer
          </h2>
        </div>
        <OfferForm 
          mode="create" 
          onSubmit={handleCreateOffer} 
          onCancel={() => setView('list')} 
        />
      </div>
    );
  }

  if (view === 'edit' && selectedOffer) {
    return (
      <div className="flex flex-col gap-6 font-inter">
        <div className="w-full h-[72px] flex items-center gap-2 bg-white rounded-lg p-4 shadow-sm">
          <IoArrowBackCircleOutline 
            className="w-[33.33px] h-[33.33px] cursor-pointer text-[#000000]" 
            onClick={() => setView('list')} 
          />
          <h2 className="text-[24px] font-medium leading-none">
            Offers & Discount / Offers / Edit Offer
          </h2>
        </div>
        <OfferForm 
          mode="edit" 
          offer={selectedOffer} 
          onSubmit={handleUpdateOffer} 
          onCancel={() => { 
            setView('list'); 
            setSelectedOffer(null); 
          }} 
        />
      </div>
    );
  }

  if (view === 'details' && selectedOffer) {
    return (
      <OfferDetails
        offer={selectedOffer}
        onEdit={() => setView('edit')}
        onBack={() => { 
          setView('list'); 
          setSelectedOffer(null); 
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 font-inter">
      {/* Header Bar */}
      <div className="w-full h-[72px] flex items-center justify-between gap-2 bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-[24px] font-medium leading-none">Offers & Discount / Offers</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 w-[300px] h-[40px] border rounded-full px-4">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by title or type"
              value={searchQuery}
              onChange={(e) => { 
                setSearchQuery(e.target.value); 
                setCurrentPage(1); 
              }}
              className="flex-1 outline-none text-[16px] font-medium placeholder-gray-400"
            />
          </div>
          <button
            className="w-[200px] h-[40px] bg-[#FF6B00] flex items-center justify-center rounded-[8px] text-white cursor-pointer hover:bg-orange-600 transition"
            onClick={() => setView('create')}
          >
            Create Offer
          </button>
        </div>
      </div>

      {/* Main Container with Filters */}
      <div className="bg-white rounded-[8px] shadow border border-[#D9D9D9]">
        <div className="px-4 py-3 border-b border-[#E6E8ED] flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setShowFilter(!showFilter)} 
              title="Offer Filter" 
              className="w-10 h-10 flex items-center justify-center rounded-[10px] bg-[#F8F5FF] text-[#004AAD] border border-[#E0E3EB]"
            >
              <PiFunnel className="w-5 h-5" />
            </button>
            
            {showFilter && (
              <div className="absolute top-12 left-0 w-[300px] bg-white border rounded-md shadow-lg p-3 z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[22px] font-semibold text-[#0E3B2E]">Offer On</h3>
                  <button 
                    className="text-gray-500" 
                    onClick={() => setShowFilter(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <CheckboxItem 
                      label="PG/Hostel Booking" 
                      checked={filters.offerOn.includes('PG/Hostel Booking')} 
                      onChange={(next) => handleFilterChange('offerOn', 'PG/Hostel Booking', next)} 
                      highlight 
                    />
                    <CheckboxItem 
                      label="Tiffin/Restaurant Order" 
                      checked={filters.offerOn.includes('Tiffin/Restaurant Order')} 
                      onChange={(next) => handleFilterChange('offerOn', 'Tiffin/Restaurant Order', next)} 
                    />
                  </div>
                  <div className="pt-2">
                    <h4 className="text-[22px] font-semibold text-[#07021C] mb-3">Status</h4>
                    <div className="space-y-3">
                      <CheckboxItem 
                        label="Upcoming" 
                        checked={filters.status.includes('Upcoming')} 
                        onChange={(next) => handleFilterChange('status', 'Upcoming', next)} 
                        highlight 
                      />
                      <CheckboxItem 
                        label="Ongoing" 
                        checked={filters.status.includes('Ongoing')} 
                        onChange={(next) => handleFilterChange('status', 'Ongoing', next)} 
                      />
                      <CheckboxItem 
                        label="Expired" 
                        checked={filters.status.includes('Expired')} 
                        onChange={(next) => handleFilterChange('status', 'Expired', next)} 
                      />
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
                  <button onClick={() => removeFilter(filter)} className="ml-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-center border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-[80px] p-4 text-left">Sr.No.</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Offer On</th>
                <th className="px-4 py-2 text-left">Discount</th>
                <th className="px-4 py-2 text-left">Start Date</th>
                <th className="px-4 py-2 text-left">Expire Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOffers.map((offer, index) => (
                <tr key={offer.id} className="bg-white shadow-sm rounded-lg">
                  <td className="px-4 py-3 align-middle text-left">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3 align-middle text-left font-medium">
                    {offer.title}
                  </td>
                  <td className="px-4 py-3 align-middle text-left">
                    {offer.offerOn}
                  </td>
                  <td className="px-4 py-3 align-middle text-left">
                    {offer.discountType === 'percentage' ? `${offer.discount}%` : `₹${offer.discount}`}
                  </td>
                  <td className="px-4 py-3 align-middle text-left">
                    {formatDate(offer.startDate)}
                  </td>
                  <td className="px-4 py-3 align-middle text-left">
                    {formatDate(offer.expireDate)}
                  </td>
                  <td className="px-4 py-3 align-middle text-left">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(offer.status)}`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-middle text-left">
                    <div className="flex gap-3">
                      <button 
                        className="text-orange-500 hover:text-orange-600" 
                        title="View" 
                        onClick={() => { 
                          setSelectedOffer(offer); 
                          setView('details'); 
                        }}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-orange-500 hover:text-orange-600" 
                        title="Edit" 
                        onClick={() => { 
                          setSelectedOffer(offer); 
                          setView('edit'); 
                        }}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-orange-500 hover:text-orange-600" 
                        title="Delete" 
                        onClick={() => requestDelete(offer.id)}
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

        {/* Pagination */}
        <div className="flex justify-between items-center text-sm text-gray-600 rounded-[8px] px-4 py-2 bg-[#F5F5F5]">
          <p>
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredOffers.length)} of {filteredOffers.length} Entries
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
                  currentPage === page 
                    ? 'bg-[#004AAD] text-white font-bold' 
                    : 'bg-white text-[#004AAD] font-bold'
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

        {/* Mobile Card View */}
        <div className="md:hidden divide-y">
          {paginatedOffers.map((offer, index) => (
            <div key={offer.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  #{(currentPage - 1) * itemsPerPage + index + 1}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(offer.status)}`}>
                  {offer.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">{offer.title}</span>
                <span>
                  {offer.discountType === 'percentage' ? `${offer.discount}%` : `₹${offer.discount}`}
                </span>
              </div>
              <div className="text-sm text-gray-600 flex justify-between">
                <span>Offer On:</span>
                <span>{offer.offerOn}</span>
              </div>
              <div className="text-xs text-gray-500 flex justify-between">
                <span>Start:</span>
                <span>{formatDate(offer.startDate)}</span>
              </div>
              <div className="text-xs text-gray-500 flex justify-between">
                <span>Expire:</span>
                <span>{formatDate(offer.expireDate)}</span>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  className="text-orange-500" 
                  onClick={() => { 
                    setSelectedOffer(offer); 
                    setView('details'); 
                  }}
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  className="text-orange-500" 
                  onClick={() => { 
                    setSelectedOffer(offer); 
                    setView('edit'); 
                  }}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  className="text-orange-500" 
                  onClick={() => requestDelete(offer.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DeleteConfirmDialog 
        open={deleteDialog.open} 
        onOpenChange={(open) => setDeleteDialog({ open })} 
        onConfirm={confirmDelete} 
        couponCode={deleteDialog.title} 
      />
    </div>
  );
}