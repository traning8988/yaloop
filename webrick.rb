require 'webrick'

server = WEBrick::HTTPServer.new(
  Port:  3000,
  DocumentRoot: './'
  )

server.mount('/', WEBrick::HTTPServlet::FileHandler, 'test.html')

trap 'INT' do
  server.shutdown
end

server.start
