<template>
  <div>
    <div class="header">
      <Upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :on-change="onFileChange"
      >
        <i slot="default" class="el-icon-plus"></i>
      </Upload>

      <div class="header-right">
        <Form label-position="right" label-width="80px" :model="current">
          <FormItem label="高度">
            <Input type="number" v-model="current.height" />
          </FormItem>
          <FormItem label="宽度">
            <Input type="number" v-model="current.width" />
          </FormItem>
          <FormItem label="压缩比例">
            <Input type="number" max="1" min="0" v-model="current.rate" />
          </FormItem>
          <FormItem>
            <div>
              <Button @click="handleCompressImage('jpeg')" type="primary"
                >重新生成压缩图片</Button
              >
              <Button @click="onReset">重置</Button>
            </div>
          </FormItem>
        </Form>
      </div>
    </div>

    <div class="picture-area" v-show="compressImg">
      <div class="picture">
        <div>原图预览（{{ realSize }}）</div>
        <img :src="file.url" />
      </div>
      <div class="picture">
        <div>压缩图预览（{{ compressSize }}）</div>
        <div class="overlay">
          <i class="el-icon-download icon-download" @click="downloadImg"></i>
          <img
            class="el-upload-list__item-thumbnail"
            :src="compressImg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "element-ui/lib/input";
import "element-ui/lib/theme-chalk/input.css";

import Button from "element-ui/lib/button";
import "element-ui/lib/theme-chalk/button.css";

import Upload from "element-ui/lib/upload";
import "element-ui/lib/theme-chalk/upload.css";

import Form from "element-ui/lib/form";
import "element-ui/lib/theme-chalk/form.css";

import FormItem from "element-ui/lib/form-item";
import "element-ui/lib/theme-chalk/form-item.css";

import "element-ui/lib/theme-chalk/icon.css";

export default {
  components: {
    Input,
    Button,
    Upload,
    Form,
    FormItem,
  },
  computed: {
    realSize: function () {
      const size = (this.size / 1024).toFixed(2);
      return `${size} kb`;
    },
    compressSize: function () {
      if (!this.blob) {
        return 0;
      }
      const size = (this.blob.size / 1024).toFixed(2);
      return `${size} kb`;
    },
  },
  data() {
    return {
      file: {
        url: "",
      },
      size: 0,
      current: {
        width: 0,
        height: 0,
        rate: 0.5,
      },
      origin: {
        width: 0,
        height: 0,
        rate: 0.5,
      },
      blob: null,
      compressImg: null,
    };
  },
  methods: {
    onFileChange(file, fileList) {
      this.file = file;
      this.size = file.size;
      this.current = {
        rate: 0.5,
        width: 0,
        height: 0,
      };
      this.handleCompressImage("jpeg");
    },
    handleCompressImage(type) {
      const vm = this;
      let reader = new FileReader();
      // 读取文件
      reader.readAsDataURL(this.file.raw);
      reader.onload = function (e) {
        let image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          let canvas = document.createElement("canvas");
          let context = canvas.getContext("2d");
          vm.current.width = vm.current.width || image.width;
          vm.current.height = vm.current.height || image.height;
          vm.origin.height = image.height;
          vm.origin.width = image.width;
          canvas.width = vm.current.width;
          canvas.height = vm.current.height;
          context.drawImage(image, 0, 0, vm.current.width, vm.current.height);
          // 得到base64
          const compressImgTmp = canvas.toDataURL(
            `image/${type}`,
            +vm.current.rate
          );
          // 将base64转uint8[]
          let parts = compressImgTmp.split(";base64,");
          let contentType = parts[0].split(":")[1];
          let raw = window.atob(parts[1]);
          let rawLength = raw.length;
          let uInt8Array = new Uint8Array(rawLength);
          for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
          }
          vm.blob = new Blob([uInt8Array], { type: contentType });
          vm.compressImg = URL.createObjectURL(vm.blob);
        };
      };
    },
    // base64 图片转 blob 后下载
    downloadImg() {
      if (window.navigator.msSaveOrOpenBlob) {
        // 兼容 ie 的下载方式
        window.navigator.msSaveOrOpenBlob(this.blob, this.file.name);
      } else {
        const a = document.createElement("a");
        a.href = this.compressImg;
        a.setAttribute("download", this.file.name);
        a.click();
      }
    },
    onReset() {
      this.current = Object.assign({}, this.origin);
    },
  },
};
</script>

<style lang="stylus" scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.header-right {
  flex-basis: 350px;
}

.picture-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;

  .picture {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
}

.icon-download {
  opacity: 0;
  position: absolute;
  color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}

.overlay {
  position: relative;
  font-size: 32px;

  img {
    vertical-align: bottom;
  }

  &:hover {
    background: #000;

    img {
      opacity: 0.6;
    }

    .icon-download {
      opacity: 1;
      cursor: pointer;
    }
  }
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
