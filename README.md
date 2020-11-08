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

以下のコマンドで `docs` 以下にビルド済みファイルが生成されます。 [サンプルコードのデモページ](https://textalivejp.github.io/textalive-app-p5js/) は [GitHub Pages](https://pages.github.com/) で、このリポジトリの `docs` 以下のファイルが提供されています。

```sh
npm run build
```

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


