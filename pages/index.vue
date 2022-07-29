<template>
  <div>
    <hero-bar>
      Balances
      <!-- <template #right>
        <button @click="newUser" class="button-new">
          New Deposit
        </button>
      </template> -->
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Balances" class="has-table has-mobile-sort-spaced">
        <BalancesTableSample :refresh="refreshTable" @dataFetched="refreshTable = false" @updateUser="onUpdateUser" />
      </card-component>
    </section>
    <!-- <b-modal :active.sync="isNewUser" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create new balance</p>
        </header>
        <section class="modal-card-body">
          <form @submit.prevent="create">
            <b-field label="Total">
              <b-input type="number" v-model="form.total" required />
            </b-field>
            <b-field label="Status">
              <b-select placeholder="Select a status" v-model="status">
                <option value="sent">Sent</option>
                <option value="approved">Approved</option>
                <option value="confirmed">Confirmed</option>
                <option value="canceled">Canceled</option>
              </b-select>
            </b-field>
            <b-field label="User">
              <b-select placeholder="Select a user" v-model="userId">
                <option v-for="option in usersFiltered" :value="option.id" :key="option.id">
                  {{ option.username }}
                </option>
              </b-select>
            </b-field>

            <div class="buttons-footer">
              <button class="button" type="button" @click="cancel">Cancel</button>
              <button type="submit" class="button is-success">Create</button>
            </div>

          </form>
        </section>
      </div>
    </b-modal> -->
    <!-- <b-modal :active.sync="isEditUser" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update balance</p>
        </header>
        <section class="modal-card-body">
          <form @submit.prevent="update">
            <b-field label="Total">
              <b-input type="number" v-model="userData.total" required />
            </b-field>
            <b-field label="Status">
              <b-select placeholder="Select a status" v-model="userData.status">
                <option value="sent">Sent</option>
                <option value="approved">Approved</option>
                <option value="confirmed">Confirmed</option>
                <option value="canceled">Canceled</option>
              </b-select>
            </b-field>
            <b-field label="User">
              <b-select placeholder="Select a user" v-model="userData.user.id">
                <option v-for="option in usersFiltered" :value="option.id" :key="option.id">
                  {{ option.username }}
                </option>
              </b-select>
            </b-field>

            <div class="buttons-footer">
              <button class="button" type="button" @click="cancelUpdate">Cancel</button>
              <button type="submit" class="button is-success">Save</button>
            </div>

          </form>
        </section>

      </div>
    </b-modal> -->
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import BalancesTableSample from '@/components/BalancesTableSample'
export default {
  name: 'Balances',
  components: {
    BalancesTableSample,
    CardComponent,
    CardWidget,
    HeroBar,
  },
  data() {
    return {
      isNewUser: false,
      isEditUser: false,
      userData: {
        status: null,
        user: {
          id: null
        },
        total: null
      },
      refreshTable: false,
      roleId: '',
      userId: '',
      form: {},
      users: [],
      status: ''
    }
  },
  methods: {
    onUpdateUser(val) {
      this.isEditUser = true
      this.userData = val
    },
    newUser() {
      this.isNewUser = true
    },
    cancel() {
      this.isNewUser = false
    },
    cancelUpdate() {
      this.isEditUser = false
    },
    // async update() {
    //   try {
    //     const payload = {
    //       total: this.userData.total,
    //       status: this.userData.status,
    //       user: this.userData.user,
    //     }
    //     const { data } = await this.$axios.put(`/balances/${this.userData.id}`,
    //       { data: payload }
    //       , {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${this.$auth.strategy.token}`,
    //         }
    //       })
    //     this.isEditUser = false
    //     this.refreshTable = true

    //   } catch (error) {
    //     console.log("🚀 ~ update ~ error", error)
    //     this.isEditUser = false
    //   }

    // },
    // async create() {
    //   try {
    //     const payload = {
    //       total: this.form.total,
    //       status: this.status,
    //       user: this.userId,
    //       percentage: this.form.percentage
    //     }
    //     const { data } = await this.$axios.post('/balances',
    //       {
    //         data: payload
    //       }, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${this.$auth.strategy.token}`,
    //       }
    //     })
    //     this.isNewUser = false
    //     this.refreshTable = true

    //   } catch (error) {
    //     this.isNewUser = false
    //   }

    // },
    async getUsers() {
      try {
        const { data } = await this.$axios.get('/users', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$auth.strategy.token}`,
          }
        })
        this.users = data
      } catch (error) {
        console.log('error', error);
      }
    }
  },
  mounted() {
    this.getUsers()
  },
  computed: {
    usersFiltered() {
      return this.users.filter((item) => item.name !== 'superadmin')
    }
  },

  head() {
    return {
      title: 'Deposits — Bank Reports',
    }
  },
}
</script>

<style>
.button-new {
  background: #00d1b2;
  border: none;
  border-radius: 4px;
  padding: 10px 22px;
  cursor: pointer;
}

.buttons-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}
</style>