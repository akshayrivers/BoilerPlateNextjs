'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { SessionProvider, useSession } from 'next-auth/react';
import React, { useState } from 'react';

const Page = () => {
  const session= useSession()
  const username= session.data?.user.username;
  const [content, setContent] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 
  const { toast } = useToast();

  const handleInputChange = (
    e:any,
    setter:any
  ) => {
    setter(e.target.value); 
  };


  const handleSendMessage = async () => {
    if ( content.trim() === '') {
      toast({
        title: 'Error',
        description: 'Please provide both username and message!',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true); 
    try {
      const response = await axios.post('/api/send-message', {
        username,
        content: content,
      });

      if (response.status === 200) {
        toast({
          title: 'Message Sent',
          description: 'Your message was sent successfully!',
        });
        setContent('');
      } else {
        toast({
          title: 'Error',
          description: response.data.message || 'Failed to send the message.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Profile</h1>
      <div className="flex flex-col gap-4">
        <label htmlFor="anonymousMessage" className="font-medium">
          Send an anonymous message
        </label>
        <Input
          id="anonymousMessage"
          type="text"
          value={content} 
          onChange={(e) => handleInputChange(e, setContent)} 
          placeholder="Type your message here"
          className="p-2 border rounded"
        />
        <Button
          onClick={handleSendMessage} 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={isLoading} 
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </div>
  );
};

export default Page;
