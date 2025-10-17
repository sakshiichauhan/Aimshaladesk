import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail } from "lucide-react";
import type { Template, Channel } from "../../../types/types";

interface MessagePreviewProps {
  selectedTemplate: Template | null;
  customMessage: string;
  templateVariables: Record<string, string>;
  selectedChannel: Channel;
}

export function MessagePreview({
  selectedTemplate,
  customMessage,
  templateVariables,
  selectedChannel,
}: MessagePreviewProps) {
  const getPreviewMessage = () => {
    if (selectedTemplate) {
      let message = selectedTemplate.content;
      selectedTemplate.variables.forEach((variable) => {
        const value = templateVariables[variable] || `[${variable}]`;
        message = message.replace(new RegExp(`{{${variable}}}`, "g"), value);
      });
      return message;
    }
    return customMessage || "Your message will appear here...";
  };

  const WhatsAppPreview = () => (
    <div className="bg-[var(--brand-color3)] p-4 rounded-lg">
      <div className="bg-white rounded-lg p-3 shadow-sm">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <div className="font-semibold text-sm">Your Business</div>
            <div className="text-xs text-gray-500">WhatsApp Business</div>
          </div>
        </div>
        <div className="bg-[var(--brand-color3)] p-3 rounded-lg max-w-xs">
          <p className="text-sm text-gray-800">{getPreviewMessage()}</p>
          <div className="text-xs text-gray-500 mt-1 text-right">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const EmailPreview = () => (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium">Your Business</span>
          </div>
          <div className="text-sm text-gray-600">
            Subject: {selectedTemplate?.name || "Custom Message"}
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-800 whitespace-pre-wrap">
            {getPreviewMessage()}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="p-6">
      <div className="flex flex-col space-x-2 mb-4">
        <div className="flex items-center  justify-start gap-3">
        {selectedChannel === "whatsapp" ? (
          <MessageCircle className="w-8 h-8 text-[var(--brand-color)]" />
        ) : (
          <Mail className="w-8 h-8 text-[var(--brand-color)]" />
        )}
        <h3 className="text-xl font-semibold text-gray-900">Message Preview</h3>
        </div>
        <div className="mt-2">
        <Badge variant="outline" className="text-xs">
          {selectedChannel === "whatsapp" ? "WhatsApp" : "Email"}
        </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {selectedChannel === "whatsapp" ? (
          <WhatsAppPreview />
        ) : (
          <EmailPreview />
        )}

        {selectedTemplate && (
          <div className="text-xs text-gray-500 space-y-1">
            <p>
              <strong>Template:</strong> {selectedTemplate.name}
            </p>
            <p>
              <strong>Category:</strong> {selectedTemplate.category}
            </p>
            {selectedTemplate.variables.length > 0 && (
              <p>
                <strong>Variables:</strong>{" "}
                {selectedTemplate.variables.join(", ")}
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
