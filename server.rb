require 'webrick'
require 'mysql2'
require_relative 'duration'
require_relative 'router'

class MyServlet < WEBrick::HTTPServlet::AbstractServlet
  def initialize(server, db_client)
    super(server)
    @router = Router.new(db_client, $duration)
  end

  def service(request, response)
    @router.route(request, response)
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
