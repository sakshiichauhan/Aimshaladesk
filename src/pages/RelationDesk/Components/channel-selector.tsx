"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail, CheckCircle } from "lucide-react";

export type Channel = "whatsapp" | "email";

interface ChannelSelectorProps {
  selectedChannel: Channel;
  onChannelSelect: (channel: Channel) => void;
}

export function ChannelSelector({
  selectedChannel,
  onChannelSelect,
}: ChannelSelectorProps) {
  const channels = [
    {
      id: "whatsapp" as Channel,
      name: "WhatsApp",
      icon: MessageCircle,
      description: "Send messages via WhatsApp Business API",
      status: "active",
      features: ["Rich media support", "Read receipts", "Template messages"],
      stats: { sent: "12.5K", delivered: "98.2%", opened: "89.1%" },
    },
    {
      id: "email" as Channel,
      name: "Email",
      icon: Mail,
      description: "Send professional email campaigns",
      status: "active",
      features: ["HTML templates", "Analytics tracking", "A/B testing"],
      stats: { sent: "45.2K", delivered: "96.8%", opened: "24.3%" },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {channels.map((channel) => {
        const Icon = channel.icon;
        const isSelected = selectedChannel === channel.id;

        return (
          <Card
            key={channel.id}
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
              isSelected
                ? "border-[var(--brand-color)] bg-[var(--brand-color3)] shadow-lg"
                : "border-gray-200 hover:border-[var(--brand-color2)] bg-white"
            }`}
            onClick={() => onChannelSelect(channel.id)}
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
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {channel.name}
                  </h3>
                  <p className="text-sm text-gray-600">{channel.description}</p>
                </div>
              </div>
              {isSelected && (
                <div className="bg-[var(--brand-color)] rounded-full p-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Badge
                  className={`${
                    isSelected
                      ? "bg-[var(--brand-color)] text-white"
                      : "bg-[var(--brand-color2)] text-[var(--brand-color)]"
                  } font-medium`}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900">
                  Features:
                </h4>
                <ul className="space-y-2">
                  {channel.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? "bg-[var(--brand-color)]" : "bg-gray-400"
                        }`}
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {channel.stats.sent}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      Sent
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {channel.stats.delivered}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      Delivered
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      {channel.stats.opened}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      Opened
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
