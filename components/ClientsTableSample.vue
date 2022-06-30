<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
      @cancel="trashCancel" />
    <b-table :checked-rows.sync="checkedRows" :checkable="checkable" :loading="isLoading" :paginated="paginated"
      :per-page="perPage" :striped="true" :hoverable="true" default-sort="name" :data="clients">
      <template slot-scope="props">

        <b-table-column label="Username" field="username" sortable>
          {{ props.row.username }}
        </b-table-column>
        <b-table-column label="Email" field="email" sortable>
          {{ props.row.email }}
        </b-table-column>
        <b-table-column label="Role" field="role" sortable>
          {{ props.row.role.name }}
        </b-table-column>

        <b-table-column label="Created at">
          <small class="has-text-grey is-abbr-like" :title="props.row.createdAt">{{
              formatDate(props.row.createdAt)
          }}</small>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell" label="Actions">
          <div class="buttons">
            <nuxt-link :to="{ name: 'client-id', params: { id: props.row.id } }" class="button is-small is-primary">
              <b-icon icon="account-edit" size="is-small" />
            </nuxt-link>
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
  name: 'ClientsTableSample',
  components: { ModalBox },
  props: {
    dataUrl: {
      type: String,
      default: null,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
    }
  },
  computed: {
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    },
  },
  mounted() {
    this.getClients()
  },
  methods: {
    async getClients() {
      try {
        this.isLoading = true
        const { data } = await this.$axios.get('/users?populate=*', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$auth.strategy.token}`,
          }
        })
        console.log("🚀 ~ getClients ~ data", data)
        this.clients = data
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
    },
    formatDate(val) {
      return dayjs(val).format('DD/MM/YYYY - HH:mm')
    },
    trashModal(trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm() {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false,
      })
    },
    trashCancel() {
      this.isModalActive = false
    },
  },
}
</script>
