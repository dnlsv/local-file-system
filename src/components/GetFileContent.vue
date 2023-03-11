<template>
    <div
        class="modal-shadow"
        @click.self="$emit('close-get-file-content-window', oldName)"
    >
        <div class="modal">
            <div
                class="modal-close"
                @click="$emit('close-get-file-content-window', oldName)"
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
                <div class="button__content">
                    <button
                        class="save-button"
                        @click="saveFile(name, content)"
                    >
                        Save
                    </button>
                    <button class="delete-dutton" @click="deleteFile">
                        Delete
                    </button>
                </div>
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
            oldName: "",
        };
    },
    methods: {
        deleteFile() {
            let config = {
                method: "post",
                url: "http://localhost:80/files/delete-file",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.token,
                },
                data: {
                    path: this.path,
                },
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    this.$emit("close-get-file-content-window", this.oldName);
                })
                .catch(function (error) {
                    console.log(error);
                    let message = error.response.data["message"];
                    alert(message);
                });
        },
        saveFile(name, content) {
            let config = {
                method: "post",
                url: "http://localhost:80/files/edit-file",
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
                    this.$emit("close-get-file-content-window", this.oldName);
                })
                .catch(function (error) {
                    console.log(error);
                    let message = error.response.data["message"];
                    alert(message);
                });
        },
        getFileContent() {
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
                    let message = error.response.data["message"];
                    alert(message);
                });
        },
    },
    created() {
        this.name = this.path.split("/")[this.path.split("/").length - 1];
        this.oldName = this.name;
        this.getFileContent();
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
.save-button {
    width: 190px;
    margin-right: 20px;
}

.delete-dutton {
    width: 90px;
}

.button__content {
    display: flex;
}
</style>
