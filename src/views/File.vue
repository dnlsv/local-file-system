<template>
    <div class="file-content">
        <div class="buttons">
            <button class="createFileButton" @click="showAddFileWindow">
                Create file
            </button>
            <button
                class="createDirectoryButton"
                @click="showAddDirectoryWindow"
            >
                Create directory
            </button>
            <button @click="showDirectoryInfoWindow">Directory info</button>
        </div>
        <div class="file-system">
            <div class="path">
                <button class="returnButton" @click="returnClick">
                    Return
                </button>
                <p>{{ path }}</p>
            </div>
            <ul class="files-list">
                <li
                    v-for="(name, index) in names"
                    :key="index"
                    @click="fileClick(name)"
                >
                    {{ name }}
                </li>
            </ul>
        </div>
        <button class="log-off" @click="logOff">Log off</button>
    </div>

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
    <direcotry-info
        :path="path"
        :token="token"
        v-if="showDirectoryInfo"
        @close-directory-info-window="closeDirectoryInfoWindow"
        @save-directory-info="saveDirectoryInfo"
        @delete-directory-info="deleteDirectoryInfo"
    >
    </direcotry-info>
</template>

<script>
import AddFile from "../components/AddFile.vue";
import AddDirectory from "../components/AddDirectory.vue";
import GetFileContent from "../components/GetFileContent.vue";
import DirecotryInfo from "../components/DirectoryInfo.vue";
import axios from "axios";

export default {
    components: {
        AddFile,
        AddDirectory,
        GetFileContent,
        DirecotryInfo,
    },
    data() {
        return {
            path: "",
            token: "",
            showAddFile: false,
            showAddDirectory: false,
            showGetFileContent: false,
            showDirectoryInfo: false,
            names: [],
        };
    },
    methods: {
        returnClick() {
            let length = this.path.split("/").length;
            if (length > 2) {
                let dirLength = this.path.split("/")[length - 2].length;
                this.path = this.path.substring(
                    0,
                    this.path.length - dirLength - 1
                );
                this.getDirectoryContent();
            }
        },
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
        showDirectoryInfoWindow() {
            this.showDirectoryInfo = true;
        },
        closeAddDirectoryWindow() {
            this.showAddDirectory = false;
            this.getDirectoryContent();
        },
        closeGetFileContentWindow(oldName) {
            this.showGetFileContent = false;
            this.path = this.path.substr(0, this.path.length - oldName.length);
            this.getDirectoryContent();
        },
        closeDirectoryInfoWindow() {
            this.showDirectoryInfo = false;
            this.getDirectoryContent();
        },
        saveDirectoryInfo(oldName, name) {
            this.showDirectoryInfo = false;
            this.path =
                this.path.substr(0, this.path.length - oldName.length - 1) +
                name +
                "/";
            this.getDirectoryContent();
        },
        deleteDirectoryInfo(oldName) {
            this.showDirectoryInfo = false;
            this.path = this.path.substr(
                0,
                this.path.length - oldName.length - 1
            );
            this.getDirectoryContent();
        },
        getDirectoryContent() {
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
                    this.names = [];
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
        logOff() {
            this.$router.push("/");
            document.cookie = "Auth-Token=";
            document.cookie = "path=";
        },
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
.file-content {
    display: flex;
    padding: 30px;
}
.buttons {
    padding-top: 45px;
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.createFileButton,
.createDirectoryButton {
    margin-bottom: 30px;
}
.returnButton {
    width: 100px;
    margin-right: 20px;
}
.path {
    display: flex;
    align-items: center;
}
.files-list {
    padding: 10px;
    margin-top: 20px;
    background: #d4d1d1;
    min-height: 135px;
    font-size: 16px;
}
.file-system {
    width: 70%;
}
p {
    font-size: 16px;
}

li {
    margin-bottom: 5px;
}

li:last-child {
    margin: 0px;
}
li:hover {
    background: #aab4aa;
}
.log-off {
    position: absolute;
    right: 30px;
    top: 30px;
    width: 100px;
}
</style>