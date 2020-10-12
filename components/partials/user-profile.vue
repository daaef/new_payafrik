<template>
  <div class="profile--modal">
    <a class="modal-close mt-5" @click="$store.commit('setProfileModal')">
      <img src="../../assets/img/close.png" alt="" />
    </a>
    <div class="modal-content">
      <div class="main-modal">
        <div class="w-100 flex-wrap flex flex-center flex-middle">
          <div class="w-100 welcome-text">
            <div class="text-center">
              <p class="w-100 c-white">user</p>
              <h1 class="w-100 c-white am-type mt-0 mb-0">Information</h1>
            </div>
          </div>
          <div class="u-info w-64 mt-32">
            <div class="u-image text-center">
              <img
                v-if="!userDetails.avatar"
                src="../../assets/img/user-info.png"
                alt=""
              />
              <div
                v-if="userDetails.avatar"
                class="user-avatar"
                :style="{
                  backgroundImage: 'url(' + userDetails.avatar + ')',
                }"
              ></div>
              <!-- <p class="light c-dim-white">Upload Image</p> -->
            </div>
            <div class="u-main--content">
              <!-- <form> -->
              <div class="row w-100 flex-between">
                <div>
                  <input
                    v-model="firstname"
                    type="text"
                    class="normal--input"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <input
                    v-model="lastname"
                    type="ext"
                    class="normal--input"
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <input
                    v-model="username"
                    disabled
                    type="text"
                    class="normal--input"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <input
                    v-model="email"
                    type="email"
                    class="normal--input"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <input
                    v-model="phone"
                    disabled
                    type="text"
                    class="normal--input"
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <input
                    v-model="dob"
                    type="date"
                    class="normal--input"
                    placeholder="Date of birth"
                  />
                </div>
                <hr />
                <div class="w-100 text-right">
                  <p class="c-white mt-3 mb-0">
                    Click the boxes below to upload KYC Documents
                  </p>
                </div>
                <div class="w-100 kyc--content">
                  <div class="text-cont text-right am-type pt-4 pb-4 c-white">
                    Kyc Documents
                  </div>
                  <div>
                    <a
                      v-if="
                        !userDetails.kyc_passport_page1 ||
                        userDetails.kyc_passport_page1 === ''
                      "
                      class="k+ text-center"
                      data-backdrop="false"
                      @click="openModal('uploadModal', 'PASSPORT', 'PAGE-ONE')"
                    >
                      +
                    </a>
                    <div
                      v-if="
                        userDetails.kyc_passport_page1 &&
                        userDetails.kyc_passport_page1 !== ''
                      "
                      class="user-avatar"
                      :style="{
                        backgroundImage:
                          'url(' + userDetails.kyc_passport_page1 + ')',
                      }"
                    ></div>
                    <span class="d-block text-center mt-12 c-dim-white"
                      >Passport</span
                    >
                  </div>
                  <div>
                    <a
                      v-if="
                        !userDetails.kyc_id_front ||
                        userDetails.kyc_id_front === ''
                      "
                      class="k+"
                      @click="openModal('uploadModal', 'NATIONAL-ID', 'FRONT')"
                    >
                      +
                    </a>
                    <div
                      v-if="
                        userDetails.kyc_id_front &&
                        userDetails.kyc_id_front !== ''
                      "
                      class="user-avatar"
                      :style="{
                        backgroundImage:
                          'url(' + userDetails.kyc_id_front + ')',
                      }"
                    ></div>
                    <span class="d-block text-center mt-12 c-dim-white"
                      >ID Front</span
                    >
                  </div>
                  <div>
                    <a
                      v-if="
                        !userDetails.kyc_id_back ||
                        userDetails.kyc_id_back === ''
                      "
                      class="k+"
                      @click="openModal('uploadModal', 'NATIONAL-ID', 'BACK')"
                    >
                      +
                    </a>
                    <div
                      v-if="
                        userDetails.kyc_id_back &&
                        userDetails.kyc_id_back !== ''
                      "
                      class="user-avatar"
                      :style="{
                        backgroundImage: 'url(' + userDetails.kyc_id_back + ')',
                      }"
                    ></div>
                    <span class="d-block text-center mt-12 c-dim-white"
                      >ID Back</span
                    >
                  </div>
                  <div>
                    <a
                      v-if="
                        !userDetails.kyc_selfie || userDetails.kyc_selfie === ''
                      "
                      class="k+"
                      @click="openModal('uploadModal', 'KYC-SELFIE', 'FRONT')"
                    >
                      +
                    </a>
                    <div
                      v-if="
                        userDetails.kyc_selfie && userDetails.kyc_selfie !== ''
                      "
                      class="user-avatar"
                      :style="{
                        backgroundImage: 'url(' + userDetails.kyc_selfie + ')',
                      }"
                    ></div>
                    <span class="d-block text-center mt-12 c-dim-white"
                      >Selfie</span
                    >
                  </div>
                </div>
                <div class="w-100 mt-40 text-center">
                  <button
                    v-if="!processing"
                    class="user--btn"
                    @click="updateProfile()"
                  >
                    Update
                  </button>
                  <button
                    v-if="processing"
                    class="user--btn"
                    @click="updateProfile()"
                  >
                    Updating...
                  </button>
                </div>
              </div>
              <!-- </form> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload kyc document modal -->
    <div
      id="uploadModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="uploadModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalCenterTitleTitle" class="modal-title">
              Upload a Document
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
                  <label>Document Type</label>
                  <select
                    v-model="documentType"
                    placeholder="Select document type"
                    disabled
                  >
                    <option value="">-- Select document type --</option>
                    <option value="NATIONAL-ID">Govt Regulatory ID Card</option>
                    <option value="PASSPORT">International Passport</option>
                    <option value="KYC-SELFIE">
                      KYC Selfie/Passport photo
                    </option>
                  </select>
                </div>
                <div class="col-md-12">
                  <label>Document Side</label>
                  <select
                    v-model="documentSide"
                    placeholder="Select document type"
                    disabled
                  >
                    <option value="">-- Select side --</option>
                    <option value="FRONT">Front</option>
                    <option value="PAGE-ONE">Page 1</option>
                    <option value="PAGE-TWO">Page 2</option>
                    <option value="BACK">Back</option>
                  </select>
                </div>
                <div class="col-md-12">
                  <!-- <input type="text" placeholder="Your assigned import code"> -->
                  <p class="form-tip mb-3">Select a document to upload</p>

                  <!-- <input type="file" @change="onFileChange" class="input-file" /> -->
                  <input
                    id="file"
                    ref="file"
                    type="file"
                    name="file"
                    class="input-file"
                    @change="onFileChange"
                  />
                  <label for="file"
                    ><i class="ti-upload"></i> choose a file</label
                  >

                  <div v-if="image" class="row mt-4">
                    <div class="col-md-2">
                      <img :src="image" />
                    </div>
                    <div class="col-md-10">
                      <p class="mt-1">{{ fileName }}</p>
                    </div>
                  </div>
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
                <div class="col-md-4"></div>
                <div class="col-md-4">
                  <button
                    v-if="!uploadingDoc"
                    class="success-btn"
                    type="submit"
                    @click="uploadDoc()"
                  >
                    Upload
                  </button>
                  <button v-if="uploadingDoc" class="success-btn" disabled>
                    <i class="fas fa-circle-notch fa-spin"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // import { mapState } from 'vuex'

  export default {
    data() {
      return {
        dob: '',
        uploadingDoc: false,
        documentType: '',
        documentSide: '',
        baseUrl: process.env.baseUrl,
        uploadedFile: '',
        image: '',
        fileName: '',
        updatedUserDetails: {},
        firstname: '',
        lastname: '',
        username: '',
        phone: '',
        email: '',
        processing: false,
      }
    },
    computed: {
      userDetails() {
        return this.$store.state.auth.user
      },
      ...mapGetters({
        countryCodes: 'countryCodes',
        btcData: 'btcData',
        ethData: 'ethData',
        litecoinData: 'litecoinData',
        dashData: 'dashData',
        btcChartData: 'btcChartData',
        ethChartData: 'ethChartData',
        litecoinChartData: 'litecoinChartData',
        dashChartData: 'dashChartData',
        data: 'chartData',
        chatBoxClosed: 'chatBoxClosed',
        tokenModalActive: 'tokenModalActive',
        canvasClass: 'canvasClass',
        daysInterval: 'daysInterval',
        btcPrices: 'btcPrices',
        ethPrices: 'ethPrices',
        ltcPrices: 'ltcPrices',
        dashPrices: 'dashPrices',
        activeCurrency: 'activeCurrency',
      }),
    },
    mounted() {
      console.log('User in profile ======>', this.userDetails)
      this.updatedUserDetails = this.userDetails
      this.firstname = this.userDetails.first_name
      this.lastname = this.userDetails.last_name
      this.username = this.userDetails.username
      this.phone = this.userDetails.phone
      this.email = this.userDetails.email
      this.dob = this.userDetails.dob
    },
    beforeMount() {
      // this.getUserDetails();
    },
    methods: {
      openModal(modalId, docType, docSide) {
        this.documentType = docType
        this.documentSide = docSide
      },

      resetFile() {
        this.$refs.file.value = ''
      },

      onFileChange(e) {
        const files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.uploadedFile = files[0]
        this.fileName = this.uploadedFile.name
        this.createImage(files[0])
      },

      createImage(file) {
        const image = new Image()
        const reader = new FileReader()
        const vm = this

        reader.onload = (e) => {
          vm.image = e.target.result
        }
        reader.readAsDataURL(file)
        console.log(image)
      },

      async uploadDoc() {
        this.uploadingDoc = true
        const formData = new FormData()
        formData.append('file', this.uploadedFile)

        const headers = {
          'Content-Type': 'multipart/form-data',
          Authorization: this.$auth.getToken('local'),
        }

        try {
          const uploaded = await this.$axios.$post(
            this.baseUrl +
              'auth/kyc/' +
              this.documentType +
              '/' +
              this.documentSide +
              '/',
            formData,
            { headers }
          )
          console.log(uploaded)
          this.uploadedFile = ''
          this.image = ''
          this.fileName = ''
          await this.getUserDetails()
          this.uploadingDoc = false
        } catch (e) {
          this.importingWallet = false
          console.log(e.response)
          this.uploadingDoc = false
        }
      },

      async updateProfile() {
        this.processing = true
        const payload = {
          first_name: this.firstname,
          last_name: this.lastname,
          dob: this.dob,
          email: this.email,
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.$auth.getToken('local'),
        }

        console.log(payload)

        try {
          const signupResponse = await this.$axios.$put(
            this.baseUrl + 'auth/user/edit-profile/',
            payload,
            { headers }
          )
          console.log('Edit Response', signupResponse)
          this.processing = false
        } catch (e) {
          console.log(e.response)
          this.$toast.error({
            key: 'updatable',
            message: 'Error!',
            description:
              e.response.statusText +
              ': Please make sure all ur fields are provided',
            duration: 0,
            class: 'error',
            onClick: () => {
              console.log('Notification Clicked!')
            },
          })
          this.processing = false
        }
      },

      async getUserDetails() {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: this.$auth.getToken('local'),
        }

        try {
          const updatedUserDetails = await this.$axios.$get(
            this.baseUrl + 'auth/accounts/' + this.userDetails.id + '/',
            { headers }
          )
          updatedUserDetails.token = this.$auth.getToken('local')
          console.log('updated user =====>', updatedUserDetails)
          this.authenticate(updatedUserDetails)
          this.firstname = this.userDetails.first_name
          this.lastname = this.userDetails.last_name
          this.username = this.userDetails.username
          this.phone = this.userDetails.phone
          this.email = this.userDetails.email
          this.dob = this.userDetails.dob
        } catch (e) {
          this.$toast.error(e.response)
          this.importingWallet = false
          console.log(e.response)
        }
      },
    },
  }
</script>

<style scoped>
  .modal-close {
    cursor: pointer;
  }
  button a {
    color: #fff !important;
  }

  .custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
    cursor: pointer;
  }
  .custom-file-input::before {
    content: 'Select some files';
    display: inline-block;
    background: #fff;
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
  }
  .custom-file-input:hover::before {
    border-color: black;
  }
  /* .custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
} */

  .user-avatar {
    width: 100%;
    height: 100px;
    background-size: cover;
    background-repeat: no-repeat;
  }

  select {
    padding: 20px;
    color: #ffffff99;
    background: #111a3f;
    border: solid 0;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    width: 100%;
  }

  #uploadModal .modal-content {
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

  #uploadModal .modal-header {
    margin-bottom: 15px;
    border: none !important;
  }

  #uploadModal .modal-header button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
  }

  #uploadModal .modal-header h5 {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 1.2em;
  }

  #uploadModal .modal-footer {
    border: none !important;
  }

  #uploadModal .modal-footer button {
    background: #11154b;
    color: #f6f6f6;
    border: solid #2832c3;
    padding: 10px 40px;
    border-radius: 25px;
    cursor: pointer;
  }

  #uploadModal .modal-footer button.cancel {
    border: solid transparent;
  }
</style>
