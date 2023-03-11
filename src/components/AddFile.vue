<template>
    <div class="modal-shadow" @click.self="$emit('close-add-file-window')">
        <div class="modal">
            <div class="modal-close" @click="$emit('close-add-file-window')">
                &#10006;
            </div>
            <div class="modal-content">
                <h3 class="modal-content__header">Creation file</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="File name"
                    v-model="name"
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    rows="10"
                    v-model="content"
                ></textarea>
                <button @click="addFile(name, content)">Create</button>
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
            content: "",
        };
    },
    methods: {
        addFile(name, content) {
            let config = {
                method: "post",
                url: "http://localhost:80/files/add-file",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.token,
                },
                data: {
                    path: this.path,
                    name: name,
                    content: content,
                },
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    this.$emit("close-add-file-window");
                })
                .catch(function (error) {
                    console.log(error);
                    let message = error.response.data["message"];
                    alert(message);
                });
        },
    },
};
</script>

<style scoped>
input {
    margin-bottom: 20px;
}

textarea {
    margin-bottom: 20px;
}
</style>
