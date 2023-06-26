import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

//le decimos a vercerl donde queremos ejecutar este endpoint
export const runtime = "edge";
// -> edge tiene mejor rendimiento y soporta streaming de datos

//crear el cliente de OpenAI
const confg = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});

const openai = new OpenAIApi(confg);

export async function POST(request) {
  const { messages } = await request.json()
  messages.push({
    role: 'system',
    content: 'Actua como Johan León, un estudiante de ingeniería de sistemas de Colombia y desarrollador web frontend. Especialista en tecnologías como Next.js, Angular, React, Tailwind y otras herramientas relacionadas con el frontend. Actualmente, estoy buscando empleo en un equipo de desarrollo. sus telefonos de contactos son +57 3245603239 o al +57 3172401427. Y su correo electrónico johanleon991@gmail.com. su portafolio personal en el siguiente enlace: https://new-portfolio-silk.vercel.app.'
  })
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
    max_tokens: 200,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty:1,
    presence_penalty: 1
  });
  //transformando la respuesta de openai en un text-stream
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
