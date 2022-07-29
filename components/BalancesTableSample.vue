<template>
  <div>
    <div class="header-cards">
      <div class="card card-blue">
        <h3>Total Money</h3>
        <h4>{{totalSent}} €</h4>
      </div>
      <div class="card card-green">
        <h3>Total Proffit</h3>
        <h4>{{totalProffit}} €</h4>
      </div>
    </div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
      @cancel="trashCancel" />
    <b-table :checked-rows.sync="checkedRows" :checkable="checkable" :loading="isLoading" :paginated="paginated"
      :per-page="perPage" :striped="true" :hoverable="true" :data="clients" default-sort="createdAt"
      default-sort-direction="DESC">
      <template slot-scope="props">


        <b-table-column label="Username" field="user.username" sortable searchable>
          {{ props.row.user.username }}
        </b-table-column>
        <b-table-column label="Percentage" field="user.percentage">
          <p v-if="$store.state.auth.user.id !== props.row.user.id">{{ props.row.user.percentage }} %</p>
          <p v-else>100 %</p>
          
        </b-table-column>
        <b-table-column label="Status" field="status">
          {{ props.row.status }}
        </b-table-column>
        <b-table-column label="Total" field="total" class="total-sent">
          {{ Number(props.row.total).toLocaleString() }}
        </b-table-column>
        <b-table-column label="Proffit" class="total-proffit">
          <p v-if="$store.state.auth.user.id !== props.row.user.id">{{ calcProffit(Number(props.row.total), props.row.user.percentage) }} €</p>
          <p v-else>{{ Number(props.row.total) }} €</p>
          
        </b-table-column>
        <b-table-column label="Created at" field="createdAt" sortable>
          <small class="has-text-grey is-abbr-like" :title="props.row.createdAt">{{
              formatDate(props.row.createdAt)
          }}</small>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell" label="Actions">
          <div class="buttons">

            <!-- <button class="button is-small is-warning" type="button" @click.prevent="editModal(props.row)">
              <b-icon icon="account-edit" size="is-small" />
            </button> -->
            <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)">
              <b-icon icon="trash-can" size="is-small" />
            </button>
          </div>
        </b-table-column>
      </template>

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import ModalBox from '@/components/ModalBox'
import dayjs from 'dayjs'

export default {
  name: 'BalancesTableSample',
  components: { ModalBox },
  props: {
    checkable: {
      type: Boolean,
      default: true,
    },
    refresh: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    refresh(newValue) {
      if (newValue) {
        this.getClients()
      }
    },
  },
  data() {
    return {
      isModalActive: false,
      isEditModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      delId: null,
      totalProff: [],
      totalSent: null,
      totalProffit: null,
    }
  },
  computed: {
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.username
      }
      return null
    },
  },
  mounted() {
    this.getClients()
  },
  methods: {
    calcProffit(total, percent) {
      const perc = percent / 100
      const value = perc * total
      const parsed = parseFloat(total - value)
      return parsed
    },
    async getClients() {
      try {
        this.isLoading = true
        const { data } = await this.$axios.post('/balances/get-balance',{}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$auth.strategy.token}`,
          }
        })
        this.clients = data.data
        this.totalSent = data.totalMoney
        this.totalProffit = data.totalProffit
        this.isLoading = false
        this.$emit('dataFetched')
      } catch (error) {
        this.isLoading = false
      }
      this.$emit('')
    },
    formatDate(val) {
      return dayjs(val).format('DD/MM/YYYY - HH:mm')
    },
    trashModal(trashObject) {
      this.trashObject = trashObject
      this.delId = trashObject.id
      this.isModalActive = true
    },
    editModal(val) {
      this.$emit('updateUser', val)
    },
    async trashConfirm() {
      try {
        const { data } = await this.$axios.delete(`/balances/${this.delId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$auth.strategy.token}`,
          }
        })
        console.log("🚀 data", data)
        this.isModalActive = false
        this.getClients()
      } catch (error) {
        this.isModalActive = false
      }

    },
    trashCancel() {
      this.isModalActive = false
    },
  },
}
</script>

<style scoped>
.header-cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-items: center;
  align-content: center;
  gap: 1rem;
}
.header-cards .card {
  text-align: center;
  padding: 15px;
}
.card:not(:last-child) {
  margin-bottom: 0rem !important; 
}
.card.card-blue {
  background: #0b0b51;
  color: #fff;
  font-weight: 700;
}
.card.card-green {
  background: #2d8f3a;
  color: #fff;
  font-weight: 700;
}
</style>