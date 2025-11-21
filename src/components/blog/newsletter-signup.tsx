'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup API
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <Card className="bg-gradient-to-r from-blue-600/10 via-violet-600/10 to-blue-600/10 dark:from-blue-600/20 dark:via-violet-600/20 dark:to-blue-600/20 border-blue-500/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-xl">Subscribe to Newsletter</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Get the latest posts delivered right to your inbox. No spam, unsubscribe anytime.
        </p>
      </CardHeader>
      <CardContent>
        {isSubscribed ? (
          <div className="flex items-center justify-center gap-2 py-4 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Thanks for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white border-0">
              Subscribe
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
