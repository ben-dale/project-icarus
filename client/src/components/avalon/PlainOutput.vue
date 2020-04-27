<template>
    <div class="col-md-12">
        <div class="card">
          <div class="card-body text-center">
            <div class="row py-5">
              <div class="col-12">
                <h4 class="card-title">{{line}}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
    props: {
        line: Array
    }
}
</script>