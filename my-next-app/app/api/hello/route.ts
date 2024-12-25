// app/api/hello/route.ts

export async function GET(req: Request) {
  return new Response(JSON.stringify({ message: 'Hello from the API!' }), {
    status: 200,
  });
}
