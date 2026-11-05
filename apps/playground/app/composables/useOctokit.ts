import { Octokit } from 'octokit'

// Supabase does not persist the OAuth provider token: it is only present in the
// session right after signing in, and it is lost when the session is refreshed.
// We store it ourselves (see plugins/github-token.client.ts).
export const GITHUB_TOKEN_KEY = 'github_provider_token'

export class GithubSessionExpiredError extends Error {
  constructor() {
    super('Tu sesión de GitHub expiró. Por favor, inicia sesión nuevamente.')
    this.name = 'GithubSessionExpiredError'
  }
}

export function isGithubSessionExpired(error: any): boolean {
  return error instanceof GithubSessionExpiredError || error?.status === 401
}

export default function() {
  const session = useSupabaseSession()

  const token = session.value?.provider_token || localStorage.getItem(GITHUB_TOKEN_KEY)

  if (!session.value || !token) {
    throw new GithubSessionExpiredError()
  }

  return new Octokit({
    auth: token,
  })
}
