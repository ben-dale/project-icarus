<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-body text-center">
        <div class="row py-5">
          <div class="col-12">
            <h4 class="card-title">You are on a quest with the following members:</h4>
            <h3 class="card-title pb-5">
              <span
                v-for="(member, index) in members"
                :key="index"
                class="badge badge-pill badge-dark mx-2"
              >{{member}}</span>
            </h3>
            <h4 class="card-title">How would you like to proceed?</h4>
            <h4 class="card-title">Your decision will be kept anonymous.</h4>
          </div>
        </div>
        <div class="row pb-5">
          <div class="col-4 offset-2">
            <button class="btn btn-info btn-lg btn-block">Succeed</button>
          </div>
          <div class="col-4">
            <button class="btn btn-danger btn-lg btn-block" :disabled="!isEvil">Sabotage</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isEvil: Boolean,
    members: Array
  }
};
</script>