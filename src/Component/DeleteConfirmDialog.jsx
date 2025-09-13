import logo from '../assets/image.png';

export function DeleteConfirmDialog({ open, onOpenChange, onConfirm, couponCode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange && onOpenChange(false)} />
      <div className="relative z-10 w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center gap-3">
          <img src={logo} alt="Tifstay" className="w-[200px] h-auto" />
          <h3 className="text-lg font-semibold">Remove Item</h3>
          <p className="text-sm text-gray-600 text-center">
            Are you sure you want to remove this item? This action cannot be undone.
          </p>
          {couponCode && <span className="text-sm font-mono text-[#004AAD]">{couponCode}</span>}
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => onOpenChange && onOpenChange(false)}
            className="px-5 py-2 rounded-md border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}


