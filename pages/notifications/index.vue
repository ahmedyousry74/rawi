<template>
  <div>
    <notifications></notifications>
  </div>
</template>


<script>
import notifications from "@/components/client/notifications/index.vue"
export default{
  name: "notification",
  layout: "default",
  components:{
    notifications
  },
  data(){
    return{

    }
  }
}
</script>


<style lang="scss">

</style>
