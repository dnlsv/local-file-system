<template>
    <button @click="showAddFileWindow">Create file</button>
    <button @click="showAddDirectoryWindow">Create directory</button>
    <p>{{ path }}</p>

    <add-file
        :path="path"
        :token="token"
        v-if="showAddFile"
        @close-add-file-window="closeAddFileWindow"
    ></add-file>
    <add-directory
        :path="path"
        :token="token"
        v-if="showAddDirectory"
        @close-add-directory-window="closeAddDirectoryWindow"
    >
    </add-directory>
    <get-file-content
        :path="path"
        :token="token"
        v-if="showGetFileContent"
        @close-get-file-content-window="closeGetFileContentWindow"
    >
    </get-file-content>

    <ul>
        <li
            v-for="(name, index) in names"
            :key="index"
            @click="fileClick(name)"
        >
            {{ name }}
        </li>
    </ul>
</template>

<script>
import AddFile from "../components/AddFile.vue";
import AddDirectory from "../components/AddDirectory.vue";
import GetFileContent from "../components/GetFileContent.vue";

export default {
    components: {
        AddFile,
        AddDirectory,
        GetFileContent,
    },
    data() {
        return {
            path: "",
            token: "",
            showAddFile: false,
            showAddDirectory: false,
            showGetFileContent: false,
            names: [],
        };
    },
    methods: {
        fileClick(name) {
            if (name.indexOf(".", 0) == -1) {
                this.path = this.path + name + "/";
                this.getDirectoryContent();
            } else {
                this.path = this.path + name;
                this.showGetFileContent = true;
            }
        },
        getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) {
                return parts.pop().split(";").shift();
            }
        },
        showAddFileWindow() {
            this.showAddFile = true;
        },
        closeAddFileWindow() {
            this.showAddFile = false;
            this.getDirectoryContent();
        },
        showAddDirectoryWindow() {
            this.showAddDirectory = true;
        },
        closeAddDirectoryWindow() {
            this.showAddDirectory = false;
            this.getDirectoryContent();
        },
        closeGetFileContentWindow() {
            this.showGetFileContent = false;
            this.getDirectoryContent();
        },
        getDirectoryContent() {
            const axios = require("axios");

            let config = {
                method: "get",
                url: "http://localhost:80/files/get-directory-content",
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
                    response.data.forEach((element) => {
                        this.names.splice(
                            response.data.indexOf(element),
                            1,
                            element.name
                        );
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getFileContent() {},
    },
    created() {
        this.path = this.getCookie("path");
        this.token = this.getCookie("Auth-Token");
        this.getDirectoryContent();
    },
    watch: {
        path: function () {
            document.cookie = "path=" + this.path;
        },
    },
};
</script>

<style scoped>
p {
    font-size: 16px;
}
</style>