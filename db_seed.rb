require_relative 'database'

def insert_dummy_data(client)
  begin
    # ユーザーデータの挿入
    users = [
      { name: "阿川", email: "agawa@example.com" }
    ]

    users.each do |user|
      client.query("INSERT INTO users (name, email) VALUES ('#{user[:name]}', '#{user[:email]}')")
    end
    puts "ユーザーデータを挿入しました。"

    # タスクデータの挿入
    tasks = [
      "Ruby",
      "チームミーティング",
      "JavaScript",
      "React",
      "Ruby"
    ]

    tasks.each do |task|
      client.query("INSERT INTO Tasks (title) VALUES ('#{task}')")
    end
    puts "タスクデータを挿入しました。"

    # 日報データの挿入
    client.query("INSERT INTO Daily_Reports (description, user_id) VALUES ('今日の作業報告', 1)")
    puts "日報データを挿入しました。"

    # 日次タスクデータの挿入
    5.times do |i|
      task_id = i + 1
      client.query("INSERT INTO Daily_Tasks (tasks_id, daily_reports_id) VALUES (#{task_id}, 1)")
    end
    puts "日次タスクデータを挿入しました。"

    # 時間データの挿入（重複しないように）
    base_time = Time.new(Time.now.year, Time.now.month, Time.now.day - 1, 20, 0, 0)  # 9:00 AM から開始
    5.times do |i|
      task_id = i + 1
      start_time = base_time + (60 * 150)  # 2.5hずつずらす
      end_time = start_time + (60 * 120)
      client.query("INSERT INTO times (start_time, end_time, tasks_id) VALUES ('#{start_time.strftime('%Y-%m-%d %H:%M:%S')}', '#{end_time.strftime('%Y-%m-%d %H:%M:%S')}', #{task_id})")
      base_time = end_time + (60 * 120)  # 次のタスクの開始時間を設定
    end
    puts "時間データを挿入しました。"

  rescue Mysql2::Error => e
    puts "データ挿入中にエラーが発生しました: #{e.message}"
  end
end

begin
  # データベースクライアントを取得
  client = Database.client

  # テーブルの削除、作成
  Database.reset_tables
  Database.create_tables

  # 仮データの挿入
  insert_dummy_data(client)

  # テーブル構造とデータの確認
  tables = ['Tasks', 'users', 'Daily_Reports', 'Daily_Tasks', 'times']
  tables.each do |table|
    describe_table_query = "DESCRIBE #{table}"
    results = client.query(describe_table_query)

    puts "\nテーブル '#{table}' の構造:"
    results.each do |row|
      puts "#{row['Field']} - #{row['Type']} - #{row['Null']} - #{row['Key']} - #{row['Default']}"
    end

    # データの確認
    data_query = "SELECT * FROM #{table}"
    data_results = client.query(data_query)
    puts "\nテーブル '#{table}' のデータ:"
    data_results.each do |row|
      puts row.inspect
    end
  end

rescue Mysql2::Error => e
  puts "SQLエラー: #{e.message}"
  puts "エラーコード: #{e.error_number}"
  puts "SQLステート: #{e.sql_state}"
ensure
  client.close if client
end
