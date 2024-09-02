require 'webrick'
require 'json'

sample_data = [
  { id: 1, name: 'Item 1', description: 'This is the first item', duration: '01:00:00' },
  { id: 2, name: 'Item 2', description: 'This is the second item', duration: '02:00:00' },
  { id: 3, name: 'Item 3', description: 'This is the third item', duration: '03:00:00' }
]

duration = [
  duration_hour: "02", duration_minute: "30", duration_second: "30"
]

server = WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => './public')

server.mount_proc '/data' do |req, res|
  res.body = duration.to_json
  res['Content-Type'] = 'application/json'
end

trap 'INT' do 
  server.shutdown 
end

server.start
