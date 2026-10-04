import CommonSpace from "@/components/shared/CommonSpace";
import DashboardTopSection from "@/components/shared/DashboardTopSection";
import MessageHeader from "@/features/messageTemplate/MessageHeader";
import MessageTemplateList from "@/features/messageTemplate/MessageTemplateList";

const MessageTemplate = () => {
  return (
    <div>
      <DashboardTopSection
        title="Message Template"
        description="Create, manage, and reuse message templates to communicate quickly and consistently."
      />
      <MessageHeader />
      <CommonSpace>
        <MessageTemplateList />
      </CommonSpace>
    </div>
  );
};

export default MessageTemplate;
