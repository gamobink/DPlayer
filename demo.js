// stats.js: JavaScript Performance Monitor
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
function animate() {
    stats.begin();
    // monitored code goes here
    stats.end();

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// highlight.js
hljs.initHighlightingOnLoad();

dplayer1();

$.ajax({
    url: 'https://data.jsdelivr.com/v1/package/npm/dplayer',
    type: 'get',
    dataType: 'json',
    success(data) {
        if (data) {
            var html = '';
            for (var i = 0; i < data.versions.length; i++) {
                html += '<option value="' + data.versions[i] + '">v' + data.versions[i] + '</option>';
            }
            $('.version-select').html(html);
        }
    },
    error(e) {
        console.error(e);
    },
});

$('.version-select').change(function () {
    var version = $('.version-select').val();

    $('.dplayer-css').attr('href', 'https://cdn.jsdelivr.net/npm/dplayer@' + version + '/dist//DPlayer.min.css');

    $.ajax({
        url: 'https://cdn.jsdelivr.net/npm/dplayer@' + version + '/dist/DPlayer.min.js',
        cache: true,
        type: 'get',
        dataType: 'script',
        success() {
            clearPlayers();
            dplayer1();
        },
    });
});

$('.load').click(function () {
    window[$(this).parent().attr('id')] && window[$(this).parent().attr('id')]();
});

function dplayer1 () {
    window.dp1 = new DPlayer({
        container: document.getElementById('dplayer1'),
        video: {
            url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.mp4',
            pic: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.png',
            thumbnails: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara_thumbnails.jpg'
        },
        subtitle: {
            url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.vtt'
        },
        danmaku: {
            id: '9E2E3368B56CDBB4',
            api: 'https://api.prprpr.me/dplayer/'
        }
    });
}

function dplayer2 () {
    window.dp2 = new DPlayer({
        container: document.getElementById('dplayer2'),
        autoplay: false,
        theme: '#FADFA3',
        loop: true,
        screenshot: true,
        hotkey: true,
        logo: 'https://moeplayer.b0.upaiyun.com/dplayer/DPlayer.png',
        volume: 0.2,
        mutex: true,
        video: {
            url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.mp4',
            pic: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.png',
            thumbnails: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara_thumbnails.jpg',
            type: 'auto'
        },
        subtitle: {
            url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.vtt',
            type: 'webvtt',
            fontSize: '25px',
            bottom: '10%',
            color: '#b7daff'
        },
        danmaku: {
            id: '9E2E3368B56CDBB4',
            api: 'https://api.prprpr.me/dplayer/',
            token: 'tokendemo',
            maximum: 3000,
            user: 'DIYgod',
            margin: {
                bottom: '15%'
            },
            unlimited: true
        },
        contextmenu: [
            {
                text: 'custom contextmenu',
                link: 'https://github.com/MoePlayer/DPlayer'
            }
        ]
    });

    var events = [
        'abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error',
        'loadeddata', 'loadedmetadata', 'loadstart', 'mozaudioavailable', 'pause', 'play',
        'playing', 'ratechange', 'seeked', 'seeking', 'stalled',
        'volumechange', 'waiting',
        'screenshot',
        'thumbnails_show', 'thumbnails_hide',
        'danmaku_show', 'danmaku_hide', 'danmaku_clear',
        'danmaku_loaded', 'danmaku_send', 'danmaku_opacity',
        'contextmenu_show', 'contextmenu_hide',
        'notice_show', 'notice_hide',
        'quality_start', 'quality_end',
        'destroy',
        'resize',
        'fullscreen', 'fullscreen_cancel', 'webfullscreen', 'webfullscreen_cancel',
        'subtitle_show', 'subtitle_hide', 'subtitle_change'
    ];
    var eventsEle = document.getElementById('events');
    for (let i = 0; i < events.length; i++) {
        dp2.on(events[i], (info) => {
            eventsEle.innerHTML += '<p>Event: ' + events[i] + '</p>';
            eventsEle.scrollTop = eventsEle.scrollHeight;
        })
    }
}

function dplayer3 () {
    window.dp3 = new DPlayer({
        container: document.getElementById('dplayer3'),
        video: {
            quality: [{
                name: 'HD',
                url: 'https://moeplayer.b0.upaiyun.com/dplayer/hls/hikarunara.m3u8',
                type: 'hls'
            }, {
                name: 'SD',
                url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.mp4',
                type: 'normal'
            }],
            defaultQuality: 0,
            pic: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.png'
        }
    });
}

function dplayer4 () {
    window.dp4 = new DPlayer({
        container: document.getElementById('dplayer4'),
        video: {
            url: 'https://moeplayer.b0.upaiyun.com/dplayer/hls/hikarunara.m3u8',
            type: 'hls'
        }
    });
}

function dplayer5 () {
    window.dp5 = new DPlayer({
        container: document.getElementById('dplayer5'),
        video: {
            url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.flv',
            type: 'flv'
        }
    });
}

function dplayer6 () {
    window.dp6 = new DPlayer({
        container: document.getElementById('dplayer6'),
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
            url: 'https://moeplayer.b0.upaiyun.com/dplayer/hls/hikarunara.m3u8',
            type: 'hls'
        }
    });
}

function dplayer7 () {
    window.dp7 = new DPlayer({
        container: document.getElementById('dplayer7'),
        video: {
            url: 'https://moeplayer.b0.upaiyun.com/dplayer/dash/hikarunara.mpd',
            type: 'dash'
        }
    });
}

function dplayer8 () {
    window.dp8 = new DPlayer({
        container: document.getElementById('dplayer8'),
        video: {
            url: 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent',
            type: 'webtorrent'
        }
    });
}

function clearPlayers() {
    for (var i = 1; ; i++) {
        if (window['dp' + (i + 1)]) {
            window['dp' + (i + 1)].destroy();            
        }
        else {
            break;
        }
    }
}

function switchDPlayer() {
    if (dp2.option.danmaku.id !== '5rGf5Y2X55qu6Z2p') {
        dp2.switchVideo({
            url: 'https://moeplayer.b0.upaiyun.com/dplayer/flowerdance.mp4',
            pic: 'https://moeplayer.b0.upaiyun.com/dplayer/flowerdance.jpg',
            type: 'auto',
        }, {
            id: '5rGf5Y2X55qu6Z2p',
            api: 'https://api.prprpr.me/dplayer/',
            maximum: 3000,
            user: 'DIYgod'
        });
    } else {
        dp2.switchVideo({
            url: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.mp4',
            pic: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara.png',
            thumbnails: 'https://moeplayer.b0.upaiyun.com/dplayer/hikarunara_thumbnails.jpg',
            type: 'auto'
        }, {
            id: '9E2E3368B56CDBB42',
            api: 'https://api.prprpr.me/dplayer/',
            maximum: 3000,
            user: 'DIYgod'
        });
    }
}