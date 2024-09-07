require_relative 'database'

def insert_dummy_data(client)
  begin
    # ユーザーデータは別で挿入

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

    # 時間データの挿入（重複しないように、8/1-9/10まで）
    # 開始日と終了日を設定
    # 開始日と終了日を設定
    start_date = Date.parse('2024-08-01')
    end_date = Date.parse('2024-09-10')

    # データ生成のループ
    while start_date <= end_date
      # その日の時間帯を格納する配列
      time_slots = []
      total_minutes = 0

      while time_slots.size < 4 && total_minutes < 14 * 60 do
        loop do
          # ランダムな時間を生成
          start_hour = rand(24)
          start_minute = rand(60)
          end_hour = rand(24)
          end_minute = rand(60)

          # start_time と end_time を作成
          start_time = Time.local(start_date.year, start_date.month, start_date.day, start_hour, start_minute, 0)
          end_time = Time.local(start_date.year, start_date.month, start_date.day, end_hour, end_minute, 0)

          # end_time が start_time より遅く、time_slots に重複がない場合
          if end_time > start_time && time_slots.none? { |slot| (slot[:start] <= end_time && slot[:end] >= start_time) }
            duration = (end_time - start_time) / 60 # 学習時間（分）
            if (total_minutes + duration) <= (14 * 60) # 最大14時間まで
              time_slots << { start: start_time, end: end_time }
              total_minutes += duration
              break
            end
          end
        end
      end

      # データを挿入
      time_slots.each do |slot|
        task_id = rand(1..4)
        client.query("INSERT INTO times (start_time, end_time, tasks_id) VALUES ('#{slot[:start].strftime('%Y-%m-%d %H:%M:%S')}', '#{slot[:end].strftime('%Y-%m-%d %H:%M:%S')}', #{task_id})")
      end

      start_date += 1
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
  client.query("INSERT INTO users (name, email) VALUES ('阿川', 'agawa@example.com')")
  # サンプルデータを挿入
  # insert_dummy_data(client)

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
