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
export default {
    props: ["path", "token"],
    data() {
        return {
            name: "",
        };
    },
    methods: {
        addDirectory(name) {
            const axios = require("axios");

            let data = JSON.stringify({
                path: this.path,
                name: name,
            });

            let config = {
                method: "post",
                url: "http://localhost:80/files/add-directory",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: this.token,
                },
                data: data,
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    this.$emit('close-add-directory-window');
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
</style>