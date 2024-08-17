import { Octokit } from 'octokit'

export default function() {
  const session = useSupabaseSession()

  if (!session.value) {
    throw new Error('Debes iniciar sesión para usar esta función')
  }

  return new Octokit({
    auth: session.value.provider_token,
  })
}
