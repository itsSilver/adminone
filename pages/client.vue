<template>
  <div>
    <hero-bar>
      Balances
      <template #right v-if="$auth.user">
        <button @click="newUser" class="button-new">
          New Deposit
        </button>
      </template>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Balances" class="has-table has-mobile-sort-spaced">
        <BalancesTableClient :refresh="refreshTable" @dataFetched="refreshTable = false" />
      </card-component>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import BalancesTableClient from '@/components/BalancesTableClient'
export default {
  name: 'Client',
  layout: 'client',
  components: {
    BalancesTableClient,
    CardComponent,
    CardWidget,
    HeroBar,
  },
  data() {
    return {
      refreshTable: false,
    }
  },

  head() {
    return {
      title: 'Welcome — Bank Reports',
    }
  },
}
</script>
