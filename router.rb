require 'json'

class Router
  def initialize(db_client, duration)
    @db = db_client
    @duration = duration
  end

  def route(request, response)
    case request.request_method
    when 'GET'
      handle_get(request, response)
    when 'POST'
      handle_post(request, response)
    else
      response.status = 405
    end
  end

  private

  def handle_get(request, response)
    case request.path
    when '/'
      serve_file('public/index.html', 'text/html', response)
    when '/reset.css', '/style.css', '/timer&graph.css', '/reports.css'
      serve_file("public#{request.path}", 'text/css', response)
    when '/graph-image.png'
      serve_file('public/graph-image.png', 'image/png', response, binary: true)
    when '/reports.js', '/script.js'
      serve_file("public#{request.path}", 'application/javascript', response)
    when '/data'
      response.body = JSON.generate(@duration)
      response['Content-Type'] = 'application/json'
    else
      response.status = 404
    end
  end

  def handle_post(request, response)
    case request.path
    when '/start_data'
      data = JSON.parse(request.body)
      result = insert_task_and_related(data['title'])
      response.body = JSON.generate({ status: result ? 'success' : 'error' })
      response['Content-Type'] = 'application/json'
    when '/end_task'
      success, end_time = update_task_end_time
      response.body = JSON.generate({
        status: result ? 'success' : 'error',
        end_time: end_time  # クライアントに終了時刻を返す
      })
      response['Content-Type'] = 'application/json'
    when '/restart'
      # response.status = 200
      # response.content_type = "text/plain"
      # response.body = "Server is restarting..."
      # Thread.new do
      #   sleep 1  # レスポンスが返されるまで少し待つ
      #   Process.kill('INT', Process.pid)
      #   exec('ruby server.rb')
      # end
      response.status = 200
      response.content_type = "text/plain"
      response.body = "Server is restarting..."
      # すぐにリスタートする
      Thread.new do
        sleep 0.1  # ほんの少し待ってから再起動
        exec('ruby server.rb')
      end
      # 現在のプロセスを終了
      Process.exit
    else
      response.status = 404
    end
  end

  def serve_file(path, content_type, response, binary: false)
    if File.exist?(path)
      response.body = File.read(path, mode: binary ? 'rb' : 'r')
      response['Content-Type'] = content_type
    else
      response.status = 404
    end
  rescue => e
    puts "Error serving file: #{e.message}"
    response.status = 500
  end

  def insert_task_and_related(title)
    begin
      @db.query("BEGIN") # トランザクション開始

      # tasksテーブルに挿入
      @db.query("INSERT INTO tasks (title) VALUES ('#{@db.escape(title)}')")
      task_id = @db.last_id

      # timesテーブルに挿入
      @db.query("INSERT INTO times (start_time, tasks_id, end_time) VALUES (NOW(), #{task_id}, NOW())")
      time_id = @db.last_id

      # daily_reportsテーブルに挿入
      #同じ日の4時から4時までのデータとuseridが一緒であれば更新しない
      @db.query("
        INSERT IGNORE INTO daily_reports (user_id, created_at)
        SELECT '1', NOW()
        WHERE NOT EXISTS (
          SELECT 1 FROM daily_reports
          WHERE user_id = '1'
          AND created_at >= DATE_SUB(CURDATE(), INTERVAL 4 HOUR)
          AND created_at < DATE_SUB(DATE_ADD(CURDATE(), INTERVAL 1 DAY), INTERVAL 4 HOUR)
        );
      ")
      daily_report_id = @db.query("
        SELECT id
        FROM daily_reports
        WHERE user_id = '1'
        AND created_at >= DATE_SUB(CURDATE(), INTERVAL 4 HOUR)
        AND created_at < DATE_SUB(DATE_ADD(CURDATE(), INTERVAL 1 DAY), INTERVAL 4 HOUR);
      ").first['id']

      # daily_tasksテーブルに挿入
      @db.query("INSERT INTO daily_tasks (tasks_id, daily_reports_id) VALUES (#{task_id}, #{daily_report_id})")

      @db.query("COMMIT") # トランザクションのコミット
      true
    rescue Mysql2::Error => e
      puts "データベースエラー: #{e.message}"
      @db.query("ROLLBACK") # エラー時にトランザクションをロールバック
      false
    end
  end

  def update_task_end_time
    begin
      # 最後のタスクのIDを取得
      max_id_result = @db.query("SELECT MAX(id) AS max_id FROM times")
      max_id = max_id_result.first['max_id']

      if max_id.nil?
        return [false, nil] # タスクが存在しない場合
      end

      # end_timeを更新
      @db.query("UPDATE times SET end_time = NOW() WHERE id = #{max_id}")

      # 更新されたend_timeを取得
      end_time_result = @db.query("SELECT end_time FROM times WHERE id = #{max_id}")
      end_time = end_time_result.first['end_time']

      [true, end_time]
    rescue Mysql2::Error => e
      puts "データベースエラー: #{e.message}"
      [false, nil]
    end
  end
end
