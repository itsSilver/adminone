<template>
  <div>
    <hero-bar :has-right-visible="false">
      Balances
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Clients" class="has-table has-mobile-sort-spaced">
        <clients-table-sample :data-url="`${$router.options.base}data-sources/clients.json`" />
      </card-component>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroBar from '@/components/HeroBar'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import ClientsTableSample from '@/components/ClientsTableSample'
export default {
  name: 'Home',
  components: {
    ClientsTableSample,
    CardComponent,
    CardWidget,
    HeroBar,
  },
  data() {
    return {

    }
  },
  methods: {
  },
  head() {
    return {
      title: 'Balances — Admin One',
    }
  },
}
</script>
