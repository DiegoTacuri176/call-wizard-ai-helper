
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Headphones, Phone, User, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CustomerService = () => {
  const [apiKey, setApiKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [conversationStatus, setConversationStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your ElevenLabs API key to connect.",
        variant: "destructive",
      });
      return;
    }

    try {
      setConversationStatus('connecting');
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsConnected(true);
      setConversationStatus('connected');
      
      toast({
        title: "Connected Successfully",
        description: "Voice AI customer service is now active.",
      });
    } catch (error) {
      console.error('Connection error:', error);
      setConversationStatus('disconnected');
      toast({
        title: "Connection Failed",
        description: "Failed to connect to ElevenLabs API. Please check your API key.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setConversationStatus('disconnected');
    toast({
      title: "Disconnected",
      description: "Voice AI customer service has been disconnected.",
    });
  };

  const sampleScenarios = [
    { id: 1, title: "Order Status Inquiry", description: "Customer asking about their recent order" },
    { id: 2, title: "Product Return", description: "Customer wants to return a defective product" },
    { id: 3, title: "Billing Question", description: "Customer has questions about their bill" },
    { id: 4, title: "Technical Support", description: "Customer needs help with product setup" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">AI Customer Service Demo</h1>
          <p className="text-lg text-gray-600">Experience intelligent voice-powered customer support</p>
        </div>

        {/* API Key Setup */}
        {!isConnected && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                Setup Voice AI
              </CardTitle>
              <CardDescription>
                Enter your ElevenLabs API key to activate the voice AI customer service
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">ElevenLabs API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your ElevenLabs API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleConnect} 
                disabled={conversationStatus === 'connecting'}
                className="w-full"
              >
                {conversationStatus === 'connecting' ? 'Connecting...' : 'Connect Voice AI'}
              </Button>
              <Alert>
                <AlertDescription>
                  You need an ElevenLabs API key to use this demo. Sign up at elevenlabs.io to get your API key.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Voice AI Interface */}
        {isConnected && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Voice AI Customer Service
                </div>
                <Badge variant={conversationStatus === 'connected' ? 'default' : 'secondary'}>
                  {conversationStatus === 'connected' ? 'Active' : 'Inactive'}
                </Badge>
              </CardTitle>
              <CardDescription>
                Click the microphone button to start talking with the AI customer service agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                  <Headphones className="h-12 w-12 text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium">AI Agent Ready</p>
                  <p className="text-gray-600">Speak naturally - I'm here to help!</p>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start Conversation
                </Button>
                <Button variant="outline" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sample Scenarios */}
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

        {/* Features */}
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
      </div>
    </div>
  );
};

export default CustomerService;
