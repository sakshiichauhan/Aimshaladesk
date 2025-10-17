"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import type { Template } from "../../../types/types";

interface AdminControlsProps {
  templates: Template[];
  onTemplateUpdate: (
    templateId: string,
    status: "approved" | "rejected"
  ) => void;
}

export function AdminControls({
  templates,
  onTemplateUpdate,
}: AdminControlsProps) {
  const [activeTab, setActiveTab] = useState("pending");

  const pendingTemplates = templates.filter((t) => t.status === "pending");
  const approvedTemplates = templates.filter((t) => t.status === "approved");

  const stats = {
    totalTemplates: templates.length,
    pendingApproval: pendingTemplates.length,
    totalSent: templates.reduce(
      (sum, t) => sum + (t.performance?.sent || 0),
      0
    ),
    avgDeliveryRate:
      templates.length > 0
        ? templates.reduce((sum, t) => {
            const rate = t.performance
              ? (t.performance.delivered / t.performance.sent) * 100
              : 0;
            return sum + rate;
          }, 0) / templates.length
        : 0,
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <BarChart3 className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="font-semibold text-gray-900">Admin Controls</h3>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-semibold text-gray-900">
            {stats.totalTemplates}
          </div>
          <div className="text-xs text-gray-500">Total Templates</div>
        </div>
        <div className="text-center p-3 bg-amber-50 rounded-lg">
          <div className="text-lg font-semibold text-amber-800">
            {stats.pendingApproval}
          </div>
          <div className="text-xs text-amber-600">Pending Approval</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-lg font-semibold text-green-800">
            {stats.totalSent.toLocaleString()}
          </div>
          <div className="text-xs text-green-600">Messages Sent</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-lg font-semibold text-blue-800">
            {stats.avgDeliveryRate.toFixed(1)}%
          </div>
          <div className="text-xs text-blue-600">Avg Delivery</div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Pending ({pendingTemplates.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center space-x-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingTemplates.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p>No templates pending approval</p>
            </div>
          ) : (
            pendingTemplates.map((template) => (
              <div
                key={template.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {template.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{template.channel}</Badge>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800">
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                </div>

                <p className="text-sm text-gray-600 mb-4">{template.content}</p>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => onTemplateUpdate(template.id, "approved")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onTemplateUpdate(template.id, "rejected")}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">
              Top Performing Templates
            </h4>
            {approvedTemplates
              .sort(
                (a, b) =>
                  (b.performance?.sent || 0) - (a.performance?.sent || 0)
              )
              .slice(0, 3)
              .map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-sm text-gray-900">
                      {template.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {template.category}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {template.performance?.sent || 0} sent
                    </div>
                    <div className="text-xs text-gray-500">
                      {template.performance
                        ? `${(
                            (template.performance.delivered /
                              template.performance.sent) *
                            100
                          ).toFixed(1)}% delivered`
                        : "No data"}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
