<template>
    <div class="modal-shadow" @click.self="$emit('close-add-directory-window')">
        <div class="modal">
            <div
                class="modal-close"
                @click="$emit('close-add-directory-window')"
            >
                &#10006;
            </div>
            <div class="modal-content">
                <h3 class="modal-content__header">Creation directory</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Directory name"
                    v-model="name"
                />
                <button @click="addDirectory(name)">Create</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: ["path", "token"],
    data() {
        return {
            name: "",
        };
    },
    methods: {
        addDirectory(name) {
            let config = {
                method: "post",
                url: "http://localhost:80/files/add-directory",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.token,
                },
                data: {
                    path: this.path,
                    name: name,
                },
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    this.$emit("close-add-directory-window");
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
};
</script>

<style scoped>
input {
    margin-bottom: 20px;
}
</style>