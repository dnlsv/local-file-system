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
            const axios = require("axios");

            let data = JSON.stringify({
                path: this.path,
                name: name,
                content: content,
            });

            let config = {
                method: "post",
                url: "http://localhost:80/files/add-file",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.token,
                },
                data: data,
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    this.$emit('close-add-file-window');
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
};
</script>

<style>
.modal-shadow {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.39);
}

.modal {
    background: #fff;
    padding: 15px;
    min-width: 420px;
    max-width: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
}

.modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
}

.modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.modal-content__header {
    margin-bottom: 30px;
}

input {
    margin-bottom: 20px;
}

textarea {
    margin-bottom: 20px;
}
</style>