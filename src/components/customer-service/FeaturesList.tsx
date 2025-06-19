
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, MessageCircle, User } from "lucide-react";

const FeaturesList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Customer Service Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
              <Headphones className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium">Natural Voice</h3>
            <p className="text-sm text-gray-600">High-quality, human-like voice responses</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium">Smart Responses</h3>
            <p className="text-sm text-gray-600">AI-powered understanding and helpful solutions</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-medium">24/7 Available</h3>
            <p className="text-sm text-gray-600">Always ready to help your customers</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturesList;
