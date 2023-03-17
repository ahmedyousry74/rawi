<template>
  <div class="auth_main_wrapper">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-5 col-12">
          <div class="img_wrapper">
            <img src="~/assets/images/Password.png" alt="login" />
          </div>
          <!-- end::img_wrapper -->
        </div>
        <!-- end::col -->
        <div class="col-lg-7 col-12">
          <div class="form_wrapper">
            <h2 class="main_title">{{ $t('reset_pass') }}</h2>

            <client-only>
              <ValidationObserver ref="form">
                <b-form @submit.prevent="handleForm">
                  <ValidationProvider
                    rules="required|min:9"
                    :name="$t('phone_number')"
                    v-slot="{ errors }"
                  >
                    <b-form-group :label="$t('phone_number')">
                      <b-input-group>
                        <VuePhoneNumberInput
                          v-model="form.phone_number"
                          :default-country-code="'SA'"
                          :preferred-countries="['SA']"
                          :no-flags="true"
                          @update="catchCountry"
                        ></VuePhoneNumberInput>
                      </b-input-group>
                      <span v-if="errors[0]" class="validation-error">
                        {{ errors[0] }}
                      </span>
                    </b-form-group>
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
                      {{ $t('send') }}
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

<script src="~/pages/auth/forget-password/-script.js"></script>

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
