require 'mysql2'
require 'json'

# データベース接続設定
DB_CONFIG = {
  host: ENV['DATABASE_HOST'],
  username: ENV['DATABASE_USER'],
  password: ENV['DATABASE_PASSWORD'],
  database: ENV['DATABASE_NAME']
}

def fetch_times_data
  client = Mysql2::Client.new(DB_CONFIG)

  # データベースからtimesテーブルのデータを取得
  query = <<-SQL
    SELECT times.id, times.start_time, times.end_time, times.tasks_id
    FROM times
  SQL
  results = client.query(query, as: :hash)
  client.close

  # 結果を指定されたJSON形式に変換
  study_json_datas = results.map do |row|
    {
      id: row['id'],
      start_time: row['start_time'].strftime('%Y-%m-%d %H:%M:%S'),
      end_time: row['end_time'].strftime('%Y-%m-%d %H:%M:%S'),
      tasks_id: row['tasks_id']
    }
  end

  study_json_datas
end

# メソッドを呼び出してJSONを出力
# puts fetch_times_data
