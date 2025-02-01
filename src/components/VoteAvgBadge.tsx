

interface VoteAvgBadgeProps {
    voteAverage: number ;
    badgeSize: string; // same size naming convention as tailwind (e.g. sm, md, lg, etc.)
}

export default function VoteAvgBadge({ voteAverage, badgeSize } : VoteAvgBadgeProps ) {
  return (
    <>
        
            <div className={`badge 
                badge-${badgeSize} 
                font-bold 
                ${voteAverage >= 7 
                    ? "badge-success" 
                    : voteAverage >= 5 
                    ? "badge-warning" 
                    : voteAverage > 0 
                    ? "badge-error"
                    : "badge-neutral"
                }`
                    }>
                {voteAverage > 0 ? voteAverage.toFixed(1) : "-"}
            </div>
    </>
  )
}
