<template>
  <div class="col-md-4 offset-md-4">
    <div class="input-group input-group-lg">
      <input
        v-model="name"
        type="text"
        class="form-control"
        placeholder="Name"
        aria-label="Name"
        aria-describedby="button-start"
        maxlength="15"
        required
      />
      <div class="input-group-append">
        <button
          v-on:click="submit"
          class="btn btn-dark"
          type="button"
          id="button-start"
        >{{buttonText}}</button>
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