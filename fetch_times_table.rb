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

def fetch_times_data_today
  client = Mysql2::Client.new(DB_CONFIG)

  # 日付が今日のデータを取得
  query = <<-SQL
  SELECT
    t.start_time,
    t.end_time,
    ts.title
  FROM
    times t
  JOIN
    tasks ts ON t.tasks_id = ts.id
  WHERE
    DATE(t.start_time) = CURDATE()
    AND DATE(t.end_time) = CURDATE();
  SQL
  results = client.query(query, as: :hash)
  client.close

  # 結果を指定されたJSON形式に変換
  study_json_datas = results.map do |row|
    {
      start_time: row['start_time'].strftime('%Y-%m-%d %H:%M:%S'),
      end_time: row['end_time'].strftime('%Y-%m-%d %H:%M:%S'),
      title: row['title']
    }
  end

  study_json_datas
end

def fetch_report_today
  client = Mysql2::Client.new(DB_CONFIG)

  # 日付が今日の日報を取得
  query = <<-SQL
  SELECT
      id,
      description
  FROM
      daily_reports
  WHERE
      DATE(created_at) = CURDATE();
  SQL
  result = client.query(query, as: :hash).first
  client.close

  # 結果を指定されたJSON形式に変換
  study_json_datas = {
    id: result['id'],
    description: result['description']
  } unless result.nil? || result.empty?

  study_json_datas
end

def fetch_user
  client = Mysql2::Client.new(DB_CONFIG)

  # 日付が今日の日報を取得
  query = <<-SQL
  SELECT * FROM users WHERE id = 1;
  SQL
  result = client.query(query, as: :hash).first
  client.close

  # 結果を指定されたJSON形式に変換
  study_json_datas = {
    id: result['id'],
    name: result['name'],
    email: result['email']
  } unless result.nil? || result.empty?

  study_json_datas
end

# メソッドを呼び出してJSONを出力
# puts fetch_times_data_today
# puts fetch_report_today[0][:description]
