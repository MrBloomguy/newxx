// components/shared/VerifiedBadge.tsx
interface VerifiedBadgeProps {
    className?: string;
  }
  
  export function VerifiedBadge({ className = '' }: VerifiedBadgeProps) {
    return (
      <div className={`group relative inline-block ${className}`}>
        <svg 
          className="w-4 h-4 text-[#8b5cf6] inline-block group-hover:scale-110 transition-transform" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 004 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895l-3.667-3.714 1.424-1.404 2.243 2.272 5.103-5.104 1.424 1.414-6.527 6.536z" />
        </svg>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1c1c1c] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Verified User
        </div>
      </div>
    );
  }