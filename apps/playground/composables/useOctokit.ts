import { Octokit } from 'octokit'

export default function() {
  const providerToken = useCookie('sb-provider-token').value

  return new Octokit({
    auth: providerToken,
  })
}
