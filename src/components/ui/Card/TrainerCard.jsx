
const TrainerCard = ({ image, name, description, bio, instagram, tiktok }) => {
  // Debug: Log social media props
  console.log(`TrainerCard for ${name}:`, {
    instagram,
    tiktok,
    hasInstagram: !!instagram,
    hasTiktok: !!tiktok,
    showSocialLinks: !!(instagram || tiktok),
    instagramUrl: instagram ? (() => {
      try { return new URL(instagram) } catch { return null }
    })() : null,
    tiktokUrl: tiktok ? (() => {
      try { return new URL(tiktok) } catch { return null }
    })() : null
  })

  // Helper function to validate and format social media URLs
  const formatSocialUrl = (url, platform) => {
    if (!url) return null
    
    // If it's already a valid URL, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    
    // If it's just a username, construct the full URL
    const username = url.replace(/^@/, '') // Remove @ if present
    if (platform === 'instagram') {
      return `https://instagram.com/${username}`
    } else if (platform === 'tiktok') {
      return `https://tiktok.com/@${username}`
    }
    
    return url
  }

  const formattedInstagram = formatSocialUrl(instagram, 'instagram')
  const formattedTiktok = formatSocialUrl(tiktok, 'tiktok')

  return (
    <div
      className="relative group w-full rounded-[35px] md:rounded-3xl overflow-hidden"
      style={{ aspectRatio: "2/3" }}
    >
      <img
        src={image}
        alt={`${name} - Trainer`}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to default image if loading fails
          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNGM0Y0RjYiLz4KPHBhdGggZD0iTTI0IDEyQzI3LjMxMzcgMTIgMzAgMTQuNjg2MyAzMCAxOEMzMCAyMS4zMTM3IDI3LjMxMzcgMjQgMjQgMjRDMjAuNjg2MyAyNCAxOCAyMS4zMTM3IDE4IDE4QzE4IDE0LjY4NjMgMjAuNjg2MyAxMiAyNCAxMloiIGZpbGw9IiM5QjlCQTAiLz4KPHBhdGggZD0iTTEyIDQwQzEyIDM0LjQ3NzIgMTYuNDc3MiAzMCAyMiAzMEgyNkMzMS41MjI4IDMwIDM2IDM0LjQ3NzIgMzYgNDBIMTJaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo='
        }}
      />
      {/* Bottom shadow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      <div className="absolute bottom-6 left-0 right-0 px-6 md:px-4 text-white text-center z-10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-auto">
        <h3 className="text-3xl md:text-xl font-semibold font-['Raleway']">{name}</h3>
   
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-90 transition duration-300 flex flex-col justify-between text-white p-8 md:p-8">
        <div className="pointer-events-auto">
          <h3 className="text-3xl md:text-xl font-semibold font-['Raleway']">{name}</h3>
          <p className="text-lg md:text-sm font-normal font-['Raleway'] text-white/50">
            Description
          </p>
          <p className="text-lg md:text-sm font-normal font-['Raleway'] mt-8 md:mt-8">
            {bio || "Our certified trainers are the best at what they do—skilled, supportive, and ready to help you move better and feel stronger in every session."}
          </p>
        </div>
      </div>

      {/* Social Media Links - Always clickable, positioned over hover overlay */}
      {(instagram || tiktok) && (
        <div className="absolute bottom-8 left-0 right-0 flex gap-6 md:gap-4 justify-center pointer-events-auto z-30 select-none">
          {instagram && (
            <a
              href={formattedInstagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow ${name} on Instagram`}
              className="bg-primary rounded-full p-4 md:p-2 hover:opacity-80 transition-opacity border border-white cursor-pointer select-none pointer-events-auto opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Instagram clicked:', {
                  original: instagram,
                  formatted: formattedInstagram,
                  name: name
                });
                window.open(formattedInstagram, '_blank', 'noopener,noreferrer');
              }}
            >
              <svg
                className="h-8 w-8 md:h-6 md:w-6 text-secondary pointer-events-none"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
              </svg>
            </a>
          )}

          {tiktok && (
            <a
              href={formattedTiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow ${name} on TikTok`}
              className="bg-primary rounded-full p-4 md:p-2 hover:opacity-80 transition-opacity border border-white cursor-pointer select-none pointer-events-auto opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('TikTok clicked:', {
                  original: tiktok,
                  formatted: formattedTiktok,
                  name: name
                });
                window.open(formattedTiktok, '_blank', 'noopener,noreferrer');
              }}
            >
              <svg
                className="h-8 w-8 md:h-6 md:w-6 text-secondary pointer-events-none"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02c.08 1.53.63 3.09 1.75 4.17c1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97c-.57-.26-1.1-.59-1.62-.93c-.01 2.92.01 5.84-.02 8.75c-.08 1.4-.54 2.79-1.35 3.94c-1.31 1.92-3.58 3.17-5.91 3.21c-1.43.08-2.86-.31-4.08-1.03c-2.02-1.19-3.44-3.37-3.65-5.71c-.02-.5-.03-1-.01-1.49c.18-1.9 1.12-3.72 2.58-4.96c1.66-1.44 3.98-2.13 6.15-1.72c.02 1.48-.04 2.96-.04 4.44c-.99-.32-2.15-.23-3.02.37c-.63.41-1.11 1.04-1.36 1.75c-.21.51-.15 1.07-.14 1.61c.24 1.64 1.82 3.02 3.5 2.87c1.12-.01 2.19-.66 2.77-1.61c.19-.33.4-.67.41-1.06c.1-1.79.06-3.57.07-5.36c.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default TrainerCard;
