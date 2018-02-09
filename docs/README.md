# DPlayer

> [GitHub](https://github.com/MoePlayer/DPlayer) | [Demo](http://dplayer.js.org)

## Install

```
$ npm install dplayer --save
```

## Quick Start

```html
<link rel="stylesheet" href="DPlayer.min.css">
<div id="dplayer"></div>
<script src="DPlayer.min.js"></script>
```

```js
var dp = new DPlayer({
    container: document.getElementById('dplayer'),
    screenshot: true,
    video: {
        url: 'demo.mp4',
        pic: 'demo.jpg',
        thumbnails: 'thumbnails.jpg'
    },
    subtitle: {
        url: 'webvtt.vtt'
    },
    danmaku: {
        id: 'demo',
        api: 'https://api.prprpr.me/dplayer/'
    }
});
```

## Usage

### Options

Name|Default|Note
----|-------|----
container | document.querySelector('.dplayer') | player container
live | false | enable live mode, see [Live mode](http://dplayer.js.org/docs/#/?id=live-mode) for more details
autoplay | false | not supported in mobile browsers
theme | '#b7daff' | main color
loop | false | upon reaching the end of the video, automatically seek back to the start
lang | navigator.language.toLowerCase() | values: 'en', 'zh-cn', 'zh-tw'
screenshot | false | enable screenshot, if true, video and video poster must enable Cross-Origin
hotkey | true | enable hotkey
preload | 'auto' | values: 'none', 'metadata', 'auto'
volume | 0.7 | default volume, not work after user set volume themselves
logo | undefined | logo in top left corner
apiBackend | - | custom get and send danmaku behavior, see [Live mode](http://dplayer.js.org/docs/#/?id=live-mode) for more details
video | undefined | video info
video.quality | undefined | [Quality switching](http://dplayer.js.org/docs/#/?id=quality-switching)
video.url | undefined | video link
video.pic | undefined | video poster
video.thumbnails | undefined | video thumbnails, generate with [DPlayer-thumbnails](https://github.com/MoePlayer/DPlayer-thumbnails)
video.type | 'auto' | [HLS support](http://dplayer.js.org/docs/#/?id=hls-support) [FLV support](http://dplayer.js.org/docs/#/?id=flv-support) [MPEG DASH support](http://dplayer.js.org/docs/#/?id=mpeg-dash-support) [WebTorrent support](http://dplayer.js.org/docs/#/?id=webtorrent-support)
video.customType | undefined | [HLS support](http://dplayer.js.org/docs/#/?id=hls-support) [FLV support](http://dplayer.js.org/docs/#/?id=flv-support) [MPEG DASH support](http://dplayer.js.org/docs/#/?id=mpeg-dash-support) [WebTorrent support](http://dplayer.js.org/docs/#/?id=webtorrent-support)
subtitle | undefined | external subtitle
subtitle.url | `required` | subtitle url
subtitle.type | 'webvtt' | values: 'webvtt', 'ass', but only webvtt is supported for now
subtitle.fontSize | '20px' | subtitle font size
subtitle.bottom | '40px' | subtitle bottom space
subtitle.color | '#fff' | subtitle color
danmaku | undefined | showing danmaku
danmaku.id | `required` | it must be unique
danmaku.api | `required` | see [Back-end](http://dplayer.js.org/docs/#/?id=back-end) for more details
danmaku.token | undefined | back end verification
danmaku.maximum | undefined | maximum quantity of danmaku
danmaku.addition | undefined | additional danmaku, see [Bilibili danmaku](http://dplayer.js.org/docs/#/?id=bilibili-danmaku-and-video-link) for more details
danmaku.user | 'DIYgod' | user name
danmaku.bottom | undefined | values like: '10px' '10%', keep some white space, prevent warding off subtitle
danmaku.unlimited | false | unlimited amount and allow overlap
contextmenu | [] | custom contextmenu
mutex | true | pause other players when this player start play

Example:

```js
var dp = new DPlayer({
    container: document.getElementById('player1'),
    autoplay: false,
    theme: '#FADFA3',
    loop: true,
    lang: 'zh-cn',
    screenshot: true,
    hotkey: true,
    preload: 'auto',
    logo: 'logo.png',
    volume: 0.7,
    mutex: true,
    video: {
        url: 'dplayer.mp4',
        pic: 'dplayer.png',
        thumbnails: 'thumbnails.jpg',
        type: 'auto'
    },
    subtitle: {
        url: 'dplayer.vtt',
        type: 'webvtt',
        fontSize: '25px',
        bottom: '10%',
        color: '#b7daff'
    },
    danmaku: {
        id: '9E2E3368B56CDBB4',
        api: 'https://api.prprpr.me/dplayer/',
        token: 'tokendemo',
        maximum: 1000,
        addition: ['https://api.prprpr.me/dplayer/bilibili?aid=4157142']
        user: 'DIYgod'
        bottom: '15%'
        unlimited: true
    },
    contextmenu: [
        {
            text: 'custom1',
            link: 'https://github.com/DIYgod/DPlayer'
        },
        {
            text: 'custom2',
            link: 'https://github.com/DIYgod/DPlayer'
        }
    ]
});
```

### API

+ `dp.play()`

    Resume play

+ `dp.seek(time)`

    Set currentTime

+ `dp.pause()`

    Pause

+ `dp.toggle()`

    Toggle between play and pause

+ `dp.on(event, handler)`

    Event binding

+ `dp.switchVideo(video, danmaku)`

    Switch to a new video, the format of `video` and `danmaku` is the same as option

+ `dp.notice(text, time)`

    Show notice in lower left

+ `dp.switchQuality(index)`

    Switch quality

+ `dp.destroy()`

    Destroy player

+ `dp.speed(rate)`

    Set video speed

+ `dp.video`

    Native video, most [native api](http://www.w3schools.com/tags/ref_av_dom.asp) are supported

 + `dp.video.currentTime`

    Returns the current playback position

 + `dp.video.loop`

    Returns whether the video should start over again when finished

 + `dp.video.paused`

    Returns whether the video paused

 + Most [native api](http://www.w3schools.com/tags/ref_av_dom.asp)

+ `dp.danmaku`

    Danmaku

 + `dp.danmaku.send({text, color, type})`

    Submit a new danmaku to back end, the value of `color` should be like `#fff`, the value of `type` should be `top` `bottom` or `right`

 + `dp.danmaku.opacity(percentage)`

    Set danmaku opacity

 + `dp.danmaku.draw({text, color, type})`

    Draw a new danmaku to player in real time

 + `dp.danmaku.clear()`

    Clear danmaku

 + `dp.danmaku.resize()`

    After container resized

 + `dp.danmaku.hide()`

    Hide danmaku

 + `dp.danmaku.show()`

    Show danmaku

+ `dp.fullScreen`

 Type should be `web` or `browser`, the default one is `browser`

 + `dp.fullScreen.request(type)`

   Request fullscreen

 + `dp.fullScreen.cancel(type)`

   Cancel fullscreen


### Event binding

`dp.on(event, handler)`

Video events

- abort
- canplay
- canplaythrough
- durationchange
- emptied
- ended
- error
- loadeddata
- loadedmetadata
- loadstart
- mozaudioavailable
- pause
- play
- playing
- progress
- ratechange
- seeked
- seeking
- stalled
- suspend
- timeupdate
- volumechange
- waiting

Player events

- screenshot
- thumbnails_show
- thumbnails_hide
- danmaku_show
- danmaku_hide
- danmaku_clear
- danmaku_loaded
- danmaku_send
- danmaku_opacity
- contextmenu_show
- contextmenu_hide
- notice_show
- notice_hide
- quality_start
- quality_end
- destroy
- resize
- fullscreen
- fullscreen_cancel
- subtitle_show
- subtitle_hide
- subtitle_change

### Quality switching

[Demo](http://dplayer.js.org/#quality-switching)

Set `option.video.quality` instead of `option.video.url`

```js
var dp = new DPlayer({
    // ...
    video: {
        quality: [{
            name: '高清',
            url: '高清.mp4'
        }, {
            name: '超清',
            url: '超清.mp4'
        }],
        defaultQuality: 0,
        // ...
    }
});
```

### HLS support

[Demo](http://dplayer.js.org/#hls-support)

### MPEG DASH support

[Demo](http://dplayer.js.org/#dash-support)

### FLV support

[Demo](http://dplayer.js.org/#flv-support)

### WebTorrent support

[Demo](http://dplayer.js.org/#webtorrent-support)

### Live mode

[Demo](http://dplayer.js.org/#live)

At first, you should prepare a WebSocket backend.

Init DPlayer:

```js
var dp = new DPlayer({
    container: document.getElementById('dplayer'),
    live: true,
    danmaku: true,
    apiBackend: {
        read: function (endpoint, callback) {
            console.log('假装 WebSocket 连接成功');
            callback();
        },
        send: function (endpoint, danmakuData, callback) {
            console.log('假装通过 WebSocket 发送数据', danmakuData);
            callback();
        }
    },
    video: {
        url: 'demo.m3u8',
        type: 'hls'
    }
});
```

After getting a danmaku via WebSocket:

```js
var danmaku = {
    text: 'websocket',
    color: '#fff',
    type: 'right'
};
dp.danmaku.draw(danmaku);
```


### Work with module bundler

```js
require('DPlayer/dist/DPlayer.min.css');
var DPlayer = require('DPlayer');

var dp = new DPlayer(option);
```

## Back-end

### Danmaku

**Official API:**

`https://api.prprpr.me/dplayer/`

**Official danmaku data**

https://github.com/DIYgod/DPlayer-data

**Build yourself:**

[DPlayer-node](https://github.com/MoePlayer/DPlayer-node)

### Bilibili danmaku

**Bilibili  Danmaku**

API:

`https://api.prprpr.me/dplayer/v2/bilibili?aid=【bilibili视频AV号】`

or `https://api.prprpr.me/dplayer/v2/bilibili?cid=【bilibili视频cid】`

```JS
var option = {
    danmaku: {
        // ...
        addition: ['https://api.prprpr.me/dplayer/v2/bilibili?aid=【bilibili视频AV号】']
    }
}
```

## Run in development

```
$ npm run dev
```

## Make a release

```
$ npm run build
```