
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin, Star } from "lucide-react";

export interface ListingProps {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
  distance: string;
  isNew?: boolean;
  category: string;
  rating?: number; // Added rating property
  description?: string; // Added description property
}

const ListingCard = ({
  id,
  title,
  price,
  image,
  location,
  distance,
  isNew,
  category,
  rating,
}: ListingProps) => {
  return (
    <Card className="overflow-hidden border listing-hover">
      <div className="relative aspect-square">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
        <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
        {isNew && (
          <Badge className="absolute top-2 left-2 bg-flipssi-purple">New</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium line-clamp-1 text-base">{title}</h3>
        </div>
        <p className="text-lg font-bold mb-2">${price.toLocaleString()}</p>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="truncate mr-1">{location}</span>
          <span className="text-xs text-gray-400">({distance})</span>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <Badge variant="outline" className="text-xs font-normal">
            {category}
          </Badge>
          {rating !== undefined && (
            <div className="flex items-center">
              <Star className={`h-4 w-4 ${rating > 0 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
              <span className="ml-1 text-xs text-gray-600">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
