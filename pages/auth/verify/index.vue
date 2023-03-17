<template>
  <div class="auth_main_wrapper">
    <div class="container">
      <div class="row">
        <div class="col-lg-5 col-12">
          <div class="img_wrapper">
            <img src="~/assets/images/OTPCode.png" alt="login" />
          </div>
          <!-- end::img_wrapper -->
        </div>
        <!-- end::col -->
        <div class="col-lg-7 col-12">
          <div class="form_wrapper">
            <h2 class="main_title text-center mb-5">
              {{ $t('verifactionCode') }}
            </h2>

            <client-only>
              <ValidationObserver ref="form">
                <b-form @submit.prevent="handleForm">
                  <b-form-group>
                    <div class="input_flex">
                      <input
                        v-for="(key, idx) in 4"
                        :key="idx"
                        ref="codeRef"
                        type="number"
                        maxlength="1"
                        class="input-code form-control"
                        placeholder="0"
                        :value="activationCells[idx]"
                        :name="`code`"
                        @input="inputActivationCode($event.target.value, idx)"
                        @keyup="checkForKeys($event.keyCode, idx)"
                      />
                    </div>
                  </b-form-group>
                  <!-- end::form-group -->
                  <div class="submit_wrapper">
                    <button
                      type="submit"
                      class="btn btn-default"
                      :disabled="disabled"
                    >
                      <b-spinner
                        small
                        variant="light"
                        v-if="disabled"
                      ></b-spinner>
                      {{ $t('send') }}
                    </button>
                    <button type="button" class="btn mt-2" @click="resendCode">
                      {{ $t('resend') }}
                    </button>
                  </div>
                  <!-- end::submit_wrapper -->
                </b-form>
              </ValidationObserver>
            </client-only>
          </div>
          <!-- end::form_wrapper -->
        </div>
        <!-- end::col -->
      </div>
      <!-- end::row -->
    </div>
  </div>
</template>

<script src="~/pages/auth/verify/-script.js"></script>

<style lang="scss" scoped>
.submit_wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  .counterdown {
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 20px;
    span {
      font-size: 2rem;
      font-family: 'regular';
    }
  }
  .btn {
    &:last-child {
      color: #005894;
      text-decoration: underline;
      font-weight: 600;
    }
  }
}
.input_flex {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  input {
    width: calc(100% / 4 - 10px);
    text-align: center;
    border-radius: 15px;
    height: 80px;
    font-size: 18px;
    color: #000;
    direction: ltr;
    font-weight: 600;
    box-shadow: none !important;
    border: 1px solid #ddd;
    font-family: 'Montserrat', sans-serif;
    transition: all 0.25s;
    &:focus {
      border-color: $primary-color;
    }
    &:focus::placeholder {
      opacity: 0;
    }
    &::placeholder {
      font-size: 30px;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    & {
      -moz-appearance: textfield;
    }
  }
}

.dir_left .input_flex {
  flex-direction: row;
}
</style>
