import P5 from "p5";
import { Player, Ease } from "textalive-app-api";
//import '@fortawesome/fontawesome-free/js/all.js'
import images from './img/*.png'
import fontawesomes from '../node_modules/@fortawesome/fontawesome-free/svgs/solid/*.svg'


// プレイヤーの初期化 / Initialize TextAlive Player
const player = new Player({
	app: {
		appAuthor: "あほくす（まじりみ）@friends.cafe",
		appName: "マジカルミライプログラミングコンテスト",
	},
	mediaElement: document.querySelector("#media"),
	valenceArousalEnabled: true,
	vocalAmplitudeEnabled: true,
});

// 各種設定
const myenv = {
	// 楽曲選択
	selectSong: "Greenlights Serenade",
	// selectSong: "Bless Your Breath";
	// selectSong: "Ai Sarenakutemo Kimi Ga Iru";
	
	// 演出設定
	templateMap: [
		{ indexType: "beat", startIndex: 0, endIndex: 20, 
			backgroundType: "default", bgColorHSB: [84,37,54],
			templateType: "default" },
		{ indexType: "beat", startIndex: 20, endIndex: 64,
			backgroundType: "default", bgColorHSB: [84,37,54], bgBeatAmpS: 20,
			templateType: "default" },
		{ indexType: "beat", startIndex: 64, endIndex: 80,
			backgroundType: "wave", bgColorHSB: [84,37,54], bgWaveCount: 120, bgWaveColorHSB: [84,37,64],
			templateType: "default" },
		{ indexType: "beat", startIndex: 80, endIndex: 96,
			backgroundType: "wave", bgColorHSB: [140,240,41], bgWaveCount: 120, bgWaveColorHSB: [140,240,58],
			templateType: "songTitle", charColorHSB: [92,228,189] },
		{ indexType: "beat", startIndex: 96, endIndex: 104,
			backgroundType: "wave", bgColorHSB: [140,240,41], bgWaveCount: 120, bgWaveColorHSB: [140,240,58],
			templateType: "songArtist", charColorHSB: [92,228,189] },
		{ indexType: "beat", startIndex: 104, endIndex: 108,
			backgroundType: "wave", bgColorHSB: [140,240,41], bgWaveCount: 120, bgWaveColorHSB: [140,240,58],
			templateType: "default" },
		{ indexType: "beat", startIndex: 108, endIndex: 99999,
			backgroundType: "default", bgColorHSB: [84,37,54], bgBeatAmpS: 20,
			                        templateType: "default"  },
		/*
		{ indexType: "beat", startIndex: 108, endIndex: 99999,
			backgroundType: "warp", bgColorHSB: [140,240,41], bgWarpObjType: "point", bgWarpObjColorHSB: [140,240,58],
			bgWarpObjCurve: [
				[{x: 0, y: 0.5}, {x: 0, y: 0.5},{x: 0.5, y: 0.5},{x: 0.5, y: 1.0},{x: 0.5, y: 1.0},],
				[{x: 0, y: 0.5}, {x: 0, y: 0.5},{x: 0.5, y: 0.5},{x: 0.5, y: 1.0},{x: 0.5, y: 1.0},],
				[{x: 0, y: 0.5}, {x: 0, y: 0.5},{x: 0.5, y: 0.5},{x: 0.5, y: 1.0},{x: 0.5, y: 1.0},],
			],
		}*/

	],

	
	// DEBUG MODE
	devMode: false
};

let init = false;
let devMessage = "";
let templateIndex = 0;
let dataStore = {
	background: {
	},
	char: {
	},
	chardeco: {
	},

};
let tool = {
	progressToSinWave: (progress) => {
		return 0.5 * (1 + Math.cos(2 * Math.PI * progress));
	},

};

// リスナの登録 / Register listeners
player.addListener({
	onAppReady: (app) => {
		if (!app.managed) {
			switch (myenv.selectSong) {
				case "Greenlights Serenade":
					// グリーンライツ・セレナーデ / Omoi feat. 初音ミク
					// - 初音ミク「マジカルミライ 2018」テーマソング
					// - 楽曲: http://www.youtube.com/watch?v=XSLhsjepelI
					// - 歌詞: https://piapro.jp/t/61Y2
					player.createFromSongUrl("http://www.youtube.com/watch?v=XSLhsjepelI", {
						video: {
							// 音楽地図訂正履歴: https://songle.jp/songs/1249410/history
							beatId: 3818919,
							chordId: 1207328,
							repetitiveSegmentId: 1942131,
							// 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/www.youtube.com%2Fwatch%3Fv%3DXSLhsjepelI
							lyricId: 50145,
							lyricDiffId: 3168
						}
					});
					break;
				case "Bless Your Breath":
					// ブレス・ユア・ブレス / 和田たけあき feat. 初音ミク
					// - 初音ミク「マジカルミライ 2019」テーマソング
					// - 楽曲: http://www.youtube.com/watch?v=a-Nf3QUFkOU
					// - 歌詞: https://piapro.jp/t/Ytwu
					player.createFromSongUrl("http://www.youtube.com/watch?v=a-Nf3QUFkOU", {
						video: {
							// 音楽地図訂正履歴: https://songle.jp/songs/1688650/history
							beatId: 3818481,
							chordId: 1546157,
							repetitiveSegmentId: 1942135,
							// 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/www.youtube.com%2Fwatch%3Fv=a-Nf3QUFkOU
							lyricId: 50146,
							lyricDiffId: 3143
						}
					});
					break;
				case "Ai Sarenakutemo Kimi Ga Iru":
					// 愛されなくても君がいる / ピノキオピー feat. 初音ミク
					// - 初音ミク「マジカルミライ 2020」テーマソング
					// - 楽曲: http://www.youtube.com/watch?v=ygY2qObZv24
					// - 歌詞: https://piapro.jp/t/PLR7
					player.createFromSongUrl("http://www.youtube.com/watch?v=ygY2qObZv24", {
						video: {
							// 音楽地図訂正履歴: https://songle.jp/songs/1977449/history
							beatId: 3818852,
							chordId: 1955797,
							repetitiveSegmentId: 1942043,
							// 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/www.youtube.com%2Fwatch%3Fv=ygY2qObZv24
							lyricId: 50150,
							lyricDiffId: 3158
						}
					});
					break;
			}
		}
	},

	onTextLoad: (body) => {
		// Webフォントを確実に読み込むためDOM要素に歌詞を貼り付ける
		document.querySelector("#dummy").textContent = body?.text;
	},

	onVideoReady: () => {
		if (!player.app.managed) {
			document.querySelector("#message").className = "active";
		}
		document.querySelector("#overlay").className = "inactive";
	},

	onPlay: () => {
		document.querySelector("#message").className = "inactive";
		if (!player.app.managed) {
			document.querySelector("#control").className = "";
		}
		console.log("player.onPlay");
	},

	onPause: () => {
		console.log("player.onPause");
	},

	onSeek: () => {
		console.log("player.onSeek");
	},

	onStop: () => {
		if (!player.app.managed) {
			document.querySelector("#control").className = "active";
		}
		console.log("player.onStop");
	},
});

// 再生終了後に表示する巻き戻しボタン
document.querySelector("#rewind").addEventListener("click", () => {
	player.requestPlay();
});

// p5.js を初期化
new P5((p5) => {
	// キャンバスの大きさなどを計算
	const width = Math.min(640, window.innerWidth);
	const height = Math.min(270, window.innerHeight);
	const margin = 30;
	const numChars = 10;
	const textAreaWidth = width - margin * 2;
	var img_logo;
	//var img_bolt;
	//const fa = p5.loadFont("Font Awesome 5 Free");
	//const noto = p5.loadFont("Noto Sans JP");

	// キャンバスを作成
	p5.setup = () => {
		p5.createCanvas(width, height);
		p5.colorMode(p5.HSB, 100);
		p5.frameRate(30);
		p5.background(40);
		p5.noStroke();
		p5.textFont("Noto Sans JP");
		p5.textAlign(p5.CENTER, p5.CENTER);
		img_logo = p5.loadImage(images['mm2020_logo']);
	};

	// BACKGROUND
	p5.drawBackgroundWave=()=>{
		const position = player.timer.position;
		let count = myenv.templateMap[templateIndex].bgWaveCount;
		if (!(count)){
			count = 120;
		}
		// 初期化
		if (!("wave" in dataStore.background)){
			dataStore.background.wave = {
				lastPosition: position,
				maxVolume: 10000,
				historyVolume: Array(count),
				historyCount: count,
				sign: 1,
			};
		}
		// countが変化している場合
		if (dataStore.background.wave.historyCount != count){
			delete dataStore.background.wave.historyVolume;
			dataStore.background.wave.historyVolume = Array(count);
			dataStore.background.wave.historyCount = count;
		}

		// いったん途切れてる場合初期化
		if (dataStore.background.wave.lastPosition + 1000 < position){
			delete dataStore.background.wave.historyVolume;
			dataStore.background.wave.historyVolume = Array(count);
			dataStore.background.wave.historyCount = count;
		}
		// Volume追加
		const sampleRate = 120; // Hz
		const sampleTime = 1000 / sampleRate; // msec.
		let tempPosition = dataStore.background.wave.lastPosition;
		while(tempPosition + sampleTime < position){
			tempPosition += sampleTime;
			const vol = player.getVocalAmplitude(position);
			dataStore.background.wave.historyVolume.push(vol);
			dataStore.background.wave.historyVolume.shift();
			if (vol>dataStore.background.wave.maxVolume){
				dataStore.background.wave.maxVolume = vol;
			}
		}
		// position更新
		dataStore.background.wave.lastPosition = position;
		// sign更新
		const sign = dataStore.background.wave.sign;
		dataStore.background.wave.sign = sign * (-1);

		devMessage += "wave.maxVolume = " + dataStore.background.wave.maxVolume + "<br>";
		devMessage += "wave.historyCount = " + dataStore.background.wave.historyCount + "<br>";

		const backgroundColorHSB = myenv.templateMap[templateIndex].bgColorHSB;
		let colorH = 0;
		let colorS = 0;
		let colorB = 20;
		if (backgroundColorHSB) {
			colorH = backgroundColorHSB[0]*100/255;
			colorS = backgroundColorHSB[1]*100/255;
			colorB = backgroundColorHSB[2]*100/240;
		}
		p5.background(colorH, colorS, colorB);

		// bgWaveColorHSB
		const bgWaveColorHSB = myenv.templateMap[templateIndex].bgWaveColorHSB
		colorH = 0;
		colorS = 0;
		colorB = 40;
		if (bgWaveColorHSB) {
			colorH = bgWaveColorHSB[0]*100/255;
			colorS = bgWaveColorHSB[1]*100/255;
			colorB = bgWaveColorHSB[2]*100/240;
		}

		p5.stroke(colorH, colorS, colorB);
		p5.strokeWeight(1);
		p5.noFill();
		let i = 0;
		let wave = dataStore.background.wave;
		p5.beginShape();
		for (i=0; i<count; i++){
			p5.curveVertex(
				i * width / count,
				sign * (2*(i%2)-1) * wave.historyVolume[i] / wave.maxVolume * height / 2 + height / 2
			);
		}
		p5.endShape();
	}

	p5.drawBackground=()=>{
		const position = player.timer.position;
		const backgroundColorHSB = myenv.templateMap[templateIndex].bgColorHSB;
		let colorH = 0;
		let colorS = 0;
		let colorB = 20;
		const bgBeatAmpS = myenv.templateMap[templateIndex].bgBeatAmpS;
		if (backgroundColorHSB) {
			colorH = backgroundColorHSB[0]*100/255;
			colorS = backgroundColorHSB[1]*100/255;
			colorB = backgroundColorHSB[2]*100/240;
		}
		if (bgBeatAmpS) {
			const xbeat = player.findBeat(position);
			if (xbeat) {
				const progress = xbeat.progress(position);
				colorS = colorS + bgBeatAmpS * tool.progressToSinWave(progress);
				if(colorS > 100){
					colorS = 100;
				}
				if(colorS < 0){
					colorS = 0;
				}
			}
		}
		p5.background(colorH, colorS, colorB);
		const beat = player.findBeat(position);
		if (beat) {
			devMessage += "beat.index     = " + beat.index + "<br>";
			devMessage += "beat.length    = " + beat.length + "<br>";
			devMessage += "beat.position  = " + beat.position + "<br>";
			devMessage += "beat.startTime = " + beat.startTime + "<br>";
			devMessage += "beat.endTime   = " + beat.endTime + "<br>";
			devMessage += "beat.duration  = " + beat.duration + "<br>";
			devMessage += "beat.progress  = " + beat.progress(position) + "<br><br>";
		}
		const chord = player.findChord(position);
		if (chord) {
			devMessage += "chord.index     = " + chord.index + "<br>";
			devMessage += "chord.name      = " + chord.name + "<br>";
			devMessage += "chord.startTime = " + chord.startTime + "<br>";
			devMessage += "chord.endTime   = " + chord.endTime + "<br>";
			devMessage += "chord.duration  = " + chord.duration + "<br>";
			devMessage += "chord.progress  = " + chord.progress(position) + "<br><br>";

		}
		const repetitiveSegment = player.findChorus(position);
		if (repetitiveSegment) {
			devMessage += "chorus.index     = " + repetitiveSegment.index + "<br>";
			devMessage += "chorus.startTime = " + repetitiveSegment.startTime + "<br>";
			devMessage += "chorus.endTime   = " + repetitiveSegment.endTime + "<br>";
			devMessage += "chorus.duration  = " + repetitiveSegment.duration + "<br>";
			devMessage += "chorus.progress  = " + repetitiveSegment.progress(position) + "<br><br>";
		}

		const amplitude = player.getVocalAmplitude(position);
		devMessage += "player.getVocalAmplitude = " + amplitude + "<br>";
		const va = player.getValenceArousal(position);
		if (va){
			devMessage += "player.getValenceArousal.Valence = " + va.v + "<br>";
			devMessage += "player.getValenceArousal.Arousal = " + va.a + "<br><br>";
		}

	};

	// CHARACTOR DECORATION
	p5.drawCharDeco=()=>{
		const position = player.timer.position;
		let phrase = player.video.findPhrase(position - 100, { loose: true });
		let char = phrase.firstChar;
		let count = phrase.charCount;
		let i = 0;
		while (i<count) {
			if (char.endTime + 320 < position) {

			}
			else if (char.startTime < position + 100) {
				const x = ((i%count) + 0.5) * (textAreaWidth / count);
				let weight, y = 0, size = 50;
				if (position < char.startTime) {
					const progress = 1 - (char.startTime - position) / 100;
					const eased = Ease.circIn(progress);
					weight = 5 * eased * 0;
					size = size * eased + Math.min(width, height) * (1 - eased) * 0;
				}
				else if(char.endTime < position) {
					const progress = (position - char.endTime) / 320;
					const eased = Ease.quadOut(progress);
					weight = 5 * (1 - eased);
					y = -eased * (height / 2);
					size = size + 390 * eased;
				}
				else{
					weight = 0;
				}
				p5.noFill();
				p5.stroke(255);
				p5.strokeWeight(weight);
				p5.ellipse(margin + x, height / 2 + y, size, size);
			}
			char = char.next;
			i++;
		}


	};

	// CHAR
	p5.drawChar=()=>{
		const position = player.timer.position;

		const charColorHSB = myenv.templateMap[templateIndex].charColorHSB;
		let colorH = 0;
		let colorS = 0;
		let colorB = 100;
		if (charColorHSB) {
			colorH = charColorHSB[0]*100/255;
			colorS = charColorHSB[1]*100/255;
			colorB = charColorHSB[2]*100/240;
		}


		let phrase = player.video.findPhrase(position - 100, { loose: true });
		
		devMessage += "phrase.text      = " + phrase.text + "<br>";
		devMessage += "phrase.charCount = " + phrase.charCount + "<br>";
		devMessage += "phrase.wordCount = " + phrase.wordCount + "<br>";
		devMessage += "phrase.startTime = " + phrase.startTime + "<br>";
		devMessage += "phrase.endTime   = " + phrase.endTime + "<br>";
		devMessage += "phrase.duration  = " + phrase.duration + "<br>";
		devMessage += "phrase.progress  = " + (100*phrase.progress(position)).toFixed(2)+"%" + "<br><br>";

		const wCount = phrase.wordCount;
		let word = phrase.firstWord;
		i = 0;
		while(i<wCount){
			if (word.contains(position)) {
				devMessage += "word.index          = " + phrase.findIndex(word) + "<br>";
				devMessage += "word.text           = " + word.text + "<br>";
				devMessage += "word.language       = " + word.language + "<br>";
				devMessage += "word.Part-of-speech = " + word.pos + "<br>";
				devMessage += "word.startTime      = " + word.startTime + "<br>";
				devMessage += "word.endTime        = " + word.endTime + "<br>";
				devMessage += "word.duration       = " + word.duration + "<br>";
				devMessage += "word.progress       = " + (100*word.progress(position)).toFixed(2)+"%" + "<br><br>";
			}
			word = word.next;
			i++;
		}


		let char = phrase.firstChar;
		const count = phrase.charCount;
		let i = 0;
		while(i<count){
			if (char.contains(position)) {
				devMessage += "char.index     = " + phrase.findIndex(char) + "<br>";
				devMessage += "char.text      = " + char.text + "<br>";
				devMessage += "char.startTime = " + char.startTime + "<br>";
				devMessage += "char.endTime   = " + char.endTime + "<br>";
				devMessage += "char.duration  = " + char.duration + "<br>";
				devMessage += "char.progress  = " + (100*char.progress(position)).toFixed(2)+"%" + "<br><br>";
			}

			if (char.startTime < position + 100) {
				const x = ((i%count) + 0.5) * (textAreaWidth / count);
				let transparency,y = 0,size = 39;
				// 100 [ms] かけてフェードインしてくる
				if (position < char.startTime) {
					const progress = 1 - (char.startTime - position) / 100;
					const eased = Ease.circIn(progress);
					transparency = progress;
					size = 39 * eased + Math.min(width, height) * (1 - eased);
				}
				// 160 [ms] かけてフェードアウトする
				else if (phrase.endTime < position) {
					const progress = (position - char.endTime) / 160;
					const eased = Ease.quintIn(progress);
					transparency = 1 - eased;
					y = -eased * (height / 2);
				}
				// フレーズ区間中は完全に不透明
				else {
					transparency = 1;
				}
				p5.fill(colorH, colorS, colorB, transparency * 100);
				p5.noStroke();
				p5.textSize(size);
				p5.text(char.text, margin + x, height / 2 + y);
			}
			char = char.next;
			i++;
		}
	};
	
	p5.drawTitle=()=>{
		let title = player.data.song.name;
		let i = 0, size = 39, y = 0;
		let count = title.length;
		const charColorHSB = myenv.templateMap[templateIndex].charColorHSB;
		let colorH = 0;
		let colorS = 0;
		let colorB = 100;
		if (charColorHSB) {
			colorH = charColorHSB[0]*100/255;
			colorS = charColorHSB[1]*100/255;
			colorB = charColorHSB[2]*100/240;
		}
		while(i<count){
			p5.fill(colorH, colorS, colorB, 100);
			p5.noStroke();
			p5.textSize(size);
			const x = ((i%count) + 0.5) * (textAreaWidth / count);
			p5.text(title.substr(i,1), margin + x, height / 2 + y);
			i++;
		}
	};

	p5.drawArtist=()=>{
		let title = player.data.song.artist.name;
		let i = 0, size = 39, y = 0;
		let count = title.length;
		const charColorHSB = myenv.templateMap[templateIndex].charColorHSB;
		let colorH = 0;
		let colorS = 0;
		let colorB = 100;
		if (charColorHSB) {
			colorH = charColorHSB[0]*100/255;
			colorS = charColorHSB[1]*100/255;
			colorB = charColorHSB[2]*100/240;
		}
		while(i<count){
			p5.fill(colorH, colorS, colorB, 100);
			p5.noStroke();
			p5.textSize(size);
			const x = ((i%count) + 0.5) * (textAreaWidth / count / 2) + textAreaWidth / 4;
			p5.text(title.substr(i,1), margin + x, height / 2 + y);
			i++;
		}
	};

	p5.processTemplate=()=>{
		// templateMap の template に合わせて演出を選択
		const temp = myenv.templateMap[templateIndex];

		devMessage += "backgroundType = " + temp.backgroundType + "<br><br>";
		switch (temp.backgroundType) {
			case "default":
				p5.drawBackground();
				break;
			case "wave":
				p5.drawBackgroundWave();
				break;
		}
		devMessage += "templateType   = " + temp.templateType + "<br><br>";
		switch (temp.templateType) {
			case "default":
				p5.drawCharDeco();
				p5.drawChar();
				break;
			case "songTitle":
				p5.drawTitle();
				break;
			case "songArtist":
				p5.drawArtist();
				break;
		}	
	};

	// ビートにあわせて背景を、発声にあわせて歌詞を表示
	p5.draw = () => {
		// プレイヤーが準備できていなかったら何もしない
		if (!player || !player.video) {
			return;
		}
		devMessage = "Debug Mode = ON <br><br>";
		const song = player.data.song;
		if(song){
			devMessage += "player.data.song.name        = " + song.name + "<br>";
			devMessage += "player.data.song.artist.name = " + song.artist.name + "<br>";
			devMessage += "player.data.song.permalink   = " + song.permalink + "<br><br>";
		}
		const position = player.timer.position;
		devMessage += "player.timer.position = " + position + "<br><br>";
		// templateMap の Index が範囲内であれば演出の処理を行う。
		devMessage += "templateIndex = " + templateIndex + "<br>";
		const temp = myenv.templateMap[templateIndex];
		devMessage += "indexType     = " + temp.indexType  + "<br>";
		devMessage += "startIndex    = " + temp.startIndex + "<br>";
		devMessage += "endIndex      = " + temp.endIndex  + "<br><br>";
		switch (temp.indexType){
			case "beat":
				const beat = player.findBeat(position);
				if (beat) {
					if (temp.startIndex <= beat.index) {
						p5.processTemplate();
					}
					if (temp.endIndex <= beat.index) {
						templateIndex++;
					}
				}
				break;
		}
		// DEBUG INFO PRINT
		if (myenv.devMode) {
			var debugInfo = document.getElementById("debugInfo");
			if(debugInfo == null){
				debugInfo = document.createElement('div');
				debugInfo.setAttribute("id", "debugInfo");
				document.body.appendChild(debugInfo);
				debugInfo.style.position = "absolute";
				debugInfo.style.left = 10;
				debugInfo.style.top = 50;
				debugInfo.overflow = "visible";
				debugInfo.style.fontSize = 9;
				debugInfo.style.fontFamily = "monospace";
				debugInfo.style.whiteSpace = "pre";
			}
			debugInfo.innerHTML = devMessage;
		}
	};
});
