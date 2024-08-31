require 'mysql2'

client = Mysql2::Client.new(
  host: ENV['DATABASE_HOST'],
  username: ENV['DATABASE_USER'],
  password: ENV['DATABASE_PASSWORD'],
  database: ENV['DATABASE_NAME'],
  flags: Mysql2::Client::MULTI_STATEMENTS
)

create_table_queries = <<-SQL
  CREATE TABLE IF NOT EXISTS Tasks (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    comment VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXISTS Daily_Reports (
    id INT NOT NULL AUTO_INCREMENT,
    description TEXT DEFAULT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS Daily_Tasks (
    id INT NOT NULL AUTO_INCREMENT,
    tasks_id INT NOT NULL,
    daily_reports_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (tasks_id) REFERENCES Tasks(id),
    FOREIGN KEY (daily_reports_id) REFERENCES Daily_Reports(id)
  );

  CREATE TABLE IF NOT EXISTS times (
    id INT NOT NULL AUTO_INCREMENT,
    start_time DATETIME NOT NULL,
    end_time DATETIME DEFAULT NULL,
    tasks_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (tasks_id) REFERENCES Tasks(id)
  );
SQL

begin
  client.query(create_table_queries)
  puts "テーブルが正常に作成されました。"

  # 結果を処理する（必要な場合）
  while client.next_result
    result = client.store_result
    puts result.to_a.inspect if result
  end

  # テーブル構造の確認
  tables = ['Tasks', 'users', 'Daily_Reports', 'Daily_Tasks', 'times']
  tables.each do |table|
    describe_table_query = "DESCRIBE #{table}"
    results = client.query(describe_table_query)

    puts "\nテーブル '#{table}' の構造:"
    results.each do |row|
      puts "#{row['Field']} - #{row['Type']} - #{row['Null']} - #{row['Key']} - #{row['Default']}"
    end
  end

rescue Mysql2::Error => e
  puts "SQLエラー: #{e.message}"
  puts "エラーコード: #{e.error_number}"
  puts "SQLステート: #{e.sql_state}"
ensure
  client.close if client
end
