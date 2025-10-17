import { useState } from "react";
import { ChannelSelector } from "./Components/channel-selector";
import { MessageTypeSelector } from "./Components/message-type-selector";
import { TemplateSelector } from "./Components/template-selector";
import { MessageComposer } from "./Components/message-composer";
import { MessagePreview } from "./Components/message-preview";
import { AdminControls } from "./Components/admin-controls";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import type { Channel, MessageType, Template } from "../../types/types";

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Job Application Confirmation",
    content:
      "Hi {{name}}, thank you for applying to the {{position}} role at {{company}}! We've received your application and will review it within {{timeline}}.",
    variables: ["name", "position", "company", "timeline"],
    status: "approved",
    channel: "whatsapp",
    category: "application",
    lastUsed: new Date("2024-01-15"),
    performance: { sent: 1250, delivered: 1200, opened: 980, clicked: 450 },
  },
  {
    id: "2",
    name: "Interview Invitation",
    content:
      "Congratulations {{name}}! You've been selected for an interview for the {{position}} role. Interview scheduled for {{date}} at {{time}}. Location: {{location}}.",
    variables: ["name", "position", "date", "time", "location"],
    status: "approved",
    channel: "email",
    category: "interview",
    lastUsed: new Date("2024-01-20"),
    performance: { sent: 2100, delivered: 2050, opened: 1800, clicked: 320 },
  },
  {
    id: "3",
    name: "Career Development Reminder",
    content:
      "Hi {{name}}, it's time for your career development check-in with {{managerName}} on {{date}} at {{time}}. Please prepare your progress updates.",
    variables: ["name", "managerName", "date", "time"],
    status: "pending",
    channel: "whatsapp",
    category: "development",
    performance: { sent: 0, delivered: 0, opened: 0, clicked: 0 },
  },
  {
    id: "4",
    name: "Job Offer Letter",
    content:
      "Congratulations {{name}}! We're pleased to offer you the {{position}} role at {{company}}. Start date: {{startDate}}. Salary: {{salary}}. Please respond by {{deadline}}.",
    variables: [
      "name",
      "position",
      "company",
      "startDate",
      "salary",
      "deadline",
    ],
    status: "approved",
    channel: "email",
    category: "offer",
    lastUsed: new Date("2024-01-25"),
    performance: { sent: 850, delivered: 820, opened: 780, clicked: 150 },
  },
  {
    id: "5",
    name: "Application Status Update",
    content:
      "Hi {{name}}, your application for {{position}} at {{company}} is currently {{status}}. We'll notify you of any updates. Thank you for your patience.",
    variables: ["name", "position", "company", "status"],
    status: "approved",
    channel: "whatsapp",
    category: "update",
    lastUsed: new Date("2024-01-28"),
    performance: { sent: 3200, delivered: 3100, opened: 2800, clicked: 420 },
  },
];

export function UserMessage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedChannel, setSelectedChannel] = useState<Channel>("whatsapp");
  const [messageType, setMessageType] = useState<MessageType>("approved");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [customMessage, setCustomMessage] = useState("");
  const [templateVariables, setTemplateVariables] = useState<
    Record<string, string>
  >({});
  const [isAdmin, setIsAdmin] = useState(false);

  const steps = [
    { number: 1, title: "Select Channel", completed: currentStep > 1 },
    { number: 2, title: "Choose Message Type", completed: currentStep > 2 },
    { number: 3, title: "Select Template", completed: currentStep > 3 },
    { number: 4, title: "Compose & Send", completed: false },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedChannel !== null;
      case 2:
        return messageType !== null;
      case 3:
        return messageType === "suggest" || selectedTemplate !== null;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleTemplateUpdate = (
    templateId: string,
    status: "approved" | "rejected"
  ) => {
    // Update template status logic here
    console.log(`Template ${templateId} ${status}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Career Communication Center
              </h1>
              <p className="text-lg text-gray-600">
                Manage job applications, interviews, and career development
                communications
              </p>
            </div>
            <Button
              variant={isAdmin ? "default" : "outline"}
              onClick={() => setIsAdmin(!isAdmin)}
              className="bg-[var(--brand-color)] hover:bg-[var(--brand-color)]/90 text-white border-[var(--brand-color)] px-6 py-2.5 font-medium"
            >
              {isAdmin ? "Exit Admin" : "Admin View"}
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="bg-[var(--brand-color3)] rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-3 transition-all duration-300 ${
                        step.completed
                          ? "bg-[var(--brand-color)] border-[var(--brand-color)] text-white shadow-lg"
                          : currentStep === step.number
                          ? "border-[var(--brand-color)] text-[var(--brand-color)] bg-white shadow-md"
                          : "border-gray-300 text-gray-400 bg-white"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="text-lg font-bold">{step.number}</span>
                      )}
                    </div>
                    <span
                      className={`text-sm font-semibold text-center ${
                        currentStep === step.number
                          ? "text-[var(--brand-color)]"
                          : "text-gray-600"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-8 rounded-full transition-all duration-300 ${
                        step.completed
                          ? "bg-[var(--brand-color)]"
                          : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {currentStep === 1 && (
                <div className="p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Select Communication Channel
                    </h2>
                    <p className="text-gray-600">
                      Choose how you want to send career-related communications
                    </p>
                  </div>
                  <ChannelSelector
                    selectedChannel={selectedChannel}
                    onChannelSelect={setSelectedChannel}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Choose Message Type
                    </h2>
                    <p className="text-gray-600">
                      Select from approved career templates or suggest a new one
                    </p>
                  </div>
                  <MessageTypeSelector
                    messageType={messageType}
                    onMessageTypeSelect={setMessageType}
                    selectedChannel={selectedChannel}
                  />
                </div>
              )}

              {currentStep === 3 && (
                <div className="p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Select Template
                    </h2>
                    <p className="text-gray-600">
                      Choose from available career templates or create a custom
                      message
                    </p>
                  </div>
                  <TemplateSelector
                    templates={mockTemplates}
                    selectedTemplate={selectedTemplate}
                    onTemplateSelect={setSelectedTemplate}
                    selectedChannel={selectedChannel}
                    messageType={messageType}
                    customMessage={customMessage}
                    onCustomMessageChange={setCustomMessage}
                  />
                </div>
              )}

              {currentStep === 4 && (
                <div className="p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Compose & Send
                    </h2>
                    <p className="text-gray-600">
                      Customize your career message and send it to recipients
                    </p>
                  </div>
                  <MessageComposer
                    selectedTemplate={selectedTemplate}
                    customMessage={customMessage}
                    onCustomMessageChange={setCustomMessage}
                    templateVariables={templateVariables}
                    onTemplateVariablesChange={setTemplateVariables}
                    selectedChannel={selectedChannel}
                  />
                </div>
              )}
            </div>

            {/* Navigation */}
            <Card className="p-6 bg-gray-50 border-0">
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-8 py-2.5 font-medium bg-transparent"
                >
                  Back
                </Button>
                <div className="text-sm text-gray-500">
                  Step {currentStep} of {steps.length}
                </div>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-[var(--brand-color)] hover:bg-[var(--brand-color)]/90 px-8 py-2.5 font-medium"
                >
                  {currentStep === 4 ? "Send Message" : "Next"}
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <MessagePreview
              selectedTemplate={selectedTemplate}
              customMessage={customMessage}
              templateVariables={templateVariables}
              selectedChannel={selectedChannel}
            />

            {isAdmin && (
              <AdminControls
                templates={mockTemplates}
                onTemplateUpdate={handleTemplateUpdate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
