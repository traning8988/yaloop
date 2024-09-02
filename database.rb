require 'mysql2'

class Database
  def self.client
    @client ||= Mysql2::Client.new(
      host: ENV['DATABASE_HOST'] || 'localhost',
      username: ENV['DATABASE_USER'] || 'root',
      password: ENV['DATABASE_PASSWORD'] || '',
      database: ENV['DATABASE_NAME'] || 'myapp_development'
    )
  end

  def self.create_tables
    create_table_queries.split(';').each do |query|
      query.strip!
      next if query.empty?
      client.query(query)
    end
    puts "テーブルが正常に作成されました。"
  end

  private

  def self.create_table_queries
    <<-SQL
      CREATE TABLE IF NOT EXISTS Tasks (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
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
      )
    SQL
  end
end