<template>
  <div>
    <hero-bar>
      Users
      <template #right>
        <button @click="newUser" class="button-new">
          New User
        </button>
      </template>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Clients" class="has-table has-mobile-sort-spaced">
        <clients-table-sample :refresh="refreshTable" @dataFetched="refreshTable = false" @updateUser="onUpdateUser" />
      </card-component>
    </section>
    <b-modal :active.sync="isNewUser" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create new user</p>
        </header>
        <section class="modal-card-body">
          <form @submit.prevent="create">
            <b-field label="Username">
              <b-input type="text" v-model="form.username" required />
            </b-field>
            <b-field label="Email">
              <b-input type="email" v-model="form.email" required />
            </b-field>
            <b-field label="Password">
              <b-input type="password" v-model="form.password" required password-reveal />
            </b-field>
            <b-field label="Role">
              <b-select placeholder="Select a role" v-model="roleId" required>
                <option v-for="option in rolesFiltered" :value="option.id" :key="option.id">
                  {{ option.name }}
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
    </b-modal>
    <b-modal :active.sync="isEditUser" has-modal-card>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Update user</p>
        </header>
        <section class="modal-card-body">
          <form @submit.prevent="update">
            <b-field label="Username">
              <b-input type="text" v-model="userData.username" />
            </b-field>
            <b-field label="Email">
              <b-input type="email" v-model="userData.email" />
            </b-field>
            <b-field label="Password">
              <b-input type="password" v-model="userData.password" password-reveal />
            </b-field>
            <b-field label="Role">
              <b-select placeholder="Select a role" v-model="roleId" required>
                <option v-for="option in rolesFiltered" :value="option.id" :key="option.id">
                  {{ option.name }}
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
    </b-modal>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import ClientsTableSample from '@/components/ClientsTableSample'
export default {
  name: 'Users',
  middleware: 'client',
  components: {
    ClientsTableSample,
    CardComponent,
    CardWidget,
    HeroBar,
  },
  data() {
    return {
      isNewUser: false,
      isEditUser: false,
      userData: {},
      refreshTable: false,
      roleId: '',
      form: {},
      roles: []
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
    async update() {
      try {
        const payload = {
          username: this.userData.username,
          email: this.userData.email,
          password: this.userData.password,
          'role.id': this.roleId
        }
        const { data } = await this.$axios.put(`/users/${this.userData.id}`,
          payload
          , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$auth.strategy.token}`,
            }
          })
        console.log("🚀 ~ update ~ data", data)
        this.isEditUser = false
        this.refreshTable = true

      } catch (error) {
        console.log("🚀 ~ update ~ error", error)
        this.isEditUser = false
      }

    },
    async create() {
      try {
        const payload = {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          'role.id': this.roleId
        }
        const { data } = await this.$axios.post('/users',
          payload
          , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$auth.strategy.token}`,
            }
          })
        console.log("🚀 ~ create ~ data", data)
        this.isNewUser = false
        this.refreshTable = true

      } catch (error) {
        console.log("🚀 ~ create ~ error", error)
        this.isNewUser = false
      }

    },
    async getRoles() {
      const { data } = await this.$axios.get('/users-permissions/roles', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.$auth.strategy.token}`,
        }
      })
      this.roles = data.roles
    }
  },
  computed: {
    rolesFiltered() {
      return this.roles.filter((item) => item.name !== 'superadmin')
    }
  },
  mounted() {
    this.getRoles()
  },
  head() {
    return {
      title: 'Users — Admin One',
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