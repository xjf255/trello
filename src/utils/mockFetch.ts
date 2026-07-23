/**
 * Global Interceptor for window.fetch to simulate the Backend API (localhost:1234)
 * if it is unreachable. Uses localStorage for simulated database storage.
 */

interface MockUser {
  id: string
  user: string
  email: string
  phone: string
  avatar: string
  password?: string
  isActive: boolean
}

interface FriendshipConnection {
  id: string
  requesterId: string
  addresseeEmail: string
  status: "pending" | "accepted"
}

export function setupMockFetch() {
  if (typeof window === "undefined") return

  const originalFetch = window.fetch

  // Initialize simulated LocalStorage DB if not present
  const initDb = () => {
    if (!localStorage.getItem("mock_users")) {
      // Default admin user
      const defaultUser: MockUser = {
        id: "admin-id-1234",
        user: "admin",
        email: "admin@example.com",
        phone: "5551234567",
        avatar: "https://res.cloudinary.com/dkshw9hik/image/upload/v1736294033/avatardefault_w9hsxz.webp",
        password: "Password123!",
        isActive: true
      }
      localStorage.setItem("mock_users", JSON.stringify([defaultUser]))
    }
    if (!localStorage.getItem("mock_friendships")) {
      localStorage.setItem("mock_friendships", JSON.stringify([]))
    }
  }

  initDb()

  const getMockUsers = (): MockUser[] => JSON.parse(localStorage.getItem("mock_users") || "[]")
  const saveMockUsers = (users: MockUser[]) => localStorage.setItem("mock_users", JSON.stringify(users))
  const getMockSession = (): MockUser | null => {
    const sess = localStorage.getItem("mock_session")
    return sess ? JSON.parse(sess) : null
  }
  const saveMockSession = (user: MockUser | null) => {
    if (user) {
      localStorage.setItem("mock_session", JSON.stringify(user))
    } else {
      localStorage.removeItem("mock_session")
    }
  }
  const getMockFriendships = (): FriendshipConnection[] => JSON.parse(localStorage.getItem("mock_friendships") || "[]")
  const saveMockFriendships = (conns: FriendshipConnection[]) => localStorage.setItem("mock_friendships", JSON.stringify(conns))

  // Intercepted fetch
  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const urlString = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url

    // Only intercept requests directed to our backend port
    if (urlString.startsWith("http://localhost:1234")) {
      try {
        // Try the actual backend first
        const response = await originalFetch(input, init)
        return response
      } catch (error) {
        console.warn(`[Mock Fetch] Backend unreachable at ${urlString}. Running in disconnected Mock Mode...`)
        return handleMockRequest(urlString, init)
      }
    }

    // Default fetch for any other domains (e.g. assets, vite)
    return originalFetch(input, init)
  }

  // Router for local simulated endpoints
  function handleMockRequest(url: string, init?: RequestInit): Response {
    const parsedUrl = new URL(url)
    const pathname = parsedUrl.pathname
    const method = init?.method?.toUpperCase() || "GET"
    const bodyData = init?.body ? JSON.parse(init.body as string) : null

    // Response helper
    const createJSONResponse = (status: number, data: any) => {
      return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" }
      })
    }

    // 1. GET /verification/protected
    if (pathname === "/verification/protected" && method === "GET") {
      const activeSession = getMockSession()
      if (activeSession) {
        return createJSONResponse(200, activeSession)
      } else {
        return createJSONResponse(401, { message: "No autorizado. Debes iniciar sesión." })
      }
    }

    // 2. POST /verification/login
    if (pathname === "/verification/login" && method === "POST") {
      const { user, email, password } = bodyData || {}
      const users = getMockUsers()
      const matched = users.find(u => 
        (user && u.user === user) || (email && u.email === email)
      )

      if (matched && matched.password === password) {
        if (!matched.isActive) {
          return createJSONResponse(401, { message: "Cuenta inactiva." })
        }
        saveMockSession(matched)
        return createJSONResponse(200, matched)
      } else {
        return createJSONResponse(400, { message: "Credenciales de inicio de sesión inválidas." })
      }
    }

    // 3. POST /verification/logout
    if (pathname === "/verification/logout" && method === "POST") {
      saveMockSession(null)
      return createJSONResponse(200, { message: "Sesión cerrada correctamente." })
    }

    // 4. POST /users (SignUp)
    if (pathname === "/users" && method === "POST") {
      const { user, password, email, phone } = bodyData || {}
      const users = getMockUsers()

      if (users.some(u => u.user === user)) {
        return createJSONResponse(400, { message: "El nombre de usuario ya está registrado." })
      }
      if (users.some(u => u.email === email)) {
        return createJSONResponse(400, { message: "El correo electrónico ya está registrado." })
      }

      const newUser: MockUser = {
        id: crypto.randomUUID(),
        user,
        email,
        phone: phone || "",
        avatar: "https://res.cloudinary.com/dkshw9hik/image/upload/v1736294033/avatardefault_w9hsxz.webp",
        password,
        isActive: true
      }

      users.push(newUser)
      saveMockUsers(users)
      saveMockSession(newUser)

      return createJSONResponse(201, newUser)
    }

    // 5. POST /users/reactive (Account reactivation)
    if (pathname === "/users/reactive" && method === "POST") {
      // Simulate reactivating the last active session user or default admin
      const users = getMockUsers()
      const targetUser = users[0] // Reactivate first user
      if (targetUser) {
        targetUser.isActive = true
        saveMockUsers(users)
        saveMockSession(targetUser)
        return createJSONResponse(200, targetUser)
      }
      return createJSONResponse(400, { message: "No hay cuenta para reactivar." })
    }

    // 6. POST /users/resetLogin (Password Recovery)
    if (pathname === "/users/resetLogin" && method === "POST") {
      const { user, email } = bodyData || {}
      const users = getMockUsers()
      const found = users.find(u => (user && u.user === user) || (email && u.email === email))

      if (found) {
        return createJSONResponse(200, { message: `Enlace de restablecimiento enviado a ${found.email}` })
      } else {
        return createJSONResponse(404, { message: "Usuario no encontrado." })
      }
    }

    // 7. POST /users/verify-code (2FA validation)
    if (pathname === "/users/verify-code" && method === "POST") {
      return createJSONResponse(200, { message: "Código validado con éxito." })
    }

    // 8. GET /users/auth/:token (Token authentication validation)
    if (pathname.startsWith("/users/auth/") && method === "GET") {
      return createJSONResponse(200, { message: "Token validado con éxito." })
    }

    // 9. Friendships endpoints
    // 9.1 GET /friendships/:userId/friends
    const friendsMatch = pathname.match(/^\/friendships\/([^/]+)\/friends$/)
    if (friendsMatch && method === "GET") {
      const userId = friendsMatch[1]
      const friendships = getMockFriendships()
      const users = getMockUsers()
      const userObj = users.find(u => u.id === userId)
      if (!userObj) return createJSONResponse(404, { message: "Usuario no encontrado" })

      // Filter accepted requests where the user is either requester or addressee
      const acceptedConnections = friendships.filter(f => 
        f.status === "accepted" && (f.requesterId === userId || f.addresseeEmail === userObj.email)
      )

      // Map to people states
      const friends = acceptedConnections.map(c => {
        const otherUser = users.find(u => 
          u.id !== userId && (u.id === c.requesterId || u.email === c.addresseeEmail)
        )
        return otherUser ? {
          id: otherUser.id,
          user: otherUser.user,
          email: otherUser.email,
          avatar: otherUser.avatar,
          isActive: otherUser.isActive
        } : null
      }).filter(Boolean)

      return createJSONResponse(200, { friends })
    }

    // 9.2 GET /friendships/:userId/requests
    const requestsMatch = pathname.match(/^\/friendships\/([^/]+)\/requests$/)
    if (requestsMatch && method === "GET") {
      const userId = requestsMatch[1]
      const friendships = getMockFriendships()
      const users = getMockUsers()
      const userObj = users.find(u => u.id === userId)
      if (!userObj) return createJSONResponse(404, { message: "Usuario no encontrado" })

      // Filter pending requests sent TO this user (using their email as addressee)
      const pendingConnections = friendships.filter(f => 
        f.status === "pending" && f.addresseeEmail === userObj.email
      )

      const requests = pendingConnections.map(c => {
        const requester = users.find(u => u.id === c.requesterId)
        return requester ? {
          id: requester.id,
          user: requester.user,
          email: requester.email,
          avatar: requester.avatar,
          isActive: requester.isActive
        } : null
      }).filter(Boolean)

      return createJSONResponse(200, { requests })
    }

    // 9.3 POST /friendships/request (Send request)
    if (pathname === "/friendships/request" && method === "POST") {
      const { addressee, requesterId } = bodyData || {}
      const users = getMockUsers()
      const targetUser = users.find(u => u.email === addressee)

      if (!targetUser) {
        return createJSONResponse(400, { message: "No se pudo encontrar el usuario destinatario." })
      }

      const friendships = getMockFriendships()
      const alreadyConnected = friendships.some(f => 
        (f.requesterId === requesterId && f.addresseeEmail === addressee) ||
        (f.requesterId === targetUser.id && f.addresseeEmail === users.find(u => u.id === requesterId)?.email)
      )

      if (alreadyConnected) {
        return createJSONResponse(400, { message: "Ya existe una solicitud o amistad activa." })
      }

      const newConnection: FriendshipConnection = {
        id: crypto.randomUUID(),
        requesterId,
        addresseeEmail: addressee,
        status: "pending"
      }

      friendships.push(newConnection)
      saveMockFriendships(friendships)

      return createJSONResponse(201, { message: "Solicitud de amistad enviada" })
    }

    // Default error for unhandled mock paths
    return createJSONResponse(404, { message: `Simulador: Ruta ${pathname} no encontrada.` })
  }
}
