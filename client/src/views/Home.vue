<template>
  <div class="container">
    <div class="row mb-5">
      <Title />
    </div>
    <div class="row">
      <div class="col-12 col-lg-4 offset-lg-4 pb-4">
        <GameOption
          name="The Resistance: Avalon"
          description="Avalon pits the forces of Good and Evil in a battle to control the future of civilization."
          :minPlayers="5"
          :maxPlayers="10"
          :teams="2"
          linkTo="/avalon"
          image="avalon.jpeg"
        />
      </div>
    </div>

    <!-- <div class="row">
      <Footer />
    </div>-->
  </div>
</template>

<script>
import GameOption from "@/components/index/GameOption.vue";
// import Footer from '@/components/index/Footer.vue'
import Title from "@/components/index/Title.vue";

export default {
  name: "App",
  components: {
    GameOption,
    // Footer,
    Title
  }
};
</script>

