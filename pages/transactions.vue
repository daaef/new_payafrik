<template>
  <section class="dash-body">
    <div class="utrans--content">
      <div class="w-100">
        <div class="welcome-text">
          <div>
            <p class="w-100 c-white">user</p>
            <h1 class="w-100 c-white am-type mt-0 mb-0">Transactions</h1>
          </div>
        </div>
        <!-- <form> -->
        <div class="row trans--grid mt-20 w-100 flex-between">
          <div>
            <input
              v-model="filters.transactionStatus"
              type="text"
              class="normal--input"
              placeholder="Status"
            />
          </div>
          <div>
            <input
              v-model="filters.minDate"
              type="date"
              class="normal--input"
              placeholder="Date From"
            />
          </div>
          <div>
            <input
              v-model="filters.maxDate"
              type="date"
              class="normal--input"
              placeholder="Date To"
            />
          </div>
          <div>
            <input
              v-model="filters.receiver"
              type="text"
              class="normal--input"
              placeholder="Filter by Receiver"
            />
          </div>
          <div>
            <input
              type="submit"
              class="normal--input"
              value="Apply"
              @click="applyFilters()"
            />
          </div>
        </div>
        <!-- </form> -->
        <div class="mt-20">
          <div class="text-right c-dim-white">
            Showing {{ transfers.length }} of
            {{ transfersPagination.totalRecords }}
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Transaction</th>
                <th>Memo/Remarks</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction of transfers" :key="transaction.id">
                <td>{{ transaction.id }}</td>
                <td class="status">{{ transaction.status }}</td>
                <td>
                  <strong>{{ +transaction.sent_amount }}</strong> tokens to
                  {{ transaction.receiver }}
                </td>
                <td>{{ transaction.memo }}</td>
                <td>{{ new Date(transaction.created).toDateString() }}</td>
              </tr>
            </tbody>
          </table>

          <div
            v-if="
              transfersPagination.totalRecords >
              transfersPagination.itemsPerPage
            "
            class="pagination mt-3 mb-5"
          >
            <div class="row ml-1">
              <div class="col-md-3">
                <button
                  class="w-100"
                  type="submit"
                  :disabled="previousPageUrl === '' || previousPageUrl === null"
                  @click="getUserTransactions(previousPageUrl)"
                >
                  <i class="fa fa-angle-double-left" /> Previous Page
                </button>
              </div>
              <div class="col-md-6 text-center"></div>
              <div class="col-md-3 text-right">
                <button
                  class="w-100"
                  :disabled="nextPageUrl === '' || nextPageUrl === null"
                  type="submit"
                  @click="getUserTransactions(nextPageUrl)"
                >
                  Next Page <i class="fa fa-angle-double-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        baseUrl: process.env.baseUrl,
        interswitchBaseUrl: process.env.interswitchBaseUrl,
        loadingPurchases: false,
        loadingTransfers: false,
        nextPageUrl: '',
        previousPageUrl: '',
        transfersPagination: {
          page: 1,
          itemsPerPage: 10,
          totalRecords: 0,
        },
        transfers: [],
        purchases: [],
        filters: {
          minDate: '',
          maxDate: '',
          receiver: '',
          transactionStatus: '',
        },
      }
    },
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
    },
    beforeMount() {
      this.getUserTransactions(this.baseUrl + 'transactions/transactions')
    },
    mounted() {
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 1500)
    },
    methods: {
      applyFilters() {
        if (
          this.filters.minDate === '' &&
          this.filters.maxDate === '' &&
          this.filters.receiver === '' &&
          this.filters.transactionStatus === ''
        ) {
          return
        }
        const url =
          this.baseUrl +
          'transactions/transactions?status=' +
          this.filters.transactionStatus +
          '&min_date=' +
          this.filters.minDate +
          '&max_date=' +
          this.filters.maxDate +
          '&receiver=' +
          this.filters.receiver
        this.getUserTransactions(url)
      },

      changePage(direction) {
        if (direction === 'next') {
          this.transfersPagination.page += 1
        } else {
          this.transfersPagination.page -= 1
        }
        this.getUserTransactions()
      },
      formatDate(date) {
        const d = new Date(date)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        const year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
      },

      async getUserPurchases() {
        this.loadingPurchases = true
        const headers = {
          'Content-Type': 'application/json',
          'pfk-user-token': this.$auth.getToken('local'),
        }

        try {
          const userPurchasesResponse = await this.$axios.$get(
            this.interswitchBaseUrl + 'transactions/user/',
            { headers }
          )
          console.log('User transactions ==>', userPurchasesResponse)
          // if (this.transfersPagination.itemsPerPage > userTransactionsResponse.count) {
          //     this.transfersPagination.itemsPerPage = userTransactionsResponse.count
          // }
          // this.transfersPagination.totalRecords = userTransactionsResponse.count
          this.purchases = userPurchasesResponse.data.transactions
          this.loadingPurchases = false
        } catch (e) {
          this.$toast.error(e.message)
          console.log(e.message)
          this.loadingPurchases = false
        }
      },
      async getUserTransactions(url) {
        this.transfers = []
        this.loadingTransfers = true
        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.$auth.getToken('local'),
        }

        try {
          const userTransactionsResponse = await this.$axios.$get(url, {
            headers,
          })
          console.log('User transactions ==>', userTransactionsResponse)

          if (
            this.transfersPagination.itemsPerPage >
            userTransactionsResponse.count
          ) {
            this.transfersPagination.itemsPerPage =
              userTransactionsResponse.count
          }

          this.nextPageUrl = userTransactionsResponse.next
          this.previousPageUrl = userTransactionsResponse.previous

          this.transfersPagination.totalRecords = userTransactionsResponse.count
          this.transfers = userTransactionsResponse.results
          this.loadingTransfers = false
        } catch (e) {
          this.$toast.error(e.response.data.detail)
          console.log(e.response.data.detail)
          this.loadingTransfers = false
        }
      },
    },
    layout: 'main',
    middleware: 'query',
  }
</script>

<style scoped>
  button {
    width: unset;
  }

  .md-title h6 {
    color: #332c2c;
    font-weight: 500;
  }

  .pagination {
    width: 100% !important;
    position: relative;
    overflow: hidden;
  }

  td {
    color: #ffffffe5 !important;
    padding: 5px;
  }

  td.status {
    /* max-width: 50px !important; */
    text-transform: lowercase;
  }

  .pagination button {
    background: #0c0a3c;
    color: #ffffff99;
    /* border: solid 1px #f9921b; */
    padding: 15px;
    cursor: pointer;
    border: none;
  }
</style>
