
import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  User, 
  CreditCard,
  Bell,
  Search,
  Send
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'other';
}

interface Conversation {
  id: string;
  with: {
    name: string;
    avatar?: string;
  };
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
  unread: boolean;
}

const UserMessages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([
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

  const menuGroups = [
    {
      title: "Account",
      items: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "My Listings",
          path: "/dashboard/listings",
          icon: ShoppingBag,
        },
        {
          title: "Favorites",
          path: "/dashboard/favorites",
          icon: Heart,
        },
        {
          title: "Messages",
          path: "/dashboard/messages",
          icon: MessageCircle,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Profile",
          path: "/dashboard/profile",
          icon: User,
        },
        {
          title: "Payments",
          path: "/dashboard/payments",
          icon: CreditCard,
        },
        {
          title: "Notifications",
          path: "/dashboard/notifications",
          icon: Bell,
        },
      ],
    },
  ];

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
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <DashboardLayout menuGroups={menuGroups} role="user">
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
            
            <div className="overflow-y-auto flex-grow">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No conversations found.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredConversations.map((conversation) => (
                    <div 
                      key={conversation.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 flex items-start ${
                        activeConversation === conversation.id ? 'bg-gray-100' : ''
                      } ${conversation.unread ? 'font-semibold' : ''}`}
                      onClick={() => {
                        setActiveConversation(conversation.id);
                        // Mark as read when selected
                        setConversations(
                          conversations.map(c => 
                            c.id === conversation.id ? { ...c, unread: false } : c
                          )
                        );
                      }}
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
              )}
            </div>
          </div>
          
          {/* Right side - message content */}
          <div className="w-2/3 flex flex-col h-full">
            {activeConversation && currentConversation ? (
              <>
                <div className="p-4 border-b flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={currentConversation.with.avatar} />
                    <AvatarFallback>
                      {currentConversation.with.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{currentConversation.with.name}</h3>
                  </div>
                </div>
                
                <div className="flex-grow overflow-y-auto p-4">
                  {currentConversation.messages.map((message) => (
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
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-grow"
                    />
                    <Button 
                      size="icon"
                      className="ml-2 bg-flipssi-purple text-white hover:bg-purple-700"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserMessages;
