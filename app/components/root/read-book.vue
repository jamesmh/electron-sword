<template>
    <div>
        <slide-transition>
        <reader :bookId="id"></reader>
        </slide-transition>
    </div>
</template>

<script>
    export default {
        props: ["id"]
    }
</script>