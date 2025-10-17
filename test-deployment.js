#!/usr/bin/env node

/**
 * Deployment Test Script
 * This script helps test if the built application works correctly
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Testing deployment build...\n');

// Check if dist folder exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ dist folder not found. Run "npm run build" first.');
  process.exit(1);
}

// Check if index.html exists
const indexPath = path.join(distPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ index.html not found in dist folder.');
  process.exit(1);
}

// Read and analyze index.html
const indexContent = fs.readFileSync(indexPath, 'utf8');
console.log('✅ index.html found');

// Check for script tags
const scriptTags = indexContent.match(/<script[^>]*>/g) || [];
console.log(`📜 Found ${scriptTags.length} script tags`);

// Check for modulepreload links
const preloadLinks = indexContent.match(/<link[^>]*rel="modulepreload"[^>]*>/g) || [];
console.log(`🔗 Found ${preloadLinks.length} modulepreload links`);

// Check if all referenced assets exist
const assetMatches = indexContent.match(/src="\/assets\/[^"]+"/g) || [];
const missingAssets = [];

assetMatches.forEach(match => {
  const assetPath = match.match(/src="([^"]+)"/)[1];
  const fullPath = path.join(distPath, assetPath);
  if (!fs.existsSync(fullPath)) {
    missingAssets.push(assetPath);
  }
});

if (missingAssets.length > 0) {
  console.error('❌ Missing assets:');
  missingAssets.forEach(asset => console.error(`   - ${asset}`));
  process.exit(1);
} else {
  console.log('✅ All referenced assets exist');
}

// Check for potential issues in JS files
const assetsDir = path.join(distPath, 'assets');
const jsFiles = fs.readdirSync(assetsDir).filter(file => file.endsWith('.js'));

console.log(`\n📦 Analyzing ${jsFiles.length} JavaScript files...`);

let hasIssues = false;

jsFiles.forEach(file => {
  const filePath = path.join(assetsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check for common problematic patterns
  const issues = [];
  
  // Check for "Cannot access before initialization" patterns
  if (content.includes('Cannot access') && content.includes('before initialization')) {
    issues.push('Potential "Cannot access before initialization" error');
  }
  
  // Check for undefined variable references
  if (content.includes('ReferenceError')) {
    issues.push('Potential ReferenceError');
  }
  
  // Check for circular dependency patterns
  if (content.includes('circular') || content.includes('circular dependency')) {
    issues.push('Potential circular dependency');
  }
  
  if (issues.length > 0) {
    console.error(`❌ ${file}:`);
    issues.forEach(issue => console.error(`   - ${issue}`));
    hasIssues = true;
  }
});

if (!hasIssues) {
  console.log('✅ No obvious issues found in JavaScript files');
}

console.log('\n🎉 Deployment test completed!');
console.log('\n📋 Next steps:');
console.log('1. Deploy the dist folder to your hosting platform');
console.log('2. Test the deployed application in a browser');
console.log('3. Check browser console for any runtime errors');
console.log('4. If issues persist, check the browser network tab for failed requests');

if (hasIssues) {
  console.log('\n⚠️  Issues were found. Consider reviewing the build configuration.');
  process.exit(1);
}
