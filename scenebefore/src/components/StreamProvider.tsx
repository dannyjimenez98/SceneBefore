interface StreamProviderProps {
  title: string;
  providers: {
    provider_id: number;
    provider_name: string;
    logo_path: string;
  }[];
}

export default function StreamProvider({
  title,
  providers,
}: StreamProviderProps) {
  if (providers.length === 0) return null; // Hide section if no providers

  return (
    <div className="mt-4">
      <h3 className="text-md font-medium">{title}:</h3>
      <ul className="flex flex-wrap gap-4 mt-2">
        {providers.map((service) => (
          <li key={service.provider_id} className="flex items-center gap-2">
            <img
              src={`https://image.tmdb.org/t/p/w92${service.logo_path}`}
              alt={service.provider_name}
              className="w-10 h-10 rounded"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
