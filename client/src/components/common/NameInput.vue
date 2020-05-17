<template>
  <div class="col-md-12 col-lg-6 offset-lg-3">
    <div class="row">
      <div class="col-12">
        <div class="input-group input-group-lg">
          <input
            v-model="name"
            type="text"
            class="form-control"
            placeholder="Name"
            aria-label="Name"
            aria-describedby="button-start"
            maxlength="20"
            required
          />
          <div class="input-group-append">
            <button
              v-on:click="submit"
              class="btn btn-primary"
              type="button"
              id="button-start"
            >{{buttonText}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NameInput",
  props: {
    buttonText: String
  },
  data: function() {
    return {
      name: ""
    };
  },
  methods: {
    submit: function() {
      this.$emit("submit", this.name);
    }
  }
};
</script>