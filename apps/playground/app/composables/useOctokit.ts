import { Octokit } from 'octokit'

export default function() {
  const session = useSupabaseSession()

  return new Octokit({
    auth: session.value.provider_token,
  })
}
