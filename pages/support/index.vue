<template>
  <section class="dash-body">
    <div class="utrans--content">
      <div class="w-100">
        <div class="welcome-text">
          <div class="text-center">
            <p class="w-100 c-white">user</p>
            <h1 class="w-100 c-white am-type mt-0 mb-0">Support</h1>
          </div>
        </div>
      </div>
      <div class="w-100 text-right">
        <button @click="ticketModal = true">
          <i class="fas fa-headset fa-lg warn mr-2"></i> Contact support with an
          issue
        </button>
      </div>

      <a-empty
        v-if="!loadingTickets && tickets.length === 0"
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{
          height: '60px',
        }"
      >
        <span slot="description" class="c-white">
          You have not created any support tickets. <br />
          If you need help with an issue
          <a class="warn" @click="ticketModal = true"> Click here now </a>
          to create a support ticket
        </span>
        <div class="sub-button mt-20">
          <button class="w-100">Buy Crypto</button>
        </div>
      </a-empty>
      <div v-if="loadingTickets" class="text-center mt-5">
        <i class="fas fa-circle-notch fa-spin fa-lg c-white mb-3"></i>
        <p class="c-white">Loading your support tickets...</p>
      </div>

      <div class="container">
        <div class="row">
          <div v-for="ticket of tickets" :key="ticket.id" class="col-md-6">
            <nuxt-link
              nuxt-link
              :to="{
                name: 'user-area-support-ticketId',
                params: { ticketId: ticket.id },
              }"
              class="ticket"
            >
              <p class="warn">ISSUE #{{ ticket.id }}</p>
              <p class="c-white">{{ ticket.subject }}</p>
              <p class="c-white">{{ ticket.replies.length }} replies</p>
              <p class="c-white">
                <strong>Created on:</strong>
                {{ new Date(ticket.created).toDateString() }}
              </p>
              <span
                v-if="ticket.status === 'NEW'"
                class="badge badge-pill badge-warning float-right"
                >{{ ticket.status }}</span
              >
              <span
                v-if="ticket.status === 'IN_PROGRESS'"
                class="badge badge-pill badge-primary float-right"
                >{{ ticket.status }}</span
              >
              <span
                v-if="ticket.status === 'CLOSED'"
                class="badge badge-pill badge-success float-right"
                >{{ ticket.status }}</span
              >
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <!-- New Ticket Modal -->

    <a-modal
      title="Contact support"
      :visible="ticketModal"
      :confirm-loading="creatingTicket"
      centered
      @cancel="ticketModal = false"
    >
      <p>
        Please fill the form below to leave a message with any issues you are
        facing and a member of our support team will be in touch with you
      </p>
      <form class="w-100 mt-20 request--card" action="">
        <div>
          <h3 class="c-dim-white">Name on the Card</h3>
          <div class="mt-12">
            <input
              id="fname"
              v-model="newTicket.title"
              type="text"
              placeholder="The ticket subject"
            />
            <label for="fname">Ticket <span class="c-white">Title</span></label>
          </div>
          <div class="mt-12">
            <a-select
              v-model="newTicket.category"
              placeholder="--Select Category--"
              @focus="handleFocus"
              @blur="handleBlur"
              @change="handleChange"
            >
              <a-select-option value="COMPLAINT"> Complaint </a-select-option>
              <a-select-option value="BUG"> Bug </a-select-option>
            </a-select>
          </div>
        </div>
        <div class="mt-12">
          <div>
            <a-textarea
              id="ticket_body"
              v-model="newTicket.body"
              placeholder="What is the complaint?"
            ></a-textarea>
            <label for="ticket_body">
              Ticket <span class="c-white"> Body</span>
            </label>
          </div>
        </div>
      </form>
      <template slot="footer">
        <button
          key="submit"
          class="w-100 inter__btn"
          type="submit"
          @click="createSupportTicket"
        >
          <span v-if="!creatingTicket">Create Support Ticket</span>
          <span v-if="creatingTicket" class="mr-8">
            <a-spin>
              <a-icon
                slot="indicator"
                type="loading"
                style="font-size: 24px; color: #1c27be"
                spin
              />
            </a-spin>
          </span>
        </button>
      </template>
    </a-modal>
    <!-- New Ticket Modal -->
  </section>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    components: {},
    data() {
      return {
        baseUrl: process.env.baseUrl,
        ticketModal: false,
        loadingTickets: false,
        nextPageUrl: '',
        previousPageUrl: '',
        ticketsPagination: {
          page: 1,
          itemsPerPage: 10,
          totalRecords: 0,
        },
        filters: {
          minDate: '',
          maxDate: '',
          receiver: '',
          transactionStatus: '',
        },
        tickets: [],
        creatingTicket: false,
        newTicket: {
          title: '',
          category: '',
          body: '',
        },
      }
    },
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
    },
    methods: {
      handleChange(value) {
        console.log(value)
      },
      handleBlur() {
        console.log('blur')
      },
      handleFocus() {
        console.log('focus')
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

      async getTickets() {
        this.loadingTickets = true
        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.$auth.getToken('local'),
        }

        try {
          const ticketsResponse = await this.$axios.$get(
            this.baseUrl + 'utilities/tickets/',
            { headers }
          )
          this.tickets = ticketsResponse.results

          this.tickets.forEach((ticket) => {
            const ticketBodyArray = ticket.content.split('|')
            ticket.username = ticketBodyArray[0]
            ticket.name = ticketBodyArray[1]
            ticket.subject = ticketBodyArray[2]
            ticket.body = ticketBodyArray[3]
          })

          this.$store.commit('global/loadTickets', this.tickets)
          console.log('SUPPORT TICKETS ===>', this.tickets)

          this.nextPageUrl = ticketsResponse.next
          this.previousPageUrl = ticketsResponse.previous

          this.ticketsPagination.totalRecords = ticketsResponse.count
          this.loadingTickets = false
        } catch (e) {
          this.$toast.error(e.response.data.detail)
          console.log(e.response)
          this.loadingTickets = false
        }
      },

      async createSupportTicket() {
        this.creatingTicket = true
        if (!this.newTicket.body || this.newTicket.body === '') {
          return
        }
        this.processing = true
        console.log(this.newTicket)
        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.$auth.getToken('local'),
        }

        const ticketContent =
          this.userDetails.username +
          '|' +
          this.userDetails.first_name +
          ' ' +
          this.userDetails.last_name +
          '|' +
          this.newTicket.title +
          '|' +
          this.newTicket.body

        const requestBody = {
          content: ticketContent,
          customer: this.newTicket.username,
        }

        try {
          const createResponse = await this.$axios.$post(
            this.baseUrl + 'utilities/tickets/create-ticket/',
            requestBody,
            { headers }
          )
          console.log('Ticket create response ==>', createResponse)
          this.$toast.success('Support ticket created successfully')
          this.getTickets()
          this.closeModal('newTicketModal')
          this.creatingTicket = false
        } catch (e) {
          this.creatingTicket = false
          this.$toast.error(e.response)
          console.log(e.response)
          this.processing = false
        }
      },

      closeSideBar() {
        this.$store.commit('global/closeSidebar')
      },
      ...mapMutations({
        toggleSidebar: 'global/toggleSidebar',
        closeSideBar: 'global/closeSidebar',
      }),
    },
    beforeMount() {
      this.getTickets()
    },
  }
</script>

<style scoped>
  .col-md-6 {
    padding: 10px;
  }
  button {
    width: unset;
  }

  @media (max-width: 767px) {
    button {
      width: 100%;
    }
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

  #newTicketModal .modal-content {
    background-color: #131c4b;
    border: dashed 1px #4451ff;
    box-shadow: 25px 25px 100px #00000044;
    padding: 0;
    color: #fff;
  }

  .input-file {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  /* button.greyed-btn{
    font-weight:500;
    background-color: #f1f1f1;
    width: inherit!important;
} */

  #newTicketModal .modal-content {
    background-color: #131c4b;
    border: dashed 1px #4451ff;
    box-shadow: 25px 25px 100px #00000044;
    padding: 0;
    color: #fff;
  }

  input,
  select,
  textarea {
    color: #ffffff99;
    background: #111a3f;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    width: 100%;
    border: solid 2px #3341ff;
    padding-left: 15px;
  }

  textarea {
    height: 150px;
  }

  .input-file + label {
    font-size: 0.8em;
    font-weight: 500;
    color: #8190ca;
    background-color: #111a3f !important;
    display: inline-block;
    transition: all ease 200ms;
    padding: 20px;
    border-radius: 3px;
    width: 100%;
  }

  .input-file:focus + label,
  .input-file + label:hover {
    background-color: #d4d1d1;
  }

  .input-file + label {
    cursor: pointer; /* "hand" cursor */
  }

  #newTicketModal .modal-header {
    margin-bottom: 15px;
    border: none !important;
  }

  #newTicketModal .modal-header button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
  }

  #newTicketModal .modal-header h5 {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 1.2em;
  }

  #newTicketModal .modal-footer {
    border: none !important;
  }

  #newTicketModal .modal-footer button {
    background: #11154b;
    color: #f6f6f6;
    border: solid #2832c3;
    padding: 10px 40px;
    border-radius: 25px;
    cursor: pointer;
  }

  #newTicketModal .modal-footer button.cancel {
    border: solid transparent;
  }

  a.ticket {
    background: #0c0b3a;
    padding: 20px;
    height: 150px;
    margin-bottom: 20px;
    transition: all 0.3s ease-in-out;
    margin-top: 20px;
    display: block;
    border: 2px solid transparent;
  }

  a.ticket p {
    margin-top: 2px;
    margin-bottom: 2px;
  }

  a.ticket:hover {
    background: #141b49;
    border: 2px solid #0c0b3a;
  }

  button {
    padding: 20px;
    color: rgba(255, 255, 255, 0.6);
    background: #0c0b3a;
    border: solid 0;
    transition: all 0.3s ease-in-out;
  }

  button:hover {
    background: #121058;
  }
</style>
