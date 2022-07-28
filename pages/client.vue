<template>
  <div>
    <hero-bar>
      Deposits
      <template #right v-if="$auth.user">
        <button @click="newUser" class="button-new">
          New Deposit
        </button>
      </template>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Deposits" class="has-table has-mobile-sort-spaced">
        <DepositsTableClient :refresh="refreshTable" @dataFetched="refreshTable = false" />
      </card-component>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import DepositsTableClient from '@/components/DepositsTableClient'
export default {
  name: 'Client',
  layout: 'client',
  components: {
    DepositsTableClient,
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
