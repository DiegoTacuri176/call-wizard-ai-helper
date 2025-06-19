
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, Mic, MicOff, Headphones } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceInterfaceProps {
  apiKey: string;
  agentId: string;
  conversation: any;
}

const VoiceInterface = ({ apiKey, agentId, conversation }: VoiceInterfaceProps) => {
  const { toast } = useToast();

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
      await conversation.startSession({ 
        signedUrl: data.signed_url 
      });
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

  return (
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
  );
};

export default VoiceInterface;
