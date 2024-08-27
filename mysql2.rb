require 'mysql2'

client = Mysql2::Client.new(
  host: ENV['DATABASE_HOST'],
  username: ENV['DATABASE_USER'],
  password: ENV['DATABASE_PASSWORD'],
  database: ENV['DATABASE_NAME']
)

# テーブル作成のSQLクエリ
create_table_query = <<-SQL
  CREATE TABLE IF NOT EXISTS Tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255)
  );

  CREATE TABLE IF NOT EXISTS DailyTasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255)
  );
SQL

begin
  # テーブル作成クエリの実行
  client.query(create_table_query)
  puts "テーブル 'Tasks' が正常に作成されました。"

  # テーブル構造の確認
  describe_table_query = "DESCRIBE users"
  results = client.query(describe_table_query)

  puts "\nテーブル構造:"
  results.each do |row|
    puts "#{row['Field']} - #{row['Type']} - #{row['Null']} - #{row['Key']} - #{row['Default']}"
  end

rescue Mysql2::Error => e
  puts "エラーが発生しました: #{e.message}"
ensure
  # 接続を閉じる
  client.close if client
end
