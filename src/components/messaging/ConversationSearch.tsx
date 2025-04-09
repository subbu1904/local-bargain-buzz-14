
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ConversationSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const ConversationSearch = ({ searchQuery, onSearchChange }: ConversationSearchProps) => {
  return (
    <div className="p-4 border-b">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search conversations..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ConversationSearch;
