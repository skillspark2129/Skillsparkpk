export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({error:'POST only'});
  const { prompt } = req.body;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if(!apiKey){
    return res.status(200).json({error:'No API Key'});
  }
  try{
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-api-key': apiKey,
        'anthropic-version':'2023-06-01'
      },
      body: JSON.stringify({
        model:'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages:[{role:'user', content:`You are a web developer for SkillSparkPK. User wants: ${prompt}. Return ONLY clean HTML code using TailwindCSS, no markdown, just HTML.`}]
      })
    });
    const data = await response.json();
    const code = data.content?.[0]?.text || '';
    const clean = code.replace(/```html|```/g,'').trim();
    return res.status(200).json({code: clean});
  }catch(e){
    return res.status(500).json({error: e.message});
  }
}
