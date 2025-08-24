import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function AdminClaimsTest() {
  const [loading, setLoading] = useState(false);

  console.log('AdminClaimsTest component is rendering');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Claims Management (Test)</h1>
        <Button onClick={() => console.log('Button clicked')}>
          Test Button
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Claims Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a test component to verify claims page is working.</p>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="text-center">Claims component loaded successfully!</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
