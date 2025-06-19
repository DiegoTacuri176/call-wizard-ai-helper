
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Headphones } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SetupFormProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  agentId: string;
  setAgentId: (id: string) => void;
  onSetupComplete: () => void;
}

const SetupForm = ({ apiKey, setApiKey, agentId, setAgentId, onSetupComplete }: SetupFormProps) => {
  const { toast } = useToast();

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
      onSetupComplete();
      
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

  return (
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
  );
};

export default SetupForm;
