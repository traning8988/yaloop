require 'webrick'
require 'listen'
require 'json'
require_relative 'duration'

# # duration.rbからデータを読み込む
# def load_duration
#   load 'duration.rb'
#   $duration
# end

def start_server
  server = WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => './public')

  server.mount_proc '/data' do |req, res|
    res.body = JSON.generate($duration)
    res['Content-Type'] = 'application/json'
  end

  trap 'INT' do
    server.shutdown
  end

  server.start
end

# サーバー起動
start_server

# ファイル変更の監視
# listener = Listen.to('.') do |modified, added, removed|
#   if modified.any? || added.any? || removed.any?
#     puts "ファイルが変更されました。サーバーを再起動します..."
#     Process.kill('INT', Process.pid) # サーバーをシャットダウン
#     sleep(1) # 少し待機してから再起動
#     exec('ruby server.rb') # スクリプトを再実行
#   end
# end

# listener.start
# sleep
