<!-- Uses for both game outcome and quest outcomes -->
<template>
  <div class="col-md-12">
    <div :class="['card', (result === 'FAIL' ? 'bg-danger' : 'bg-info')]">
      <div class="card-body text-center">
        <div class="row">
          <div class="col-md-12">
            <div class="row py-5">
              <div class="col-12">
                <h3 class="card-title text-white">{{outcome}}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="row pb-5">
          <div class="col-4 offset-4">
            <button class="btn btn-dark btn-lg btn-block">{{buttonText}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: String,
    outcome: String,
    buttonText: String
  }
};
</script>