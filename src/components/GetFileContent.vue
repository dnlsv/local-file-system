<template>
    <div
        class="modal-shadow"
        @click.self="$emit('close-get-file-content-window')"
    >
        <div class="modal">
            <div
                class="modal-close"
                @click="$emit('close-get-file-content-window')"
            >
                &#10006;
            </div>
            <div class="modal-content">
                <h3 class="modal-content__header">File content</h3>
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
                <button @click="saveFile(name, content)">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["path", "token"],
    data() {
        return {
            name: "",
            content: "",
        };
    },
    methods: {
        saveFile(name, content) {
            console.log(name + " " + content);
        },
        getFileContent() {
            const axios = require("axios");

            let config = {
                method: "get",
                url: "http://localhost:80/files/get-file-content",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.token,
                },
                params: {
                    path: this.path,
                },
            };

            axios(config)
                .then((response) => {
                    this.content = response.data.content;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    created() {
        this.name = this.path.split("/")[this.path.split("/").length - 1];
        this.getFileContent();
    },
};
</script>