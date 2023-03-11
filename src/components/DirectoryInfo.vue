<template>
    <div
        class="modal-shadow"
        @click.self="$emit('close-directory-info-window')"
    >
        <div class="modal">
            <div
                class="modal-close"
                @click="$emit('close-directory-info-window')"
            >
                &#10006;
            </div>
            <div class="modal-content">
                <h3 class="modal-content__header">Direcotry Info</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Directory name"
                    v-model="name"
                />
                <div class="button__content">
                    <button class="save-button" @click="saveDirectory()">
                        Save
                    </button>
                    <button class="delete-dutton" @click="deleteDirectory">
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
            oldName: "",
        };
    },
    methods: {
        deleteDirectory() {
            if (this.name == this.path.split("/")[0]) {
                alert("You cannot delete the root directory");
                return;
            }

            let config = {
                method: "post",
                url: "http://localhost:80/files/delete-directory",
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
                    this.$emit("delete-directory-info", this.oldName);
                })
                .catch(function (error) {
                    console.log(error);
                    let message = error.response.data["message"];
                    alert(message);
                });
        },
        saveDirectory() {
            if (this.name == this.path.split("/")[0]) {
                alert("You cannot change the name of the root directory");
                return;
            }

            let config = {
                method: "post",
                url: "http://localhost:80/files/edit-directory",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.token,
                },
                data: {
                    path: this.path,
                    name: this.name,
                },
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    this.$emit("save-directory-info", this.oldName, this.name);
                })
                .catch(function (error) {
                    console.log(error);
                    let message = error.response.data["message"];
                    alert(message);
                });
        },
    },
    created() {
        this.name = this.path.split("/")[this.path.split("/").length - 2];
        this.oldName = this.name;
    },
};
</script>

<style scoped>
input {
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
