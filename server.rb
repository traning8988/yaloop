require 'webrick'
require 'json'
require 'mysql2'
require_relative 'duration'

class MyServlet < WEBrick::HTTPServlet::AbstractServlet
  def initialize(server, db_client)
    super(server)  
    @db = db_client
    @duration = $duration # duration.rbからのデータを読み込み
  end

  def do_GET(request, response)
    case request.path
    when '/'
      response.body = File.read('public/index.html')
      response['Content-Type'] = 'text/html'
    when '/reset.css'
      response.body = File.read('public/reset.css')
      response['Content-Type'] = 'text/css'
    when '/style.css'
      response.body = File.read('public/style.css')
      response['Content-Type'] = 'text/css'
    when '/graph-image.png'
      response.body = File.read('public/graph-image.png', binmode: true)
      response['Content-Type'] = 'image/png'
    when '/reports.js'
      response.body = File.read('public/reports.js')
      response['Content-Type'] = 'application/javascript'
    when '/script.js'
      response.body = File.read('public/script.js')
      response['Content-Type'] = 'application/javascript'
    when '/data' # durationデータを返すエンドポイント
      response.body = JSON.generate(@duration)
      response['Content-Type'] = 'application/json'
    else
      response.status = 404
    end
  end

  def do_POST(request, response)
    case request.path
    when '/add_task'
      data = JSON.parse(request.body)
      result = insert_task(data['title'])
      response.body = JSON.generate({ status: result ? 'success' : 'error' })
      response['Content-Type'] = 'application/json'
    else
      response.status = 404
    end
  end

  private

  def insert_task(title)
    begin
      @db.query("INSERT INTO tasks (title) VALUES ('#{@db.escape(title)}')")
      true
    rescue Mysql2::Error => e
      puts "データベースエラー: #{e.message}"
      false
    end
  end
end

client = Mysql2::Client.new(
  host: ENV['DATABASE_HOST'],
  username: ENV['DATABASE_USER'],
  password: ENV['DATABASE_PASSWORD'],
  database: ENV['DATABASE_NAME']
)

server = WEBrick::HTTPServer.new(Port: 8000)
server.mount '/', MyServlet, client
trap('INT') { server.shutdown }
server.start