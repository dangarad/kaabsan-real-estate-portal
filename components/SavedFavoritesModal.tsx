import React from 'react';
import { X, Trash2, ArrowRight, Bed, Bath, Maximize2, MapPin, Share2 } from 'lucide-react';
import { Property } from '../types';

interface SavedFavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProperties: Property[];
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenScheduleTour: (property: Property) => void;
  onOpenContact: (message?: string) => void;
  currency: 'USD' | 'EUR' | 'GBP';
}

export const SavedFavoritesModal: React.FC<SavedFavoritesModalProps> = ({
  isOpen,
  onClose,
  savedProperties,
  onRemoveFavorite,
  onSelectProperty,
  onOpenScheduleTour,
  onOpenContact,
  currency
}) => {
  if (!isOpen) return null;

  const formatPrice = (amount: number) => {
    let rate = 1;
    let symbol = '$';
    if (currency === 'EUR') {
      rate = 0.92;
      symbol = '€';
    } else if (currency === 'GBP') {
      rate = 0.79;
      symbol = '£';
    }
    const converted = Math.round(amount * rate);
    return `${symbol}${converted.toLocaleString()}`;
  };

  const totalPortfolioValue = savedProperties.reduce((acc, curr) => acc + (curr.price || 0), 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FFFFFF] border-l border-[#E5E2DA] h-full flex flex-col justify-between shadow-2xl text-[#1A1A1A]">
        
        {/* Header */}
        <div className="p-5 border-b border-[#E5E2DA] flex items-center justify-between bg-[#F9F8F6]">
          <div>
            <span className="text-xs text-[#C2A55D] font-semibold">
              Curated Portfolio
            </span>
            <h3 className="font-serif-luxury text-xl text-[#1A1A1A] font-normal">
              Saved Estates ({savedProperties.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6B665E] hover:text-[#1A1A1A] rounded-full hover:bg-[#EAE6DE] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Saved Properties */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDFCFA]">
          {savedProperties.length > 0 ? (
            savedProperties.map((property) => (
              <div
                key={property.id}
                className="bg-[#FFFFFF] border border-[#E5E2DA] rounded-2xl overflow-hidden shadow-sm hover:border-[#C2A55D] hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative aspect-[16/9] w-full bg-[#EAE6DE]">
                  <img
                    src={property.heroImage}
                    alt={property.title}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => {
                      onSelectProperty(property);
                      onClose();
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => onRemoveFavorite(property.id)}
                      className="p-1.5 rounded-full bg-white/90 hover:bg-red-50 text-[#6B665E] hover:text-red-600 transition-colors shadow cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <div className="text-xs text-[#C2A55D] font-semibold">
                        {property.neighborhood}
                      </div>
                      <h4
                        onClick={() => {
                          onSelectProperty(property);
                          onClose();
                        }}
                        className="font-serif-luxury text-base text-[#1A1A1A] hover:text-[#C2A55D] cursor-pointer transition-colors line-clamp-1"
                      >
                        {property.title}
                      </h4>
                    </div>
                    <div className="font-serif-luxury text-base text-[#C2A55D]">
                      {property.price ? formatPrice(property.price) : (property.priceDisplay || 'La xidhiidh WhatsApp')}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#6B665E] my-2">
                    <span>{property.beds} Beds</span>
                    <span>•</span>
                    <span>{property.baths} Baths</span>
                    <span>•</span>
                    <span>{property.sqft.toLocaleString()} Sq.Ft.</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#E5E2DA]">
                    <button
                      onClick={() => {
                        onSelectProperty(property);
                        onClose();
                      }}
                      className="text-xs text-[#4A4742] hover:text-[#1A1A1A] font-medium cursor-pointer"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => {
                        onOpenScheduleTour(property);
                        onClose();
                      }}
                      className="text-xs text-[#C2A55D] hover:underline font-semibold cursor-pointer"
                    >
                      Schedule Tour
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 px-4">
              <p className="font-serif-luxury text-lg text-[#6B665E] mb-2">
                No Properties in Your Curated Collection
              </p>
              <p className="text-xs text-[#8C867D] max-w-xs mx-auto">
                Click the heart icon on any estate to bookmark it for private portfolio review or comparative analysis.
              </p>
            </div>
          )}
        </div>

        {/* Footer with Portfolio Total & Inquire CTA */}
        {savedProperties.length > 0 && (
          <div className="p-5 border-t border-[#E5E2DA] bg-[#F9F8F6] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#6B665E] font-medium">Total Portfolio Value:</span>
              <span className="font-serif-luxury text-lg text-[#C2A55D] font-semibold">
                {formatPrice(totalPortfolioValue)}
              </span>
            </div>

            <button
              onClick={() => {
                const titles = savedProperties.map((p) => `${p.title} (${p.priceDisplay})`).join(', ');
                onOpenContact(`I would like to inquire about viewing this portfolio of estates: ${titles}`);
                onClose();
              }}
              className="w-full py-3 bg-[#35322E] hover:bg-[#1F1D1A] text-white font-semibold text-xs rounded-xl transition-colors text-center cursor-pointer shadow-md"
            >
              Inquire On Full Portfolio
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
