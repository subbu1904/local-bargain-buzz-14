
import DashboardLayout from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Send,
  UserPlus
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { userMenuGroups } from "@/data/userMenuData";
import MessageList from "@/components/messaging/MessageList";
import Conversation from "@/components/messaging/Conversation";
import { useToast } from "@/components/ui/use-toast";
import { Message, ConversationType } from "@/types/messaging";

const UserMessages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<ConversationType[]>([
    {
      id: "1",
      with: {
        name: "John Smith",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      lastMessage: "Is the iPhone still available?",
      timestamp: new Date(2023, 5, 15, 14, 30),
      unread: true,
      messages: [
        {
          id: "m1",
          content: "Hi, I'm interested in your iPhone 13 Pro Max.",
          timestamp: new Date(2023, 5, 15, 14, 25),
          sender: 'other',
        },
        {
          id: "m2",
          content: "Is it still available for purchase?",
          timestamp: new Date(2023, 5, 15, 14, 26),
          sender: 'other',
        },
        {
          id: "m3",
          content: "Yes, it's still available!",
          timestamp: new Date(2023, 5, 15, 14, 28),
          sender: 'user',
        },
        {
          id: "m4",
          content: "Is the iPhone still available?",
          timestamp: new Date(2023, 5, 15, 14, 30),
          sender: 'other',
        },
      ],
    },
    {
      id: "2",
      with: {
        name: "Emily Johnson",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      lastMessage: "Can you do $130 for the coffee table?",
      timestamp: new Date(2023, 5, 14, 10, 15),
      unread: false,
      messages: [
        {
          id: "m5",
          content: "Hello! I'm interested in your coffee table.",
          timestamp: new Date(2023, 5, 14, 10, 10),
          sender: 'other',
        },
        {
          id: "m6",
          content: "Can you do $130 for the coffee table?",
          timestamp: new Date(2023, 5, 14, 10, 15),
          sender: 'other',
        },
      ],
    },
    {
      id: "3",
      with: {
        name: "Michael Brown",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      lastMessage: "Thanks! See you tomorrow at 2pm.",
      timestamp: new Date(2023, 5, 12, 18, 45),
      unread: false,
      messages: [
        {
          id: "m7",
          content: "Hi, is your mountain bike still available?",
          timestamp: new Date(2023, 5, 12, 18, 30),
          sender: 'other',
        },
        {
          id: "m8",
          content: "Yes, would you like to see it in person?",
          timestamp: new Date(2023, 5, 12, 18, 35),
          sender: 'user',
        },
        {
          id: "m9",
          content: "Great! Can we meet tomorrow?",
          timestamp: new Date(2023, 5, 12, 18, 40),
          sender: 'other',
        },
        {
          id: "m10",
          content: "Thanks! See you tomorrow at 2pm.",
          timestamp: new Date(2023, 5, 12, 18, 45),
          sender: 'other',
        },
      ],
    },
  ]);
  const [activeConversation, setActiveConversation] = useState<string | null>("1");
  const { toast } = useToast();

  const filteredConversations = conversations.filter(conversation => 
    conversation.with.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentConversation = conversations.find(conv => conv.id === activeConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation) {
        const newMsg: Message = {
          id: `m${Date.now()}`,
          content: newMessage,
          timestamp: new Date(),
          sender: 'user',
        };
        
        return {
          ...conv,
          lastMessage: newMessage,
          timestamp: new Date(),
          messages: [...conv.messages, newMsg],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage('');
    
    // Simulate a reply after 2 seconds
    setTimeout(() => {
      const randomResponses = [
        "Thanks for the message!",
        "I'll get back to you soon.",
        "That sounds great!",
        "Perfect, looking forward to it.",
        "Let me check and get back to you."
      ];
      
      const autoReply = randomResponses[Math.floor(Math.random() * randomResponses.length)];
      
      const updatedWithReply = updatedConversations.map(conv => {
        if (conv.id === activeConversation) {
          const replyMsg: Message = {
            id: `m${Date.now() + 1}`,
            content: autoReply,
            timestamp: new Date(),
            sender: 'other',
          };
          
          return {
            ...conv,
            lastMessage: autoReply,
            timestamp: new Date(),
            messages: [...conv.messages, replyMsg],
          };
        }
        return conv;
      });
      
      setConversations(updatedWithReply);
      
      toast({
        title: "New Message",
        description: `${currentConversation?.with.name}: ${autoReply}`,
      });
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <DashboardLayout menuGroups={userMenuGroups} role="user">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden h-[calc(100vh-240px)]">
        <div className="flex h-full">
          {/* Left sidebar - conversations list */}
          <div className="w-1/3 border-r border-gray-200 h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <MessageList 
              conversations={filteredConversations}
              activeConversation={activeConversation}
              onSelectConversation={(id) => {
                setActiveConversation(id);
                // Mark as read when selected
                setConversations(
                  conversations.map(c => 
                    c.id === id ? { ...c, unread: false } : c
                  )
                );
              }}
            />
          </div>
          
          {/* Right side - message content */}
          {activeConversation && currentConversation ? (
            <Conversation
              conversation={currentConversation}
              newMessage={newMessage}
              onNewMessageChange={setNewMessage}
              onSendMessage={handleSendMessage}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <div className="w-2/3 flex items-center justify-center h-full text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserMessages;
