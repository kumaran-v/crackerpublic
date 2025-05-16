
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

// List of valid pincodes that are serviceable
const VALID_PINCODES = [
  '600001', '600017', '600020', '600040', '600011', 
  '600004', '600042', '600045', '600116', '600041', 
  '602001', '600054', '600053', '601204', '601102', 
  '600072', '600056', '600052', '602024', '601201'
];

export const ServiceablePincodes: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mt-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs"
      >
        {isOpen ? 'Hide Serviceable Pincodes' : 'View Serviceable Pincodes'}
      </Button>
      
      {isOpen && (
        <div className="mt-2 p-3 border rounded-md bg-gray-50">
          <h4 className="text-sm font-medium mb-2">Serviceable Pincodes:</h4>
          <ScrollArea className="h-32">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {VALID_PINCODES.map(pincode => (
                <div key={pincode} className="text-xs bg-white p-1 border rounded text-center">
                  {pincode}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default ServiceablePincodes;
