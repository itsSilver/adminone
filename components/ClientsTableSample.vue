<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
      @cancel="trashCancel" />
    <b-table :checked-rows.sync="checkedRows" :checkable="checkable" :loading="isLoading" :paginated="paginated"
      :per-page="perPage" :striped="true" :hoverable="true" default-sort="createdAt" default-sort-direction="DESC"
      :data="clients">
      <template slot-scope="props">

        <b-table-column label="Username" field="username" sortable searchable>
          {{ props.row.username }}
        </b-table-column>
        <b-table-column label="Email" field="email" sortable searchable>
          {{ props.row.email }}
        </b-table-column>
        <b-table-column label="Percentage" field="percentage" sortable>
          {{ props.row.percentage }} <span v-if="props.row.percentage">%</span>
        </b-table-column>
        <b-table-column label="Role" field="role" sortable>
          {{ props.row.role.name }}
        </b-table-column>
        <b-table-column label="Opened by" field="child.username" sortable searchable>
          {{ props.row.child.username }}
        </b-table-column>

        <b-table-column label="Created at" field="createdAt
        
        " sortable>
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
  name: 'ClientsTableSample',
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
        const { data } = await this.$axios.delete(`/users/${this.delId}`, {
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
