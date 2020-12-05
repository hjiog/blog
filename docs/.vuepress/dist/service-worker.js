/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "0071cd24bbf4a6e7e540b53adafb1730"
  },
  {
    "url": "algorithm/算法.html",
    "revision": "e08f0a8f1fecc54020b00fcff9aa292e"
  },
  {
    "url": "assets/css/0.styles.d1a99729.css",
    "revision": "c05f4279caf5c1b7a49190654cfd54d8"
  },
  {
    "url": "assets/img/bg.2cfdbb33.svg",
    "revision": "2cfdbb338a1d44d700b493d7ecbe65d3"
  },
  {
    "url": "assets/img/claw.f886b8d5.svg",
    "revision": "f886b8d5021c8af029e2cd4dea609bcc"
  },
  {
    "url": "assets/img/iconfont.117d8006.svg",
    "revision": "117d8006a3c478fbc8c4ce04a36ddb5a"
  },
  {
    "url": "assets/js/1.6fa83049.js",
    "revision": "8f876f2e2544106fa6fc34c55c98b392"
  },
  {
    "url": "assets/js/10.5f182aed.js",
    "revision": "dbdede696c823f02e15451e105e0b2b5"
  },
  {
    "url": "assets/js/11.8db9b3a0.js",
    "revision": "f49c3fc272bd8ef5cafe29a89abe1357"
  },
  {
    "url": "assets/js/12.af510421.js",
    "revision": "47525be883ec1565fb97767632ef4820"
  },
  {
    "url": "assets/js/13.3519ca48.js",
    "revision": "841556cdd39ae5b6fb93355fc5814ad6"
  },
  {
    "url": "assets/js/14.89d1cdf1.js",
    "revision": "0da1cfaa621ed7af9acc2174a993886d"
  },
  {
    "url": "assets/js/15.09fd8ae8.js",
    "revision": "beaa81b95c17e28b2f03f69ddcc34c3b"
  },
  {
    "url": "assets/js/16.b6a2350b.js",
    "revision": "eaf1eec3daf7e205f36d319b6d387bdd"
  },
  {
    "url": "assets/js/17.92d9b6e2.js",
    "revision": "97668a50977633374b1546712eae5e93"
  },
  {
    "url": "assets/js/18.2dbb9612.js",
    "revision": "9d6fde6cb6982e06048703b5d12bcfcb"
  },
  {
    "url": "assets/js/19.9da56e3d.js",
    "revision": "51a308229a2d5c9781c76a099075c8c6"
  },
  {
    "url": "assets/js/20.3aa85078.js",
    "revision": "ad27331159246da9bbee62ede3250d29"
  },
  {
    "url": "assets/js/21.7ab8220f.js",
    "revision": "c1681de241f36640319ee38d3b2f42b6"
  },
  {
    "url": "assets/js/22.5b5165f2.js",
    "revision": "11f23ef3593fce75f7968b956bf3c80f"
  },
  {
    "url": "assets/js/23.bc65d9db.js",
    "revision": "3cca31e1ed8e6439ef41d70b8dc125e2"
  },
  {
    "url": "assets/js/24.27844084.js",
    "revision": "32542a3f5dec86d65ff455ff36bf8f44"
  },
  {
    "url": "assets/js/25.c3fa049d.js",
    "revision": "140bac24094bba43f658b85dd938d75a"
  },
  {
    "url": "assets/js/26.ed01e1ee.js",
    "revision": "e6aed7a37fdc8a346f682a1a45b02ecc"
  },
  {
    "url": "assets/js/27.657085ac.js",
    "revision": "128bbab2fae69229b2b4cf89fb5559f2"
  },
  {
    "url": "assets/js/28.43f2d2b5.js",
    "revision": "9367adcd0452c167666230d79ce6fd24"
  },
  {
    "url": "assets/js/29.18fcebd0.js",
    "revision": "283cd5a85228a0ede91258d6a5a53cd2"
  },
  {
    "url": "assets/js/3.c2e6bb09.js",
    "revision": "896ec77c0aeff7e2f203c6fd54bc0588"
  },
  {
    "url": "assets/js/30.3211c987.js",
    "revision": "621f50a773bc1c445b6ca2e5852ea5f4"
  },
  {
    "url": "assets/js/31.830b1e2e.js",
    "revision": "9d59b7968d9651bc089e2156b4e990d3"
  },
  {
    "url": "assets/js/32.5a33b656.js",
    "revision": "76b1f675afb0a1324d42c3cb846f62d6"
  },
  {
    "url": "assets/js/33.f0d18e34.js",
    "revision": "c754159ffce4ec3e31acfa4e54ff23ad"
  },
  {
    "url": "assets/js/34.29be8324.js",
    "revision": "80327d47f0bad11037ffb4b20fed94dc"
  },
  {
    "url": "assets/js/35.37cf6b71.js",
    "revision": "40ada08fe91532bf2d9d3979107aa2bc"
  },
  {
    "url": "assets/js/36.171df96f.js",
    "revision": "4f0f50f2b7da07c20185c249641adf80"
  },
  {
    "url": "assets/js/37.88c51868.js",
    "revision": "8656319ca8e72b11704f5d84741860bb"
  },
  {
    "url": "assets/js/38.04d28bd1.js",
    "revision": "37233744894a5d721c208b453230802a"
  },
  {
    "url": "assets/js/39.d64c9815.js",
    "revision": "e4f57820e92059c95e4f509a86dae696"
  },
  {
    "url": "assets/js/4.52806803.js",
    "revision": "bdc6fc78f74c85a39e6a9410a138040d"
  },
  {
    "url": "assets/js/40.a5fbc4ea.js",
    "revision": "a053ca36bb449ef6c7b0467020cf71bc"
  },
  {
    "url": "assets/js/5.e0d14a91.js",
    "revision": "4867dfaa0534085ce7201579e85ea7f9"
  },
  {
    "url": "assets/js/6.bc06dc02.js",
    "revision": "af0d3b3b5cc9fb2acfef162d51f10333"
  },
  {
    "url": "assets/js/7.b58912de.js",
    "revision": "2908642462eb068e2e38897ebb05b00d"
  },
  {
    "url": "assets/js/8.0ee3c4cb.js",
    "revision": "79cf2f5a1e6273933be3d2bcf050cf3a"
  },
  {
    "url": "assets/js/9.8502058b.js",
    "revision": "829d5250696dcfdde53e698865b863f2"
  },
  {
    "url": "assets/js/app.96182b9e.js",
    "revision": "048c090686c982bf8e033b2b84d0cb8a"
  },
  {
    "url": "backend/docker.html",
    "revision": "4b938da7b4b827bfa98b401b1d4b6c07"
  },
  {
    "url": "backend/golang.html",
    "revision": "bb040fbce63f21018390dbff3da8dad3"
  },
  {
    "url": "backend/jenkins.html",
    "revision": "9c3a9792212283ee88f65b41e8fbe711"
  },
  {
    "url": "backend/postgresql.html",
    "revision": "fc6f0cb2dcbd8d6cf047ed0944f626ca"
  },
  {
    "url": "backend/redis使用总结.html",
    "revision": "72f59459c6f763eee6d5990eb83c16ff"
  },
  {
    "url": "background.jpg",
    "revision": "d6313ed729722202f0a8d56d2f7dfb2e"
  },
  {
    "url": "categories/index.html",
    "revision": "db71eaac1489e785353c40ac58b97899"
  },
  {
    "url": "categories/其他/index.html",
    "revision": "04b3a76dcdc3b03f9f54a094bb118aa9"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "1e9a6bc5b4e543483936c7acc8795b42"
  },
  {
    "url": "categories/前端/page/2/index.html",
    "revision": "887919e0e1b785bb966a2d63ebdd0543"
  },
  {
    "url": "categories/后端/index.html",
    "revision": "39ff34ec86add228c72a7f5ca55d614f"
  },
  {
    "url": "categories/算法/index.html",
    "revision": "2342ac6efa155ee12db3adc2218786c1"
  },
  {
    "url": "categories/计网/index.html",
    "revision": "4c2e15e14c67c1851c9cf45df373e02e"
  },
  {
    "url": "categories/运维/index.html",
    "revision": "b13ced254bfbcf7eeeed3b8065b5febf"
  },
  {
    "url": "designPatterns/js设计模式.html",
    "revision": "c816c82c75a6ac6d736bd664c923fa32"
  },
  {
    "url": "designPatterns/设计模式学习笔记(golang).html",
    "revision": "5d6682efdd9a672147d841367a2b8259"
  },
  {
    "url": "frontend/angular.html",
    "revision": "4b94fb77899fa54ddff051e80904bf56"
  },
  {
    "url": "frontend/bootstrap.html",
    "revision": "516fc7aa16b0064dc62af6807b32f8cc"
  },
  {
    "url": "frontend/css相关.html",
    "revision": "d97b681f24757e3c3dbcf7fec5ddf9a8"
  },
  {
    "url": "frontend/html相关.html",
    "revision": "2fa992892a387663b3decb82c104a05e"
  },
  {
    "url": "frontend/js.html",
    "revision": "0719976c18589e1eb03af6f6be021707"
  },
  {
    "url": "frontend/react.html",
    "revision": "d0e4fa3a227a74aca9164f7d1704a1a5"
  },
  {
    "url": "frontend/rxjs.html",
    "revision": "5488804e81be58500fb987d2c28aa796"
  },
  {
    "url": "frontend/vue学习.html",
    "revision": "34db306d723db0cf027d94fff1715fd2"
  },
  {
    "url": "frontend/webpack相关.html",
    "revision": "c7ed81b1a0005d47a8324884628c5434"
  },
  {
    "url": "frontend/前端相关.html",
    "revision": "f3d08b66e025331af015ec948aafbebd"
  },
  {
    "url": "frontend/浏览器相关.html",
    "revision": "3e1e8282321e2766563c1ed7fa573ec0"
  },
  {
    "url": "head.jpeg",
    "revision": "9d57200995995a1552163be4f4424183"
  },
  {
    "url": "index.html",
    "revision": "7feb1521ab711fcebf23110060521157"
  },
  {
    "url": "live2d/koharu/moc/koharu.2048/texture_00.png",
    "revision": "495eea8d906c2b03abfe3fa9de2f2a8b"
  },
  {
    "url": "live2d/miku/moc/miku.2048/texture_00.png",
    "revision": "f69191e3aa1aa64d66bef43d38bb45e8"
  },
  {
    "url": "live2d/wanko/moc/wanko.1024/texture_00.png",
    "revision": "10b7047251205db46fdac7632b5d4642"
  },
  {
    "url": "myVue.png",
    "revision": "8a87928f94815a5b2877f44b6b340f20"
  },
  {
    "url": "network/网络相关.html",
    "revision": "8a991b5e4dc4a2dff1a95f5f76b96df5"
  },
  {
    "url": "other/android.html",
    "revision": "3d50329bb862d0b67e48c205eff9a36b"
  },
  {
    "url": "other/git.html",
    "revision": "7b64c74589a135e89705e039f176173e"
  },
  {
    "url": "other/mac快捷键.html",
    "revision": "c54034d0f9a5d2f83db90d4d745e3ad6"
  },
  {
    "url": "other/manjaro-linux.html",
    "revision": "ccd3d9d9ad4f0d30b0b700bcce4b56f7"
  },
  {
    "url": "other/todo.html",
    "revision": "72c73d5032186dc439d5e42b1028fbaf"
  },
  {
    "url": "other/vscode-vim.html",
    "revision": "3a4018805f290ec29c1a6c1345eaac06"
  },
  {
    "url": "other/语法分析.html",
    "revision": "7f8279c637f50e114621b0fa6058a2b9"
  },
  {
    "url": "other/零碎.html",
    "revision": "282d38b9b4ecc9660608ec41fd0d75db"
  },
  {
    "url": "tag/android/index.html",
    "revision": "0c2b1d401297e39fc0b99f72c84b254c"
  },
  {
    "url": "tag/angular/index.html",
    "revision": "4f3dbc668f3710e4043f30d80159ee2b"
  },
  {
    "url": "tag/css/index.html",
    "revision": "f73441df17d1bdb7134aeb9d6e838411"
  },
  {
    "url": "tag/docker/index.html",
    "revision": "b712d3257fbcbb2b92bc3fccf86b3f50"
  },
  {
    "url": "tag/git/index.html",
    "revision": "05979db427742dac9f17e41d5355ace6"
  },
  {
    "url": "tag/golang/index.html",
    "revision": "ee5bfa7de4aaec96e2711d435036c046"
  },
  {
    "url": "tag/html/index.html",
    "revision": "cd4ea07870074e3eaa81c9e5d1de3b9c"
  },
  {
    "url": "tag/index.html",
    "revision": "b30c2b9b1ae83de296d48fa63d7e756c"
  },
  {
    "url": "tag/jenkins/index.html",
    "revision": "9f089b732c241d2cabefc95f7f7eced2"
  },
  {
    "url": "tag/js/index.html",
    "revision": "215c7df027e14c5d54df5431ffbd3686"
  },
  {
    "url": "tag/mac/index.html",
    "revision": "e957e2db755c371bbcc1e5707d0d57e5"
  },
  {
    "url": "tag/manjaro linux/index.html",
    "revision": "5a3d4b222411acf1c2f71002d9192c2e"
  },
  {
    "url": "tag/postgres/index.html",
    "revision": "b51f8393e6c4dd6e891468e489af2d10"
  },
  {
    "url": "tag/react/index.html",
    "revision": "6a37730b144f7fd75421aa7d1721935f"
  },
  {
    "url": "tag/redis/index.html",
    "revision": "c9a592d12c67b73da81c66601fefabf3"
  },
  {
    "url": "tag/rxjs/index.html",
    "revision": "4fd4f4cffec7a2edcfd723f17abe1ed7"
  },
  {
    "url": "tag/vim/index.html",
    "revision": "bfaf63aa40de677ad2e7845f5e454a81"
  },
  {
    "url": "tag/vscode/index.html",
    "revision": "17c3613f110f3a08bf0a740ad987e38b"
  },
  {
    "url": "tag/vue/index.html",
    "revision": "43e449550fa5d346dd24a5dcb56ceaf9"
  },
  {
    "url": "tag/webpack/index.html",
    "revision": "c2f30cc19ec0cd8cfdff535daaa535a9"
  },
  {
    "url": "tag/前端杂项/index.html",
    "revision": "172135d68e3d25ca2b008fdd6c7523e8"
  },
  {
    "url": "tag/杂项/index.html",
    "revision": "24b7e447081408a62d3f3a831816f0f2"
  },
  {
    "url": "tag/浏览器/index.html",
    "revision": "cc80d6622acf4b9fa8e0d22d23fc6fec"
  },
  {
    "url": "tag/算法/index.html",
    "revision": "abada4f49477d28943011269da9d79f3"
  },
  {
    "url": "tag/编译原理/index.html",
    "revision": "211a99f1a4dd68f062d04eb4a767c6c0"
  },
  {
    "url": "tag/计网/index.html",
    "revision": "a584ba715dd3679e50eaa49f1bdaf773"
  },
  {
    "url": "tag/设计模式/index.html",
    "revision": "e29c9b29c4a32d72f41a52ccb79b1d4d"
  },
  {
    "url": "timeline/index.html",
    "revision": "bbc9f52704bcd06050ffac546aed2f57"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
