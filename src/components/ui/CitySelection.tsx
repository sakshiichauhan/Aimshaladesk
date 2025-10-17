import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LocationDropdown() {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
            query
          )}&limit=5&apiKey=76785d09a3844e339a79daca7b1f2d36`,
          { signal: controller.signal }
        )
          .then((res) => res.json())
          .then((data) => {
            const suggestions =
              data.features?.map((item: any) => item.properties.formatted) || [];
            setSearchResults(suggestions);
          })
          .catch((err) => {
            if (err.name !== "AbortError") console.error(err);
          });
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(delayDebounce);
    };
  }, [query]);

  return (
    <div ref={containerRef} className="relative">
      <label className="text-[var(--text)] mb-2 block">
        Select City/State Where you are Located:
      </label>

      <Button
        variant="border"
        onClick={() => setOpen(!open)}
        className="w-full justify-between"
      >
        <span>{location || "Select location"}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {open && (
        <div className="absolute z-50 mt-2 w-full bg-[var(--background)] border rounded-md text-[var(--text)]">
          <div className="p-2">
            <input
              placeholder="Search city/state"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[var(--text)] text-[var(--text)]"
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {searchResults.length > 0 ? (
              searchResults.map((loc) => (
                <div
                  key={loc}
                  onClick={() => {
                    setLocation(loc);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="px-4 py-2 hover:bg-[var(--faded)] cursor-pointer text-sm text-[var(--text)]"
                >
                  {loc}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-muted-foreground text-sm">
                No results
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
