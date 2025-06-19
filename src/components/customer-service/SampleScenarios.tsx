
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SampleScenarios = () => {
  const sampleScenarios = [
    { id: 1, title: "Order Status Inquiry", description: "Customer asking about their recent order" },
    { id: 2, title: "Product Return", description: "Customer wants to return a defective product" },
    { id: 3, title: "Billing Question", description: "Customer has questions about their bill" },
    { id: 4, title: "Technical Support", description: "Customer needs help with product setup" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample Customer Service Scenarios</CardTitle>
        <CardDescription>
          Try these common customer service situations with the AI agent
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleScenarios.map((scenario) => (
            <div key={scenario.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <h3 className="font-medium text-gray-900">{scenario.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SampleScenarios;
