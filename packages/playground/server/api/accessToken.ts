import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  // Redirect User to get AccessToken from GitHub https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&state=abcdefg





  // const client = await serverSupabaseClient(event)
  //
  // const { data } = await client.from('libraries').select('*')
  //
  // return { libraries: data }
})
