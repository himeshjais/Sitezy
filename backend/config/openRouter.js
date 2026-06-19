export const generateResponse = async (prompt) => {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'openrouter/free',
    messages: [
        // written by me this system
        {
            role: 'system',
            content: 'You must return valid raw json only.',
        },
       { 
        role: 'user',
        content: prompt,
      },
    ],
    // by me
    temperature: 0.2 // iten temperature pr ye response chahiye
  }),
});

    // jb response ok nhi hoga error show krwa denge
    if(!res.ok){
        const err = await res.text()
        throw new Error('openrouter err' + err)
    }

    // agr sb kch sahi rha hamar data aa jaega
    const data = await res.json()
    return data.choices[0].message.content
}
