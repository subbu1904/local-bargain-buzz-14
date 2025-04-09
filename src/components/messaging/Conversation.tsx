
import { ConversationType } from "@/types/messaging";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { format } from "date-fns";

interface ConversationProps {
  conversation: ConversationType;
  newMessage: string;
  onNewMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const Conversation = ({ 
  conversation, 
  newMessage, 
  onNewMessageChange, 
  onSendMessage,
  onKeyDown
}: ConversationProps) => {
  return (
    <div className="w-2/3 flex flex-col h-full">
      <div className="p-4 border-b flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={conversation.with.avatar} />
          <AvatarFallback>
            {conversation.with.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{conversation.with.name}</h3>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        {conversation.messages.map((message) => (
          <div 
            key={message.id}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`rounded-lg px-4 py-2 max-w-[75%] ${
                message.sender === 'user' 
                  ? 'bg-flipssi-purple text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p>{message.content}</p>
              <div 
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                }`}
              >
                {format(message.timestamp, 'h:mm a')}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => onNewMessageChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-grow"
          />
          <Button 
            size="icon"
            className="ml-2 bg-flipssi-purple text-white hover:bg-purple-700"
            onClick={onSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
