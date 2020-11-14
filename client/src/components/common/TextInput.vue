<template>
  <div class="col-md-12 col-lg-4 offset-lg-4">
    <div class="row">
      <div class="col-12">
        <div class="input-group">
          <input
            v-model="name"
            type="text"
            class="form-control"
            :placeholder="placeholder"
            aria-label="Name"
            aria-describedby="button-start"
            :maxlength="length"
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
    <div class="row">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/common/Footer.vue";
export default {
  name: "TextInput",
  components: { Footer },
  props: {
    buttonText: String,
    placeholder: String,
    length: {
      type: Number,
      default: 20
    }
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