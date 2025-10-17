"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, Plus, AlertCircle } from "lucide-react";
import type { Channel } from "./channel-selector";

export type MessageType = "approved" | "suggest";

interface MessageTypeSelectorProps {
  messageType: MessageType;
  onMessageTypeSelect: (type: MessageType) => void;
  selectedChannel: Channel;
}

export function MessageTypeSelector({
  messageType,
  onMessageTypeSelect,
  selectedChannel,
}: MessageTypeSelectorProps) {
  const messageTypes = [
    {
      id: "approved" as MessageType,
      name: "Approved Template",
      description: "Select from pre-approved message templates",
      icon: FileText,
      benefits: [
        "Instant sending",
        "Compliance guaranteed",
        "Proven performance",
      ],
      recommended: true,
      availableCount: selectedChannel === "whatsapp" ? 12 : 8,
    },
    {
      id: "suggest" as MessageType,
      name: "Suggest New Template",
      description: "Create a new template for admin approval",
      icon: Plus,
      benefits: ["Custom messaging", "Brand flexibility", "Future reusability"],
      recommended: false,
      note: "Requires admin approval before sending",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {messageTypes.map((type) => {
        const Icon = type.icon;
        const isSelected = messageType === type.id;

        return (
          <Card
            key={type.id}
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
              isSelected
                ? "border-[var(--brand-color)] bg-[var(--brand-color3)] shadow-lg"
                : "border-gray-200 hover:border-[var(--brand-color2)] bg-white"
            }`}
            onClick={() => onMessageTypeSelect(type.id)}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-xl ${
                    isSelected
                      ? "bg-[var(--brand-color)] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {type.name}
                    </h3>
                    {type.recommended && (
                      <Badge className="bg-[var(--brand-color)] text-white text-xs font-medium">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
              {isSelected && (
                <div className="bg-[var(--brand-color)] rounded-full p-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            <div className="space-y-4">
              {type.availableCount && (
                <Badge
                  variant="outline"
                  className={`${
                    isSelected
                      ? "border-[var(--brand-color)] text-[var(--brand-color)] bg-white"
                      : "border-[var(--brand-color2)] text-[var(--brand-color)]"
                  } font-medium`}
                >
                  {type.availableCount} templates available
                </Badge>
              )}

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">
                  Benefits:
                </h4>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? "bg-[var(--brand-color)]" : "bg-gray-400"
                        }`}
                      />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {type.note && (
                <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-800 font-medium">
                    {type.note}
                  </p>
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
