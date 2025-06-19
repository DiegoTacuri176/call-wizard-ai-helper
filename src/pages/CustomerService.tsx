
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useConversation } from '@11labs/react';
import SetupForm from '@/components/customer-service/SetupForm';
import VoiceInterface from '@/components/customer-service/VoiceInterface';
import SampleScenarios from '@/components/customer-service/SampleScenarios';
import FeaturesList from '@/components/customer-service/FeaturesList';

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

  const handleSetupComplete = () => {
    setIsSetup(true);
  };

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
          <SetupForm
            apiKey={apiKey}
            setApiKey={setApiKey}
            agentId={agentId}
            setAgentId={setAgentId}
            onSetupComplete={handleSetupComplete}
          />
        )}

        {/* Voice AI Interface */}
        {isSetup && (
          <VoiceInterface
            apiKey={apiKey}
            agentId={agentId}
            conversation={conversation}
          />
        )}

        {/* Sample Scenarios */}
        <SampleScenarios />

        {/* Features */}
        <FeaturesList />
      </div>
    </div>
  );
};

export default CustomerService;
