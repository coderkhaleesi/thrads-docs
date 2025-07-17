const fs = require('fs');
const path = require('path');

const openApiPath = path.join(__dirname, '../api-reference/openapi.json');
const openApiSpec = JSON.parse(fs.readFileSync(openApiPath, 'utf8'));

const isDev = process.env.NODE_ENV === 'development';
const devServer = openApiSpec.servers.find(s => s.url.includes('localhost'));
const prodServer = openApiSpec.servers.find(s => s.url.includes('thrads.ai'));

// Reorder servers based on environment
if (isDev) {
  openApiSpec.servers = [devServer, prodServer].filter(Boolean);
} else {
  openApiSpec.servers = [prodServer, devServer].filter(Boolean);
}

fs.writeFileSync(openApiPath, JSON.stringify(openApiSpec, null, 2));
console.log(`Updated OpenAPI servers for ${isDev ? 'development' : 'production'} environment`); 