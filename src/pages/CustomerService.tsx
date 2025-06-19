
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Headphones, Phone, User, MessageCircle, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useConversation } from '@11labs/react';

const CustomerService = () => {
  const [apiKey, setApiKey] = useState('');
  const [agentId, setAgentId] = useState('');
  const [isSetup, setIsSetup] = useState(false);
  const { toast } = useToast();

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs');
      toast({
        title: "Connected",
        description: "Voice AI is now ready to help you!",
      });
    },
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs');
      toast({
        title: "Disconnected",
        description: "Voice conversation has ended.",
      });
    },
    onMessage: (message) => {
      console.log('Message received:', message);
    },
    onError: (error) => {
      console.error('Conversation error:', error);
      toast({
        title: "Error",
        description: "Something went wrong with the voice conversation.",
        variant: "destructive",
      });
    }
  });

  const handleSetup = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your ElevenLabs API key.",
        variant: "destructive",
      });
      return;
    }

    if (!agentId.trim()) {
      toast({
        title: "Agent ID Required",
        description: "Please enter your ElevenLabs Agent ID.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsSetup(true);
      
      toast({
        title: "Setup Complete",
        description: "Ready to start voice conversation!",
      });
    } catch (error) {
      console.error('Microphone access error:', error);
      toast({
        title: "Microphone Access Required",
        description: "Please allow microphone access to use voice AI.",
        variant: "destructive",
      });
    }
  };

  const startConversation = async () => {
    try {
      // Generate signed URL using the API key and agent ID
      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
        {
          method: "GET",
          headers: {
            "xi-api-key": apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get signed URL');
      }

      const data = await response.json();
      await conversation.startSession({ url: data.signed_url });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to ElevenLabs. Please check your API key and Agent ID.",
        variant: "destructive",
      });
    }
  };

  const endConversation = async () => {
    await conversation.endSession();
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

        {/* Setup Form */}
        {!isSetup && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                Setup Voice AI
              </CardTitle>
              <CardDescription>
                Enter your ElevenLabs credentials to activate the voice AI customer service
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
              <div className="space-y-2">
                <Label htmlFor="agentId">Agent ID</Label>
                <Input
                  id="agentId"
                  placeholder="Enter your ElevenLabs Agent ID"
                  value={agentId}
                  onChange={(e) => setAgentId(e.target.value)}
                />
              </div>
              <Button onClick={handleSetup} className="w-full">
                Setup Voice AI
              </Button>
              <Alert>
                <AlertDescription>
                  You need an ElevenLabs API key and Agent ID. Create an agent at elevenlabs.io and get your API key from your profile.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Voice AI Interface */}
        {isSetup && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Voice AI Customer Service
                </div>
                <Badge variant={conversation.status === 'connected' ? 'default' : 'secondary'}>
                  {conversation.status === 'connected' ? 'Connected' : 'Disconnected'}
                </Badge>
              </CardTitle>
              <CardDescription>
                Start a conversation with the AI customer service agent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors ${
                  conversation.isSpeaking ? 'bg-green-100 animate-pulse' : 'bg-blue-100'
                }`}>
                  {conversation.status === 'connected' ? (
                    conversation.isSpeaking ? (
                      <Mic className="h-12 w-12 text-green-600" />
                    ) : (
                      <Headphones className="h-12 w-12 text-blue-600" />
                    )
                  ) : (
                    <MicOff className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium">
                    {conversation.status === 'connected' 
                      ? (conversation.isSpeaking ? 'AI is Speaking...' : 'Listening...') 
                      : 'AI Agent Ready'}
                  </p>
                  <p className="text-gray-600">
                    {conversation.status === 'connected' 
                      ? 'Speak naturally - I\'m here to help!' 
                      : 'Click to start conversation'}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                {conversation.status !== 'connected' ? (
                  <Button size="lg" onClick={startConversation} className="bg-green-600 hover:bg-green-700">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Start Conversation
                  </Button>
                ) : (
                  <Button size="lg" variant="destructive" onClick={endConversation}>
                    <MicOff className="h-5 w-5 mr-2" />
                    End Conversation
                  </Button>
                )}
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
