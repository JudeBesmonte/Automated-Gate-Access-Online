import { type NextRequest } from 'next/server'
import * as crypto from 'crypto'

export function uuidv4() {
  return crypto.randomUUID()
}

export function generateCsrfToken(size: number = 32) {
  return crypto.randomBytes(size).toString('hex')
}

export function verifyCsrfToken(req: NextRequest) {
  const s = req.cookies.get('_self.csrf-token')?.value
  const x = req.headers.get('X-CSRF-Token')
  return !!s && !!x && s === x
}
}
