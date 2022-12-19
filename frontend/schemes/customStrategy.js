import { LocalScheme } from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
  fetchUser (endpoint) {
    return this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    ).then((response) => {
      const data = response.data.data
      if (data.me.id) {
        this.$auth.setUser(data.me)
        this.$auth.strategy.token.set(data.token)
      } else {
        this.$auth.reset()
      }

      return response
    }).catch((error) => {
      this.$auth.callOnError(error, { method: 'fetchUser' })
    })
  }
}
