<template>
  <div class="pad-layout">
    <nav>
        <router-link tag="h1" :to="{name: 'gallery'}" class="title-app">LauncherGame</router-link>
        <ul>
            <li>
                <router-link :to="{name: 'config'}"><i class="fas fa-cog"></i></router-link>
            </li>
        </ul>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'Navbar'
}
</script>

<style scoped>

nav{
    padding-top: 30px;
    padding-bottom: 100px;
    display: flex;
    justify-content: space-between;
    font-size: 1.25em;
}

.title-app{
    cursor: pointer;
}

ul{
    display: flex;
}

li{
    margin-left: 15px;
}

</style>
