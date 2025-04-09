
import { ConversationType } from "@/types/messaging";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface MessageListProps {
  conversations: ConversationType[];
  activeConversation: string | null;
  onSelectConversation: (id: string) => void;
}

const MessageList = ({ conversations, activeConversation, onSelectConversation }: MessageListProps) => {
  if (conversations.length === 0) {
    return (
      <div className="text-center py-10 flex-grow">
        <p className="text-gray-500">No conversations found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto flex-grow divide-y">
      {conversations.map((conversation) => (
        <div 
          key={conversation.id}
          className={`p-4 cursor-pointer hover:bg-gray-50 flex items-start ${
            activeConversation === conversation.id ? 'bg-gray-100' : ''
          } ${conversation.unread ? 'font-semibold' : ''}`}
          onClick={() => onSelectConversation(conversation.id)}
        >
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={conversation.with.avatar} />
            <AvatarFallback>
              {conversation.with.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0">
            <div className="flex justify-between">
              <span className="font-medium truncate">{conversation.with.name}</span>
              <span className="text-xs text-gray-500">
                {format(conversation.timestamp, 'MMM d')}
              </span>
            </div>
            <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
          </div>
          {conversation.unread && (
            <div className="ml-2 h-2 w-2 bg-flipssi-purple rounded-full"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
