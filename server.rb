require 'webrick'
require 'json'

sample_data = [
  { id: 1, name: 'Item 1', description: 'This is the first item' },
  { id: 2, name: 'Item 2', description: 'This is the second item' },
  { id: 3, name: 'Item 3', description: 'This is the third item' }
]

server = WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => './public')

server.mount_proc '/data' do |req, res|
  res.body = sample_data.to_json
  res['Content-Type'] = 'application/json'
end

trap 'INT' do 
  server.shutdown 
end

server.start
