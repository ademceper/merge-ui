/**
 * Environment variables validation and type-safe access for React Native
 * 
 * This module provides type-safe access to environment variables
 * with runtime validation using Zod schemas.
 * 
 * Usage:
 *   import { env } from '@merge/uim/lib/env';
 *   const apiUrl = env.EXPO_PUBLIC_API_URL;
 */

import { z } from 'zod';
import Constants from 'expo-constants';

// Schema for environment variables
const envSchema = z.object({
  // API Configuration
  EXPO_PUBLIC_API_URL: z.string().url().optional().default('https://api.example.com'),
  
  // Monitoring & Analytics
  EXPO_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  
  // Feature Flags
  EXPO_PUBLIC_ENABLE_ANALYTICS: z.string().transform(val => val === 'true').optional().default('false'),
});

// Get environment variables from Expo Constants
function getEnv() {
  const expoConfig = Constants.expoConfig;
  const extra = expoConfig?.extra || {};
  
  try {
    return envSchema.parse({
      EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL || extra.EXPO_PUBLIC_API_URL,
      EXPO_PUBLIC_SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN || extra.EXPO_PUBLIC_SENTRY_DSN,
      EXPO_PUBLIC_ENABLE_ANALYTICS: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS || extra.EXPO_PUBLIC_ENABLE_ANALYTICS,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:', error.flatten().fieldErrors);
      throw new Error('Invalid environment variables. Please check your .env file or app.json extra config.');
    }
    throw error;
  }
}

export const env = getEnv();
export type Env = z.infer<typeof envSchema>;
