# magicalmirai-procon
マジカルミライ２０２０プログラミングコンテスト

TextAlive App API のサンプルコード[TextAlive App API p5.js example](https://github.com/TextAliveJp/textalive-app-p5js)をベースに作成しました。

- 本作品のデモページ： http://160.251.21.144:1234/ （起動していない場合はすみません）


## 開発

[Node.js](https://nodejs.org/) をインストールしている環境で以下のコマンドを実行すると、開発用サーバが起動します。

```sh
npm install
npm run dev
```

## ビルド

以下のコマンドで `docs` 以下にビルド済みファイルが生成されます。

```sh
npm run build
```

## 設定の説明

`myenv.selectSong` で楽曲を選択して
`myenv.templateMap` に演出を設定することで曲に応じた演出効果を切り替えて適用することができます。

`myenv.templateMap` は演出設定のオブジェクトの配列で定義された順に読み込まれます。
`myenv.templateMap[index].startIndex` から演出を開始し，
`myenv.templateMap[index].endIndex` にて次の演出設定のオブジェクトへ移動します。

インデックスのタイプは`myenv.templateMap[index].indexType`にて指定可能ですが，現状は`"beat"`にしか対応していません。
今後，コーラスやフレーズに対応していけば設定がしやすくなるかもしれません。

曲中のbeatがどの位置にあるのかを調べるためには，`myenv.devMode: true`とすることで，画面上に現在の楽曲位置の情報が出るようになるので，見ながら設定を作りこんでいくことが可能です。

演出設定については，背景(backgroundType)，文字および文字の装飾(templateType)を選択後，それぞれの演出の詳細パラメータを設定する流れになります。

### 背景の演出

- `backgroundType: "default"`

単色塗りの背景を作成します。
色は`bgColorHSB`にHSBの配列で渡します。
また，`bgBeatAmpS`に数値を渡すことで，Beatに合わせて彩度が変化するようになります。

- `backgroundType: "wave"`

音波のような映像を背景に描画します。
背景色は `bgColorHSB: [84,37,54]`
波形の数は `bgWaveCount: 120`
波形の色は `bgWaveColorHSB: [84,37,64]`
という風に指定します。

- `backgroundType: "warp"`

指定した曲線に沿って流れるように点を描画することで，画面全体がワープしていくような演出を行います。
背景色は`bgColorHSB: [140,240,41]`
描画するオブジェクトの形状は`bgWarpObjType: "point"`にて指定しますが，今は点(point)しか対応していません。
そのうち，矩形や円や三角形や画像などに対応したいと思っています。
描画するオブジェクトの色は， `bgWarpObjColorHSB: [140,240,240]`のように指定します。
点の流れる方向は，曲線を`bgWarpObjCurve`に指定します。
`bgWarpObjCurve`は曲線の配列なので，複数の曲線を定義することができます。
曲線は頂点(x,y)およびオブジェクトの大きさ(w: weight)および描画時刻t(0から1)の配列ですが，最初と最後の点は曲線の制御点になるので，実際に画面に描画される点は最初と最後の点を除いた中間の点群となります。
制御点や曲線の算出の詳細は p5.js の curvePoint 関数を参照ください。
一つの曲線区間中に出現するオブジェクトの数は`bgWarpObjNum: 1`
曲線区間中を移動するオブジェクトの速度は`bgWarpObjSpeed: 0.1`
という風に指定します。
`bgWarpObjSpeed`は1だと1000[msec]でt=0→1となります。2だと倍速です。0.1だと10000[msec]かかります。

### 文字の演出

まだ作りこんでいないので後程追記します。

## TextAlive使ってみた感想

Node.jsもp5.jsもParcelもこれまで使ったことがなかったので，開発環境の構築と内容の理解に時間がかかってしまいました。結局，Windows上での環境整備でハマってしまい，ConoHa VPS上に Ubuntu 20.04 LTSのVPSサーバーを立ち上げて開発しました。

本当は JSON形式で演出の各種設定を記述すれば，シーンごとに様々な演出を切り替えながら
- 背景の演出（色の変化，動き）→　p5.drawBackground
- 文字の演出（文字の表示位置の変化，フェードイン・アウトの変化）→　p5.drawChar
- 文字の装飾（文字の周囲を動く幾何学模様で装飾）→　p5.drawCharDeco
のような演出の組み合わせを様々用意したいと思っていましたが，スキル不足により今回はシーンごとに演出を切り替えるところまでしか実装できませんでした。
（myenv.templateMap に設定したオブジェクトの配列によって, beat.index が startIndex→endIndex までの間，指定した演出（歌詞表示，タイトル表示，アーティスト表示）を切り替えるものです。）

来年もコンテストがあるようであれば，本プログラムは継続して追記していこうと思いますので，それまでにいろいろな効果を付け加えていきたいと思います。（アイデア的には，Twitterのハッシュタグからコメント，投稿画像を拾ってきて演出に加えるなども，スキルが追い付けばやってみたいと思ってます。）
また，どこかのアドベントカレンダーでTextAliveのアプリ開発環境の作り方は書こうかなと思っています。


