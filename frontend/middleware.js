import { NextResponse } from "next/server";
import { getCookie } from "cookies-next"; // Opcional: pode usar para lidar com cookies

export function middleware(req) {
  // Verificar se o token está presente no cookie
  const token = req.cookies.get("access_token")?.value;

  // Se não houver token, redireciona para a página de login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Permite que a requisição prossiga se o token existir
  return NextResponse.next();
}

// Configurar rotas protegidas
export const config = {
  matcher: ["/dashboard/:path*", "/outro-caminho-protegido/:path*"], // Rotas protegidas
};
