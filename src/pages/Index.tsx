
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Headphones, Phone, MessageCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <h1 className="text-5xl font-bold text-gray-900">AI Voice Agents Demo</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of customer service with intelligent AI voice agents that understand and respond naturally.
          </p>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-6 w-6 text-blue-600" />
                Customer Service AI
              </CardTitle>
              <CardDescription>
                Interactive voice AI agent for customer support scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  Real-time voice interaction
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MessageCircle className="h-4 w-4" />
                  Natural conversation flow
                </div>
              </div>
              <Button asChild className="w-full">
                <Link to="/customer-service">
                  Try Customer Service Demo
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-400">
                <Phone className="h-6 w-6" />
                More Demos Coming Soon
              </CardTitle>
              <CardDescription>
                Additional AI voice agent demonstrations will be available soon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-500">
                <div>• Sales Assistant AI</div>
                <div>• Technical Support Bot</div>
                <div>• Appointment Booking Agent</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card>
          <CardHeader>
            <CardTitle>Why Choose AI Voice Agents?</CardTitle>
            <CardDescription>
              Transform your customer interactions with intelligent voice technology
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                  <Headphones className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium">24/7 Availability</h3>
                <p className="text-sm text-gray-600">Always ready to help customers</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium">Natural Conversations</h3>
                <p className="text-sm text-gray-600">Human-like voice interactions</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium">Cost Effective</h3>
                <p className="text-sm text-gray-600">Reduce support costs significantly</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
