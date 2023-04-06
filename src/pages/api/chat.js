// const OPENAI_API_KEY = ''

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { prompt } = req.body

  if (!prompt) {
    return res.status(400).json({
      error: 'Prompt is required'
    })
  }

  try {
    // temporal
    return res.status(200).json({ response: 'Seguimos trabajando para darte una respuesta muy pronto' })
    // const response = await fetch('https://api.openai.com/v1/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${OPENAI_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: 'text-davinci-003',
    //     prompt: `Responde cómo si fueras la inteligencia artificial conversacional ChatGPT, El usuario te escribe un prompt y tú le debes contestar de forma natural. El prompt es:\n\n${prompt}`,
    //     max_tokens: 7,
    //     temperature: 0,
    //     top_p: 1,
    //     n: 1,
    //     stream: false,
    //     logprobs: null,
    //     stop: '\n'
    //   })
    // })
    //
    // if (!response.ok) {
    //   console.error(response.statusText)
    //   return res.status(500).json({ error: 'OpenAI API error' })
    // }
    //
    // const json = await response.json()
    // return res.status(200).json({ response: json.choices[0].text })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err })
  }
}
