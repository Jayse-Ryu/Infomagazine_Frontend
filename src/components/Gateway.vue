<template>
  <div class="main">
    <div v-if="access_obj.access == -1">
      <div class="container text-center mt-md-5 mt-sm-3 mt-1 p-3">
        <h3><span class="text-info">{{ user_obj.full_name }}</span><span> 님은 현재 소속된 업체가 없습니다!</span></h3>
        <div class="desc_text pt-2 mb-3">
          <div>
            <div>마케터가 속하는 업체는</div>
            <div>다른 마케터들과 함께</div>
          </div>
          <div>
            <div>고객들을 관리하고,</div>
            <div>랜딩 페이지를 관리 할 수 있습니다.</div>
          </div>
          <div>
            <div>업체에 소속되거나</div>
            <div>자신의 업체를 생성하세요!</div>
          </div>
        </div>
        <button class="btn btn-primary mt-2" @click="marketer_signal(1)">생성하기</button>
        <button class="btn btn-info mt-2" @click="marketer_signal(2)">소속되기</button>
      </div>

      <transition name="fade">
        <div v-if="marketer_switch == 1">
          <h4>소속업체 생성</h4>
        </div>

        <div v-else-if="marketer_switch == 2">
          <h4>소속업체 선택</h4>
        </div>
      </transition>
    </div>

    <div v-if="access_obj.access == -2">
      <div class="container text-center mt-4 p-3">
        <h3><span class="text-info">{{ user_obj.full_name }}</span><span> 님은 현재 소속된 업체가 없습니다!</span></h3>
        <div class="desc_text pt-2 mb-3">
          <div>
            <div>현재 가입 신청한 업체는</div>
            <div><span class="text-info">{{ access_obj.company_name }}</span> 입니다.</div>
          </div>
          <div>
            <div>담당 업체에게</div>
            <div>승인을 재요청하거나,</div>
          </div>
          <div>
            <div>혹시 잘못 선택하셨다면</div>
            <div>업체를 변경하세요!</div>
          </div>
        </div>
        <button class="btn btn-primary mt-2" @click="client_signal(1)" value="1">승인요청</button>
        <button class="btn btn-info mt-2" @click="client_signal(2)" value="2">업체변경</button>
      </div>


      <transition name="fade">
        <div v-if="client_switch == 1">
          <h4>승인요청이 재전송 되었습니다.</h4>
        </div>

        <div v-else-if="client_switch == 2">
          <div class="container text-center">
            <h4>소속업체 선택</h4>
            <select name="select_company" id="select_company" class="form-control col-sm-6 m-auto"
                    v-model="access_obj.company">
              <option value="-1">업체를 선택하세요..</option>
              <option v-for="item in select_options" :value="item.id">{{ item.name }}</option>
            </select>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Gateway",
    created() {
      if (!this.$store.state.authUser) {
        alert('로그인이 필요합니다.')
        this.$router.push({
          name: 'gateway'
        })
      }
    },
    data: () => ({
      create_obj: [],
      company: 0,
      original_org: 0,
      select_options: [],
      marketer_switch: 0,
      client_switch: 0,
    }),
    methods: {
      marketer_signal(request) {
        if (this.marketer_switch === request) {
          this.marketer_switch = 0
        } else {
          this.marketer_switch = request
        }
      },
      client_signal(request) {
        if (this.client_switch === request) {
          this.client_switch = 0
        } else {
          this.client_switch = request
        }
        if (this.client_switch === 2) {
          this.get_company()
        }
      },
      get_company() {
        let axios = this.$axios
        let this_url = 'company/'
        axios.get(this.$store.state.endpoints.baseUrl + this_url)
          .then((response) => {
            this.select_options = response.data.results
          })
      }
    },
    mounted() {
      // console.log('mounted')
    },
    computed: {
      user_obj() {
        let user = this.$store.state.authUser
        return user
      },
      access_obj() {
        let access = this.$store.state.userAccess
        if (access.access === 1 || access.access === 2) {
          this.$router.push({
            name: 'landing_list'
          })
        }
        return access
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: all 200ms ease-out;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
    position: absolute;
    width: 100%;
    margin: auto;
    // transform: translateY(10px);
  }

  .desc_text {
    font-size: 16px;

    div {
      div {
        display: inline-block;
        padding: 5px 0;
        margin: auto;
      }
    }
  }
</style>
