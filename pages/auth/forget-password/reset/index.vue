<template>
  <div class="auth_main_wrapper">
    <div class="container">
      <div class="row">
        <div class="col-lg-5 col-12">
          <div class="img_wrapper">
            <img src="~/assets/images/pass.png" alt="login" />
          </div>
          <!-- end::img_wrapper -->
        </div>
        <!-- end::col -->
        <div class="col-lg-7 col-12">
          <div class="form_wrapper">
            <h2 class="main_title">{{ $t('welcome') }}</h2>
            <h4 class="sub_title">{{ $t('register') }}</h4>
            <p class="hint">
              {{ $t('have_account') }}
              <router-link :to="localePath({ name: 'auth-login' })">
                {{ $t('login') }}
              </router-link>
            </p>

            <client-only>
              <ValidationObserver ref="form">
                <b-form @submit.prevent="handleForm">
                  <ValidationProvider
                    vid="confirm_password"
                    :name="$t('password')"
                    :rules="{
                      required: true,
                      min: 8,
                    }"
                    v-slot="{ errors }"
                  >
                    <b-form-group :label="$t('password')">
                      <b-input-group>
                        <b-form-input
                          :type="password_s"
                          v-model="form.password"
                          :class="{ invalid: errors[0] }"
                          :placeholder="$t('enter_your') + ' ' + $t('password')"
                        ></b-form-input>
                        <svg class="icon" @click="showPassword('original')">
                          <use
                            xlink:href="~/static/icons/solid.svg#eye"
                            v-if="password_s == 'password'"
                          ></use>
                          <use
                            xlink:href="~/static/icons/solid.svg#eye-slash"
                            v-if="password_s == 'text'"
                          ></use>
                        </svg>
                      </b-input-group>
                      <span v-if="errors[0]" class="validation-error">
                        {{ errors[0] }}
                      </span>
                    </b-form-group>
                  </ValidationProvider>
                  <!-- end::form-group -->

                  <ValidationProvider
                    rules="required|confirmed:confirm_password"
                    :name="$t('confirm_pass')"
                    v-slot="{ errors }"
                  >
                    <b-form-group :label="$t('confirm_pass')">
                      <b-input-group>
                        <b-form-input
                          :type="con_password_s"
                          v-model="form.password_confirmation"
                          :class="{ invalid: errors[0] }"
                          :placeholder="
                            $t('enter_your') + ' ' + $t('confirm_pass')
                          "
                        ></b-form-input>
                        <svg class="icon" @click="showPassword('confirm')">
                          <use
                            xlink:href="~/static/icons/solid.svg#eye"
                            v-if="con_password_s == 'password'"
                          ></use>
                          <use
                            xlink:href="~/static/icons/solid.svg#eye-slash"
                            v-if="con_password_s == 'text'"
                          ></use>
                        </svg>
                      </b-input-group>
                      <span v-if="errors[0]" class="validation-error">
                        {{ errors[0] }}
                      </span>
                    </b-form-group>
                    <!-- end::form-group -->
                  </ValidationProvider>
                  <!-- end::form-group -->

                  <div class="form-group">
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
                      {{ $t('submit') }}
                    </button>
                  </div>
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

<script src="~/pages/auth/forget-password/reset/-script.js"></script>

<style lang="scss">
.form-control {
  height: 55px;
  border-radius: 8px;
  border-color: #0000001a;
  box-shadow: none !important;
  &:focus {
    border-color: $second-color;
  }
}
.vue-phone-number-input {
  width: 100%;
  height: 55px !important;
  direction: ltr;
}
.country-selector__input,
.input-tel__input {
  height: 55px !important;
}
</style>

<style lang="scss" scoped>
.terms_wrapper {
  .input-group {
    align-items: center;
    input {
      transform: translateY(-2px);
    }
    label {
      font-weight: 500;
      margin-inline-start: 6px;
      cursor: pointer;
      a {
        text-decoration: underline !important;
        color: $second-color;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.input-group {
  align-items: center;
  position: relative;
  .icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    fill: $primary-color;
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
  }
}
</style>
