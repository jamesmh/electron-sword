<template>
    <div>
        <reader :bookId="id"></reader>
    </div>
</template>

<script>
    export default {
        props: ["id"]
    }
</script>