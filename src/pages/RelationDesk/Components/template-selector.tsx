"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, TrendingUp, CheckCircle } from "lucide-react";
import type { Template, Channel, MessageType } from "../../../types/types";

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: Template | null;
  onTemplateSelect: (template: Template | null) => void;
  selectedChannel: Channel;
  messageType: MessageType;
  customMessage: string;
  onCustomMessageChange: (message: string) => void;
}

export function TemplateSelector({
  templates,
  selectedTemplate,
  onTemplateSelect,
  selectedChannel,
  messageType,
  customMessage,
  onCustomMessageChange,
}: TemplateSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredTemplates = templates.filter((template) => {
    const matchesChannel = template.channel === selectedChannel;
    const matchesStatus =
      messageType === "approved" ? template.status === "approved" : true;
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;

    return matchesChannel && matchesStatus && matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    ...Array.from(new Set(templates.map((t) => t.category))),
  ];

  if (messageType === "suggest") {
    return (
      <div className="space-y-6">
        <Card className="p-8 border-2 border-[var(--brand-color2)] bg-[var(--brand-color3)]">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Template Name
              </label>
              <Input
                placeholder="Enter template name..."
                className="border-2 border-gray-200 focus:border-[var(--brand-color)] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Message Content
              </label>
              <Textarea
                placeholder="Write your message here... Use {{variableName}} for dynamic content"
                value={customMessage}
                onChange={(e) => onCustomMessageChange(e.target.value)}
                rows={6}
                className="border-2 border-gray-200 focus:border-[var(--brand-color)] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Category
              </label>
              <Input
                placeholder="e.g., promotional, transactional, reminder"
                className="border-2 border-gray-200 focus:border-[var(--brand-color)] bg-white"
              />
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border-2 border-amber-200">
              <p className="text-sm text-amber-800 font-medium">
                <strong>Note:</strong> This template will be submitted for admin
                approval before it can be used.
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="p-6 border-2 border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 border-2 border-gray-200 focus:border-[var(--brand-color)] bg-white"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-[var(--brand-color)] hover:bg-[var(--brand-color)]/90 text-white font-medium"
                    : "border-[var(--brand-color2)] text-[var(--brand-color)] hover:bg-[var(--brand-color3)]"
                }
              >
                {category === "all"
                  ? "All"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplate?.id === template.id;

          return (
            <Card
              key={template.id}
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                isSelected
                  ? "border-[var(--brand-color)] bg-[var(--brand-color3)] shadow-lg"
                  : "border-gray-200 hover:border-[var(--brand-color2)] bg-white"
              }`}
              onClick={() => onTemplateSelect(template)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {template.name}
                    </h3>
                    <Badge
                      className={
                        template.status === "approved"
                          ? "bg-[var(--brand-color)] text-white font-medium"
                          : "bg-gray-200 text-gray-700"
                      }
                    >
                      {template.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-[var(--brand-color2)] text-[var(--brand-color)] font-medium"
                    >
                      {template.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {template.content}
                  </p>

                  {template.variables.length > 0 && (
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xs font-semibold text-gray-600">
                        Variables:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable) => (
                          <Badge
                            key={variable}
                            variant="outline"
                            className="text-xs border-[var(--brand-color2)] text-[var(--brand-color)]"
                          >
                            {`{{${variable}}}`}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {isSelected && (
                  <div className="bg-[var(--brand-color)] rounded-full p-1 ml-4">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-6">
                  {template.lastUsed && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Used {template.lastUsed.toLocaleDateString()}</span>
                    </div>
                  )}
                  {template.performance && (
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>{template.performance.sent} sent</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <Card className="p-12 text-center border-2 border-gray-200">
          <p className="text-gray-500 text-lg mb-4">
            No templates found matching your criteria.
          </p>
          <Button
            variant="outline"
            className="border-[var(--brand-color)] text-[var(--brand-color)] hover:bg-[var(--brand-color3)] bg-transparent"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
          >
            Clear Filters
          </Button>
        </Card>
      )}
    </div>
  );
}
