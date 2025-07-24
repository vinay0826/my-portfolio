#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';

console.log('🚀 Starting GitHub Pages deployment...\n');

try {
  // Clean previous build
  if (existsSync('dist')) {
    console.log('🧹 Cleaning previous build...');
    rmSync('dist', { recursive: true, force: true });
  }

  // Build static site
  console.log('⚡ Building static site...');
  execSync('npx vite build --config vite.config.static.ts', { stdio: 'inherit' });

  // Deploy to GitHub Pages
  console.log('🌐 Deploying to GitHub Pages...');
  execSync('npx gh-pages -d dist', { stdio: 'inherit' });

  console.log('\n✅ Deployment successful!');
  console.log('📱 Your portfolio will be available at: https://yourusername.github.io/repository-name');

} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  process.exit(1);
}