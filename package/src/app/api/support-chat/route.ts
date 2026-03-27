import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from 'ai'

export const maxDuration = 30

// Support context for the AI assistant
const SYSTEM_PROMPT = `Você é o assistente de suporte virtual do TikCash. Seja amigável, profissional e prestativo.

INFORMAÇÕES IMPORTANTES:
- Email de suporte: contactmgcomp@gmail.com
- O TikCash é uma plataforma de cursos e recompensas
- Política de reembolso: 30 dias após a compra
- Para solicitar reembolso: enviar email para contactmgcomp@gmail.com com código de compra

REGRAS:
1. Responda SEMPRE em português do Brasil
2. Seja conciso e direto
3. Para questões de reembolso, direcione para o email: contactmgcomp@gmail.com
4. Para problemas técnicos, sugira reiniciar o app ou limpar cache
5. Para dúvidas sobre pagamentos, explique que o prazo é de até 7 dias úteis
6. Nunca prometa algo que não pode cumprir
7. Se não souber responder, direcione para o email de suporte

RESPOSTAS RÁPIDAS:
- Reembolso: "Por favor, entre em contato conosco pelo email contactmgcomp@gmail.com informando seu código de compra e motivo do reembolso."
- Saque: "Os saques são processados em até 7 dias úteis. Verifique se seus dados bancários estão corretos."
- Acesso: "Se está tendo problemas de acesso, tente sair e entrar novamente no app."
- Cursos: "Nossos cursos ficam disponíveis permanentemente após a compra."

Mantenha as respostas curtas (máximo 3 frases) a menos que precise explicar algo mais complexo.`

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()

    const result = streamText({
      model: 'openai/gpt-4o-mini',
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      abortSignal: req.signal,
      maxTokens: 500,
      temperature: 0.7,
    })

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      consumeSseStream: consumeStream,
    })
  } catch (error) {
    console.error('Support chat error:', error)
    return new Response(
      JSON.stringify({ error: 'Erro no chat de suporte. Tente novamente.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
