export default function ({ $auth }) {
  console.log($auth)
  $auth.setStrategy('customStrategy')
  $auth.getStrategy().fetchUser()
}
