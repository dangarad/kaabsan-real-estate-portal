import React from 'react';

interface KaabsanLogoProps {
  className?: string;
  variant?: 'gold' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  customLogoUrl?: string;
}

export const KaabsanLogo: React.FC<KaabsanLogoProps> = ({
  className = '',
  variant = 'gold',
  size = 'md',
  showText = true,
  customLogoUrl
}) => {
  // If custom uploaded logo exists, display it seamlessly
  if (customLogoUrl && customLogoUrl.trim() !== '') {
    const customSizeClasses = {
      sm: 'h-8 max-w-[140px]',
      md: 'h-10 sm:h-11 max-w-[180px]',
      lg: 'h-13 sm:h-15 max-w-[220px]',
      xl: 'h-18 sm:h-20 max-w-[280px]'
    };
    return (
      <div className={`inline-flex items-center select-none flex-shrink-0 ${className}`} dir="ltr" style={{ direction: 'ltr' }}>
        <img 
          src={customLogoUrl} 
          alt="Kaabsan Real Estate Logo" 
          className={`${customSizeClasses[size]} w-auto object-contain flex-shrink-0`} 
        />
      </div>
    );
  }

  // Color palette matching the uploaded Kaabsan Real Estate Gold Logo
  const goldPrimary = variant === 'white' ? '#FFFFFF' : variant === 'dark' ? '#1E293B' : '#C2A55D';
  const windowFill = variant === 'white' ? '#1A1815' : '#FFFFFF';

  const emblemSizeClasses = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9 sm:h-10 sm:w-10',
    lg: 'h-12 w-12 sm:h-13 sm:w-13',
    xl: 'h-16 w-16 sm:h-18 sm:w-18'
  };

  const textStyles = {
    sm: { main: 'text-sm font-black', sub: 'text-[7.5px] font-bold tracking-[0.20em]' },
    md: { main: 'text-[17px] sm:text-[19px] font-black', sub: 'text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.22em]' },
    lg: { main: 'text-2xl font-black', sub: 'text-[11px] font-bold tracking-[0.25em]' },
    xl: { main: 'text-3xl font-black', sub: 'text-[13px] font-bold tracking-[0.28em]' }
  };

  const gapClasses = {
    sm: 'gap-1.5',
    md: 'gap-2 sm:gap-2.5',
    lg: 'gap-3',
    xl: 'gap-3.5'
  };

  return (
    <div 
      className={`inline-flex items-center select-none flex-shrink-0 ${gapClasses[size]} ${className}`} 
      dir="ltr" 
      style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
    >
      {/* ================= EMBLEM (Roof + KR Monogram) ================= */}
      <svg
        viewBox="5 15 125 98"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${emblemSizeClasses[size]} flex-shrink-0`}
        aria-label="Kaabsan Real Estate Emblem"
      >
        {/* Chimney on left roof slope */}
        <path
          d="M24 43V20H37V53L24 43Z"
          fill={goldPrimary}
        />

        {/* Roof Chevron (Pitched Gable) */}
        <path
          d="M8 68L68 18L128 68H111L68 32L25 68H8Z"
          fill={goldPrimary}
        />

        {/* Monogram Base Group */}
        <g id="kr-monogram" transform="translate(18, 54)">
          {/* K vertical stem with serifs */}
          <path
            d="M17 10H33V15H27V50H33V55H17V50H23V15H17V10Z"
            fill={goldPrimary}
          />
          {/* K upper arm */}
          <path
            d="M26 32L43 14H54L34 33L26 32Z"
            fill={goldPrimary}
          />
          {/* K upper arm serif */}
          <path
            d="M48 10H56V15H48V10Z"
            fill={goldPrimary}
          />
          {/* K lower leg */}
          <path
            d="M31 30L51 51H60V55H42V51L30 38L31 30Z"
            fill={goldPrimary}
          />

          {/* R vertical left & top loop */}
          <path
            d="M47 10H68C79 10 86 16 86 26C86 35 79 40 68 40H58V50H65V55H47V50H53V15H47V10ZM58 16V34H67C73 34 78 31 78 25C78 19 73 16 67 16H58Z"
            fill={goldPrimary}
          />
          {/* R diagonal leg with curved serif foot */}
          <path
            d="M66 36L78 50H88V55H70L59 38L66 36Z"
            fill={goldPrimary}
          />

          {/* 4 Window Panes inside the R loop */}
          <rect x="63" y="20" width="3.5" height="3.5" rx="0.5" fill={windowFill} />
          <rect x="68" y="20" width="3.5" height="3.5" rx="0.5" fill={windowFill} />
          <rect x="63" y="25" width="3.5" height="3.5" rx="0.5" fill={windowFill} />
          <rect x="68" y="25" width="3.5" height="3.5" rx="0.5" fill={windowFill} />

          {/* Base serif footer lines */}
          <rect x="15" y="54" width="20" height="2" fill={goldPrimary} />
          <rect x="45" y="54" width="44" height="2" fill={goldPrimary} />
        </g>
      </svg>

      {/* ================= BRAND TYPOGRAPHY ================= */}
      {showText && (
        <div 
          className="flex flex-col justify-center leading-none select-none text-left" 
          dir="ltr" 
          style={{ direction: 'ltr', textAlign: 'left', unicodeBidi: 'isolate' }}
        >
          <span 
            className={`tracking-[0.06em] uppercase font-sans ${textStyles[size].main}`}
            style={{ color: goldPrimary, lineHeight: 1.05 }}
          >
            KAABSAN
          </span>
          <span 
            className={`uppercase font-sans mt-0.5 ${textStyles[size].sub}`}
            style={{ color: goldPrimary, lineHeight: 1.1 }}
          >
            REAL ESTATE
          </span>
        </div>
      )}
    </div>
  );
};
