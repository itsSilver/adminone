<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
      @cancel="trashCancel" />
    <b-table :checked-rows.sync="checkedRows" :checkable="checkable" :loading="isLoading" :paginated="paginated"
      :per-page="perPage" :striped="true" :hoverable="true" :data="clients" default-sort="createdAt"
      default-sort-direction="DESC">
      <template slot-scope="props">


        <b-table-column label="Username" field="user.username" sortable searchable>
          {{ props.row.user.username }}
        </b-table-column>
        <b-table-column label="Status" field="status" sortable searchable>
          {{ props.row.status }}
        </b-table-column>
        <b-table-column label="Total" field="total">
          {{ Number(props.row.total).toLocaleString() }}
        </b-table-column>
        <!-- <b-table-column label="Proffit">
          {{ calcProffit(Number(props.row.total), props.row.percentage) }}
        </b-table-column> -->
        <b-table-column label="Created at" field="createdAt" sortable searchable>
          <small class="has-text-grey is-abbr-like" :title="props.row.createdAt">{{
              formatDate(props.row.createdAt)
          }}</small>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell" label="Actions">
          <div class="buttons">

            <button class="button is-small is-warning" type="button" @click.prevent="editModal(props.row)">
              <b-icon icon="account-edit" size="is-small" />
            </button>
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
      return parseFloat(total - value).toFixed(2)
    },
    async getClients() {
      try {
        this.isLoading = true
        const { data } = await this.$axios.get('/balances?populate=*', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$auth.strategy.token}`,
          }
        })
        console.log("🚀 ~ getClients ~ data", data)
        this.clients = data.data
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
