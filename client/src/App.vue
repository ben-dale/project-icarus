<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary">
      <a class="navbar-brand" href="/">Project Icarus</a>
    </nav>
    <router-view />
  </div>
</template>

<style>
</style>
<style lang="scss">
/* change the colors */
// TODO potentially move this into each game vue file to override colours for each game?
$danger: #cf3727;
$success: #13a382;
$warning: #e49311;
$info: #1492d6;
$secondary: #bac2c8;

$primary: #424347;
$dark: #282829;
$body-bg: #282829;
@import "bootstrap";
</style>
