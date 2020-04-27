<template>
  <div class="col-md-12">
    <div class="row mb-3">
      <QuestLog />
    </div>
    <div class="row mb-3">
        <QuestResultReveal />
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body text-center">
            <div class="row py-5">
              <div class="col-12">
                <h4 class="card-title">You have been sent on a quest alonside ...</h4>
                <h4
                  class="card-title"
                >What would you like to do? Your answer will be kept anonymous.</h4>
              </div>
            </div>
            <div class="row pb-5">
              <div class="col-4 offset-2">
                <button class="btn btn-info btn-lg btn-block">Succeed</button>
              </div>
              <div class="col-4">
                <button class="btn btn-danger btn-lg btn-block">Sabotage</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body text-center">
            <div class="row py-5">
              <div class="col-12">
                <h4 class="card-title">... have been sent on a quest.</h4>
                <h4 class="card-title">The results of the quest will be revealed by ... shortly.</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body text-center">
            <div class="row py-5">
              <div class="col-12">
                <h4 class="card-title">The team has successfully completed the quest!</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body text-center">
            <div class="row py-5">
              <div class="col-12">
                <h4 class="card-title">Evil has sabbotaged the quest! The team has failed.</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body text-center">
            <div class="row py-5">
              <div class="col-12">
                <h4 class="card-title">... has proposed that ... head out on the quest.</h4>
                <h4 class="card-title">What do you think?</h4>
                <h4 class="card-title">Your vote will be seen by the other players.</h4>
              </div>
            </div>
            <div class="row pb-5">
              <div class="col-4 offset-2">
                <button class="btn btn-dark btn-lg btn-block">Approve</button>
              </div>
              <div class="col-4">
                <button class="btn btn-dark btn-lg btn-block">Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
import QuestLog from '@/components/avalon/QuestLog.vue'
import QuestResultReveal from '@/components/avalon/QuestResultReveal.vue'

export default {
    components: {QuestLog, QuestResultReveal }
};
</script>