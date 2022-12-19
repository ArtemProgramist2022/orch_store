export default function ({ $auth }) {
  $auth.setStrategy('customStrategy')
  $auth.getStrategy().fetchUser()
}
