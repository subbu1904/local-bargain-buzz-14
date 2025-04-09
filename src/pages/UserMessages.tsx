
import DashboardLayout from "@/components/DashboardLayout";
import { userMenuGroups } from "@/data/userMenuData";
import MessageList from "@/components/messaging/MessageList";
import Conversation from "@/components/messaging/Conversation";
import ConversationSearch from "@/components/messaging/ConversationSearch";
import { useMessaging } from "@/hooks/useMessaging";

const UserMessages = () => {
  const {
    searchQuery,
    setSearchQuery,
    newMessage,
    setNewMessage,
    filteredConversations,
    activeConversation,
    currentConversation,
    handleSendMessage,
    handleKeyDown,
    selectConversation
  } = useMessaging();

  return (
    <DashboardLayout menuGroups={userMenuGroups} role="user">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden h-[calc(100vh-240px)]">
        <div className="flex h-full">
          {/* Left sidebar - conversations list */}
          <div className="w-1/3 border-r border-gray-200 h-full flex flex-col">
            <ConversationSearch 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            
            <MessageList 
              conversations={filteredConversations}
              activeConversation={activeConversation}
              onSelectConversation={selectConversation}
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
