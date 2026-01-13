/**
 * Environment variables validation and type-safe access
 * 
 * This module provides type-safe access to environment variables
 * with runtime validation using Zod schemas.
 * 
 * Usage:
 *   import { env } from '@merge/ui/lib/env';
 *   const apiUrl = env.EXPO_PUBLIC_API_URL;
 */

import { z } from 'zod';

// Schema for environment variables
const envSchema = z.object({
  // API Configuration
  EXPO_PUBLIC_API_URL: z.string().url().optional().default('https://api.example.com'),
  NEXT_PUBLIC_API_URL: z.string().url().optional().default('https://api.example.com'),
  
  // Monitoring & Analytics
  EXPO_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  
  // Database (if needed)
  DATABASE_URL: z.string().url().optional(),
  
  // Feature Flags
  EXPO_PUBLIC_ENABLE_ANALYTICS: z.string().transform(val => val === 'true').optional().default('false'),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.string().transform(val => val === 'true').optional().default('false'),
  
  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).optional().default('development'),
});

// Parse and validate environment variables
function getEnv() {
  try {
    return envSchema.parse({
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      EXPO_PUBLIC_SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
      NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
      DATABASE_URL: process.env.DATABASE_URL,
      EXPO_PUBLIC_ENABLE_ANALYTICS: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS,
      NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
      NODE_ENV: process.env.NODE_ENV,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:', error.flatten().fieldErrors);
      throw new Error('Invalid environment variables. Please check your .env file.');
    }
    throw error;
  }
}

export const env = getEnv();
export type Env = z.infer<typeof envSchema>;
