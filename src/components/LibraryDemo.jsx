import React from 'react';
import { Card, Button } from '../lib';

export const LibraryDemo = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f5f5f5' }}>
      <h1>Component Library Demo</h1>
      
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        
        <Card title="Default Card" subtitle="Basic card example">
          <p>This is a default card with title, subtitle, and content.</p>
          <Button>Action Button</Button>
        </Card>

        <Card 
          title="Outlined Card" 
          variant="outlined"
          hoverable
        >
          <p>This card has an outlined variant and hover effect.</p>
        </Card>

        <Card 
          title="Elevated Card" 
          variant="elevated"
          image="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=200&fit=crop"
        >
          <p>This card has elevation and an image header.</p>
        </Card>

        <Card 
          title="Card with Actions"
          subtitle="Multiple buttons"
          actions={
            <div>
              <Button variant="secondary" style={{ marginRight: '0.5rem' }}>
                Cancel
              </Button>
              <Button variant="primary">
                Confirm
              </Button>
            </div>
          }
        >
          <p>This card demonstrates the actions prop.</p>
        </Card>

      </div>
    </div>
  );
};