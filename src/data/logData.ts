
export interface Log {
  id: number;
  level: string;
  message: string;
  timestamp: Date;
  source: string;
  file: string;
  line: number;
}

export const errorLogs: Log[] = [
  { 
    id: 1, 
    level: 'error', 
    message: 'Failed to connect to database', 
    timestamp: new Date(2023, 10, 15, 10, 30, 15), 
    source: 'DB Service',
    file: 'src/services/database.ts',
    line: 42
  },
  { 
    id: 2, 
    level: 'error', 
    message: 'Payment processing failed', 
    timestamp: new Date(2023, 10, 15, 9, 45, 22), 
    source: 'Payment Gateway',
    file: 'src/services/payments.ts',
    line: 128
  },
  { 
    id: 3, 
    level: 'error', 
    message: 'Failed to upload image: file too large', 
    timestamp: new Date(2023, 10, 15, 8, 30, 45), 
    source: 'Storage Service',
    file: 'src/services/storage.ts',
    line: 87
  },
];

export const infoLogs: Log[] = [
  { 
    id: 1, 
    level: 'info', 
    message: 'New user registered: john.doe@example.com', 
    timestamp: new Date(2023, 10, 15, 12, 10, 5), 
    source: 'Auth Service',
    file: 'src/services/auth.ts',
    line: 255
  },
  { 
    id: 2, 
    level: 'info', 
    message: 'Listing #1234 created by user #567', 
    timestamp: new Date(2023, 10, 15, 11, 45, 30), 
    source: 'Listing Service',
    file: 'src/services/listings.ts',
    line: 189
  },
  { 
    id: 3, 
    level: 'info', 
    message: 'Payment processed for order #8901', 
    timestamp: new Date(2023, 10, 15, 11, 30, 18), 
    source: 'Payment Service',
    file: 'src/services/payments.ts',
    line: 312
  },
  { 
    id: 4, 
    level: 'info', 
    message: 'Email sent to user@example.com', 
    timestamp: new Date(2023, 10, 15, 11, 15, 42), 
    source: 'Email Service',
    file: 'src/services/email.ts',
    line: 156
  },
  { 
    id: 5, 
    level: 'info', 
    message: 'Daily backup completed successfully', 
    timestamp: new Date(2023, 10, 15, 3, 0, 7), 
    source: 'Backup Service',
    file: 'src/services/backup.ts',
    line: 78
  },
];

export const warningLogs: Log[] = [
  { 
    id: 1, 
    level: 'warning', 
    message: 'High CPU usage detected: 85%', 
    timestamp: new Date(2023, 10, 15, 14, 20, 10), 
    source: 'Monitoring Service',
    file: 'src/services/monitoring.ts',
    line: 145
  },
  { 
    id: 2, 
    level: 'warning', 
    message: 'Rate limit approaching for API key: xxxxx', 
    timestamp: new Date(2023, 10, 15, 13, 55, 23), 
    source: 'API Gateway',
    file: 'src/services/api.ts',
    line: 267
  },
  { 
    id: 3, 
    level: 'warning', 
    message: 'Deprecated function used: oldFunction()', 
    timestamp: new Date(2023, 10, 15, 13, 40, 15), 
    source: 'Core Service',
    file: 'src/services/core.ts',
    line: 341
  },
];
