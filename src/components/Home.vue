<template><div class="home">
  
  <section>

    <nav class="nav">

      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            yoshi-ui
          </a>
        </div>

        <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
        <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>

        <!-- This "nav-menu" is hidden on mobile -->
        <!-- Add the modifier "is-active" to display it on mobile -->
        <div class="nav-right nav-menu">

          <router-link tag="a" to="/archives" class="nav-item">
            Archives
          </router-link>

          <router-link tag="a" to="/meta" class="nav-item">
            Meta
          </router-link>

        </div>
      </div>

    </nav>

    <section class="hero is-primary">

      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{getResource('wpJson').name}}
          </h1>
          <h2 class="subtitle">
            {{getResource('wpJson').description}}
          </h2>
        </div>
      </div>

      <div class="hero-foot">
        <div class="tabs is-boxed">
          <div class="container">
            <ul>
              <!--v-for="category in getResource('categories')"-->

              <li>
                <router-link tag="a" to="/" class="nav-item">
                  <span>Home</span>
                </router-link>
              </li>

              <li>
                <router-link tag="a" to="/about" class="nav-item">
                  About
                </router-link>
              </li>

              <li>
                <router-link tag="a" to="/blog" class="nav-item">
                  Blog
                </router-link>
              </li>

              <li>
                <router-link tag="a" to="/contact" class="nav-item">
                  Contact
                </router-link>
              </li>

            </ul>
          </div>
        </div>
      </div>

    </section>

  </section>

  <div class="container">
    <pre>{{getResource('wpJson')}}</pre>
  </div>

</div></template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'home',
    data () {
      return {
        busy: false
      }
    },
    computed: {
      ...mapGetters([
        'getResource'
      ])
    },
    methods: {
      ...mapActions([
        'fetchResource'
      ]),
      async fetch () {
        this.busy = true
        await this.fetchResource({
          url: `/api?rest_route=/`,
          prop: 'wpJson'
        })
        await this.fetchResource({
          url: `/api?rest_route=/wp/v2/categories`,
          prop: 'categories'
        })
        this.busy = false
      }
    },
    async created () {
      this.fetch()
    },
    mounted () {
      console.log('* Mounted Home!')
    }
  }
</script>

<style scoped>
  .home {

  }
</style>
