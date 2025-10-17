"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Users, Calendar } from "lucide-react";
import type { Template, Channel } from "../../../types/types";

interface MessageComposerProps {
  selectedTemplate: Template | null;
  customMessage: string;
  onCustomMessageChange: (message: string) => void;
  templateVariables: Record<string, string>;
  onTemplateVariablesChange: (variables: Record<string, string>) => void;
  selectedChannel: Channel;
}

export function MessageComposer({
  selectedTemplate,
  customMessage,
  onCustomMessageChange,
  templateVariables,
  onTemplateVariablesChange,
  selectedChannel,
}: MessageComposerProps) {
  const handleVariableChange = (variable: string, value: string) => {
    onTemplateVariablesChange({
      ...templateVariables,
      [variable]: value,
    });
  };

  // const getPreviewMessage = () => {
  //   if (selectedTemplate) {
  //     let message = selectedTemplate.content;
  //     selectedTemplate.variables.forEach((variable) => {
  //       const value = templateVariables[variable] || `{{${variable}}}`;
  //       message = message.replace(new RegExp(`{{${variable}}}`, "g"), value);
  //     });
  //     return message;
  //   }
  //   return customMessage;
  // };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Compose Message
        </h2>
        <p className="text-gray-600">
          {selectedTemplate
            ? `Customize your ${selectedTemplate.name} template`
            : "Finalize your custom message"}
        </p>
      </div>

      {selectedTemplate && (
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <h3 className="font-semibold text-gray-900">
              Template: {selectedTemplate.name}
            </h3>
            <Badge className="bg-emerald-100 text-emerald-800">
              {selectedTemplate.category}
            </Badge>
          </div>

          {selectedTemplate.variables.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">
                Fill in template variables:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedTemplate.variables.map((variable) => (
                  <div key={variable}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {variable.charAt(0).toUpperCase() + variable.slice(1)}
                    </label>
                    <Input
                      placeholder={`Enter ${variable}...`}
                      value={templateVariables[variable] || ""}
                      onChange={(e) =>
                        handleVariableChange(variable, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {!selectedTemplate && (
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Content
              </label>
              <Textarea
                placeholder="Write your message here..."
                value={customMessage}
                onChange={(e) => onCustomMessageChange(e.target.value)}
                rows={6}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Sending Options */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Sending Options</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipients
            </label>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <Input placeholder="Enter phone numbers or email addresses..." />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule (Optional)
            </label>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <Input type="datetime-local" />
            </div>
          </div>
        </div>
      </Card>

      {/* Send Button */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              Ready to send via{" "}
              {selectedChannel === "whatsapp" ? "WhatsApp" : "Email"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Message will be delivered immediately unless scheduled
            </p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>
      </Card>
    </div>
  );
}
