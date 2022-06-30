<template>
  <div>
    <hero-bar :has-right-visible="false">
      Users
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Clients" class="has-table has-mobile-sort-spaced">
        <clients-table-sample :data-url="`${$router.options.base}data-sources/clients.json`" />
      </card-component>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import ClientsTableSample from '@/components/ClientsTableSample'
export default {
  name: 'Balances',
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
  head() {
    return {
      title: 'Users — Admin One',
    }
  },
}
</script>
