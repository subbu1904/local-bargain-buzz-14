import { useState, useEffect } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LocationPickerProps {
  onLocationSelect: (location: { address: string; latitude: number; longitude: number }) => void;
  defaultAddress?: string;
}

interface LocationSuggestion {
  place_name: string;
  center: [number, number];
}

const LocationPicker = ({ onLocationSelect, defaultAddress = "" }: LocationPickerProps) => {
  const [address, setAddress] = useState(defaultAddress);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchLocationSuggestions = async (query: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockSuggestions: LocationSuggestion[] = [
        {
          place_name: `${query}, New York, USA`,
          center: [-73.9808, 40.7648]
        },
        {
          place_name: `${query}, Los Angeles, USA`,
          center: [-118.2437, 34.0522]
        },
        {
          place_name: `${query}, Chicago, USA`,
          center: [-87.6298, 41.8781]
        },
        {
          place_name: `${query}, Miami, USA`,
          center: [-80.1918, 25.7617]
        }
      ];
      
      setSuggestions(mockSuggestions);
      setIsLoading(false);
      setShowSuggestions(true);
    }, 500);
  };

  useEffect(() => {
    if (address.length > 3) {
      const timer = setTimeout(() => {
        fetchLocationSuggestions(address);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [address]);

  const handleSelectLocation = (suggestion: LocationSuggestion) => {
    setAddress(suggestion.place_name);
    setSuggestions([]);
    setShowSuggestions(false);
    
    onLocationSelect({
      address: suggestion.place_name,
      longitude: suggestion.center[0],
      latitude: suggestion.center[1]
    });
  };

  const handleUseCurrentLocation = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          const mockAddress = "Your Current Location";
          
          setAddress(mockAddress);
          onLocationSelect({ address: mockAddress, latitude, longitude });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex space-x-2">
        <div className="relative flex-grow">
          <Input
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="pl-10"
          />
          <MapPin className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleUseCurrentLocation}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
          Current Location
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute z-10 w-full mt-1 shadow-lg">
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-100">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleSelectLocation(suggestion)}
                >
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <span>{suggestion.place_name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="mt-4 p-4 border rounded-md">
        <p className="text-sm text-gray-500 mb-2">
          Your location will be displayed on a map to help buyers find your listing.
        </p>
        <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-400">Map preview will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
