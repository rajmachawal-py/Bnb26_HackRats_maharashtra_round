const fs = require('fs');

async function run() {
  const env = fs.readFileSync('.env.local', 'utf8');
  const match = env.match(/GEMINI_API_KEY=\x22?([^\x22\n\r]+)/);
  const apiKey = match ? match[1].trim() : null;

  const prompt = `Return {"test": true}`;

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    console.log('STATUS:', response.status);
    console.log('STATUS TEXT:', response.statusText);
    const data = await response.json();
    console.log('DATA:', JSON.stringify(data, null, 2));
  } catch(e) {
    console.error('ERROR:', e.message);
  }
}
run();
