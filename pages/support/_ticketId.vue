<template>
  <section class="dash-body">
    <div class="utrans--content">
      <div class="w-100">
        <div class="welcome-text">
          <div class="text-center">
            <p class="w-100 c-white">support</p>
            <h1 class="w-100 c-white am-type mt-0 mb-0">Ticket</h1>
          </div>
        </div>

        <div v-if="!loadingTickets" class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="ticket">
                <p class="warn">ISSUE #{{ selectedTicket.id }}</p>
                <p class="c-white">{{ selectedTicket.subject }}</p>
                <hr />
                <p class="c-white">{{ selectedTicket.body }}</p>
                <hr />
                <p class="c-white">
                  {{ selectedTicket.replies.length }} replies
                </p>
                <p class="c-white">
                  <strong>Created on:</strong>
                  {{ new Date(selectedTicket.created).toDateString() }}
                </p>
                <span
                  v-if="selectedTicket.status === 'NEW'"
                  class="badge badge-pill badge-warning float-right"
                  >{{ selectedTicket.status }}</span
                >
                <span
                  v-if="selectedTicket.status === 'IN_PROGRESS'"
                  class="badge badge-pill badge-primary float-right"
                  >{{ selectedTicket.status }}</span
                >
                <span
                  v-if="selectedTicket.status === 'CLOSED'"
                  class="badge badge-pill badge-success float-right"
                  >{{ selectedTicket.status }}</span
                >
              </div>
            </div>
            <div class="col-md-12 mt-3 mb-3">
              <p class="text-uppercase warn">responses</p>
              <a
                v-if="selectedTicket.status !== 'CLOSED'"
                class="float-right mr-3"
                @click="openModal('responseModal')"
                ><i class="fas fa-reply mr-1"></i>Respond</a
              >
            </div>
            <a-empty
              v-if="selectedTicket.replies.length === 0"
              image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
              :image-style="{
                height: '60px',
              }"
            >
              <span slot="description" class="c-white">
                No responses yet to this ticket. Click on "Respond" above to
                leave a response for the admin now
              </span>
              <div class="sub-button mt-20">
                <button class="w-100">Buy Crypto</button>
              </div>
            </a-empty>

            <div
              v-for="response of selectedTicket.replies"
              :key="response.id"
              class="col-md-12 mb-2"
            >
              <div
                class="response float-left"
                :class="[
                  userDetails.username === response.creator.username
                    ? 'from-user'
                    : 'from-admin',
                ]"
              >
                <p
                  v-if="userDetails.username === response.creator.username"
                  class="warn"
                >
                  From You
                </p>
                <p
                  v-if="userDetails.username !== response.creator.username"
                  class="warn"
                >
                  From Admin
                </p>
                <p class="c-white">
                  {{ response.content }}
                </p>
                <p class="c-white meta">
                  {{ new Date(response.created).toDateString() }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Ticket Modal -->
    <div
      id="responseModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="responseModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalCenterTitleTitle" class="modal-title">
              Contact support
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container ml-3">
              <div class="row">
                <div class="col-md-12">
                  <p>Please fill the form below to respond to the ticket</p>
                </div>

                <div class="col-md-12">
                  <label>Your Response</label>
                  <textarea
                    v-model="response"
                    placeholder="What is the complaint?"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <button type="button" class="cancel" data-dismiss="modal">
                    Cancel
                  </button>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-7">
                  <button
                    v-if="!processing"
                    class="success-btn"
                    type="button"
                    @click="sendResponse()"
                  >
                    Send Response
                  </button>
                  <button v-if="processing" class="success-btn" disabled>
                    <i class="fa fa-circle-notch fa-spin"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    components: {},
    data() {
      return {
        baseUrl: process.env.baseUrl,
        processing: false,
        selectedTicket: {},
        response: '',
        loadingTickets: false,
      }
    },
    computed: {
      allTickets() {
        return this.$store.state.global.supportTickets
      },
      userDetails() {
        return this.$store.state.auth.user
      },
    },
    beforeMount() {
      if (this.allTickets && this.allTickets.length === 0) {
        this.getTickets()
      } else {
        this.loadTicket()
      }
    },
    mounted() {
      setTimeout(() => {
        this.$nuxt.$loading.finish()
      }, 1500)
    },
    methods: {
      closeSideBar() {
        this.$store.commit('global/closeSidebar')
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
          Authorization: this.userDetails.token,
        }

        try {
          const ticketsResponse = await this.$axios.$get(
            this.baseUrl + 'utilities/tickets/',
            { headers }
          )
          const tickets = ticketsResponse.results

          tickets.forEach((ticket) => {
            const ticketBodyArray = ticket.content.split('|')
            ticket.username = ticketBodyArray[0]
            ticket.name = ticketBodyArray[1]
            ticket.subject = ticketBodyArray[2]
            ticket.body = ticketBodyArray[3]
          })

          await this.$store.commit('global/loadTickets', tickets)
          this.loadTicket()
          this.loadingTickets = false
        } catch (e) {
          this.$toast.error(e.response.data.detail)
          console.log(e.response)
          this.loadingTickets = false
        }
      },

      loadTicket() {
        // if(this.allTickets.length === 0){
        //   this.getTickets()
        // }else{
        this.allTickets.forEach((ticket) => {
          if (ticket.id === this.$route.params.ticketId) {
            console.log('selected ticket===> ', ticket)
            this.selectedTicket = ticket
          }
        })
        // }
      },

      async sendResponse() {
        if (!this.response || this.response === '') {
          return
        }

        this.processing = true
        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.userDetails.token,
        }

        const requestBody = {
          parent: this.$route.params.ticketId,
          content: this.response,
        }

        console.log('the response request', requestBody)

        try {
          const createResponse = await this.$axios.$post(
            this.baseUrl + 'utilities/tickets/create-ticket/',
            requestBody,
            { headers }
          )
          console.log('Ticket create response ==>', createResponse)
          this.$toast.success('Response sent successfully')
          this.processing = false
          this.closeModal('responseModal')
          this.getTickets()
        } catch (e) {
          this.$toast.error(e.response)
          console.log(e.response)
          this.processing = false
        }
      },
      ...mapMutations({
        toggleSidebar: 'global/toggleSidebar',
        closeSideBar: 'global/closeSidebar',
      }),
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

  #responseModal .modal-content {
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

  #responseModal .modal-content {
    background-color: #131c4b;
    border: dashed 1px #4451ff;
    box-shadow: 25px 25px 100px #00000044;
    padding: 0;
    color: #fff;
  }

  input,
  select,
  textarea {
    padding: 15px;
    color: #ffffff99;
    background: #111a3f;
    border: solid 0;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    width: 100%;
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

  #responseModal .modal-header {
    margin-bottom: 15px;
    border: none !important;
  }

  #responseModal .modal-header button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
  }

  #responseModal .modal-header h5 {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 1.2em;
  }

  #responseModal .modal-footer {
    border: none !important;
  }

  #responseModal .modal-footer button {
    background: #11154b;
    color: #f6f6f6;
    border: solid #2832c3;
    padding: 10px 40px;
    border-radius: 25px;
    cursor: pointer;
  }

  #responseModal .modal-footer button.cancel {
    border: solid transparent;
  }

  .ticket {
    background: #0c0b3a;
    padding: 20px;
    min-height: 150px;
    height: inherit;
    margin-bottom: 20px;
    transition: all 0.3s ease-in-out;
    margin-top: 20px;
    display: block;
    border: 2px solid transparent;
  }

  .ticket p {
    margin-top: 2px;
    margin-bottom: 2px;
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

  .response {
    width: 100%;
    padding: 10px;
  }

  p.meta {
    font-size: 0.8em;
    color: #ffffffcb;
  }

  .response p {
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .from-user {
    background-color: #0c0b3a;
  }

  .from-admin {
    background-color: #11104b;
  }

  a {
    cursor: pointer;
  }
</style>
