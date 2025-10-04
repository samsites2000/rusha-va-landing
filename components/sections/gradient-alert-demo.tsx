'use client';

import * as React from 'react';
import { GradientAlert, GradientAlertProps } from '@/components/ui/alert'; // Adjust path as needed
import { Button } from '@/components/ui/button'; // shadcn/ui button
import { AnimatePresence } from 'framer-motion';

// A simple unique ID generator
const generateId = (() => {
  let counter = 0;
  return () => `alert_${++counter}`;
})();

type AlertItem = { id: string } & Omit<GradientAlertProps, 'onClose'>;

export default function GradientAlertDemo() {
  const [alerts, setAlerts] = React.useState<AlertItem[]>([]);

  // Function to add a new alert to the list
  const addAlert = (variant: GradientAlertProps['variant']) => {
    const newAlert: AlertItem = {
      id: generateId(),
      variant: variant,
      title: variant ? variant.charAt(0).toUpperCase() + variant.slice(1) : 'Alert',
      description: 'Anyone with a link can now view this file.',
    };
    setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
  };

  // Function to remove an alert by its ID
  const removeAlert = (id: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-8">
      {/* Controls to trigger alerts */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant="outline" onClick={() => addAlert('information')}>
          Info
        </Button>
        <Button variant="outline" onClick={() => addAlert('success')}>
          Success
        </Button>
        <Button variant="outline" onClick={() => addAlert('warning')}>
          Warning
        </Button>
        <Button variant="outline" onClick={() => addAlert('error')}>
          Error
        </Button>
      </div>

      {/* Container for the alerts */}
      <div className="w-full flex flex-col space-y-2">
        <AnimatePresence>
          {alerts.map(({ id, ...props }) => (
            <GradientAlert
              key={id}
              {...props}
              onClose={() => removeAlert(id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}